"use client";

import Image from "next/image";
import { PageHero } from "./PageHero";
import { locations, villageTagline } from "@/lib/properties";
import { useLanguage } from "@/components/LanguageProvider";
import { VillageCard } from "@/components/VillageCard";
import { cardGridCls } from "@/components/ui/card";
import { reveal, revealFade } from "@/components/ui/Reveal";
import { GolfeBand } from "@/components/ui/GolfeBand";

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

      {/* INTRO (Figma 2342:4729, client change).
          Desktop (xl, from 1280px): the Golfe graphic full-bleed right under
          the hero (no gap), anchored left. Eyebrow + intro (our blue text
          styles) on the white sea: from 43.125 % of the width (621/1440), top
          at 67.24 % of the graphic (544/809), up to 760px wide, ≥ 4.1 % from
          the right (in % of the width, so it keeps the same distance from the coastline
          at every width). Graphic and text share one grid cell: if a long
          translation reaches past the graphic, the white area grows instead
          of the text overlapping the cards' spacing. Below 1280 the text
          would hang well below the graphic and come within ~45px of the
          peninsula, so the mobile layout is used there.
          Mobile / tablet (unchanged): text, then the graphic at content width
          40px below. The village cards follow with the normal section
          spacing. */}
      <section className="bg-surface">
        <div className="pt-section xl:pt-0 xl:grid xl:grid-cols-[minmax(0,1fr)]">
          <GolfeBand crop="locations" className="hidden xl:block xl:[grid-area:1/1]" />
          <div className="container-wrap xl:[grid-area:1/1] xl:self-start xl:mt-[37.78%] xl:ml-[43.125%] xl:mr-[4.1%] xl:w-auto xl:max-w-[760px] xl:px-0">
            <div className="flex flex-col gap-[20px] md:gap-[24px]">
              {/* Desktop: the text comes in 200ms after the graphic */}
              <p className="type-eyebrow xl:[--reveal-delay:200ms]" {...reveal}>
                {t.locationsPage.eyebrow}
              </p>
              <p className="type-subtitle xl:[--reveal-delay:200ms]" {...reveal}>
                {t.locationsPage.intro}
              </p>
            </div>
            <Image
              src="/locations/golfe-graphic.svg"
              alt=""
              width={1088}
              height={917}
              unoptimized
              className="xl:hidden block w-full h-auto mt-[40px]"
              {...revealFade}
            />
          </div>
        </div>
        <div className="container-wrap pb-section pt-[40px] md:pt-[56px] xl:pt-section">
          <div className={cardGridCls}>
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
