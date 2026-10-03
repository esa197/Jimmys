"use client";

import { useState } from "react";
import CoffeePourScene from "./components/CoffeePourScene";

/* ----------------------------- İçerik (yer tutucu) ----------------------------- */

/*
 * Ürün görselleri: her ürüne `img: "/menu/dosya.jpg"` ekleyebilirsin.
 * Görseli public/menu/ klasörüne koyup yolu yazman yeterli; boş bırakılan
 * ürünlerde kategori ikonlu şık bir yer tutucu gösterilir.
 */
type Item = { name: string; note?: string; img?: string };
type Group = { sub?: string; items: Item[] };
type Category = { key: string; icon: string; adult?: boolean; groups: Group[] };

const categories: Category[] = [
  {
    key: "Sıcak Kahveler",
    icon: "☕",
    groups: [
      {
        items: [
          { name: "Espresso & Doppio" },
          { name: "Türk Kahvesi" },
          { name: "Filtre Kahve" },
          { name: "Americano" },
          { name: "Latte / Flat White / Cappuccino" },
          { name: "Chai Tea Latte / Sahlep" },
          { name: "Caramel Macchiato" },
          { name: "Mocha / White Chocolate Mocha" },
          { name: "Caramel Dream" },
          { name: "Berry White Mocha" },
        ],
      },
    ],
  },
  {
    key: "Soğuk Kahveler",
    icon: "🧊",
    groups: [
      {
        items: [
          { name: "Ice Americano" },
          { name: "Ice Latte / Cappuccino" },
          { name: "Frappe" },
          { name: "Cool Lime / Berry Hibiscus" },
          { name: "Frappeccino Caramel" },
          { name: "Strawberry Cake Mocha" },
        ],
      },
    ],
  },
  {
    key: "Milkshake & Smoothie",
    icon: "🥤",
    groups: [
      {
        sub: "Milkshake",
        items: [
          { name: "Cocostar" },
          { name: "Çilek" },
          { name: "Çikolata" },
          { name: "Oreo" },
          { name: "Caramella", note: "İtalyan karamel" },
        ],
      },
      {
        sub: "Smoothie",
        items: [
          { name: "Muz & Çilek" },
          { name: "Mango & Portakal" },
          { name: "Orman Meyveli" },
        ],
      },
      {
        sub: "Frozen",
        items: [
          { name: "Karpuz & Çilek" },
          { name: "Nane & Limon" },
          { name: "Orman Meyveli" },
          { name: "Limonata" },
          { name: "Churchill" },
        ],
      },
    ],
  },
  {
    key: "Yiyecekler",
    icon: "🥪",
    groups: [
      {
        sub: "Tost",
        items: [
          { name: "Üç Peynirli" },
          { name: "Dana Jambonlu" },
          { name: "Ayvalık" },
        ],
      },
      {
        sub: "Bagel",
        items: [{ name: "Üç Peynirli" }, { name: "Dana Jambonlu" }],
      },
      {
        sub: "Sandviç",
        items: [
          { name: "Hindi Füme" },
          { name: "Dana Jambonlu" },
          { name: "Tavuklu" },
        ],
      },
      {
        sub: "Pizza",
        items: [
          { name: "Margarita" },
          { name: "Üç Peynirli" },
          { name: "Karışık" },
        ],
      },
      {
        sub: "Hotdog & Atıştırmalık",
        items: [
          { name: "Hotdog Cheddar" },
          { name: "Hotdog Cheddar + Cola" },
          { name: "Patates Kızartma" },
          { name: "Patates + Çıtır Tavuk" },
        ],
      },
    ],
  },
  {
    key: "Tatlılar",
    icon: "🍰",
    groups: [
      {
        sub: "Cheesecake",
        items: [
          { name: "Oreo" },
          { name: "Limon" },
          { name: "Orman Meyveli" },
          { name: "San Sebastian" },
        ],
      },
      {
        sub: "Pastalar",
        items: [
          { name: "Devil's" },
          { name: "Marlenka" },
          { name: "Snickers" },
          { name: "Brownie" },
          { name: "Latte Pasta" },
          { name: "Tiramisu" },
          { name: "Krokanlı Pasta" },
          { name: "Bella Vista" },
        ],
      },
    ],
  },
  {
    key: "Kokteyller",
    icon: "🍸",
    adult: true,
    groups: [
      {
        items: [
          { name: "Irish Coffee" },
          { name: "Espresso Martini" },
          { name: "Gin & Tonic" },
          { name: "Cuba Libre" },
          { name: "Vodka & Redbull" },
          { name: "Mojito" },
          { name: "Tequila Fresh" },
          { name: "Lynchburg Lemonade" },
          { name: "Long Island" },
        ],
      },
    ],
  },
  {
    key: "Bira",
    icon: "🍺",
    adult: true,
    groups: [
      {
        sub: "33 cl",
        items: [
          { name: "Bistro Lager / Pilsner" },
          { name: "Miller / Beck's / Bud" },
          { name: "Erdinger / Hoegarden" },
          { name: "Corona / Budweiser" },
          { name: "Heineken Kutu" },
          { name: "Duvel" },
        ],
      },
      {
        sub: "50 cl",
        items: [
          { name: "Efes / Malt / Özel Seri" },
          { name: "Bomonti" },
          { name: "Belfast" },
          { name: "Beck's / Bud" },
          { name: "Amsterdam" },
          { name: "Guinness" },
        ],
      },
    ],
  },
  {
    key: "Likör & Shot",
    icon: "🥃",
    adult: true,
    groups: [
      {
        sub: "Likör & Viski",
        items: [
          { name: "Kahlua" },
          { name: "Baileys" },
          { name: "Captain Morgan" },
          { name: "Red Label" },
          { name: "Famous Grouse" },
          { name: "Jameson" },
          { name: "Jack Daniel's" },
          { name: "Black Label" },
          { name: "Chivas Regal" },
        ],
      },
      {
        sub: "Şarap",
        items: [{ name: "Red / White / Rosé" }],
      },
      {
        sub: "Shot",
        items: [
          { name: "Kahlua" },
          { name: "Vodka / Rom" },
          { name: "Tequila" },
          { name: "Jägermeister / Jack / Chivas" },
        ],
      },
    ],
  },
  {
    key: "Çaylar",
    icon: "🍵",
    groups: [
      {
        sub: "Bitki Çayları",
        items: [
          { name: "Siyah Çay" },
          { name: "Bourbon Vanilla" },
          { name: "Feel Cool" },
          { name: "Red Forest" },
          { name: "Green Tea Jasmin" },
          { name: "Cold Play" },
        ],
      },
      {
        sub: "Soğuk Çaylar",
        items: [
          { name: "Mango" },
          { name: "Bubblegum" },
          { name: "Orange" },
        ],
      },
    ],
  },
  {
    key: "Meşrubat",
    icon: "🧃",
    groups: [
      {
        items: [
          { name: "Su", note: "pet şişe" },
          { name: "Su", note: "cam şişe" },
          { name: "Soda Premium" },
          { name: "Cola" },
          { name: "Sprite" },
          { name: "Redbull" },
        ],
      },
    ],
  },
];

