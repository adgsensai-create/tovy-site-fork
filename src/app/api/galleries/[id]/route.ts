import { NextRequest, NextResponse } from "next/server";
import { getPublicGallery } from "@/lib/client-galleries";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const gallery = await getPublicGallery(id);

  if (!gallery) {
    return NextResponse.json(
      { error: "Gallery not found or expired" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    clientName: gallery.clientName,
    sessionType: gallery.sessionType,
    sessionDate: gallery.sessionDate,
    expiresAt: gallery.expiresAt,
    message: gallery.message || null,
    coverPosition: gallery.coverPosition || "top",
    photos: gallery.photos.map((p) => ({
      id: p.id,
      url: p.url,
      filename: p.filename,
    })),
    coverPhotoId: gallery.coverPhotoId,
  });
}
