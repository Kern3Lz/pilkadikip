"use client";

import React from "react";
import Image from "next/image";
import { Candidate } from "@/lib/candidate-data";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  isOpen,
  candidate,
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl border-2 border-brand-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-brand-canvas border-b border-brand-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-brand-gold">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-brand-dark">
              Konfirmasi Pilihan Suara
            </h3>
          </div>
          {!isLoading && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            Apakah Anda yakin ingin memberikan hak suara Anda kepada:
          </p>

          {/* Candidate Mini Card */}
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-brand-gold/40 flex items-center gap-3.5 text-left">
            <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-brand-gold/30">
              <Image
                src={candidate.photo_url}
                alt={candidate.ketua_name}
                fill
                className="object-cover object-center"
              />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-brand-yellow text-brand-dark font-serif font-bold text-xs mb-1">
                Pasangan Calon {candidate.candidate_number}
              </span>
              <h4 className="font-sans font-bold text-sm text-gray-900 leading-tight">
                {candidate.ketua_name}
              </h4>
              <p className="text-xs text-gray-600 font-medium">
                &amp; {candidate.manager_name}
              </p>
            </div>
          </div>

          {/* Critical Warning Note */}
          <div className="text-xs text-amber-900 bg-amber-100/70 p-3 rounded-lg border border-amber-200 text-left flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>PENTING:</strong> Pilihan Anda bersifat final dan langsung dicatat ke kotak suara anonim. Pilihan <em>tidak dapat diubah kembali</em> setelah konfirmasi.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-brand-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Periksa Kembali
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-brand-dark bg-brand-yellow hover:bg-[#E6BC00] shadow-sm transition-all flex items-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                <span>Merekam Suara...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-brand-dark stroke-[2.5]" />
                <span>Ya, Konfirmasi Suara</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
