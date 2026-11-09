"use client";

import { PageHero } from "./PageHero";
import { locations, villageTagline } from "@/lib/properties";
import { useLanguage } from "@/components/LanguageProvider";
import { VillageCard } from "@/components/VillageCard";
import { cardGridCls } from "@/components/ui/card";

// Figma "05 Locations — Desktop" (11:1405) / "— Mobile" (11:1534).
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
  const ordered = ORDER.map((slug) => locations.find((l) => l.slug === slug)).filter(
    (l): l is (typeof locations)[number] => Boolean(l),
  );

  return (
    <>
      {/* HERO (11:1406): view over the Golfe, anchored to the top */}
      <PageHero
        image="/heroes/locations.jpg"
        position="center top"
        crop={{ top: 0, left: 0, width: 100, height: 131.75 }}
        title={t.heroes.locationsTitle}
        subtitle={t.heroes.locationsSubtitle}
      />

      {/* LOCATIONS (11:1410): "The Golfe de Saint-Tropez" (Caps/Eyebrow) +
          intro in Text/Subtitle (max 760, 24px apart; mobile 20), then the
          nine village cards 56px below (mobile 40), 3 / 2 / 1 columns. */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <div className="max-w-[760px] flex flex-col gap-[20px] md:gap-[24px]">
            <p className="type-eyebrow">{t.locationsPage.eyebrow}</p>
            <p className="type-subtitle">{t.locationsPage.intro}</p>
          </div>
          <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`}>
            {ordered.map((loc, i) => (
              <VillageCard
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                name={loc.name}
                tagline={villageTagline(loc, lang)}
                image={loc.image}
                priority={i < 3}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
