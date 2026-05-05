import type { Metadata } from "next";
import { Albert_Sans, Caveat, Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body / UI sans
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

// Handwritten (used in legacy paper book — kept for backward compat)
const fontCaveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

// Display face — used for every brand-title across the journey
const fontAnton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Mono — HUD, code, technical metadata
const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haseeb Hamza — Product Designer × AI Builder",
  description:
    "Portfolio of Haseeb Hamza. Product design, design systems, and AI-powered design workflows. Figma-first, vibe coded, end-to-end.",
  icons: {
    icon: "/HSBLAB_FAV.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${fontCaveat.variable} ${fontAnton.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
