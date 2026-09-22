import { NextRequest, NextResponse } from "next/server";
import { getAdminStats, getAllVotersAudit } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get("pilkadikip_admin_session")?.value;
    if (adminCookie !== "authenticated_admin") {
      return NextResponse.json({ error: "Akses ditolak. Silakan login sebagai administrator." }, { status: 403 });
    }

    const stats = getAdminStats();
    const voters = getAllVotersAudit();

    return NextResponse.json({
      success: true,
      stats,
      voters,
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data rekapitulasi." }, { status: 500 });
  }
}
