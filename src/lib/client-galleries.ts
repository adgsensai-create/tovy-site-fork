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

const GALLERIES_META_PATH = "galleries/_meta.json";

// --- Metadata (stored as JSON blob) ---

// Use a unique path per write to bust CDN cache, track current version via a pointer blob
const META_POINTER_PATH = "galleries/_pointer.txt";

export async function getGalleriesData(): Promise<GalleriesData> {
  try {
    // Read pointer to find current meta blob
    const { blobs: pointerBlobs } = await list({ prefix: META_POINTER_PATH });
    if (pointerBlobs.length === 0) {
      // Fallback: try legacy _meta.json
      const { blobs } = await list({ prefix: GALLERIES_META_PATH });
      if (blobs.length === 0) return { galleries: [] };
      const res = await fetch(blobs[0].downloadUrl, { cache: "no-store" });
      return (await res.json()) as GalleriesData;
    }

    const pointerRes = await fetch(pointerBlobs[0].downloadUrl, { cache: "no-store" });
    const metaUrl = (await pointerRes.text()).trim();

    const res = await fetch(metaUrl, { cache: "no-store" });
    if (!res.ok) return { galleries: [] };
    return (await res.json()) as GalleriesData;
  } catch {
    return { galleries: [] };
  }
}

async function saveGalleriesData(data: GalleriesData): Promise<void> {
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

  // Clean up old meta versions (keep last 3)
  try {
    const { blobs: allMeta } = await list({ prefix: "galleries/_meta_" });
    const sorted = allMeta.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    for (const old of sorted.slice(3)) {
      await del(old.url);
    }
    // Also clean legacy _meta.json
    const { blobs: legacy } = await list({ prefix: GALLERIES_META_PATH });
    for (const l of legacy) await del(l.url);
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

  // Delete all photo blobs
  for (const photo of gallery.photos) {
    try {
      await del(photo.url);
    } catch { /* ignore */ }
  }

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

export async function getPublicGallery(galleryId: string): Promise<ClientGallery | null> {
  const data = await getGalleriesData();
  const gallery = data.galleries.find((g) => g.id === galleryId);
  if (!gallery) return null;

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
