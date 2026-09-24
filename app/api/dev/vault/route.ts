import { NextRequest, NextResponse } from "next/server";
import { getDeveloperSecretAudit, DEV_SECRET } from "@/lib/db";

// Endpoint ini HANYA dapat diakses oleh Developer dengan query key rahasia:
// GET /api/dev/vault?key=dev-pilkadikip-secret-2026 atau key=4dm1npilkadikip2026
// Admin dan pemilih biasa tidak memiliki link ini di UI.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "404 Not Found" },
        { status: 404 }
      );
    }

    const result = getDeveloperSecretAudit(key);
    if ("error" in result) {
      return NextResponse.json(
        { error: "404 Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _notice: "CONFIDENTIAL DEVELOPER AUDIT VAULT. HANYA UNTUK KEPERLUAN AUDIT TEKNIS.",
      ...result,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
