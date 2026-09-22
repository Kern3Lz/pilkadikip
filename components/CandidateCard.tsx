"use client";

import React from "react";
import Image from "next/image";
import { Candidate } from "@/lib/candidate-data";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: (id: number) => void;
}

export function CandidateCard({
  candidate,
  isSelected,
  isExpanded,
  onToggleExpand,
  onSelect,
}: CandidateCardProps) {
  return (
    <div
      onClick={() => onSelect(candidate.id)}
      className={`relative cursor-pointer transition-all duration-200 rounded-2xl p-5 sm:p-6 border-2 flex flex-col justify-between select-none ${
        isSelected
          ? "bg-amber-50/50 border-brand-gold ring-2 ring-brand-yellow/50 shadow-md transform -translate-y-0.5"
          : "bg-white border-brand-border hover:border-brand-gold/60 shadow-xs hover:shadow-sm"
      }`}
    >
      {/* Top Section: Number & Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            {/* Candidate Number Circular Badge */}
            <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-dark font-bold font-serif text-2xl flex items-center justify-center shadow-xs border border-brand-gold/40">
              {candidate.candidate_number}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block leading-none mb-0.5">
                Pasangan Calon
              </span>
              <h3 className="font-serif font-bold text-lg text-brand-dark leading-tight">
                Calon {candidate.candidate_number}
              </h3>
            </div>
          </div>

          {/* Interactive Radio State Indicator */}
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected
                ? "border-brand-gold bg-brand-gold text-white"
                : "border-gray-300 bg-white"
            }`}
          >
            {isSelected && <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />}
          </div>
        </div>

        {/* Poster Image Container */}
        <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden border border-brand-border/80 bg-gray-100 mb-4 shadow-inner">
          <Image
            src={candidate.photo_url}
            alt={`Poster Pasangan Calon ${candidate.candidate_number}`}
            fill
            className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
            priority
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>

        {/* Candidate Names and Roles */}
        <div className="bg-white border border-brand-border/60 rounded-xl p-3.5 mb-4 space-y-2">
          <div>
            <div className="text-sm sm:text-base font-sans font-bold text-gray-900 leading-snug">
              {candidate.ketua_name}
            </div>
            <div className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
              {candidate.ketua_role}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-sm font-sans font-bold text-gray-800 leading-snug">
              {candidate.manager_name}
            </div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {candidate.manager_role}
            </div>
          </div>
        </div>
      </div>

      {/* Visi & Misi Section */}
      <div className="pt-2 border-t border-brand-border/60">
        {/* Toggle Button for this individual card */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-brand-dark bg-amber-50/70 hover:bg-amber-100/70 border border-brand-gold/30 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-serif">
            {isExpanded ? "Tutup Visi & Misi" : "Lihat Visi & Misi Lengkap"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-brand-gold" />
          ) : (
            <ChevronDown className="w-4 h-4 text-brand-gold" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 text-left space-y-4 p-4 rounded-xl bg-brand-canvas border border-brand-border animate-in fade-in duration-200">
            {/* Visi: Clean, no AI-slop left colored stripe */}
            <div>
              <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-brand-gold mb-1.5">
                Visi Paslon {candidate.candidate_number}
              </h5>
              <div className="bg-white p-3.5 rounded-lg border border-brand-border/70 shadow-xs">
                <p className="text-xs text-gray-800 leading-relaxed font-sans font-normal">
                  {candidate.visi}
                </p>
              </div>
            </div>

            {/* Misi */}
            <div>
              <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-brand-gold mb-2">
                Misi Paslon {candidate.candidate_number}
              </h5>
              <ul className="space-y-2 text-xs text-gray-700">
                {candidate.misi.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                    <div className="leading-relaxed">
                      {m.title && (
                        <span className="font-bold text-brand-dark mr-1.5">
                          {m.title}:
                        </span>
                      )}
                      <span>{m.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Selection bottom pill */}
        <div className="mt-4 pt-1">
          <div
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all ${
              isSelected
                ? "bg-brand-gold text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isSelected ? "✓ Paslon Pilihan Anda" : "Klik Untuk Memilih"}
          </div>
        </div>
      </div>
    </div>
  );
}
