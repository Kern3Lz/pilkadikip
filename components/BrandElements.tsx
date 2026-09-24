import React from "react";
import Image from "next/image";

export function InstitutionalLogos({
  className = "",
  showTextOnMobile = false,
}: {
  className?: string;
  showTextOnMobile?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 flex-nowrap ${className}`}>
      {/* Container 3 Logo Bersanding Sejajar dalam 1 Kapsul Elegan */}
      <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 px-2.5 sm:px-3 rounded-xl bg-white border border-brand-border shadow-xs">
        {/* 1. Logo PNJ */}
        <div className="flex items-center gap-1.5 shrink-0" title="Politeknik Negeri Jakarta">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <Image
              src="/images/logo-pnj.png"
              alt="Logo PNJ"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className={`text-left ${showTextOnMobile ? "block" : "hidden sm:block"}`}>
            <div className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight tracking-tight">
              PNJ
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-brand-gold leading-none">
              Politeknik
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-brand-border/80 shrink-0" />

        {/* 2. Logo Formadiksi */}
        <div className="flex items-center gap-1.5 shrink-0" title="Formadiksi KIP-K PNJ">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <Image
              src="/images/formadiksi.png"
              alt="Logo Formadiksi KIP-K"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className={`text-left ${showTextOnMobile ? "block" : "hidden sm:block"}`}>
            <div className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight tracking-tight">
              FORMADIKSI
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-brand-gold leading-none">
              KIP Kuliah
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-brand-border/80 shrink-0" />

        {/* 3. Logo Pilkadikip */}
        <div className="flex items-center gap-1.5 shrink-0" title="Pilkadikip 2026">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <Image
              src="/images/pilkadikip.png"
              alt="Logo Pilkadikip 2026"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className={`text-left ${showTextOnMobile ? "block" : "hidden sm:block"}`}>
            <div className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight tracking-tight">
              PILKADIKIP
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-brand-gold leading-none">
              2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WayangGununganOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={`fill-none stroke-current ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
    >
      {/* Classical Gunungan silhouette */}
      <path d="M50 5 C50 5, 20 40, 15 65 C10 85, 20 105, 50 115 C80 105, 90 85, 85 65 C80 40, 50 5, 50 5 Z" />
      <path d="M50 15 C50 15, 26 44, 22 66 C18 83, 26 98, 50 107 C74 98, 82 83, 78 66 C74 44, 50 15, 50 15 Z" opacity="0.6" />
      {/* Central Tree / Kalpataru motif lines */}
      <line x1="50" y1="25" x2="50" y2="105" strokeWidth="2" />
      <path d="M50 45 Q35 55 28 65" />
      <path d="M50 45 Q65 55 72 65" />
      <path d="M50 65 Q30 75 25 88" />
      <path d="M50 65 Q70 75 75 88" />
      <circle cx="50" cy="35" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="36" cy="60" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="64" cy="60" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
