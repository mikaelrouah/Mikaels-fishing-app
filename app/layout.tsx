import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import FishCursor from "@/components/FishCursor";
import Bubbles from "@/components/Bubbles";
import Jellyfish from "@/components/Jellyfish";

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
  title: "Cape Angler — Immersive Cape Town Fishing Guide",
  description:
    "An immersive underwater guide for recreational anglers fishing the Cape. Essential knots, top spots and curated reading.",
  openGraph: {
    title: "Cape Angler",
    description:
      "Essential knots, top Cape Town fishing spots and curated reading for recreational anglers.",
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
      <body className="font-sans">
        <FishCursor />
        <Bubbles />
        <Jellyfish />
        {children}
      </body>
    </html>
  );
}
