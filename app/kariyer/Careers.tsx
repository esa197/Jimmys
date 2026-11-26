"use client";

import { useRef, useState } from "react";

const roles = [
  {
    title: "Barista",
    type: "Tam / Yarı zamanlı",
    desc: "Espresso, filtre ve imza kahvelerimizi hazırlarsın. Tezgâhın ritmini seven, detaycı biri.",
  },
  {
    title: "Bar Şefi",
    type: "Tam zamanlı",
    desc: "Kokteyl menüsünü yönetir, barı çekip çevirirsin. Deneyim ve sakin bir el aranıyor.",
  },
  {
    title: "Servis Ekibi",
    type: "Tam / Yarı zamanlı",
    desc: "Misafiri karşılar, masaları çevirirsin. Güler yüz ve tempoyla arası iyi olan.",
  },
  {
    title: "Mutfak",
    type: "Tam zamanlı",
    desc: "Tost, sandviç, pizza ve tatlı hattında çalışırsın. Temiz, hızlı ve titiz.",
  },
  {
    title: "Komi",
    type: "Yarı zamanlı",
    desc: "Ekibin sağ kolu; hazırlık ve akışın sürmesini sağlarsın. Öğrenmeye açık olana ideal.",
  },
];

const CAREERS_EMAIL = "info@jimmyscoffeecorner.com";

export default function Careers() {
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function apply(role: string) {
    setPosition(role);
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Başvuru — ${position || "Genel"}`;
    const body = [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      `Telefon: ${phone}`,
      `Pozisyon: ${position || "Belirtilmedi"}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      {/* Açık pozisyonlar */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex items-center gap-4">
          <span className="eyebrow whitespace-nowrap">Açık pozisyonlar</span>
          <span className="hairline flex-1" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-xl border border-line bg-panel p-6 transition-colors hover:border-[color:var(--line-strong)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-cream">{r.title}</h3>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brass border border-line rounded-full px-2.5 py-1 whitespace-nowrap">
                  {r.type}
                </span>
              </div>
              <p className="mt-3 text-muted leading-relaxed flex-1">{r.desc}</p>
              <button
                type="button"
                onClick={() => apply(r.title)}
                className="btn btn-ghost mt-6 self-start"
              >
                Bu pozisyona başvur
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Başvuru formu */}
      <section id="basvuru" className="border-t border-line bg-charcoal">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <div className="text-center">
            <p className="eyebrow">Başvuru</p>
            <h2
              className="font-display font-light mt-4"
              style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
            >
              Bize kendini anlat
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Formu doldur, gönder’e bas — bilgilerin e-posta uygulamanda hazır
              gelir, sen de yolla. Kısa sürede döneriz.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="field-label">
                  Ad Soyad
                </label>
                <input
                  id="name"
                  className="field"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adın ve soyadın"
                />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Telefon
                </label>
                <input
                  id="phone"
                  className="field"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xx xxx xx xx"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                className="field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
              />
            </div>

            <div>
              <label htmlFor="position" className="field-label">
                Pozisyon
              </label>
              <select
                id="position"
                className="field"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Seç…</option>
                {roles.map((r) => (
                  <option key={r.title} value={r.title}>
                    {r.title}
                  </option>
                ))}
                <option value="Genel başvuru">Genel başvuru</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="field-label">
                Kısa mesaj
              </label>
              <textarea
                id="message"
                className="field min-h-32 resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deneyimin, ne zaman başlayabileceğin, birkaç cümle…"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" className="btn btn-solid">
                Başvuruyu Gönder
              </button>
              {sent && (
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brass-bright">
                  E-posta uygulaman açıldı — göndermeyi unutma ✦
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
