"use client";

import { PropertiesBrowser } from "./PropertiesBrowser";
import { PageHero } from "./PageHero";
import { useLanguage } from "./LanguageProvider";
import type { Property } from "@/lib/types";

export function PropertiesPageContent({
  properties,
  cities,
}: {
  properties: Property[];
  cities: string[];
}) {
  const { t } = useLanguage();
  return (
    <>
      {/* Figma "02 Buy" › Hero (2136:1547): photo anchored to its top so the
          sky stays behind the title */}
      <PageHero
        image="/heroes/buy.jpg"
        position="45% top"
        crop={{ top: 0, left: -11.73, width: 123.46, height: 144.93 }}
        title={t.heroes.buyTitle}
        subtitle={t.heroes.buySubtitle}
      />
      {/* Figma "02 Buy" › Content: filters 72px below the hero (mobile 48),
          144px (mobile 96) below the last row of cards */}
      <div className="pt-[48px] md:pt-[72px] pb-section">
        <PropertiesBrowser properties={properties} cities={cities} />
      </div>
    </>
  );
}
