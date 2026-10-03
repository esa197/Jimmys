import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollReveal from "./components/ScrollReveal";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jimmy's — Bar & Bistro",
  description:
    "Jimmy's: şehrin merkezinde, gece geç saatlere kadar açık bar ve bistro. Küçük tabaklar, imza kokteyller ve iyi bir masa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* JS varsa <html>'e .js ekle: scroll animasyonlarının gizli başlangıç
            durumu yalnızca JS yüklüyken uygulanır (JS yoksa içerik görünür kalır).
            Body'nin ilk çocuğu olarak senkron çalışır, bölümler boyanmadan önce. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <SiteHeader />
        <main className="flex-1 relative z-10">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
