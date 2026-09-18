import { list, put, del, head } from "@vercel/blob";

export interface GalleryPhoto {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

export type CoverPosition = "top" | "center" | "bottom";

export interface ClientGallery {
  id: string;
  clientName: string;
  clientEmail?: string;
  sessionDate: string;
  sessionType: string;
  message?: string;
  coverPosition?: CoverPosition;
  createdAt: string;
  expiresAt: string;
  photos: GalleryPhoto[];
  coverPhotoId: string | null;
}

export interface GalleriesData {
  galleries: ClientGallery[];
}

// A filename is "real" if it looks like an original camera/export name
// (contains an underscore or uppercase, e.g. IMG_1234.jpg, 26-IMG_7233.jpg).
// Generated blob-ID names (e.g. ix1n1o6v.jpg) are all-lowercase with no
// underscore — they only appear when a photo was recovered from blob storage
// after its metadata write failed under the OLD path format.
function hasRealFilename(p: GalleryPhoto): boolean {
  const base = p.filename.replace(/\.[^.]+$/, "");
  return /[A-Z_]/.test(base);
}

function sortPhotosForDisplay(a: GalleryPhoto, b: GalleryPhoto): number {
  const aReal = hasRealFilename(a);
  const bReal = hasRealFilename(b);
  // Real filenames sort numerically — exact shot order (1-IMG_x < 2-IMG_y).
  if (aReal && bReal) return a.filename.localeCompare(b.filename, undefined, { numeric: true });
  // Generated names go after real ones, ordered by upload time (best proxy).
  if (aReal !== bReal) return aReal ? -1 : 1;
  return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
}

// Placeholder names are generated during blob-scan recovery when a gallery's
// real metadata can't be found. They must NEVER overwrite a real client name.
export function isPlaceholderName(name: string): boolean {
  return name.startsWith("Recovered gallery ");
}

// Merge two versions of the same gallery, preferring real client data over
// placeholders, and the larger photo set.
function preferRicherGallery(a: ClientGallery, b: ClientGallery): ClientGallery {
  const aPlaceholder = isPlaceholderName(a.clientName);
  const bPlaceholder = isPlaceholderName(b.clientName);
  // Choose the "identity" (name/date/type/message/email) from the non-placeholder one
  let identity = a;
  if (aPlaceholder && !bPlaceholder) identity = b;
  else if (!aPlaceholder && !bPlaceholder) {
    // Both real: keep the one with the later createdAt (more recent edits)
    identity = new Date(a.createdAt) >= new Date(b.createdAt) ? a : b;
  }
  // Union photos from both
  const photoMap = new Map<string, GalleryPhoto>();
  for (const p of [...a.photos, ...b.photos]) {
    if (!photoMap.has(p.id)) photoMap.set(p.id, p);
  }
  const photos = Array.from(photoMap.values()).sort(sortPhotosForDisplay);
  return {
    ...identity,
    photos,
    coverPhotoId: identity.coverPhotoId ?? photos[0]?.id ?? null,
    // Latest expiry wins so recovery never accidentally expires a gallery
    expiresAt: new Date(a.expiresAt) >= new Date(b.expiresAt) ? a.expiresAt : b.expiresAt,
  };
}

// Reads EVERY surviving _meta_*.json snapshot and merges them by gallery id,
// preferring real client names over placeholders and unioning photos. This is
// the recovery backbone: as long as ANY snapshot still has the real client
// name, it wins over a placeholder.
export async function getMergedSnapshotData(): Promise<GalleriesData> {
  const { blobs: allMeta } = await list({ prefix: "galleries/_meta_" });
  const byId = new Map<string, ClientGallery>();
  // Newest first so identity ties resolve toward recent data
  const sorted = [...allMeta].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  for (const m of sorted) {
    const text = await fetchBlobText(m);
    if (!text) continue;
    try {
      const snap = JSON.parse(text) as GalleriesData;
      for (const g of snap.galleries ?? []) {
        const existing = byId.get(g.id);
        byId.set(g.id, existing ? preferRicherGallery(existing, g) : g);
      }
    } catch { /* skip unparseable snapshot */ }
  }
  return { galleries: Array.from(byId.values()) };
}

// getGalleriesDataResilient returns metadata's galleries UNIONED with any
// gallery IDs discovered by scanning `galleries/<id>/` prefixes in blob
// storage. Photos in blob storage are the source of truth for what galleries
// EXIST. Real client info for discovered galleries is recovered from older
// metadata snapshots whenever possible; placeholders are a last resort and
// are NEVER persisted (this function is strictly read-only).
export async function getGalleriesDataResilient(): Promise<GalleriesData> {
  let base: GalleriesData;
  try {
    base = await getGalleriesData();
  } catch {
    base = { galleries: [] };
  }

  // Repair pass: if the current metadata contains placeholder names, try to
  // recover the real names from older snapshots.
  let snapshotMerge: GalleriesData | null = null;
  if (base.galleries.some((g) => isPlaceholderName(g.clientName))) {
    try {
      snapshotMerge = await getMergedSnapshotData();
      const mergedById = new Map(snapshotMerge.galleries.map((g) => [g.id, g]));
      base = {
        galleries: base.galleries.map((g) => {
          if (!isPlaceholderName(g.clientName)) return g;
          const better = mergedById.get(g.id);
          return better && !isPlaceholderName(better.clientName)
            ? preferRicherGallery(g, better)
            : g;
        }),
      };
    } catch { /* keep base as-is */ }
  }

  const byId = new Map<string, ClientGallery>();
  for (const g of base.galleries) byId.set(g.id, g);

  // Scan blob storage for gallery folders (grouped by gallery id)
  const discovered = new Map<string, GalleryPhoto[]>();
  let cursor: string | undefined = undefined;
  try {
    do {
      const page: { blobs: { pathname: string; url: string; uploadedAt: Date }[]; cursor?: string; hasMore: boolean } =
        await list({ prefix: "galleries/", cursor, limit: 1000 });
      for (const b of page.blobs) {
        if (b.pathname.startsWith("galleries/_")) continue;
        const rest = b.pathname.slice("galleries/".length);
        const slash = rest.indexOf("/");
        if (slash < 0) continue;
        const id = rest.slice(0, slash);
        const suffix = rest.slice(slash + 1);
        if (!suffix) continue;
        const { photoId, filename } = parseBlobFilename(suffix);
        const photo: GalleryPhoto = {
          id: photoId,
          url: b.url,
          filename,
          uploadedAt: (b.uploadedAt instanceof Date ? b.uploadedAt : new Date(b.uploadedAt)).toISOString(),
        };
        const arr = discovered.get(id);
        if (arr) arr.push(photo);
        else discovered.set(id, [photo]);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch {
    // If scan fails entirely, just return what we have from metadata.
    return base;
  }

  // For discovered gallery IDs not in current metadata: first try to recover
  // their REAL info from older snapshots; only fall back to a placeholder if
  // no snapshot knows about them.
  const now = new Date();
  const defaultExpires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString();
  for (const [id, photos] of discovered.entries()) {
    if (byId.has(id)) continue;
    photos.sort(sortPhotosForDisplay);
    // Lazily load the snapshot merge only if we actually need it
    if (!snapshotMerge) {
      try { snapshotMerge = await getMergedSnapshotData(); } catch { snapshotMerge = { galleries: [] }; }
    }
    const fromSnapshot = snapshotMerge.galleries.find((g) => g.id === id);
    if (fromSnapshot && !isPlaceholderName(fromSnapshot.clientName)) {
      // Real info recovered — union in the blob photos
      const knownIds = new Set(fromSnapshot.photos.map((p) => p.id));
      const mergedPhotos = [...fromSnapshot.photos];
      for (const bp of photos) if (!knownIds.has(bp.id)) mergedPhotos.push(bp);
      mergedPhotos.sort(sortPhotosForDisplay);
      byId.set(id, { ...fromSnapshot, photos: mergedPhotos, coverPhotoId: fromSnapshot.coverPhotoId ?? mergedPhotos[0]?.id ?? null });
    } else {
      byId.set(id, {
        id,
        clientName: `Recovered gallery ${id}`,
        sessionDate: now.toISOString().slice(0, 10),
        sessionType: "Family",
        createdAt: now.toISOString(),
        expiresAt: defaultExpires,
        photos,
        coverPhotoId: photos[0]?.id ?? null,
        coverPosition: "center",
      });
    }
  }

  // For galleries in metadata that are missing photos found in blob storage,
  // union those photos in so nothing is invisible.
  for (const [id, blobPhotos] of discovered.entries()) {
    const meta = byId.get(id);
    if (!meta || meta.photos.length >= blobPhotos.length) continue;
    const knownUrls = new Set(meta.photos.map((p) => p.url));
    const knownIds = new Set(meta.photos.map((p) => p.id));
    for (const bp of blobPhotos) {
      if (knownUrls.has(bp.url) || knownIds.has(bp.id)) continue;
      meta.photos.push(bp);
    }
    meta.photos.sort(sortPhotosForDisplay);
    if (!meta.coverPhotoId && meta.photos.length > 0) meta.coverPhotoId = meta.photos[0].id;
  }

  // STRICTLY READ-ONLY: this function never writes. Persisting recovered
  // state happens only through explicit admin writes (rename, upload, etc.),
  // where saveGalleriesData's guard protects real names from placeholders.
  return { galleries: Array.from(byId.values()) };
}

const GALLERIES_META_PATH = "galleries/_meta.json";

// --- Metadata (stored as JSON blob) ---

// Use a unique path per write to bust CDN cache, track current version via a pointer blob
const META_POINTER_PATH = "galleries/_pointer.txt";

// Try both blob URL flavors — Vercel Blob's CDN occasionally 403s downloadUrl
// even on public blobs, but the plain `url` works.
async function fetchBlobText(b: { url: string; downloadUrl?: string }): Promise<string | null> {
  const urls = [b.downloadUrl, b.url].filter(Boolean) as string[];
  for (const u of urls) {
    try {
      const res = await fetch(u, { cache: "no-store" });
      if (res.ok) return await res.text();
    } catch { /* try next */ }
  }
  return null;
}

// Read-only. Tries pointer first, falls back to the newest _meta_*.json blob
// if the pointer is unreadable. NEVER writes — write side effects from a
// read path caused corruption under high concurrency.
export async function getGalleriesData(): Promise<GalleriesData> {
  // Try pointer first
  const { blobs: pointerBlobs } = await list({ prefix: META_POINTER_PATH });
  if (pointerBlobs.length > 0) {
    const pointerText = await fetchBlobText(pointerBlobs[0]);
    if (pointerText) {
      const metaUrl = pointerText.trim();
      if (metaUrl) {
        try {
          const res = await fetch(metaUrl, { cache: "no-store" });
          if (res.ok) return (await res.json()) as GalleriesData;
        } catch { /* fall through to meta scan */ }
      }
    }
  }

  // Fallback: pointer missing or unreadable. Scan all _meta_*.json blobs and
  // use the newest one that parses. Read-only — do NOT rewrite the pointer.
  const { blobs: allMeta } = await list({ prefix: "galleries/_meta_" });
  if (allMeta.length === 0) {
    // Try legacy _meta.json
    const { blobs: legacy } = await list({ prefix: GALLERIES_META_PATH });
    if (legacy.length === 0) return { galleries: [] };
    const legacyText = await fetchBlobText(legacy[0]);
    if (!legacyText) throw new Error("legacy metadata read failed");
    return JSON.parse(legacyText) as GalleriesData;
  }
  const sorted = [...allMeta].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  for (const m of sorted) {
    const text = await fetchBlobText(m);
    if (!text) continue;
    try {
      return JSON.parse(text) as GalleriesData;
    } catch { /* try next snapshot */ }
  }
  throw new Error("no readable metadata found");
}

async function saveGalleriesData(data: GalleriesData): Promise<void> {
  // Safety check 1: if we're about to write empty data over previous
  // non-empty data, refuse — that's almost always a bug (stale read,
  // race condition) and would silently destroy the gallery list.
  if (data.galleries.length === 0) {
    try {
      const existing = await getGalleriesData();
      if (existing.galleries.length > 0) {
        throw new Error(`refusing to overwrite ${existing.galleries.length} galleries with empty data`);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("refusing")) throw err;
      // Read failed — still refuse the empty write to be safe.
      throw new Error("refusing to write empty data when previous state is unknown");
    }
  }

  // Safety check 2: never let a placeholder "Recovered gallery" name
  // overwrite a real client name that exists in any surviving snapshot.
  if (data.galleries.some((g) => isPlaceholderName(g.clientName))) {
    try {
      const merged = await getMergedSnapshotData();
      const mergedById = new Map(merged.galleries.map((g) => [g.id, g]));
      data = {
        galleries: data.galleries.map((g) => {
          if (!isPlaceholderName(g.clientName)) return g;
          const real = mergedById.get(g.id);
          if (real && !isPlaceholderName(real.clientName)) {
            // Restore real identity, keep the incoming (newer) photo set
            return {
              ...real,
              photos: g.photos.length >= real.photos.length ? g.photos : real.photos,
              coverPhotoId: g.coverPhotoId ?? real.coverPhotoId,
            };
          }
          return g;
        }),
      };
    } catch { /* snapshot merge unavailable — proceed with what we have */ }
  }

  // Write meta to a unique path (timestamp-based) to bust CDN cache
  const version = Date.now();
  const versionedPath = `galleries/_meta_${version}.json`;

  const blob = await put(versionedPath, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
  });

  // Update pointer to the new version
  try {
    const { blobs: oldPointers } = await list({ prefix: META_POINTER_PATH });
    for (const old of oldPointers) await del(old.url);
  } catch { /* ignore */ }

  await put(META_POINTER_PATH, blob.url, {
    access: "public",
    contentType: "text/plain",
    addRandomSuffix: false,
  });

  // Post-cleanup: keep the last 20 meta versions. Snapshots are tiny (KB)
  // and are the only line of defense for recovering real client names after
  // a corruption event — retention is cheap, data loss is not.
  try {
    const { blobs: allMeta } = await list({ prefix: "galleries/_meta_" });
    const sorted = allMeta.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    for (const old of sorted.slice(20)) {
      try { await del(old.url); } catch { /* ignore */ }
    }
    const { blobs: legacy } = await list({ prefix: GALLERIES_META_PATH });
    for (const l of legacy) {
      try { await del(l.url); } catch { /* ignore */ }
    }
  } catch { /* ignore */ }
}

// --- Gallery CRUD ---

export async function createGallery(input: {
  clientName: string;
  clientEmail?: string;
  sessionDate: string;
  sessionType: string;
  message?: string;
  expirationDays?: number;
}): Promise<ClientGallery> {
  const data = await getGalleriesData();
  const now = new Date();
  const days = input.expirationDays ?? 90;
  const expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const gallery: ClientGallery = {
    id: generateId(),
    clientName: input.clientName,
    clientEmail: input.clientEmail || undefined,
    sessionDate: input.sessionDate,
    sessionType: input.sessionType,
    message: input.message || undefined,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    photos: [],
    coverPhotoId: null,
  };

  data.galleries.push(gallery);
  await saveGalleriesData(data);
  return gallery;
}

export async function deleteGallery(galleryId: string): Promise<boolean> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return false;

  // 1) Delete all photo blobs by URL (fast path, uses metadata).
  for (const photo of gallery.photos) {
    try { await del(photo.url); } catch { /* ignore */ }
  }

  // 2) Also sweep any orphan blobs under galleries/<id>/ that weren't in
  //    metadata (from failed uploads / stranded registers). This frees
  //    maximum space before we attempt the metadata write below.
  try {
    const prefix = `galleries/${galleryId}/`;
    let cursor: string | undefined = undefined;
    do {
      const page: { blobs: { url: string }[]; cursor?: string; hasMore: boolean } =
        await list({ prefix, cursor, limit: 1000 });
      for (const b of page.blobs) {
        try { await del(b.url); } catch { /* ignore */ }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch { /* ignore */ }

  data.galleries = data.galleries.filter((g) => g.id !== galleryId);
  await saveGalleriesData(data);
  return true;
}

export async function updateGallery(
  galleryId: string,
  updates: Partial<Pick<ClientGallery, "coverPosition" | "message" | "clientEmail">>
): Promise<ClientGallery | null> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return null;

  if (updates.coverPosition !== undefined) gallery.coverPosition = updates.coverPosition;
  if (updates.message !== undefined) gallery.message = updates.message;
  if (updates.clientEmail !== undefined) gallery.clientEmail = updates.clientEmail;

  await saveGalleriesData(data);
  return gallery;
}

export async function extendGallery(galleryId: string, days: number): Promise<ClientGallery | null> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return null;

  const current = new Date(gallery.expiresAt);
  const extended = new Date(current.getTime() + days * 24 * 60 * 60 * 1000);
  gallery.expiresAt = extended.toISOString();
  await saveGalleriesData(data);
  return gallery;
}

// --- Photo operations ---

export async function addPhoto(
  galleryId: string,
  file: File
): Promise<GalleryPhoto | null> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return null;

  const photoId = generateId();
  const ext = file.name.split(".").pop() || "jpg";
  const blobPath = `galleries/${galleryId}/${photoId}.${ext}`;

  const blob = await put(blobPath, file, {
    access: "public",
    contentType: file.type || "image/jpeg",
  });

  const photo: GalleryPhoto = {
    id: photoId,
    url: blob.url,
    filename: file.name,
    uploadedAt: new Date().toISOString(),
  };

  gallery.photos.push(photo);

  // Auto-set cover to first photo
  if (!gallery.coverPhotoId) {
    gallery.coverPhotoId = photoId;
  }

  await saveGalleriesData(data);
  return photo;
}

export async function addPhotoFromUrl(
  galleryId: string,
  url: string,
  filename: string,
  photoId: string
): Promise<GalleryPhoto | null> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return null;

  const photo: GalleryPhoto = {
    id: photoId,
    url,
    filename,
    uploadedAt: new Date().toISOString(),
  };

  gallery.photos.push(photo);
  if (!gallery.coverPhotoId) {
    gallery.coverPhotoId = photoId;
  }

  await saveGalleriesData(data);
  return photo;
}

// Batch register — adds multiple photos in ONE metadata write (no race condition)
export async function addPhotosBatch(
  galleryId: string,
  photos: { url: string; filename: string; photoId: string }[]
): Promise<GalleryPhoto[]> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return [];

