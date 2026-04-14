import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";
import { deleteGallery, extendGallery, updateGallery } from "@/lib/client-galleries";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const { id } = await params;
  const deleted = await deleteGallery(id);
  if (!deleted) {
    return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
  }

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

  if (body.extendDays) {
    const gallery = await extendGallery(id, body.extendDays);
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json(gallery);
  }

  if (body.coverPosition !== undefined || body.message !== undefined || body.clientEmail !== undefined) {
    const gallery = await updateGallery(id, {
      coverPosition: body.coverPosition,
      message: body.message,
      clientEmail: body.clientEmail,
    });
    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }
    return NextResponse.json(gallery);
  }

  return NextResponse.json({ error: "No valid operation" }, { status: 400 });
}
