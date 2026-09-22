import { NextRequest, NextResponse } from "next/server";
import { getVoter, ADMIN_PASSWORD } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get("pilkadikip_admin_session")?.value;
    if (adminCookie === "authenticated_admin") {
      return NextResponse.json({
        authenticated: true,
        role: "admin",
      });
    }

    const voterCookie = req.cookies.get("pilkadikip_voter_session")?.value;
    if (voterCookie) {
      const identifier = decodeURIComponent(voterCookie);
      const voter = getVoter(identifier);
      if (voter) {
        return NextResponse.json({
          authenticated: true,
          role: "voter",
          voter: {
            identifier: voter.identifier,
            has_voted: voter.has_voted,
            voted_at: voter.voted_at,
          },
        });
      }
    }

    return NextResponse.json({
      authenticated: false,
      role: null,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false, error: "Session check failed" }, { status: 500 });
  }
}
