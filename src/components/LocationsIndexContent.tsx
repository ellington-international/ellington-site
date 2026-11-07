"use client";

import Image from "next/image";
import Link from "next/link";
import { locations } from "@/lib/properties";
import { useLanguage } from "@/components/LanguageProvider";

// Card display order (Figma).
const ORDER = [
  "saint-tropez",
  "ramatuelle",
  "gassin",
  "grimaud",
  "port-grimaud",
  "sainte-maxime",
  "la-croix-valmer",
  "cavalaire-sur-mer",
  "rayol-canadel",
];

export function LocationsIndexContent() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const ordered = ORDER.map((slug) =>
    locations.find((l) => l.slug === slug),
  ).filter((l): l is (typeof locations)[number] => Boolean(l));

  return (
    <div>
      {/* HERO — full-bleed image */}
      <section className="relative h-[60svh] min-h-[420px] flex items-center justify-center overflow-hidden text-white on-photo">
        <Image
          src="/locations/hero.jpg"
          alt="Saint-Tropez"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center max-w-3xl mx-auto px-6">
          <h1 className="type-h1 mb-6">
            {t.locationsPage.titleBefore} {t.locationsPage.titleAccent}
          </h1>
          <p className="type-subtitle">
            {t.locationsPage.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-20">
        {/* INTRO — title placeholder instead of the long text (client) */}
        <div className="text-center max-w-3xl mx-auto mb-20" data-reveal>
          <p className="type-eyebrow mb-5">{t.locationsPage.eyebrow}</p>
          <h2 className="type-h2">
            {t.locationsPage.titleBefore} {t.locationsPage.titleAccent}
          </h2>
        </div>

        {/* MAP — Gulf of Saint-Tropez */}
        <div className="mb-20">
          <Image
            src="/locations/golfe-map.png"
            alt="Golfe de Saint-Tropez"
            width={1536}
            height={1024}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        {/* CARDS GRID — name + italic tagline overlaid bottom-left on image (maquette) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ordered.map((loc) => {
            const tagline = isEn ? loc.taglineEn ?? loc.tagline : loc.tagline;
            return (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                data-reveal
                className="group relative block aspect-[2/1] overflow-hidden border border-[var(--border)] hover:border-[var(--border-strong)] transition"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                {/* Bottom gradient so the white text stays legible over any photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition group-hover:from-black/80" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h2 className="font-sans font-bold uppercase tracking-[0.14em] text-base md:text-lg text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    {loc.name}
                  </h2>
                  {tagline && (
                    <p className="mt-1.5 font-serif italic text-sm md:text-[15px] text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                      {tagline}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
