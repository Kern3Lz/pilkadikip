"use client";

import React, { useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { InstitutionalLogos } from "@/components/BrandElements";
import { InstitutionalFooter } from "@/components/InstitutionalFooter";
import { CheckCircle2, ShieldCheck, LogOut, Lock } from "lucide-react";
import confetti from "canvas-confetti";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAlready = searchParams.get("already") === "true";
  const votedTime = searchParams.get("time");

  useEffect(() => {
    if (!isAlready) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD000", "#C88A00", "#2B180D", "#FFFFFF"],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isAlready]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (e) {
      router.push("/login");
    }
  };

  const displayTime = votedTime
    ? new Date(votedTime).toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "medium",
      })
    : new Date().toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "medium",
      });

  return (
    <div className="relative w-full max-w-lg">
      {/* Decorative Mascot Stand on desktop side */}
      <div className="hidden md:block absolute -left-36 bottom-0 w-36 h-56 pointer-events-none select-none z-10 drop-shadow-md transition-transform hover:scale-105 duration-300">
        <Image
          src="/images/maskot-stand.png"
          alt="Maskot Pilkadikip"
          fill
          className="object-contain"
          sizes="144px"
        />
      </div>

      {/* Decorative Mascot Sit peeking on card top right */}
      <div className="absolute -top-10 -right-4 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none select-none z-20 drop-shadow-md">
        <Image
          src="/images/maskot-sit.png"
          alt="Maskot Pilkadikip"
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>

      <div className="w-full bg-white rounded-2xl border-2 border-brand-border shadow-lg p-6 sm:p-8 text-center relative z-10">
        {/* Status Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-brand-gold font-serif font-bold text-xs uppercase tracking-wider mb-2">
          Integritas Suara Terverifikasi
        </span>

      <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-dark tracking-tight mb-2">
        {isAlready ? "Hak Suara Telah Digunakan" : "Terima Kasih Telah Memilih!"}
      </h1>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {isAlready
          ? "Akun Anda telah tercatat menggunakan hak suara dalam Pemilihan Ketua Umum Formadiksi KIP Kuliah PNJ 2026. Berdasarkan aturan satu suara per pemilih, Anda tidak dapat melakukan pemilihan ulang."
          : "Partisipasi Anda sangat berarti bagi kelangsungan regenerasi kepemimpinan Formadiksi KIP Kuliah Politeknik Negeri Jakarta periode 2026."}
      </p>

      {/* Proof Card */}
      <div className="p-4 bg-[#FAF8F5] rounded-xl border border-brand-border text-left space-y-2 mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 pb-2 border-b border-gray-200">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Status Surat Suara:
          </span>
          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Sah &amp; Terkunci Anonim
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
          <span>Waktu Pencatatan:</span>
          <span className="font-medium text-gray-800">{displayTime}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Prinsip Pemilihan:</span>
          <span className="font-serif italic text-brand-gold">One Person One Vote</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleLogout}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-brand-dark bg-brand-yellow hover:bg-[#E6BC00] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Sesi (Logout Aman)</span>
        </button>

        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          <span>Sangat disarankan segera keluar terutama jika menggunakan perangkat bersama.</span>
        </p>
      </div>
    </div>
  </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-batik-subtle">
      <header className="py-4 px-4 border-b border-brand-border bg-white/80 backdrop-blur-xs flex items-center justify-center">
        <InstitutionalLogos showTextOnMobile={true} />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <Suspense
          fallback={
            <div className="text-center font-serif text-sm text-brand-dark">
              Memuat status suara...
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
