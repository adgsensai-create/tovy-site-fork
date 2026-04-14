import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";
import { getGalleriesData, createGallery } from "@/lib/client-galleries";

export async function GET(req: NextRequest) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const data = await getGalleriesData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  const body = await req.json();
  const { clientName, clientEmail, sessionDate, sessionType, message, expirationDays } = body;

  if (!clientName || !sessionDate || !sessionType) {
    return NextResponse.json(
      { error: "clientName, sessionDate, and sessionType are required" },
      { status: 400 }
    );
  }

  const gallery = await createGallery({
    clientName,
    clientEmail,
    sessionDate,
    sessionType,
    message,
    expirationDays,
  });

  return NextResponse.json(gallery, { status: 201 });
}
