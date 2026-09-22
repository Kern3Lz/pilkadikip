import React from "react";
import { Mail } from "lucide-react";
import { WayangGununganOrnament } from "./BrandElements";

export function InstitutionalFooter() {
  return (
    <footer className="w-full bg-[#2B180D] text-[#FAF8F5] relative overflow-hidden border-t-4 border-brand-gold mt-auto">
      {/* Background Subtle Watermark Ornaments */}
      <div className="absolute -bottom-8 -left-10 text-brand-gold opacity-15 pointer-events-none w-44 h-52">
        <WayangGununganOrnament className="w-full h-full" />
      </div>
      <div className="absolute -bottom-8 -right-10 text-brand-gold opacity-15 pointer-events-none w-44 h-52 transform scale-x-[-1]">
        <WayangGununganOrnament className="w-full h-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10 relative z-10 text-center">
        {/* Event Motto */}
        <p className="font-serif italic text-brand-yellow font-medium text-sm sm:text-base tracking-wide mb-2">
          &ldquo;Lead With Integrity Grow With Energy&rdquo;
        </p>

        <h4 className="font-sans font-bold text-base sm:text-lg text-white tracking-tight">
          Pemilihan Ketua Umum Formadiksi KIP Kuliah
        </h4>
        <p className="text-xs sm:text-sm text-gray-300 font-medium mb-6">
          Politeknik Negeri Jakarta 2026
        </p>

        {/* Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 text-xs font-medium">
          <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-brand-yellow font-bold uppercase tracking-wider text-[10px]">
            FIND US
          </div>

          <a
            href="https://instagram.com/pilkadikippnj"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 border border-white/10 text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span>@pilkadikippnj</span>
          </a>

          <a
            href="mailto:pilkadikippnj@gmail.com"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 border border-white/10 text-gray-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-brand-yellow" />
            <span>pilkadikippnj@gmail.com</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-sans">
          &copy; 2026 Panitia Pelaksana Pemilihan Ketua Umum Formadiksi KIP-K PNJ. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
