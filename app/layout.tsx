import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Cape Angler — Knots, Spots & Gear for Cape Town Fishing",
  description:
    "A focused, no-nonsense reference for recreational anglers fishing the Cape. Essential knots, top Cape Town fishing spots, curated reading and current rod deals.",
  openGraph: {
    title: "Cape Angler",
    description:
      "Essential knots, top Cape Town fishing spots, curated reading and current rod deals.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
