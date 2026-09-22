import { NextRequest, NextResponse } from "next/server";
import { verifyVoterCredentials, ADMIN_PASSWORD } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password, role } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/NIM dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    // Check if Admin Login
    if (role === "admin" || identifier.toLowerCase().trim() === "admin") {
      if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({
          success: true,
          role: "admin",
          message: "Login admin berhasil.",
        });

        response.cookies.set("pilkadikip_admin_session", "authenticated_admin", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 6, // 6 hours
        });

        return response;
      } else {
        return NextResponse.json(
          { error: "Kata sandi admin tidak valid." },
          { status: 401 }
        );
      }
    }

    // Voter authentication
    const result = verifyVoterCredentials(identifier, password);
    if (!result.success || !result.voter) {
      return NextResponse.json(
        { error: result.message || "Autentikasi gagal." },
        { status: 401 }
      );
    }

    const voter = result.voter;
    const response = NextResponse.json({
      success: true,
      role: "voter",
      voter: {
        identifier: voter.identifier,
        has_voted: voter.has_voted,
        voted_at: voter.voted_at,
      },
    });

    // Set signed-like session cookie
    response.cookies.set("pilkadikip_voter_session", encodeURIComponent(voter.identifier), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Terjadi gangguan sistem internal server." },
      { status: 500 }
    );
  }
}
