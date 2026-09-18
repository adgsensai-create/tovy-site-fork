import { NextRequest, NextResponse } from "next/server";
import { list, put, del } from "@vercel/blob";
import { checkAdminAuth } from "@/lib/admin-auth";

const META_POINTER_PATH = "galleries/_pointer.txt";

// GET: list every galleries/_meta_*.json blob along with a preview of what it
// contains, so we can identify the most recent non-empty snapshot to restore.
export async function GET(req: NextRequest) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const { blobs } = await list({ prefix: "galleries/_meta_" });
  const snapshots = await Promise.all(
    blobs.map(async (b) => {
      try {
        const res = await fetch(b.downloadUrl, { cache: "no-store" });
        if (!res.ok) return { url: b.url, pathname: b.pathname, uploadedAt: b.uploadedAt, error: `read failed ${res.status}` };
        const data = await res.json() as { galleries?: { id: string; clientName: string; photos?: unknown[] }[] };
        const galleries = data.galleries || [];
        return {
          url: b.url,
          pathname: b.pathname,
          uploadedAt: b.uploadedAt,
          galleryCount: galleries.length,
          summary: galleries.map((g) => ({ id: g.id, clientName: g.clientName, photoCount: g.photos?.length ?? 0 })),
        };
      } catch (e) {
        return { url: b.url, pathname: b.pathname, uploadedAt: b.uploadedAt, error: e instanceof Error ? e.message : "read error" };
      }
    })
  );

  snapshots.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  // Also show what the pointer currently points to
  let currentPointer: string | null = null;
  const { blobs: pointerBlobs } = await list({ prefix: META_POINTER_PATH });
  if (pointerBlobs.length > 0) {
    try {
      const res = await fetch(pointerBlobs[0].downloadUrl, { cache: "no-store" });
      currentPointer = (await res.text()).trim();
    } catch { /* ignore */ }
  }

  return NextResponse.json({ currentPointer, snapshotCount: snapshots.length, snapshots });
}

