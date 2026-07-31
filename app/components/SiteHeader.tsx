"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Menü", href: "/#menu" },
  { label: "Mekân", href: "/#mekan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kariyer", href: "/kariyer" },
  { label: "İletişim", href: "/#iletisim" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--ink)]/75 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-cream"
          onClick={() => setOpen(false)}
        >
          Jimmy<span className="text-brass">’</span>s
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted hover:text-brass-bright transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#iletisim"
            className="btn btn-solid !py-2.5 !px-4 hidden sm:inline-flex"
          >
            Rezervasyon
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-line text-cream"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menü</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="md:hidden border-t border-line bg-[color:var(--ink)]/97 backdrop-blur-md">
          <nav className="mx-auto max-w-6xl px-6 py-5 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.18em] text-cream hover:text-brass-bright transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/#iletisim"
              onClick={() => setOpen(false)}
              className="btn btn-solid mt-2 self-start"
            >
              Rezervasyon
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
