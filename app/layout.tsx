import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pilkadikip PNJ 2026 - Lead With Integrity Grow With Energy",
  description: "Platform Resmi Pemungutan Suara E-Voting Pemilihan Ketua Umum Formadiksi KIP Kuliah Politeknik Negeri Jakarta 2026",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#2B180D] selection:bg-[#FFD000] selection:text-[#2B180D]">
        {children}
      </body>
    </html>
  );
}