// POST body variations:
//  { action: "scan-blobs" } — return { galleries: [{ id, photoCount }] } by
//    scanning galleries/<id>/ prefixes in blob storage.
//  { action: "rebuild-from-blobs", galleries: [{ id, clientName, sessionType, sessionDate, expiresAt? }] }
//    — reconstruct metadata using the user-supplied client fields, taking
//    photos from what's actually in blob storage. Cover = first photo.
//  { restoreFromUrl: "..." } — restore that snapshot as active metadata.
export async function POST(req: NextRequest) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const body = await req.json() as {
    restoreFromUrl?: string;
    action?: string;
    galleries?: { id: string; clientName: string; sessionType: string; sessionDate: string; expiresAt?: string; message?: string; clientEmail?: string }[];
  };

  // Detect and (optionally) remove photos whose filename looks like a blob
  // storage pathname (generated ID) rather than a real camera filename.
  // These come from an earlier rebuild-from-blob operation and duplicate
  // real uploads that share the same visual content.
  if (body.action === "clean-rebuilt-duplicates" || body.action === "preview-rebuilt-duplicates") {
    const galleryId = (body as { galleryId?: string }).galleryId;
    if (!galleryId) return NextResponse.json({ error: "galleryId required" }, { status: 400 });
    const { getGalleriesData } = await import("@/lib/client-galleries");
    const { del } = await import("@vercel/blob");
    const data = await getGalleriesData();
    const gallery = data.galleries.find((g) => g.id === galleryId);
    if (!gallery) return NextResponse.json({ error: "Gallery not found" }, { status: 404 });

    // A rebuilt-from-blob filename looks like `<lowercase>.<ext>` or
    // `<lowercase>-<suffix>.<ext>` — all lowercase base, no uppercase, no
    // underscore. Real camera filenames typically contain "_" or uppercase
    // (e.g. "IMG_1234.jpg", "DSC01234.JPG"). We treat "has uppercase or
    // underscore before the extension" as "real filename".
    const looksReal = (filename: string) => {
      const base = filename.replace(/\.[^.]+$/, "");
      return /[A-Z]/.test(base) || base.includes("_");
    };
    const suspicious = gallery.photos.filter((p) => !looksReal(p.filename));
    const kept = gallery.photos.filter((p) => looksReal(p.filename));

    if (body.action === "preview-rebuilt-duplicates") {
      return NextResponse.json({
        totalPhotos: gallery.photos.length,
        wouldDelete: suspicious.length,
        wouldKeep: kept.length,
        deleteSampleFilenames: suspicious.slice(0, 5).map((p) => p.filename),
        keepSampleFilenames: kept.slice(0, 5).map((p) => p.filename),
      });
    }

    // Actually delete: remove blobs + update metadata
    for (const p of suspicious) {
      try { await del(p.url); } catch { /* ignore */ }
    }
    gallery.photos = kept;
    if (gallery.coverPhotoId && !kept.some((p) => p.id === gallery.coverPhotoId)) {
      gallery.coverPhotoId = kept[0]?.id ?? null;
    }

    // Write meta directly (avoid safety guard since kept > 0 anyway)
    const version = Date.now();
    const versionedPath = `galleries/_meta_${version}.json`;
    const blob = await put(versionedPath, JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
    });
    try {
      const { blobs: oldPointers } = await list({ prefix: META_POINTER_PATH });
      for (const old of oldPointers) await del(old.url);
    } catch { /* ignore */ }
    await put(META_POINTER_PATH, blob.url, {
      access: "public",
      contentType: "text/plain",
      addRandomSuffix: false,
    });

    return NextResponse.json({ deleted: suspicious.length, kept: kept.length });
  }

  if (body.action === "scan-blobs") {
    // Group all galleries/<id>/<photo> blobs by gallery id
    const seenIds = new Map<string, number>();
    let cursor: string | undefined;
    do {
      const page: { blobs: { pathname: string }[]; cursor?: string; hasMore: boolean } =
        await list({ prefix: "galleries/", cursor, limit: 1000 });
      for (const b of page.blobs) {
        // skip meta and pointer files
        if (b.pathname.startsWith("galleries/_")) continue;
        const rest = b.pathname.slice("galleries/".length);
        const slash = rest.indexOf("/");
        if (slash < 0) continue;
        const id = rest.slice(0, slash);
        seenIds.set(id, (seenIds.get(id) ?? 0) + 1);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const galleries = Array.from(seenIds.entries()).map(([id, photoCount]) => ({ id, photoCount }));
    galleries.sort((a, b) => b.photoCount - a.photoCount);
    return NextResponse.json({ galleries });
  }

  if (body.action === "rebuild-from-blobs" && Array.isArray(body.galleries)) {
    const now = new Date();
    const defaultExpires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString();
    const rebuilt: {
      id: string;
      clientName: string;
      clientEmail?: string;
      sessionType: string;
      sessionDate: string;
      message?: string;
      createdAt: string;
      expiresAt: string;
      photos: { id: string; url: string; filename: string; uploadedAt: string }[];
      coverPhotoId: string | null;
      coverPosition: "top" | "center" | "bottom";
    }[] = [];

    for (const g of body.galleries) {
      const prefix = `galleries/${g.id}/`;
      const photos: { id: string; url: string; filename: string; uploadedAt: string }[] = [];
      let cursor: string | undefined;
      do {
        const page: { blobs: { pathname: string; url: string; uploadedAt: Date }[]; cursor?: string; hasMore: boolean } =
          await list({ prefix, cursor, limit: 1000 });
        for (const b of page.blobs) {
          const filename = b.pathname.slice(prefix.length);
          if (!filename) continue;
          const dot = filename.lastIndexOf(".");
          const photoId = dot > 0 ? filename.slice(0, dot) : filename;
          photos.push({
            id: photoId,
            url: b.url,
            filename,
            uploadedAt: (b.uploadedAt instanceof Date ? b.uploadedAt : new Date(b.uploadedAt)).toISOString(),
          });
        }
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);

      photos.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

      rebuilt.push({
        id: g.id,
        clientName: g.clientName,
        clientEmail: g.clientEmail,
        sessionType: g.sessionType,
        sessionDate: g.sessionDate,
        message: g.message,
        createdAt: now.toISOString(),
        expiresAt: g.expiresAt || defaultExpires,
        photos,
        coverPhotoId: photos[0]?.id ?? null,
        coverPosition: "center",
      });
    }

    // Write new meta directly (bypassing saveGalleriesData's safety guard,
    // since we're intentionally overwriting from a known-empty state).
    const version = Date.now();
    const versionedPath = `galleries/_meta_${version}.json`;
    const blob = await put(versionedPath, JSON.stringify({ galleries: rebuilt }), {
      access: "public",
      contentType: "application/json",
    });
    try {
      const { blobs: oldPointers } = await list({ prefix: META_POINTER_PATH });
      for (const old of oldPointers) await del(old.url);
    } catch { /* ignore */ }
    await put(META_POINTER_PATH, blob.url, {
      access: "public",
      contentType: "text/plain",
      addRandomSuffix: false,
    });

    return NextResponse.json({ rebuilt: rebuilt.length, totalPhotos: rebuilt.reduce((n, g) => n + g.photos.length, 0) });
  }

  if (!body.restoreFromUrl) return NextResponse.json({ error: "restoreFromUrl or action required" }, { status: 400 });

  // Verify the target blob has valid data before we swing the pointer to it.
  const res = await fetch(body.restoreFromUrl, { cache: "no-store" });
  if (!res.ok) return NextResponse.json({ error: `target unreadable: ${res.status}` }, { status: 400 });
  const data = await res.json() as { galleries?: unknown[] };
  const count = Array.isArray(data.galleries) ? data.galleries.length : 0;

  // Remove old pointer, write new one pointing at the chosen snapshot.
  try {
    const { blobs: oldPointers } = await list({ prefix: META_POINTER_PATH });
    for (const old of oldPointers) await del(old.url);
  } catch { /* ignore */ }

  await put(META_POINTER_PATH, body.restoreFromUrl, {
    access: "public",
    contentType: "text/plain",
    addRandomSuffix: false,
  });

  return NextResponse.json({ restored: true, galleryCount: count });
}
