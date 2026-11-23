import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri — Jimmy's",
  description:
    "Jimmy's Corner'dan kareler: bar, kahve, tabaklar ve gece atmosferi.",
};

/*
 * Fotoğraflar public/gallery/ (mekân) ve public/menu/ (ürün) klasörlerinde.
 * Yeni kare eklemek için listeye `img` yolu ile bir satır ekle; `img` yoksa
 * ikonlu yer tutucu görünür.
 */
type Tile = {
  label: string;
  icon: string;
  ratio: string; // aspect-ratio class
  img?: string;
  alt?: string;
};

const tiles: Tile[] = [
  {
    label: "Köşedeki tabela",
    icon: "✨",
    ratio: "aspect-[4/3]",
    img: "/gallery/dis-cephe.jpg",
    alt: "Jimmy's Corner dış cephesi — tabela, siyah tenteler ve teras",
  },
  {
    label: "Bar & salon",
    icon: "🍸",
    ratio: "aspect-[4/3]",
    img: "/gallery/salon-bar.jpg",
    alt: "Arka planda bar tezgâhı, önde deri kanepe ve masalar",
  },
  {
    label: "Self servis köşesi",
    icon: "☕",
    ratio: "aspect-[3/4]",
    img: "/gallery/self-servis.jpg",
    alt: "Self servis ve takeaway köşesi, berjer koltuk ve emaye kupalar",
  },
  {
    label: "Kırmızı duvar",
    icon: "🪑",
    ratio: "aspect-[4/3]",
    img: "/gallery/kirmizi-duvar.jpg",
    alt: "Kırmızı ve yeşil duvarlı salon, ahşap masalar ve çerçeveli posterler",
  },
  {
    label: "Emaye kupa",
    icon: "☕",
    ratio: "aspect-[4/3]",
    img: "/menu/jimmys-kupa.jpg",
    alt: "Jimmy's Coffee Corner emaye kupa",
  },
  {
    label: "Bira dolapları",
    icon: "🍺",
    ratio: "aspect-[4/5]",
    img: "/gallery/bira-dolabi.jpg",
    alt: "Mavi ışıklı bira dolapları",
  },
  {
    label: "Salon",
    icon: "🪑",
    ratio: "aspect-[4/3]",
    img: "/gallery/salon.jpg",
    alt: "Geniş salon, kırmızı kanepeler ve sarkıt lambalar",
  },
  {
    label: "Soğuk raf",
    icon: "🍺",
    ratio: "aspect-[3/4]",
    img: "/gallery/bira-sisleri.jpg",
    alt: "Dolapta sıra sıra bira şişeleri",
  },
  {
    label: "Uzun salon",
    icon: "🌙",
    ratio: "aspect-[4/3]",
    img: "/gallery/uzun-salon.jpg",
    alt: "Uzun salon boyunca masalar ve bar",
  },
  {
    label: "Yanına al",
    icon: "☕",
    ratio: "aspect-[4/3]",
    img: "/menu/jimmys-karton-bardak.jpg",
    alt: "Jimmy's Corner karton kahve bardağı",
  },
];

export default function GaleriPage() {
  return (
    <section className="relative">
      {/* Başlık */}
      <div className="relative overflow-hidden border-b border-line">
        <div
          className="glow bg-brass"
          style={{ width: 460, height: 460, top: -180, left: "50%", transform: "translateX(-50%)", opacity: 0.3 }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-14 md:pt-28 md:pb-16 text-center">
          <p className="eyebrow reveal">Galeri</p>
          <h1
            className="font-display font-light mt-5 leading-[1] reveal"
            style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)", animationDelay: "0.05s" }}
          >
            Bir akşamdan kareler
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-muted leading-relaxed reveal"
            style={{ animationDelay: "0.15s" }}
          >
            Loş ışık, buğulanan bardaklar ve masaya gelen ilk tabak. Jimmy’s’i
            en iyi anlatan an, içeri girdiğin an.
          </p>
        </div>
      </div>

      {/* Masonry galeri */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {/* Öne çıkan: Espresso videosu */}
          <figure className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-line group">
            <div className="relative aspect-[4/5]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="/Espresso.mp4" type="video/mp4" />
              </video>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(14,11,8,0.85) 100%)",
                }}
              />
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  ☕
                </span>
                <span className="font-display text-lg text-cream">
                  Tezgâhta espresso
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Yer tutucu kareler */}
          {tiles.map((t, i) => (
            <figure
              key={t.label + i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-line group bg-panel"
            >
              <div className={`relative ${t.ratio}`}>
                {t.img ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.img}
                      alt={t.alt ?? t.label}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Alt yazının okunması için koyu degrade */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 55%, rgba(14,11,8,0.8) 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        i % 3 === 1
                          ? "radial-gradient(85% 85% at 50% 30%, rgba(124,47,47,0.22), transparent 62%), var(--panel-2)"
                          : "radial-gradient(85% 85% at 50% 30%, rgba(200,153,74,0.16), transparent 62%), var(--panel-2)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="text-5xl opacity-30 transition-transform duration-500 group-hover:scale-110"
                    >
                      {t.icon}
                    </span>
                  </div>
                )}
                <figcaption
                  className={`absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] ${
                    t.img ? "text-cream" : "text-muted"
                  }`}
                >
                  {t.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
