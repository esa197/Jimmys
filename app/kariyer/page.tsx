import type { Metadata } from "next";
import Careers from "./Careers";

export const metadata: Metadata = {
  title: "Kariyer — Jimmy's",
  description:
    "Jimmy's Corner ekibine katıl. Açık pozisyonlar, çalışma koşulları ve başvuru formu.",
};

const perks = [
  { icon: "🕐", title: "Esnek saatler", desc: "Okul ya da ikinci işe uyan vardiyalar." },
  { icon: "🎓", title: "Eğitim", desc: "Barista ve bar eğitimini işbaşında veririz." },
  { icon: "💛", title: "Bahşiş havuzu", desc: "Adil paylaşılan, şeffaf bahşiş sistemi." },
  { icon: "🍽️", title: "Ekip yemeği", desc: "Her vardiyada mutfaktan bir tabak senden." },
];

export default function KariyerPage() {
  return (
    <section className="relative">
      {/* Başlık */}
      <div className="relative overflow-hidden border-b border-line">
        <div
          className="glow bg-oxblood"
          style={{ width: 420, height: 420, top: -160, right: -60, opacity: 0.35 }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-14 md:pt-28 md:pb-16">
          <p className="eyebrow reveal">Kariyer</p>
          <h1
            className="font-display font-light mt-5 leading-[1] max-w-3xl reveal"
            style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)", animationDelay: "0.05s" }}
          >
            Barın arkasında bir yer var.
          </h1>
          <p
            className="mt-6 max-w-xl text-muted leading-relaxed reveal"
            style={{ animationDelay: "0.15s" }}
          >
            Jimmy’s küçük ve sıkı bir ekip. Kahveyi, iyi servisi ve geç saatlerin
            enerjisini seven insanlarla çalışmayı seviyoruz. Deneyim güzel ama
            şart değil — tavır daha önemli.
          </p>
        </div>
      </div>

      {/* Neden Jimmy's */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow whitespace-nowrap">Neden Jimmy’s</span>
          <span className="hairline flex-1" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="rounded-xl border border-line bg-panel p-6">
              <span className="text-3xl" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="font-display text-xl text-cream mt-4">{p.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pozisyonlar + başvuru formu (interaktif) */}
      <Careers />
    </section>
  );
}
