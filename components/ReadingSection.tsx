import Reveal from "./Reveal";
import ShowMore from "./ShowMore";
import articles from "@/content/articles.json";

const PREVIEW_COUNT = 3;

export default function ReadingSection() {
  return (
    <section id="reading" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">03 — Useful reading</p>
          <h2 className="section-heading mt-3">Know before you cast.</h2>
          <p className="mt-4 max-w-2xl text-blue-100/70">
            Background reading on permits, species, tides and catch-and-release —
            the bits that turn a day out into a catch.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          <ShowMore previewCount={PREVIEW_COUNT} itemLabel="articles">
            {articles.map((a, i) => (
              <Reveal key={a.id} as="li" delay={(i % PREVIEW_COUNT) * 50}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-6 flex gap-5 h-full group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col sm:flex-row gap-5 h-full w-full">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden grid place-items-center backdrop-blur-sm">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${a.sourceHost}`}
                        alt=""
                        width={32}
                        height={32}
                        loading="lazy"
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                        {a.source}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-sm text-blue-100/60 leading-relaxed">{a.summary}</p>
                      <div className="mt-4 flex items-center gap-3 text-[10px] text-blue-100/40 uppercase tracking-widest font-bold">
                        <span>{a.readMinutes} min read</span>
                        <span className="w-1 h-1 rounded-full bg-blue-100/20" />
                        <span>{a.sourceHost}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </ShowMore>
        </ul>
      </div>
    </section>
  );
}
