"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

// Gulf of Saint-Tropez locality strip shown over the image band (prototype).
const LOCATION_STRIP = [
  "Saint-Tropez",
  "Ramatuelle",
  "Gassin",
  "Grimaud",
  "Port-Grimaud",
  "Sainte-Maxime",
  "Croix-Valmer",
  "Cavalaire",
  "Rayol-Canadel",
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div>
      {/* HERO — full-bleed image, small-caps subtitle */}
      <section className="relative h-[68svh] min-h-[440px] flex items-center justify-center overflow-hidden text-white on-photo">
        <Image
          src="/about/hero.jpg"
          alt="Ellington · Côte d'Azur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <h1 className="type-h1 mb-5">
            {t.aboutPage.titleBefore} {t.aboutPage.titleAccent}
          </h1>
          <p className="text-[12px] tracking-[0.2em] uppercase text-white/85">
            {t.aboutPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* EXPERT BAND (navy) — title placeholder replacing the long intro text */}
      <section className="bg-[var(--accent)] text-white py-16 md:py-20 px-6" data-reveal>
        <div className="max-w-3xl mx-auto text-center">
          <span className="block w-10 h-px bg-[var(--gold)] mx-auto mb-10" />
          <h2 className="font-serif italic text-3xl md:text-5xl leading-[1.15] mb-8">
            {t.home.expertTitle}
          </h2>
          <p className="font-serif italic text-base md:text-lg text-white/70">
            {t.aboutPage.bandSubtitle}
          </p>
        </div>
      </section>

      {/* STATS (light-blue panel) + STORY */}
      <section className="grid md:grid-cols-2">
        <div className="bg-[var(--panel)] px-6 md:px-16 py-16 md:py-24 flex items-center">
          <div className="grid grid-cols-2 gap-x-10 gap-y-14 w-full max-w-md mx-auto">
            {t.aboutPage.stats.map((s, i) => (
              <div
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <p className="font-serif text-4xl md:text-5xl mb-2">{s.value}</p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted-strong">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 md:px-16 py-16 md:py-24 flex flex-col justify-center" data-reveal>
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.12em] uppercase mb-8">
            {t.aboutPage.storyTitle}
          </h2>
          <div className="space-y-5 text-muted-strong leading-[1.85] text-[14px] max-w-xl">
            <p>{t.aboutPage.lead}</p>
            <p>{t.aboutPage.body}</p>
            <p>{t.aboutPage.body2}</p>
          </div>
        </div>
      </section>

      {/* VALUES — numbered cards, consistent grid borders */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading>{t.aboutPage.commitTitle}</SectionHeading>
          {/* Separate bordered cards WITH gaps between them (client) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {t.aboutPage.values.map((v, i) => (
              <div
                key={i}
                data-reveal
                style={{
                  "--reveal-delay": `${(i % 3) * 80}ms`,
                } as React.CSSProperties}
                className="border border-[var(--border)] p-8 md:p-10"
              >
                <span className="block text-xs tracking-[0.3em] text-[var(--gold)] mb-5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-card-title mb-3">{v.title}</h3>
                <p className="text-sm text-muted-strong leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BAND — Gulf localities */}
      <section className="relative h-[42svh] min-h-[300px] overflow-hidden">
        <Image
          src="/locations/riviera.jpg"
          alt="Golfe de Saint-Tropez"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
          <p className="max-w-4xl text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/85 leading-loose">
            {LOCATION_STRIP.join("  ·  ")}
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading>{t.aboutPage.teamEyebrow}</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
            {t.aboutPage.team.map((member) => (
              <figure key={member.name} data-reveal>
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--panel)] mb-5">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption>
                  <p className="font-serif text-xl mb-1">{member.name}</p>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--gold)] mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {member.bio}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (navy) — gold + outline buttons */}
      <section className="bg-[var(--accent)] text-white py-16 md:py-20 px-6" data-reveal>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="type-h2 text-white mb-6">
            {t.aboutPage.ctaTitleBefore} {t.aboutPage.ctaTitleAccent}
          </h2>
          <p className="font-serif italic text-base md:text-lg text-white/75 mb-10">
            {t.aboutPage.ctaBody}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/properties"
              className="px-[60px] py-4 bg-[var(--gold)] text-[var(--accent)] hover:bg-[var(--gold-hover)] text-[11px] tracking-[0.22em] uppercase transition"
            >
              {t.aboutPage.ctaPrimary}
            </Link>
            <Link
              href="/contact"
              className="px-[60px] py-4 border border-white/40 text-white hover:bg-white hover:text-[var(--accent)] text-[11px] tracking-[0.22em] uppercase transition"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Centered serif heading flanked by thin gold hairlines (prototype).
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 md:gap-8 mb-14" data-reveal>
      <span className="flex-1 h-px bg-[var(--gold)]/40" />
      <h2 className="font-serif text-2xl md:text-3xl tracking-[0.14em] uppercase text-center">
        {children}
      </h2>
      <span className="flex-1 h-px bg-[var(--gold)]/40" />
    </div>
  );
}
