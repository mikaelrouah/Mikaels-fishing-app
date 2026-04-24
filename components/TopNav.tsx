"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#knots", label: "Knots" },
  { href: "#spots", label: "Spots" },
  { href: "#reading", label: "Reading" },
  { href: "#deals", label: "Deals" }
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "backdrop-blur bg-paper/85 border-b border-ocean/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-narrow flex h-[68px] items-center justify-between"
      >
        <a href="#top" className="flex items-center gap-2 group" aria-label="Cape Angler home">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 text-ocean"
            aria-hidden
          >
            <path
              d="M3 16c4-6 11-6 15 0 4-6 11-6 11 0-4 6-11 6-15 0-4 6-11 6-11 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="14" r="1.1" fill="currentColor" />
          </svg>
          <span className="font-display text-lg text-ocean tracking-tight">
            Cape Angler
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm text-ink/80">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-ocean transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-full border border-ocean/20 p-2 text-ocean"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ocean/10 bg-paper/95 backdrop-blur">
          <ul className="container-narrow py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-ink/90 hover:bg-ocean/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
