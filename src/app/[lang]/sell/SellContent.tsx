"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/components/LanguageProvider";

export default function SellPage() {
  const { t, lang } = useLanguage();
  const methodEyebrow =
    lang === "en" ? "Our method" : lang === "nl" ? "Onze methode" : "Notre méthode";
  return (
    <div className="bg-white">
      {/* HERO — full-bleed image, transparent nav overlays at top */}
      <section className="relative h-[60svh] min-h-[400px] flex items-center justify-center overflow-hidden text-white on-photo">
        <Image
          src="/sell/hero.jpg"
          alt="Villa de prestige sur la Côte d'Azur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55 z-10" />
        <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
          <h1 className="type-h1 mb-6">
            {t.sellPage.titleBefore} {t.sellPage.titleAccent}
          </h1>
          <p className="type-subtitle mb-10">
            {t.sellPage.lead}
          </p>
          <Link
            href="/contact?subject=valuation"
            className="inline-block px-8 py-3 border border-white/70 hover:border-white hover:bg-white/10 text-[11px] tracking-[0.22em] uppercase transition text-white"
          >
            {t.sellPage.cta}
          </Link>
        </div>
      </section>

      {/* WHY ELLINGTON — bordered card (unchanged) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24">
        <section
          className="border border-[var(--border)] bg-[var(--background)] px-8 md:px-14 py-12 md:py-16"
          data-reveal
        >
          <h2 className="type-h2 mb-8">{t.sellPage.whyTitle}</h2>
          <div className="space-y-5 text-muted leading-[1.85]">
            <p>{t.sellPage.whyBody1}</p>
            <p>{t.sellPage.whyBody2}</p>
            <p>{t.sellPage.whyBody3}</p>
            <p>{t.sellPage.whyBody4}</p>
          </div>
        </section>
      </div>

      {/* OUR SELLING PROCESS — light-blue band, white bordered cards (prototype) */}
      <section className="bg-[var(--panel)] mt-24 py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <p
            className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold)] mb-4"
            data-reveal
          >
            {methodEyebrow}
          </p>
          <h2 className="type-h2 mb-12" data-reveal>
            {t.sellPage.processTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sellPage.steps.map((step, i) => (
              <div
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                className="bg-white border border-[var(--border)] p-8 md:p-10"
              >
                <span className="block font-serif text-3xl text-[var(--gold)] mb-5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-card-title mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-strong leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CLIENTS TRUST US — bordered icon cards (prototype) */}
      <section className="py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="type-h2 mb-12 text-center" data-reveal>
            {t.sellPage.trustTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.sellPage.trustCards.map((card, i) => (
              <div
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
                className="border border-[var(--border)] p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-white mb-5">
                  <TrustIcon index={i} />
                </div>
                <h3 className="type-card-title mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-strong leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-bleed navy band, gold button (prototype) */}
      <section className="bg-[var(--accent)] text-white py-16 md:py-20 px-6" data-reveal>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="type-h2 text-white mb-6">{t.sellPage.ctaTitle}</h2>
          <p className="text-white/75 max-w-2xl mx-auto mb-10">
            {t.sellPage.ctaSubtitle}
          </p>
          <Link
            href="/contact?subject=valuation"
            className="inline-block px-[60px] py-4 bg-[var(--gold)] text-[var(--accent)] hover:bg-[var(--gold-hover)] text-[11px] tracking-[0.22em] uppercase transition"
          >
            {t.sellPage.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}

// 4 icons matching the i18n trustCards order:
// 0 Discretion · 1 International network · 2 Dedicated support · 3 Tailored approach
function TrustIcon({ index }: { index: number }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (index) {
    case 0: // Discretion — shield
      return (
        <svg {...common}>
          <path d="M12 3l8 3v5c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
        </svg>
      );
    case 1: // International network — globe
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
    case 2: // Dedicated support — headphones
      return (
        <svg {...common}>
          <path d="M4 14v-2a8 8 0 0116 0v2" />
          <path d="M4 14h3v6H5a1 1 0 01-1-1v-5zM20 14h-3v6h2a1 1 0 001-1v-5z" />
        </svg>
      );
    case 3: // Tailored approach — target
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
