import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: "Berhasil keluar sistem." });
  response.cookies.delete("pilkadikip_voter_session");
  response.cookies.delete("pilkadikip_admin_session");
  return response;
}
