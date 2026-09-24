import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const voterSession = cookieStore.get("pilkadikip_voter_session")?.value;

  // Server-side guard: Jika belum login sebagai pemilih, redirect di server
  // Halaman bilik suara tidak akan dikirim sama sekali ke browser yang belum login!
  if (!voterSession) {
    redirect("/login");
  }

  return <>{children}</>;
}
