import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Proteksi Halaman Admin: Hanya bisa diakses jika memiliki cookie admin valid
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("pilkadikip_admin_session")?.value;
    if (adminSession !== "authenticated_admin") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Proteksi Halaman Vote: Hanya bisa diakses jika memiliki cookie voter session
  if (pathname === "/vote") {
    const voterSession = request.cookies.get("pilkadikip_voter_session")?.value;
    if (!voterSession) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vote"],
};