const hours = [
  { day: "Pazartesi – Perşembe", time: "17:00 – 01:00" },
  { day: "Cuma – Cumartesi", time: "17:00 – 03:00" },
  { day: "Pazar", time: "16:00 – 24:00" },
];

const ticker = [
  "Bu akşam · Canlı caz 21:00",
  "Mutfak gece yarısına kadar açık",
  "Bar 01:00'e kadar",
  "Taze kavrulmuş kahve, her gün",
];

/* Her kategoriye tıklandığında butonun üstünde beliren efekt türü */
type FxType = "steam" | "bubble" | "frost" | "sparkle";

const fxByKey: Record<string, FxType> = {
  "Sıcak Kahveler": "steam",
  "Soğuk Kahveler": "frost",
  "Milkshake & Smoothie": "bubble",
  Yiyecekler: "sparkle",
  Tatlılar: "sparkle",
  Kokteyller: "sparkle",
  Bira: "bubble",
  "Likör & Shot": "sparkle",
  Çaylar: "steam",
  Meşrubat: "bubble",
};

function Fx({ type }: { type: FxType }) {
  const count = type === "steam" ? 5 : 8;
  return (
    <span
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`fx fx-${type}`}
          style={{
            left: `${10 + (i * 80) / (count - 1)}%`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </span>
  );
}

/* --------------------------------- Sayfa --------------------------------- */

export default function Home() {
  const [active, setActive] = useState(categories[0].key);
  const [burst, setBurst] = useState(0);
  const current = categories.find((c) => c.key === active) ?? categories[0];

  return (
    <div className="relative z-10">
      {/* ---------------- Açılış: kaydırmalı buz → kahve sahnesi ---------------- */}
      <CoffeePourScene />

      {/* ---------------- Ticker ---------------- */}
      <div className="overflow-hidden border-b border-line bg-charcoal">
        <div className="marquee-track py-2.5">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted px-6"
            >
              {t}
              <span className="text-brass ml-6">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- Hero ---------------- */}
      <section id="top" className="relative overflow-hidden">
        {/* Arka plan videosu — public/Espresso.mp4 */}
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
        {/* Okunabilirlik için koyu degrade katman */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,11,8,0.72) 0%, rgba(14,11,8,0.55) 45%, rgba(14,11,8,0.92) 100%)",
          }}
        />
        <div className="glow bg-brass" style={{ width: 520, height: 520, top: -140, left: "50%", transform: "translateX(-50%)", opacity: 0.32 }} />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-32 md:pt-44 md:pb-44 text-center">
          <p className="eyebrow reveal">Bar &amp; Bistro · Kuruluş MMXXIV</p>

          <h1
            className="mt-8 flex justify-center reveal"
            style={{ animationDelay: "0.05s" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/JLogo.png"
              alt="Jimmy's Corner"
              className="logo-mark h-auto w-[min(88vw,620px)]"
            />
          </h1>

          <p
            className="mx-auto mt-8 max-w-xl text-lg md:text-xl text-muted leading-relaxed reveal"
            style={{ animationDelay: "0.15s" }}
          >
            Loş ışık, düzgün bir içki ve acele etmeyen bir mutfak. Şehrin
            merkezinde, gece geç saatlere kadar açık bir köşe.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 reveal"
            style={{ animationDelay: "0.25s" }}
          >
            <a href="#menu" className="btn btn-solid">
              Menüyü Gör
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Hakkında / Ev ---------------- */}
      <section id="mekan" className="relative border-t border-line bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div data-reveal>
            <p className="eyebrow">Ev</p>
            <h2
              className="font-display font-light mt-4 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              Gürültünün dindiği, sohbetin başladığı yer.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Jimmy’s, eski bir baskı atölyesinin tuğla duvarları arasında
              kuruldu. Mumlar, pirinç detaylar ve tek bir uzun mermer bar.
              Menümüz kısadır çünkü her tabağı gerçekten seviyoruz —
              malzemeler mevsime göre, kokteyller keyfe göre değişir.
            </p>

            <div className="mt-10 space-y-4">
              {[
                ["Mutfak", "Mevsimlik · küçük tabaklar"],
                ["Bar", "İmza kokteyller & doğal şaraplar"],
                ["Atmosfer", "Loş, sıcak, telaşsız"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-brass w-28 shrink-0">
                    {k}
                  </span>
                  <span className="leader" />
                  <span className="text-cream">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mekân görseli */}
          <div
            data-reveal
            style={{ transitionDelay: "0.12s" }}
            className="relative aspect-[4/5] rounded-sm border border-line overflow-hidden bg-panel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ic-mekan.jpeg"
              alt="Jimmy's Corner iç mekân — ahşap masalar, kırmızı sandalyeler ve sıcak ışık"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
        </div>
      </section>

      {/* ---------------- Menü (imza bölüm) ---------------- */}
      <section id="menu" className="relative border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div data-reveal className="text-center">
            <p className="eyebrow">JImmy’s Corner</p>
            <h2
              className="font-display font-light mt-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)" }}
            >
              Menü
            </h2>
          </div>

          {/* Sekmeler */}
          <div
            role="tablist"
            aria-label="Menü kategorileri"
            data-reveal
            style={{ transitionDelay: "0.1s" }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => {
                  setActive(c.key);
                  setBurst((b) => b + 1);
                }}
                className={`btn relative overflow-visible ${
                  active === c.key ? "btn-solid" : "btn-ghost"
                } !px-4 !py-2.5`}
              >
                {active === c.key && <Fx key={burst} type={fxByKey[c.key]} />}
                <span aria-hidden="true" className="mr-1.5 opacity-80">
                  {c.icon}
                </span>
                {c.key}
              </button>
            ))}
          </div>

          {/* Aktif kategori başlığı */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              {current.icon}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-cream">
              {current.key}
            </h3>
            {current.adult && (
              <span className="font-mono text-[0.62rem] font-semibold text-oxblood border border-[color:var(--oxblood)] rounded-full px-2 py-0.5 tracking-wider">
                18+
              </span>
            )}
          </div>

          {/* Gruplar + görselli ürün kartları */}
          <div className="mt-10 space-y-12">
            {current.groups.map((g, gi) => (
              <div key={g.sub ?? gi}>
                {g.sub && (
                  <div className="mb-5 flex items-center gap-4">
                    <span className="eyebrow whitespace-nowrap">{g.sub}</span>
                    <span className="hairline flex-1" />
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {g.items.map((item, ii) => (
                    <figure
                      key={item.name + ii}
                      className="group overflow-hidden rounded-lg border border-line bg-panel transition-colors hover:border-[color:var(--line-strong)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {item.img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.img}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background:
                                "radial-gradient(90% 90% at 50% 25%, rgba(200,153,74,0.14), transparent 62%), var(--panel-2)",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="text-4xl opacity-35 transition-transform duration-500 group-hover:scale-110"
                            >
                              {current.icon}
                            </span>
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                      </div>
                      <figcaption className="px-3.5 py-3">
                        <p className="font-display text-[0.98rem] leading-tight text-cream">
                          {item.name}
                        </p>
                        {item.note && (
                          <p className="mt-1 text-xs text-muted">{item.note}</p>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            Ekstralar: Sos Şurup · Krema · Shot Espresso · Menü mevsime göre değişebilir
          </p>
        </div>
      </section>

      {/* ---------------- Saatler & Konum ---------------- */}
      <section id="saatler" className="relative border-t border-line bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14">
          <div data-reveal>
            <p className="eyebrow">Saatler</p>
            <h2
              className="font-display font-light mt-4"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)" }}
            >
              Ne zaman uğrayabilirsin
            </h2>
            <div className="mt-8 space-y-4">
              {hours.map((h) => (
                <div key={h.day} className="flex items-baseline">
                  <span className="text-cream">{h.day}</span>
                  <span className="leader" />
                  <span className="font-mono text-brass-bright tabular-nums">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal style={{ transitionDelay: "0.12s" }}>
            <p className="eyebrow">Konum</p>
            <h2
              className="font-display font-light mt-4"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)" }}
            >
              Bizi bul
            </h2>
            <address className="mt-8 not-italic text-muted leading-relaxed">
              [ Sokak adı ve numara ]
              <br />
              [ Mahalle, İlçe / Şehir ]
              <br />
              <a href="tel:+900000000000" className="text-cream hover:text-brass-bright transition-colors">
                +90 (000) 000 00 00
              </a>
            </address>
            <div className="mt-6 h-40 rounded-sm border border-line bg-panel flex items-center justify-center">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted">
                [ harita yer tutucu ]
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- İletişim ---------------- */}
      <section id="iletisim" className="relative border-t border-line overflow-hidden">
        <div className="glow bg-brass" style={{ width: 420, height: 420, top: -160, left: "50%", transform: "translateX(-50%)", opacity: 0.35 }} />
        <div
          data-reveal
          className="relative mx-auto max-w-3xl px-6 py-24 md:py-32 text-center"
        >
          <p className="eyebrow">İletişim</p>
          <h2
            className="font-display font-light mt-5 leading-[1.02]"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            Bize bir merhaba de.
          </h2>
          <p className="mt-6 text-muted max-w-md mx-auto leading-relaxed">
            Soru, öneri ya da sadece bir kahve sohbeti — kapımız da telefonumuz
            da açık. En hızlısı Instagram’dan yazmak.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+900000000000" className="btn btn-solid">
              Bizi Ara
            </a>
            <a href="mailto:merhaba@jimmys.example" className="btn btn-ghost">
              E-posta Gönder
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