  const added: GalleryPhoto[] = [];
  for (const p of photos) {
    const photo: GalleryPhoto = {
      id: p.photoId,
      url: p.url,
      filename: p.filename,
      uploadedAt: new Date().toISOString(),
    };
    gallery.photos.push(photo);
    added.push(photo);
  }

  if (!gallery.coverPhotoId && added.length > 0) {
    gallery.coverPhotoId = added[0].id;
  }

  await saveGalleriesData(data);
  return added;
}

// Reconcile: find blobs uploaded under galleries/<id>/ that aren't yet in the
// gallery metadata (e.g., after a failed register-batch call) and add them.
// Returns the number of orphan photos recovered.
export async function reconcilePhotos(galleryId: string): Promise<{ recovered: number; total: number }> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return { recovered: 0, total: 0 };

  // List every blob under this gallery's folder. Vercel Blob paginates at 1000 by default.
  const prefix = `galleries/${galleryId}/`;
  const allBlobs: { pathname: string; url: string; uploadedAt: Date }[] = [];
  let cursor: string | undefined = undefined;
  do {
    const page: { blobs: { pathname: string; url: string; uploadedAt: Date }[]; cursor?: string; hasMore: boolean } =
      await list({ prefix, cursor, limit: 1000 });
    allBlobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const knownIds = new Set(gallery.photos.map((p) => p.id));
  const knownUrls = new Set(gallery.photos.map((p) => p.url));

  let recovered = 0;
  for (const blob of allBlobs) {
    // pathname looks like "galleries/<id>/<photoId>.<ext>"
    const filename = blob.pathname.slice(prefix.length);
    if (!filename) continue;
    const dot = filename.lastIndexOf(".");
    const photoId = dot > 0 ? filename.slice(0, dot) : filename;
    if (knownIds.has(photoId) || knownUrls.has(blob.url)) continue;
    gallery.photos.push({
      id: photoId,
      url: blob.url,
      filename,
      uploadedAt: (blob.uploadedAt instanceof Date ? blob.uploadedAt : new Date(blob.uploadedAt)).toISOString(),
    });
    recovered++;
  }

  if (recovered > 0) {
    if (!gallery.coverPhotoId && gallery.photos.length > 0) {
      gallery.coverPhotoId = gallery.photos[0].id;
    }
    await saveGalleriesData(data);
  }
  return { recovered, total: gallery.photos.length };
}

