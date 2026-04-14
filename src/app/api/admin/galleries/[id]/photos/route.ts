import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { checkAdminAuth } from "@/lib/admin-auth";
import { addPhotosBatch, deletePhoto, setCoverPhoto } from "@/lib/client-galleries";

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const { id } = await params;
  const contentType = req.headers.get("content-type") || "";

  // JSON actions (batch register, cover photo)
  if (contentType.includes("application/json")) {
    const body = await req.json();

    if (body.coverPhotoId) {
      const ok = await setCoverPhoto(id, body.coverPhotoId);
      if (!ok) return NextResponse.json({ error: "Photo not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    if (body.action === "register-batch" && Array.isArray(body.photos)) {
      const added = await addPhotosBatch(id, body.photos);
      if (!added.length) return NextResponse.json({ error: "Gallery not found or no photos" }, { status: 404 });
      return NextResponse.json({ photos: added, count: added.length });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Multipart upload: upload file to blob, return URL (don't save to metadata yet)
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const photoId = generateId();
    const ext = file.name.split(".").pop() || "jpg";
    const blobPath = `galleries/${id}/${photoId}.${ext}`;

    const blob = await put(blobPath, file, {
      access: "public",
      contentType: file.type || "image/jpeg",
    });

    // Return the blob URL — client will batch-register all at the end
    return NextResponse.json({
      photoId,
      url: blob.url,
      filename: file.name,
    }, { status: 201 });
  }

  return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const photoId = searchParams.get("photoId");
  if (!photoId) return NextResponse.json({ error: "photoId required" }, { status: 400 });

  const deleted = await deletePhoto(id, photoId);
  if (!deleted) return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const { id } = await params;
  const body = await req.json();

  if (body.coverPhotoId) {
    const ok = await setCoverPhoto(id, body.coverPhotoId);
    if (!ok) return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "No valid operation" }, { status: 400 });
}
