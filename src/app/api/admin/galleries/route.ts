import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";
import { getGalleriesData, getGalleriesDataResilient, createGallery } from "@/lib/client-galleries";

export async function GET(req: NextRequest) {
  const authErr = checkAdminAuth(req);
  if (authErr) return authErr;

  try {
    // Resilient READ-ONLY path: unions metadata galleries with galleries
    // discovered in blob storage, recovering real client names from older
    // snapshots. Never writes — reads must never mutate state.
    const data = await getGalleriesDataResilient();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      galleries: [],
      readError: err instanceof Error ? err.message : "unknown read error",
    });
  }
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
