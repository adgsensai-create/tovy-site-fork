import { NextRequest, NextResponse } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN || "5678";

export function checkAdminAuth(req: NextRequest): NextResponse | null {
  const pin = req.headers.get("x-admin-pin") || req.cookies.get("admin_pin")?.value;
  if (pin !== ADMIN_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
