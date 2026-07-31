import Link from "next/link";

const footerNav = [
  { label: "Menü", href: "/#menu" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kariyer", href: "/kariyer" },
  { label: "İletişim", href: "/#iletisim" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="font-display text-lg text-cream">
          Jimmy<span className="text-brass">’</span>s
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted hover:text-brass-bright transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted text-center">
          © MMXXIV Jimmy’s Corner
        </p>
      </div>
    </footer>
  );
}
