import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background — ships with a stylised SVG. To use a real photo instead,
          drop a file at /public/images/hero.jpg and change the URL below. */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.svg')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,248,243,0.35) 0%, rgba(250,248,243,0.55) 45%, #FAF8F3 100%)"
          }}
          aria-hidden
        />
      </div>

      <div className="container-narrow pt-24 md:pt-36 pb-24 md:pb-40">
        <Reveal>
          <p className="eyebrow">Cape Town · Western Cape</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-ocean-deep max-w-3xl">
            Tie stronger knots.
            <br />
            Fish better spots.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            A focused reference for recreational anglers on the Cape. The essential
            knots, the spots worth driving to, and the gear worth buying — without
            the clutter.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#knots" className="btn-primary">Start with knots</a>
            <a href="#spots" className="btn-ghost">Explore spots</a>
          </div>
        </Reveal>
      </div>

      <WaveDivider />
    </section>
  );
}

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="block w-full h-10 text-ocean/15"
      aria-hidden
    >
      <path
        d="M0 30 C 150 50, 300 10, 450 30 S 750 50, 900 30 1200 10 1200 30 L1200 60 L0 60 Z"
        fill="currentColor"
      />
    </svg>
  );
}
