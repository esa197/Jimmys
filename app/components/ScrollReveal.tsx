"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll ile beliren bölümler.
 *
 * Sayfadaki [data-reveal] taşıyan öğeleri izler; her biri ilk kez ekranın
 * görünür alanına girdiğinde `.is-visible` eklenir ve CSS geçişi onları
 * alttan yukarı yumuşakça belirtir. Animasyon öğe başına yalnızca bir kez oynar.
 *
 * Gizli başlangıç durumu CSS'te `html.js [data-reveal]` altında tanımlıdır; bu
 * sayede JS çalışmazsa içerik olduğu gibi görünür kalır (asla gizli kalmaz).
 *
 * Sayfalar arası (client-side) geçişte layout yeniden kurulmadığından, yeni
 * sayfanın öğelerini de yakalamak için gözlemciyi `pathname` her değiştiğinde
 * yeniden kurarız.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (els.length === 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hareket azaltma tercihi veya IntersectionObserver desteği yoksa:
    // animasyonu atla, tüm öğeleri anında görünür yap.
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // bir kez belirince gözlemi bırak
          }
        }
      },
      // Öğe görünür alana girip biraz yaklaşınca tetikle.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
