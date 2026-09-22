import React from "react";

export function InstitutionalLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      {/* PNJ Emblem Badge */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-brand-border shadow-xs">
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#006699]" fill="currentColor">
          <circle cx="24" cy="24" r="22" fill="#E6F4FA" stroke="#006699" strokeWidth="2" />
          <path d="M24 8 L36 18 L30 38 L18 38 L12 18 Z" fill="none" stroke="#006699" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="5" fill="#FFD000" stroke="#C88A00" strokeWidth="1" />
          <path d="M20 28 Q24 34 28 28" stroke="#006699" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div className="text-left">
          <div className="text-[11px] font-bold text-gray-900 leading-tight tracking-tight">POLITEKNIK NEGERI</div>
          <div className="text-[10px] font-medium text-brand-gold tracking-widest leading-none">JAKARTA</div>
        </div>
      </div>

      <div className="h-6 w-px bg-brand-border" />

      {/* Formadiksi KIP-K Emblem Badge */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-brand-border shadow-xs">
        <div className="w-8 h-8 rounded-full bg-amber-50 border border-brand-gold flex items-center justify-center text-brand-gold font-serif font-bold text-xs">
          KIP
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-gray-900 leading-tight tracking-tight">FORMADIKSI KIP-K</div>
          <div className="text-[10px] font-medium text-brand-gold tracking-widest leading-none">PNJ 2026</div>
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
