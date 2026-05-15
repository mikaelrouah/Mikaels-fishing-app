import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="container-narrow py-24 md:py-36 z-20">
        <Reveal>
          <p className="eyebrow drop-shadow-[0_0_8px_rgba(100,255,218,0.5)]">Cape Town · Western Cape</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-5xl md:text-8xl text-white max-w-4xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Tie stronger knots.
            <br />
            Fish better spots.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-lg text-blue-100/70">
            An immersive reference for recreational anglers on the Cape. The essential
            knots, the spots worth driving to, and the reading worth doing — without
            the clutter.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-4">
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
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-24 text-navy-deep opacity-60"
        aria-hidden
      >
        <path
          d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
