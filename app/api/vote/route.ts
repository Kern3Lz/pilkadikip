import { NextRequest, NextResponse } from "next/server";
import { recordVote } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const voterCookie = req.cookies.get("pilkadikip_voter_session")?.value;
    if (!voterCookie) {
      return NextResponse.json(
        { error: "Sesi pemilihan telah berakhir. Silakan login kembali." },
        { status: 401 }
      );
    }

    const identifier = decodeURIComponent(voterCookie);
    const body = await req.json();
    const candidateId = Number(body?.candidateId);

    // OWASP A03 / A04: Strict Type & Value Validation
    if (!Number.isInteger(candidateId) || (candidateId !== 1 && candidateId !== 2)) {
      return NextResponse.json(
        { error: "Pasangan calon yang dipilih tidak valid." },
        { status: 400 }
      );
    }

    // Atomic vote record
    const result = await recordVote(identifier, Number(candidateId));
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 409 }
      );
    }

    // Return success response with vote timestamp
    const response = NextResponse.json({
      success: true,
      message: result.message,
      votedAt: result.votedAt,
      candidateId: candidateId,
    });

    return response;
  } catch (err) {
    console.error("Vote API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat mencatat suara." },
      { status: 500 }
    );
  }
}
