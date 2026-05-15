export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ocean/10 mt-10">
      <div className="container-narrow py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-ink/70">
        <div>
          <p className="font-display text-ocean text-lg">Cape Angler</p>
          <p className="mt-1 text-xs">
            A reference site for recreational anglers on the Cape. No accounts.
            No tracking pixels beyond what Vercel ships.
          </p>
        </div>
        <div className="text-xs text-ink/60 md:text-right">
          <p>Fish ethically, keep what you&rsquo;ll eat.</p>
          <p className="mt-1">© {year} Cape Angler · Cape Town, South Africa.</p>
        </div>
      </div>
    </footer>
  );
}