export async function deletePhoto(galleryId: string, photoId: string): Promise<boolean> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return false;

  const photo = gallery.photos.find((p) => p.id === photoId);
  if (!photo) return false;

  try {
    await del(photo.url);
  } catch { /* ignore */ }

  gallery.photos = gallery.photos.filter((p) => p.id !== photoId);

  if (gallery.coverPhotoId === photoId) {
    gallery.coverPhotoId = gallery.photos[0]?.id ?? null;
  }

  await saveGalleriesData(data);
  return true;
}

export async function setCoverPhoto(galleryId: string, photoId: string): Promise<boolean> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return false;

  const photo = gallery.photos.find((p) => p.id === photoId);
  if (!photo) return false;

  gallery.coverPhotoId = photoId;
  await saveGalleriesData(data);
  return true;
}

// --- Public access ---

// Parse a blob pathname suffix into { photoId, originalFilename }.
// Two formats supported:
//   New: `<photoId>__<originalFilename>` (photo id + double underscore + original name)
//   Legacy: `<photoId>.<ext>` (photo id + extension only — original name lost)
function parseBlobFilename(suffix: string): { photoId: string; filename: string } {
  const sep = suffix.indexOf("__");
  if (sep > 0) {
    return { photoId: suffix.slice(0, sep), filename: suffix.slice(sep + 2) };
  }
  const dot = suffix.lastIndexOf(".");
  const photoId = dot > 0 ? suffix.slice(0, dot) : suffix;
  return { photoId, filename: suffix };
}

