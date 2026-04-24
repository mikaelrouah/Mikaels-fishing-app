import Reveal from "./Reveal";
import dealsData from "@/content/deals.json";

const zar = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0
});

export default function DealsSection() {
  const { deals, lastUpdated } = dealsData;
  return (
    <section id="deals" className="scroll-mt-20 py-20 md:py-28 bg-ocean/[0.035]">
      <div className="container-narrow">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">04 — Gear</p>
              <h2 className="section-heading mt-3">Rod deals worth a look.</h2>
              <p className="mt-4 max-w-2xl text-ink/75">
                Five hand-picked deals from South African retailers. Curated, not
                scraped — verified before it ships.
              </p>
            </div>
            <p className="text-xs text-ink/55">
              Last updated: {lastUpdated}
            </p>
          </div>
        </Reveal>

        {/* Mobile: horizontal scroll · Desktop: 5-col grid */}
        <div className="mt-10">
          <ul className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 md:overflow-visible">
            {deals.map((d, i) => {
              const discount = Math.round(
                ((d.originalPrice - d.salePrice) / d.originalPrice) * 100
              );
              return (
                <Reveal key={d.id} as="li" delay={i * 60}>
                  <article className="card h-full min-w-[78vw] sm:min-w-[340px] md:min-w-0 snap-start flex flex-col overflow-hidden">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-ocean/5 to-kelp/10 grid place-items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={d.image}
                        alt={d.name}
                        loading="lazy"
                        className="max-h-[70%] max-w-[80%] object-contain"
                      />
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 rounded-full bg-coral px-2.5 py-1 text-[10px] font-semibold tracking-wider text-paper uppercase">
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-display text-base text-ocean leading-snug">
                        {d.name}
                      </h3>
                      <p className="mt-1 text-xs text-ink/65">{d.spec}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-coral text-lg font-semibold">
                          {zar.format(d.salePrice)}
                        </span>
                        <span className="text-xs text-ink/50 line-through">
                          {zar.format(d.originalPrice)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-ink/60">{d.retailer}</p>
                      <a
                        href={`/out?to=${encodeURIComponent(d.url)}&id=${encodeURIComponent(d.id)}`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn-coral mt-4 self-start text-xs"
                      >
                        View deal
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
