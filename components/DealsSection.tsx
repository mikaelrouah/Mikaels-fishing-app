"use client";

import { useState, useMemo } from "react";
import Reveal from "./Reveal";
import dealsData from "@/content/deals.json";

const zar = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0
});

type Tier = "all" | "beginner" | "intermediate" | "pro";

const tierLabel: Record<Exclude<Tier, "all">, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  pro: "Pro"
};

const tierClass: Record<Exclude<Tier, "all">, string> = {
  beginner: "bg-kelp/15 text-kelp",
  intermediate: "bg-ocean/15 text-ocean",
  pro: "bg-coral/15 text-coral"
};

const INITIAL_VISIBLE = 6;

export default function DealsSection() {
  const { categories, lastUpdated } = dealsData;
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeTier, setActiveTier] = useState<Tier>("all");
  const [expanded, setExpanded] = useState(false);

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId) || categories[0],
    [activeCategoryId, categories]
  );

  const filteredItems = useMemo(() => {
    if (activeTier === "all") return activeCategory.items;
    return activeCategory.items.filter((item) => item.tier === activeTier);
  }, [activeCategory, activeTier]);

  const visibleItems = expanded ? filteredItems : filteredItems.slice(0, INITIAL_VISIBLE);

  return (
    <section id="deals" className="scroll-mt-20 py-20 md:py-28 bg-ocean/[0.035]">
      <div className="container-narrow">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">04 — Gear</p>
              <h2 className="section-heading mt-3">Gear worth a look.</h2>
              <p className="mt-4 max-w-2xl text-ink/75">
                Hand-picked gear from South African retailers. Switch categories and tiers to find the perfect setup for your experience level.
              </p>
            </div>
            <p className="text-xs text-ink/55">
              Last updated: {lastUpdated}
            </p>
          </div>
        </Reveal>

        {/* Category Tabs */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-paper border border-ocean/10 shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar border-b border-ocean/10 bg-ocean/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setExpanded(false);
                }}
                className={`flex-none px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategoryId === cat.id
                    ? "bg-paper text-ocean border-b-2 border-ocean"
                    : "text-ink/60 hover:text-ocean hover:bg-ocean/5"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="font-display text-2xl text-ocean-deep">
                  {activeCategory.name}
                </h3>
                <p className="text-sm text-ink/65 mt-1">{activeCategory.blurb}</p>
              </div>

              {/* Tier Filters */}
              <div className="flex flex-wrap gap-2">
                {(["all", "beginner", "intermediate", "pro"] as Tier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      setActiveTier(tier);
                      setExpanded(false);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      activeTier === tier
                        ? "bg-ocean text-paper border-ocean"
                        : "bg-paper text-ink/60 border-ocean/20 hover:border-ocean/40"
                    }`}
                  >
                    {tier === "all" ? "All Tiers" : tierLabel[tier]}
                  </button>
                ))}
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleItems.map((d, i) => {
                  const discount = Math.round(
                    ((d.originalPrice - d.salePrice) / d.originalPrice) * 100
                  );
                  const tier = d.tier as Exclude<Tier, "all">;
                  return (
                    <Reveal key={d.id} delay={i * 50}>
                      <article className="card h-full flex flex-col overflow-hidden border border-ocean/5 hover:border-ocean/20 transition-all hover:shadow-md">
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-ocean/5 to-kelp/5 grid place-items-center p-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={d.image}
                            alt={d.name}
                            loading="lazy"
                            className="h-full w-full object-contain drop-shadow-sm"
                          />
                          <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start pointer-events-none">
                            {discount > 0 ? (
                              <span className="rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold tracking-wider text-paper uppercase shadow-sm">
                                -{discount}%
                              </span>
                            ) : <div />}
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm ${tierClass[tier]}`}
                            >
                              {tierLabel[tier]}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h4 className="font-display text-lg font-bold text-ocean-deep leading-tight min-h-[3rem] line-clamp-2">
                            {d.name}
                          </h4>
                          <p className="mt-1 text-xs text-ink/65 line-clamp-1">{d.spec}</p>
                          <div className="mt-auto pt-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-coral text-lg font-semibold">
                                {zar.format(d.salePrice)}
                              </span>
                              <span className="text-xs text-ink/50 line-through">
                                {zar.format(d.originalPrice)}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-[10px] uppercase tracking-wider text-ink/50 font-medium">
                                {d.retailer}
                              </p>
                              {("priceCheckedAt" in d && (d as any).priceCheckedAt) && (
                                <p className="text-[9px] uppercase tracking-tight text-kelp/70">
                                  Checked {(d as any).priceCheckedAt}
                                </p>
                              )}
                            </div>
                            <a
                              href={`/out?to=${encodeURIComponent(d.url)}&id=${encodeURIComponent(d.id)}`}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="btn-coral mt-4 w-full text-center text-xs py-2.5"
                            >
                              View at {d.retailer}
                            </a>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ul>
            ) : (
              <div className="py-20 text-center">
                <p className="text-ink/50 italic">No items found in this tier for {activeCategory.name}.</p>
              </div>
            )}

            {filteredItems.length > INITIAL_VISIBLE && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="btn-ghost text-sm"
                  aria-expanded={expanded}
                >
                  {expanded ? "Show less" : `See all ${filteredItems.length} items`}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`ml-1 inline-block transition-transform ${expanded ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
