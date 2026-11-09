"use client";

import { PropertiesBrowser } from "./PropertiesBrowser";
import { useLanguage } from "./LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { joinTitle } from "./ui/TextPage";
import type { Property } from "@/lib/types";

// Not in Figma (step 23; kept, out of the sitemap): no photo hero, so a
// centred Section header (H1 in the H2 style) below the navigation, then the
// same filters + cards as Buy (72px below, mobile 48).
export function RentalsPageContent({ properties, cities }: { properties: Property[]; cities: string[] }) {
  const { t } = useLanguage();
  const r = t.rentalsPage;
  const title = joinTitle(r.titleBefore, r.titleAccent);
  // The eyebrow repeated the title ("Seasonal rentals"): shown only if different.
  const eyebrow = r.eyebrow.toLowerCase() === title.toLowerCase() ? undefined : r.eyebrow;
  return (
    <div className="bg-surface pt-nav">
      <div className="container-wrap pt-section">
        <SectionHeader as="h1" align="center" eyebrow={eyebrow} title={title} subtitle={r.subtitle} className="mx-auto" />
      </div>
      <div className="pt-[48px] md:pt-[72px] pb-section">
        <PropertiesBrowser properties={properties} cities={cities} />
      </div>
    </div>
  );
}
