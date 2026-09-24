"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CANDIDATES } from "@/lib/candidate-data";
import { CandidateCard } from "@/components/CandidateCard";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { InstitutionalLogos } from "@/components/BrandElements";
import { InstitutionalFooter } from "@/components/InstitutionalFooter";
import { LogOut, User, CheckCircle2 } from "lucide-react";

export default function VotePage() {
  const router = useRouter();
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voterIdentity, setVoterIdentity] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Expanded states for both candidate cards
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({
    1: false,
    2: false,
  });

  // Check voter session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!data.authenticated || data.role !== "voter") {
          router.replace("/login");
          return;
        }
        if (data.voter?.has_voted) {
          router.replace("/success?already=true");
          return;
        }
        setVoterIdentity(data.voter?.identifier || "Pemilih KIP-K");
        setPageLoading(false);
      } catch {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidateId(id);
  };

  const handleToggleCardExpand = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenConfirmation = () => {
    if (!selectedCandidateId) return;
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidateId) return;

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: selectedCandidateId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal mencatat suara.");
        setIsSubmitting(false);
        setIsModalOpen(false);
        return;
      }

      // Route to success page
      router.replace(`/success?voted=${selectedCandidateId}&time=${encodeURIComponent(data.votedAt || "")}`);
    } catch {
      alert("Terjadi kesalahan koneksi saat mengirim suara. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  const selectedCandidateObj = CANDIDATES.find((c) => c.id === selectedCandidateId) || null;

  if (pageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-canvas">
        <div className="w-10 h-10 border-3 border-brand-gold border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-serif text-sm text-brand-dark">Menyiapkan Surat Suara Resmi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-batik-subtle">
      {/* Top Bar with Voter Info & Logout */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border py-2.5 px-3 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <InstitutionalLogos />

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-brand-gold/30 text-xs font-semibold text-brand-dark">
              <User className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="truncate max-w-45">{voterIdentity}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors shrink-0"
              title="Keluar dari sesi"
            >
              <LogOut className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Ballot Section */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Header Titles & Official Sambutan Paragraphs */}
        <div className="relative text-center max-w-2xl mx-auto mb-10 space-y-3.5">
          {/* Subtle Mascot Sit in the corner of introductory box (desktop only) */}
          <div className="hidden lg:block absolute -left-28 top-4 w-28 h-28 pointer-events-none select-none z-10 drop-shadow-sm opacity-90 transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/maskot-sit.png"
              alt="Maskot Pilkadikip"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>

          {/* Subtle Mascot Stand cheering on the right (desktop only) */}
          <div className="hidden lg:block absolute -right-28 top-6 w-28 h-36 pointer-events-none select-none z-10 drop-shadow-sm opacity-90 transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/maskot-stand.png"
              alt="Maskot Pilkadikip"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-dark tracking-tight">
            Pilkadikip
          </h1>

          <p className="font-serif italic text-brand-gold font-medium text-base sm:text-lg">
            &ldquo;Lead With Integrity Grow With Energy&rdquo;
          </p>

          {/* Three Introductory Paragraphs as detailed in the client's design */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed pt-2">
            <p>
              Pemilihan Ketua Umum Bidikmisi KIP Kuliah (PILKADIKIP) merupakan kegiatan untuk mencari regenerasi Ketua Umum Formadiksi PNJ selanjutnya.
            </p>
            <p>
              Melalui kegiatan ini, diharapkan dapat terwujud regenerasi Ketua Umum yang kompeten dan berdedikasi untuk Formadiksi di periode selanjutnya.
            </p>
            <p className="font-medium text-brand-dark">
              Seluruh mahasiswa KIP Kuliah PNJ memiliki kesempatan untuk berpartisipasi aktif, dengan memberikan hak suara mereka, dalam menentukan Ketua Umum Formadiksi PNJ periode selanjutnya.
            </p>
          </div>
        </div>

        {/* 2 Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 items-start">
          {CANDIDATES.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidateId === candidate.id}
              isExpanded={!!expandedCards[candidate.id]}
              onToggleExpand={() => handleToggleCardExpand(candidate.id)}
              onSelect={handleSelectCandidate}
            />
          ))}
        </div>

        {/* Selection Indicator & Voting Button */}
        <div className="max-w-md mx-auto text-center space-y-4 pt-2">
          {selectedCandidateId ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-brand-gold text-xs font-bold text-brand-dark animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span>
                Anda memilih: <strong>Paslon {selectedCandidateId} ({selectedCandidateObj?.ketua_name})</strong>
              </span>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">
              *Silakan klik salah satu kartu calon di atas untuk menentukan pilihan suara Anda.
            </p>
          )}

          <button
            type="button"
            disabled={!selectedCandidateId}
            onClick={handleOpenConfirmation}
            className={`w-full py-4 px-6 rounded-xl font-bold font-sans text-base tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedCandidateId
                ? "bg-brand-yellow text-brand-dark hover:bg-brand-yellow-hover active:scale-[0.99] border border-brand-gold/50 ring-2 ring-brand-yellow/30"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            <span>Pilih Vote</span>
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        candidate={selectedCandidateObj}
        isLoading={isSubmitting}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVote}
      />

      <InstitutionalFooter />
    </div>
  );
}