// Scan blob storage for one gallery's photos. Cheaper than the full resilient
// path when we already know the gallery id.
async function scanGalleryPhotos(galleryId: string): Promise<GalleryPhoto[]> {
  const prefix = `galleries/${galleryId}/`;
  const photos: GalleryPhoto[] = [];
  let cursor: string | undefined = undefined;
  do {
    const page: { blobs: { pathname: string; url: string; uploadedAt: Date }[]; cursor?: string; hasMore: boolean } =
      await list({ prefix, cursor, limit: 1000 });
    for (const b of page.blobs) {
      const suffix = b.pathname.slice(prefix.length);
      if (!suffix) continue;
      const { photoId, filename } = parseBlobFilename(suffix);
      photos.push({
        id: photoId,
        url: b.url,
        filename,
        uploadedAt: (b.uploadedAt instanceof Date ? b.uploadedAt : new Date(b.uploadedAt)).toISOString(),
      });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return photos;
}

export async function getPublicGallery(galleryId: string): Promise<ClientGallery | null> {
  let data: GalleriesData;
  try {
    data = await getGalleriesData();
  } catch {
    // Metadata read failed — fall back to resilient view so clients aren't
    // locked out just because our metadata file has issues.
    data = await getGalleriesDataResilient();
  }
  let gallery = data.galleries.find((g) => g.id === galleryId);
  // If metadata doesn't know about this id but blob storage does, resilient
  // gives us back a placeholder + photos so the client can still view.
  if (!gallery) {
    try {
      const resilient = await getGalleriesDataResilient();
      gallery = resilient.galleries.find((g) => g.id === galleryId);
    } catch { /* nothing more we can do */ }
  }
  if (!gallery) return null;

  // ALWAYS union photos with what's actually in blob storage. Photos may be
  // uploaded to blob but not yet registered in metadata (register-batch fail).
  try {
    const blobPhotos = await scanGalleryPhotos(galleryId);
    const knownIds = new Set(gallery.photos.map((p) => p.id));
    const knownUrls = new Set(gallery.photos.map((p) => p.url));
    const merged = [...gallery.photos];
    for (const bp of blobPhotos) {
      if (knownIds.has(bp.id) || knownUrls.has(bp.url)) continue;
      merged.push(bp);
    }
    // Always sort — metadata insertion order may not match upload order
    // after resilient recovery appends orphans.
    merged.sort(sortPhotosForDisplay);
    gallery = { ...gallery, photos: merged, coverPhotoId: gallery.coverPhotoId ?? merged[0]?.id ?? null };
  } catch { /* if scan fails, just serve what metadata says */ }

  // Check expiration
  if (new Date() > new Date(gallery.expiresAt)) {
    return null;
  }

  return gallery;
}

// --- Helpers ---

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function isExpired(gallery: ClientGallery): boolean {
  return new Date() > new Date(gallery.expiresAt);
}

export function daysUntilExpiry(gallery: ClientGallery): number {
  const now = new Date();
  const exp = new Date(gallery.expiresAt);
  const diff = exp.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function galleryUrl(galleryId: string): string {
  return `/client-gallery/${galleryId}`;
}

export function fullGalleryUrl(galleryId: string): string {
  return `https://tovyphotography.com/client-gallery/${galleryId}`;
}
