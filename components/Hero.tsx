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
              "linear-gradient(180deg, rgba(5,25,35,0.4) 0%, rgba(5,25,35,0.7) 45%, #051923 100%)"
          }}
          aria-hidden
        />
      </div>

      <div className="container-narrow pt-24 md:pt-36 pb-24 md:pb-40 floating">
        <Reveal>
          <p className="eyebrow">Cape Town · Western Cape</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-white max-w-3xl">
            Tie stronger knots.
            <br />
            Fish better spots.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            An immersive reference for recreational anglers on the Cape. The essential
            knots, the spots worth driving to, and the reading worth doing — without
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
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-16 text-cyan-900/40"
        aria-hidden
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,117.26,128.36,123.63,192,112.33,252.73,101.52,284.28,70.52,321.39,56.44Z"
          fill="currentColor"
          className="animate-[wave-float_10s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  );
}
