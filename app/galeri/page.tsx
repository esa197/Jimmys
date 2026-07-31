import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri — Jimmy's",
  description:
    "Jimmy's Corner'dan kareler: bar, kahve, tabaklar ve gece atmosferi.",
};

/*
 * Gerçek fotoğraflar: public/gallery/ klasörüne koyup aşağıdaki karta
 * `img: "/gallery/dosya.jpg"` ekle. Boş kartlarda ikonlu yer tutucu görünür.
 */
type Tile = {
  label: string;
  icon: string;
  ratio: string; // aspect-ratio class
  img?: string;
};

const tiles: Tile[] = [
  { label: "Bar & ışık", icon: "🍸", ratio: "aspect-[4/5]" },
  { label: "Espresso", icon: "☕", ratio: "aspect-square" },
  { label: "Kokteyller", icon: "🍹", ratio: "aspect-[4/3]" },
  { label: "Tatlılar", icon: "🍰", ratio: "aspect-[4/5]" },
  { label: "Gece", icon: "🌙", ratio: "aspect-square" },
  { label: "Tabaklar", icon: "🍽️", ratio: "aspect-[4/3]" },
  { label: "Bira & şarap", icon: "🍺", ratio: "aspect-[4/5]" },
  { label: "Kalabalık", icon: "✨", ratio: "aspect-square" },
  { label: "Köşe", icon: "🪑", ratio: "aspect-[4/3]" },
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.img}
                    alt={t.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
                <figcaption className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                  {t.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
          Fotoğraflar yakında · Kareler <span className="text-brass">public/gallery</span> klasörüne eklenebilir
        </p>
      </div>
    </section>
  );
}
