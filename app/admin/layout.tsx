import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("pilkadikip_admin_session")?.value;

  // Server-side guard: Jika bukan authenticated_admin, redirect ke /login di server
  // Komponen client child (dashboard) TIDAK AKAN PERNAH dirender atau dikirim ke browser!
  if (adminSession !== "authenticated_admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
