import { NextRequest, NextResponse } from "next/server";
import { verifyVoterCredentials, ADMIN_PASSWORD } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    // Batas aman untuk demo: 60 percobaan login per menit per IP
    const rateCheck = checkRateLimit(`login_${ip}`, 60, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Terlalu banyak percobaan masuk. Silakan tunggu ${rateCheck.retryAfter} detik.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { identifier, password, role } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/NIM dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const isHttps = req.headers.get("x-forwarded-proto") === "https" || process.env.NODE_ENV === "production";

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
          secure: isHttps,
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
    const result = await verifyVoterCredentials(identifier, password);
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
      secure: isHttps,
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
