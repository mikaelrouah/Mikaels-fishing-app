export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 mt-20 bg-navy-deep/80 backdrop-blur-sm">
      <div className="container-narrow py-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between text-sm text-blue-100/60">
        <div>
          <p className="font-display text-white text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Cape Angler</p>
          <p className="mt-2 text-xs max-w-sm">
            A reference site for recreational anglers on the Cape. No accounts.
            No tracking pixels beyond what Vercel ships.
          </p>
        </div>
        <div className="text-xs md:text-right">
          <p className="text-cyan-400/80 uppercase tracking-widest font-semibold">Fish ethically, keep what you&rsquo;ll eat.</p>
          <p className="mt-2">© {year} Cape Angler · Cape Town, South Africa.</p>
        </div>
      </div>
    </footer>
  );
}
