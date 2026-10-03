"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll ile sürülen (scroll-scrubbed) açılış sahnesi.
 *
 * Solda buz küpü; kullanıcı aşağı kaydırdıkça yukarıdan sıcak kahve dökülür,
 * buzun üstünde birikir ve sahne Jimmy's Corner bardağına dönüşür. Sağdaki
 * yazı da soğuk → sıcak olarak değişir.
 *
 * İlerleme (0→1), pinlenmiş (sticky) sahnenin kendi scroll "ray"ı içinde ne
 * kadar ilerlediğinden hesaplanır ve türetilmiş değerler CSS değişkeni olarak
 * sahneye yazılır; tüm görsel koreografi CSS'te bu değişkenlerle çalışır.
 */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** a'dan önce 0, b'den sonra 1; arada doğrusal. */
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
/** smoothstep — uçları yumuşatır. */
const ease = (x: number) => x * x * (3 - 2 * x);

export default function CoffeePourScene() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const setVars = (p: number) => {
      const s = stage.style;
      s.setProperty("--p", p.toFixed(4));

      // Akış: büyür (0.06→0.40), rivuletler oturduktan sonra geç söner (0.72→0.88).
      const grow = ease(range(p, 0.06, 0.4));
      const stop = ease(range(p, 0.72, 0.88));
      s.setProperty("--pour", grow.toFixed(4)); // akış uzunluğu
      s.setProperty("--streamOn", (grow * (1 - stop)).toFixed(4)); // akışın görünürlüğü

      // Kahvenin buzda izlediği yol: üstte havuz → yüzlerden dereler → tabanda birikinti.
      s.setProperty(
        "--splash",
        (ease(range(p, 0.12, 0.5)) * (1 - stop)).toFixed(4),
      ); // çarpma sıçraması
      s.setProperty("--pool", ease(range(p, 0.12, 0.5)).toFixed(4)); // üst yüzeydeki havuz + çukur
      s.setProperty("--run", ease(range(p, 0.22, 0.72)).toFixed(4)); // yüzlerden aşağı süzülen dereler
      s.setProperty("--puddle", ease(range(p, 0.42, 0.82)).toFixed(4)); // tabanda biriken birikinti
      s.setProperty("--stain", ease(range(p, 0.18, 0.74)).toFixed(4)); // buzun kehribara boyanması

      s.setProperty("--ice", (1 - ease(range(p, 0.8, 0.96))).toFixed(4)); // buz görünürlüğü
      s.setProperty("--cup", ease(range(p, 0.82, 0.99)).toFixed(4)); // bardak görünürlüğü
      s.setProperty("--steam", ease(range(p, 0.9, 1)).toFixed(4)); // buhar
      // Net devir-teslim: A tamamen gidince B gelir (üst üste binmez).
      s.setProperty("--tA", (1 - ease(range(p, 0.3, 0.45))).toFixed(4)); // soğuk yazı
      s.setProperty("--tB", ease(range(p, 0.47, 0.62)).toFixed(4)); // sıcak yazı
      s.setProperty("--warm", ease(range(p, 0.2, 0.85)).toFixed(4)); // ortam ısısı
      s.setProperty("--hint", (1 - range(p, 0.02, 0.1)).toFixed(4)); // "kaydır" ipucu
      // Görünen yazıya göre tıklanabilirlik (CTA yalnızca sıcak sahnede aktif).
      stage.classList.toggle("show-b", p > 0.52);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      track.classList.add("is-reduced");
      setVars(1); // hareket azaltma: doğrudan final (bardak + sıcak yazı)
      return;
    }

    // Ray yüksekliğini JS verir: JS yoksa sahne tek ekranlık sade bir hero kalır.
    track.style.height = "360vh";

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;
      setVars(p);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="pour-track"
      aria-label="Jimmy's Corner — buzdan sıcak kahveye"
    >
      <div ref={stageRef} className="pour-stage">
        {/* Ortam ışığı: soğuk → sıcak */}
        <div className="pour-glow pour-glow-cold" aria-hidden="true" />
        <div className="pour-glow pour-glow-warm" aria-hidden="true" />

        <div className="pour-inner">
          {/* ── SOL: görsel sahne ── */}
          <div className="pour-visual" aria-hidden="true">
            <div className="pour-box">
              {/* Buz + üstüne/yüzlerine yayılan kahve (hepsi buzla birlikte solar) */}
              <div className="pour-ice">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hero/ice-cube.png" alt="" className="pour-img" />
                {/* Buzun kehribara boyanması */}
                <div className="pour-stain" />
                {/* Üst yüzeyde biriken havuz + çarpma çukuru */}
                <div className="pour-pool" />
                {/* Yüzlerden aşağı süzülen dereler — kavisli SVG, kaydırmayla çizilir */}
                <svg
                  className="pour-rivs"
                  viewBox="0 0 300 400"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="rivGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#190d06" />
                      <stop offset="0.5" stopColor="#3f2411" />
                      <stop offset="1" stopColor="#5c3820" />
                    </linearGradient>
                  </defs>
                  {/* Kahve gövdeleri */}
                  <g
                    fill="none"
                    stroke="url(#rivGrad)"
                    strokeLinecap="round"
                  >
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={11}
                      d="M150,166 C150,210 143,250 150,302"
                    />
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={8}
                      d="M116,172 C104,210 108,252 97,288"
                    />
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={9}
                      d="M184,170 C196,206 198,250 206,286"
                    />
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={5}
                      d="M223,178 C232,210 232,246 236,272"
                    />
                  </g>
                  {/* Parlama çizgileri */}
                  <g
                    fill="none"
                    stroke="rgba(240,216,186,0.5)"
                    strokeLinecap="round"
                  >
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={2}
                      d="M150,166 C150,210 143,250 150,302"
                    />
                    <path
                      className="riv-p"
                      pathLength={1}
                      strokeWidth={1.5}
                      d="M184,170 C196,206 198,250 206,286"
                    />
                  </g>
                </svg>
                {/* Tabanda biriken birikinti */}
                <div className="pour-puddle" />
              </div>

              {/* Bardak (cross-dissolve ile belirir) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/jimmys-cup.png" alt="" className="pour-img pour-cup" />

              {/* Bardaktan yükselen buhar */}
              <div className="pour-steam">
                <span />
                <span />
                <span />
              </div>

              {/* Yukarıdan dökülen kahve akışı */}
              <div className="pour-stream">
                <i />
              </div>

              {/* Çarpma sıçraması + savrulan damlalar */}
              <div className="pour-splash" />
              <div className="pour-drops">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          {/* ── SAĞ: yazı (soğuk → sıcak) ── */}
          <div className="pour-copy">
            <div className="pour-text pour-text-a">
              <p className="eyebrow pour-eyebrow-cold">Kristal berraklığında</p>
              <h1 className="pour-title">
                Her şey
                <br />
                <span className="italic">buzla</span> başlar.
              </h1>
              <p className="pour-sub">
                Saf, berrak, soğuk. Bir bardağın hikâyesi tam burada — sıfır
                noktasında — başlar.
              </p>
            </div>

            <div className="pour-text pour-text-b">
              <p className="eyebrow">A Cup of Good Company</p>
              <p className="pour-title">
                Sıcak bir
                <br />
                <span className="italic">kahveyle</span> ısınır.
              </p>
              <p className="pour-sub">
                Kaydırdın, kahven çoktan döküldü. Jimmy&apos;s Corner — iyi bir
                köşe, sıcak bir eşlik.
              </p>
              <a href="#menu" className="btn btn-solid pour-cta">
                Menüyü Gör
              </a>
            </div>
          </div>
        </div>

        {/* Kaydırma ipucu */}
        <div className="pour-hint" aria-hidden="true">
          <span>kaydır</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <path
              d="M7 1v16M1 12l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
