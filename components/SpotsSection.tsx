"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ShowMore from "./ShowMore";
import BestSpotToday from "./BestSpotToday";
import spots from "@/content/spots.json";

const MAP_SRC =
  "https://www.google.com/maps?q=Cape+Town+Western+Cape&ll=-33.8,19.5&z=7&output=embed";

const PREVIEW_COUNT = 4;

type Spot = {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  beginnerFriendly: boolean;
  permit: string;
  freshwater?: boolean;
  microSpots?: string[];
};

function SpotCard({ s, idx }: { s: Spot; idx: number }) {
  const [showCloseUp, setShowCloseUp] = useState(false);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&destination_place_id=${encodeURIComponent(
    s.name
  )}`;
  const closeUpEmbed = `https://maps.google.com/maps?q=${s.lat},${s.lng}&t=k&z=16&output=embed`;
  const satelliteLink = `https://www.google.com/maps/@${s.lat},${s.lng},17z/data=!3m1!1e3`;
  const accentClass = s.freshwater
    ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
    : "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";
  return (
    <Reveal delay={(idx % PREVIEW_COUNT) * 40} as="li">
      <article className="card p-6 h-full flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl text-white group-hover:text-cyan-400 transition-colors">{s.name}</h3>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${accentClass}`}>
              {s.freshwater ? "Freshwater" : s.type}
            </span>
          </div>
          {s.freshwater && (
            <p className="text-[10px] text-emerald-400/60 mt-1 uppercase tracking-widest font-bold">{s.type}</p>
          )}
          <p className="mt-4 text-sm text-blue-100/60 leading-relaxed">{s.description}</p>

          {s.microSpots && s.microSpots.length > 0 && (
            <div className="mt-5 rounded-2xl bg-white/5 border border-white/5 p-4">
              <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-3">
                Best spots within
              </p>
              <ul className="space-y-2 text-xs text-blue-100/70">
                {s.microSpots.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <dl className="mt-5 text-xs text-blue-100/40 space-y-1.5 font-medium">
            <div className="flex gap-2">
              <dt className="text-blue-100/30 uppercase tracking-widest text-[10px] font-bold">Skill level:</dt>
              <dd>{s.beginnerFriendly ? "Beginner-friendly" : "Experienced anglers"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-blue-100/30 uppercase tracking-widest text-[10px] font-bold">Permit:</dt>
              <dd className="line-clamp-1">{s.permit}</dd>
            </div>
          </dl>

          {showCloseUp && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <iframe
                title={`${s.name} satellite close-up`}
                src={closeUpEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-[260px] opacity-80"
              />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={() => setShowCloseUp((v) => !v)}
              className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              aria-expanded={showCloseUp}
            >
              {showCloseUp ? "Hide close-up" : "Satellite view"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform ${showCloseUp ? "rotate-180" : ""}`} aria-hidden>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={satelliteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-blue-100/30 hover:text-cyan-400 transition-colors"
            >
              Google Maps
            </a>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-bold uppercase tracking-widest text-white hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors"
            >
              Directions
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function SpotsSection() {
  const all = spots as Spot[];
  const saltCount = all.filter((s) => !s.freshwater).length;
  const freshCount = all.filter((s) => s.freshwater).length;
  return (
    <section id="spots" className="scroll-mt-20 py-24 md:py-36 bg-navy-mid/30 ocean-floor">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">02 — On the water</p>
          <h2 className="section-heading mt-3">
            Spots worth the drive.
          </h2>
          <p className="mt-4 max-w-2xl text-blue-100/70">
            A curated map of {saltCount} shore, rock, harbour and estuary marks plus {freshCount} freshwater dams and rivers
            around the Cape. Each card lists the best spots within that area, and you can open a satellite close-up before you drive.
          </p>
        </Reveal>

        <div className="mt-12 max-w-4xl mx-auto">
          <BestSpotToday />
        </div>

        <Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-ocean/10 shadow-card">
            <iframe
              title="Western Cape fishing spots map"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full h-[400px] md:h-[500px]"
            />
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          <ShowMore previewCount={PREVIEW_COUNT} itemLabel="spots">
            {all.map((s, i) => (
              <SpotCard key={s.id} s={s} idx={i} />
            ))}
          </ShowMore>
        </ul>
      </div>
    </section>
  );
}
