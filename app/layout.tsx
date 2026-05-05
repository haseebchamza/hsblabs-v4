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

// Cinematic display — used for every brand-title across the journey
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
  title: "HSB LABS — Decoding Complexity Through Spatial Design",
  description:
    "A digital laboratory by Haseeb Hamza. Architecting intuitive product systems and visual logic. Moving beyond the grid to engineer the next generation of digital utility.",
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
