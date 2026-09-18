"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { formatDateOnly } from "@/lib/date";

interface Photo {
  id: string;
  url: string;
  filename: string;
  uploadedAt?: string;
}

interface Gallery {
  id: string;
  clientName: string;
  sessionDate: string;
  sessionType: string;
  message?: string;
  coverPosition?: "top" | "center" | "bottom";
  createdAt: string;
  expiresAt: string;
  photos: Photo[];
  coverPhotoId: string | null;
}

function getPin(): string {
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("admin_pin="));
  return match?.split("=")[1] || "";
}

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function ManageGalleryPage() {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const galleryId = params.id as string;
  // Serial delete queue: only one DELETE in flight at a time to avoid
  // metadata read-modify-write race on the server.
  const deleteQueueRef = useRef<Promise<unknown>>(Promise.resolve());
  // After first successful load, don't redirect to /admin/galleries if a
  // refresh briefly can't find the gallery (stale cache / pointer lag).
  const hasLoadedOnceRef = useRef(false);

  const fetchGallery = useCallback(async ({ allowRedirect = true }: { allowRedirect?: boolean } = {}) => {
    const pin = getPin();
    if (!pin) { router.replace("/admin"); return; }

    const res = await fetch("/api/admin/galleries", {
      headers: { "x-admin-pin": pin },
      cache: "no-store",
    });
    if (res.status === 401) { router.replace("/admin"); return; }
    const data = await res.json();
    const found = data.galleries?.find((g: Gallery) => g.id === galleryId);
    if (!found) {
      // Only bounce on initial load. Mid-session refresh hiccups should not eject the user.
      if (allowRedirect && !hasLoadedOnceRef.current) {
        router.replace("/admin/galleries");
      }
      return;
    }
    setGallery(found);
    setLoading(false);
    hasLoadedOnceRef.current = true;
  }, [galleryId, router]);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  // Resize image on client to keep under 3.5MB (avoids Vercel 4.5MB body limit)
  function resizeImage(file: File, maxDimension: number = 2400): Promise<File> {
    return new Promise((resolve) => {
      // If already small enough, skip resize
      if (file.size < 3 * 1024 * 1024) {
        resolve(file);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resized = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
                type: "image/jpeg",
              });
              resolve(resized);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file); // fallback to original
      };
      img.src = url;
    });
  }

  async function handleUpload(files: FileList) {
    if (!files.length) return;
    setUploading(true);
    const pin = getPin();
    const total = files.length;
    const results: { url: string; filename: string; photoId: string }[] = [];
    let failed = 0;

    // Step 1: Upload each file to blob storage (with client-side resize)
    let firstError = "";
    let skipped = 0;
    for (let i = 0; i < total; i++) {
      setUploadProgress(`Processing ${i + 1} of ${total}...`);

      try {
        const resized = await resizeImage(files[i]);
        const formData = new FormData();
        formData.append("photo", resized);

        setUploadProgress(`Uploading ${i + 1} of ${total}${skipped ? ` (${skipped} already in gallery)` : ""}...`);

        const res = await fetch(`/api/admin/galleries/${galleryId}/photos`, {
          method: "POST",
          headers: { "x-admin-pin": pin },
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.skipped) {
            skipped++;
          } else {
            results.push({
              url: data.url,
              filename: data.filename,
              photoId: data.photoId,
            });
          }
        } else {
          const errText = await res.text();
          console.error("Upload failed", res.status, errText);
          if (!firstError) {
            // Extract useful message from the response (Vercel Blob puts quota errors in the text)
            try {
              const parsed = JSON.parse(errText);
              firstError = parsed.error || errText.slice(0, 200);
            } catch {
              firstError = errText.slice(0, 200);
            }
          }
          failed++;
          // Storage quota errors will fail every file — stop retrying after 3 failures.
          if (failed >= 3 && results.length === 0) {
            setUploadProgress(`Upload failed: ${firstError}`);
            setTimeout(() => setUploadProgress(""), 10000);
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
            return;
          }
        }
      } catch (err) {
        console.error("Upload error for", files[i].name, err);
        failed++;
      }
    }

    // Step 2: Register uploaded photos in CHUNKS. One huge register-batch call
    // could time out or exceed body limits for large uploads (100+ photos),
    // leaving orphan blobs. Chunking keeps each metadata write small and
    // gives partial progress if a later chunk fails.
    let registered = 0;
    let registerFailedCount = 0;
    const CHUNK = 25;
    for (let i = 0; i < results.length; i += CHUNK) {
      const chunk = results.slice(i, i + CHUNK);
      setUploadProgress(`Saving to gallery (${Math.min(i + CHUNK, results.length)} of ${results.length})...`);
      try {
        const regRes = await fetch(`/api/admin/galleries/${galleryId}/photos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-pin": pin,
          },
          body: JSON.stringify({
            action: "register-batch",
            photos: chunk,
          }),
        });

        if (regRes.ok) {
          const regData = await regRes.json();
          const newPhotos = (regData.photos || []).map((p: { id: string; url: string; filename: string }) => ({
            id: p.id,
            url: p.url,
            filename: p.filename,
          }));
          registered += newPhotos.length;
          setGallery((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              photos: [...prev.photos, ...newPhotos],
              coverPhotoId: prev.coverPhotoId || newPhotos[0]?.id || null,
            };
          });
        } else {
          registerFailedCount += chunk.length;
          const errText = await regRes.text();
          console.error("Register batch failed", regRes.status, errText);
        }
      } catch (err) {
        registerFailedCount += chunk.length;
        console.error("Register batch failed", err);
      }
    }

    if (failed > 0 || registerFailedCount > 0 || skipped > 0) {
      const parts = [`${registered} saved`];
      if (skipped > 0) parts.push(`${skipped} already in gallery`);
      if (failed > 0) parts.push(`${failed} upload failed`);
      if (registerFailedCount > 0) parts.push(`${registerFailedCount} not registered — try Recover Stranded Uploads`);
      setUploadProgress(`Done. ${parts.join(", ")}.`);
      setTimeout(() => setUploadProgress(""), 6000);
    } else {
      setUploadProgress("");
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleReconcile() {
    const pin = getPin();
    setUploadProgress("Scanning blob storage for stranded uploads...");
    setUploading(true);
    try {
      const res = await fetch(`/api/admin/galleries/${galleryId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ action: "reconcile" }),
      });
      if (res.ok) {
        const data = await res.json();
        setUploadProgress(`Recovered ${data.recovered} photo${data.recovered === 1 ? "" : "s"}. Refreshing...`);
        await fetchGallery({ allowRedirect: false });
        setTimeout(() => setUploadProgress(""), 3000);
      } else {
        const errText = await res.text();
        console.error("Reconcile failed", res.status, errText);
        setUploadProgress(`Recover failed (${res.status}). Check console.`);
        setTimeout(() => setUploadProgress(""), 5000);
      }
    } catch (err) {
      console.error("Reconcile error", err);
      setUploadProgress("Recover failed. Check console.");
      setTimeout(() => setUploadProgress(""), 5000);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeletePhoto(photoId: string) {
    // Optimistic UI: remove from local state immediately so the click feels instant.
    let snapshot: Gallery | null = null;
    setGallery((prev) => {
      if (!prev) return prev;
      snapshot = prev;
      return {
        ...prev,
        photos: prev.photos.filter((p) => p.id !== photoId),
        coverPhotoId: prev.coverPhotoId === photoId
          ? (prev.photos.find((p) => p.id !== photoId)?.id ?? null)
          : prev.coverPhotoId,
      };
    });

    // Chain onto the serial queue so deletes never overlap on the server.
    const job = deleteQueueRef.current.then(async () => {
      const pin = getPin();
      try {
        const res = await fetch(
          `/api/admin/galleries/${galleryId}/photos?photoId=${photoId}`,
          { method: "DELETE", headers: { "x-admin-pin": pin } }
        );
        if (!res.ok && res.status !== 404) {
          // 404 = already gone, treat as success. Anything else: revert.
          if (snapshot) setGallery(snapshot);
          await fetchGallery({ allowRedirect: false });
        }
      } catch {
        if (snapshot) setGallery(snapshot);
        await fetchGallery({ allowRedirect: false });
      }
    });
    deleteQueueRef.current = job.catch(() => {});
    await job;
  }

  async function handleSetCover(photoId: string) {
    const pin = getPin();
    // Optimistic update
    setGallery((prev) => prev ? { ...prev, coverPhotoId: photoId } : prev);
    await fetch(`/api/admin/galleries/${galleryId}/photos`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ coverPhotoId: photoId }),
    });
    fetchGallery({ allowRedirect: false });
  }

  async function handleCoverPosition(pos: "top" | "center" | "bottom") {
    const pin = getPin();
    setGallery((prev) => prev ? { ...prev, coverPosition: pos } : prev);
    await fetch(`/api/admin/galleries/${galleryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ coverPosition: pos }),
    });
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://tovyphotography.com/client-gallery/${galleryId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleUpload(e.dataTransfer.files);
    }
  }

  if (loading || !gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-charcoal-light">Loading...</div>
      </div>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(gallery.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const isExpired = daysLeft <= 0;
  const clientLink = `https://tovyphotography.com/client-gallery/${galleryId}`;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/admin/galleries" className="text-sm text-charcoal-light hover:text-sage transition-colors">
            ← Back to Galleries
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-charcoal">
              {gallery.clientName}
            </h1>
            <p className="text-charcoal-light text-sm mt-1">
              {gallery.sessionType} &middot; {formatDateOnly(gallery.sessionDate)} &middot; {gallery.photos.length} photos
            </p>
            <div className="flex items-center gap-2 mt-2">
              {isExpired ? (
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Expired</span>
              ) : daysLeft <= 14 ? (
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Expires in {daysLeft}d</span>
              ) : (
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{daysLeft}d left</span>
              )}
            </div>
          </div>

          {/* Share Link */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={clientLink}
                className="text-xs px-3 py-2 border border-charcoal/20 bg-white text-charcoal-light w-64 md:w-80"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={copyLink}
                className="px-3 py-2 text-xs bg-sage text-white hover:bg-sage-dark transition-colors whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <a
              href={`/client-gallery/${galleryId}`}
              target="_blank"
              className="text-xs text-sage hover:text-sage-dark"
            >
              Preview as client →
            </a>
          </div>
        </div>

        {/* Cover Photo Settings */}
        {gallery.photos.length > 0 && (
          <div className="bg-white border border-charcoal/10 p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Preview */}
              <div className="w-full sm:w-48 h-24 overflow-hidden flex-shrink-0 bg-cream">
                {(() => {
                  const cover = gallery.photos.find((p) => p.id === gallery.coverPhotoId) || gallery.photos[0];
                  return cover ? (
                    <img
                      src={cover.url}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `center ${gallery.coverPosition || "top"}` }}
                    />
                  ) : null;
                })()}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">Hero Crop Position</p>
                <div className="flex gap-2">
                  {(["top", "center", "bottom"] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => handleCoverPosition(pos)}
                      className={`px-4 py-1.5 text-xs capitalize border transition-colors ${
                        (gallery.coverPosition || "top") === pos
                          ? "border-sage bg-sage text-white"
                          : "border-charcoal/20 text-charcoal-light hover:border-sage hover:text-sage"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-charcoal-light/60 mt-1.5">Controls where the hero image crops on the client gallery page</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed ${uploading ? "border-sage bg-sage/5" : "border-charcoal/20 hover:border-sage"} transition-colors p-8 text-center mb-8`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div>
              <div className="animate-pulse text-sage font-medium">{uploadProgress || "Uploading..."}</div>
            </div>
          ) : (
            <>
              <p className="text-charcoal-light mb-3">Drag & drop photos here, or</p>
              <label className="inline-block px-5 py-2 bg-sage text-white text-sm font-medium uppercase tracking-wider hover:bg-sage-dark transition-colors cursor-pointer">
                Choose Files
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  className="hidden"
                  onChange={(e) => e.target.files && handleUpload(e.target.files)}
                />
              </label>
              <p className="text-xs text-charcoal-light mt-2">JPG, PNG, WEBP, HEIC &middot; Up to 20MB per photo</p>
              <button
                type="button"
                onClick={handleReconcile}
                className="mt-4 text-xs uppercase tracking-wider text-charcoal-light hover:text-sage transition-colors underline underline-offset-2"
              >
                Recover Stranded Uploads
              </button>
            </>
          )}
        </div>

        {/* Photos Grid */}
        {gallery.photos.length === 0 ? (
          <div className="text-center py-12 text-charcoal-light">
            <p>No photos yet. Upload some above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...gallery.photos]
              .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
              .map((photo) => (
              <div key={photo.id} className="group relative aspect-square">
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className={`w-full h-full object-cover ${
                    gallery.coverPhotoId === photo.id ? "ring-2 ring-sage" : ""
                  }`}
                  loading="lazy"
                />
                {gallery.coverPhotoId === photo.id && (
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-sage text-white text-[10px] uppercase tracking-wider">
                    Cover
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1 p-2">
                    {gallery.coverPhotoId !== photo.id && (
                      <button
                        onClick={() => handleSetCover(photo.id)}
                        className="px-2 py-1 bg-white/90 text-charcoal text-[10px] uppercase tracking-wider hover:bg-white"
                      >
                        Set Cover
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="px-2 py-1 bg-red-500/90 text-white text-[10px] uppercase tracking-wider hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
