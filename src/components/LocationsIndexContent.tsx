"use client";

import Image from "next/image";
import { locations } from "@/lib/properties";
import { useLanguage } from "@/components/LanguageProvider";
import { VillageCard } from "@/components/VillageCard";
import { cardGridCls } from "@/components/ui/card";

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

        {/* CARDS — Figma "Village card" in "Grid 3 col" / mobile "Grid 1 col" */}
        <div className={cardGridCls}>
          {ordered.map((loc) => (
            <VillageCard
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              name={loc.name}
              tagline={isEn ? loc.taglineEn ?? loc.tagline : loc.tagline}
              image={loc.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
