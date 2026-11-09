"use client";

import Image from "next/image";
import { PageHero } from "./PageHero";
import { PropertyCard } from "./PropertyCard";
import { useLanguage } from "./LanguageProvider";
import { reveal } from "./ui/Reveal";
import { TextLink } from "./ui/TextLink";
import { Stat } from "./ui/SmallParts";
import { Band } from "./ui/Band";
import { cardGridCls } from "./ui/card";
import { villageTagline } from "@/lib/properties";
import { VILLAGE_CONTENT } from "@/lib/village-content";
import type { Location, Property } from "@/lib/types";

// Village page template, Figma "06 Village" (12:2 / mobile 12:164) and
// "06.2–06.9" (one per village). Content: src/lib/village-content.ts (client
// texts, EN / FR + NL draft).
//   Hero: village photo, name, the village's tagline.
//   The village: back link, "The village" + name | intro (Text/Subtitle) +
//     Average price / Properties; photo mosaic below.
//   List sections (heading left, hairline list right): Things to see & do,
//     Experiences, Our favourites (hidden while not provided), Investment &
//     market (Saint-Tropez only). Backgrounds alternate light / white.
//   Blue band "Your local expert in this region" + Request a consultation.
//   Properties in this region: up to 3 listings of this village, or the
//     empty state.
export function LocationDetail({
  location: loc,
  properties = [],
}: {
  location: Location;
  properties?: Property[];
}) {
  const { t, lang } = useLanguage();
  const v = t.village;
  const c = VILLAGE_CONTENT[loc.slug];

  const sections: { eyebrow: string; title: string; text?: string; items: string[] }[] = [];
  if (c) {
    sections.push({ eyebrow: v.seeDoEyebrow, title: v.seeDoTitle, items: c.seeDo[lang] });
    sections.push({ eyebrow: v.experiencesEyebrow, title: v.experiencesTitle, items: c.experiences[lang] });
    // Names of places on one line, separated by dots
    if (c.favourites?.length) sections.push({ eyebrow: v.favouritesEyebrow, title: v.favouritesTitle, items: [c.favourites.join(" · ")] });
    if (c.investment)
      sections.push({ eyebrow: v.investmentEyebrow, title: v.investmentTitle, text: c.investment.intro[lang], items: c.investment.items[lang] });
  }

  const consultHref = `/contact?subject=consultation&city=${encodeURIComponent(loc.name)}`;
  const propsHref = `/properties?city=${encodeURIComponent(loc.name)}`;

  return (
    <>
      <PageHero image={loc.image} imageAlt={loc.name} title={loc.name} subtitle={c?.tagline[lang] ?? villageTagline(loc, lang)} />

      {/* THE VILLAGE (12:7 / 12:169) */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <div className="flex" {...reveal}>
            <TextLink href="/locations">{v.back}</TextLink>
          </div>
          <div className="mt-[24px] md:mt-[32px] grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[96px]">
            <div className="flex flex-col gap-[20px] md:gap-[24px]">
              <p className="type-eyebrow" {...reveal}>{v.eyebrow}</p>
              <h2 className="type-h2" {...reveal}>{loc.name}</h2>
            </div>
            <div className="flex flex-col gap-[32px]">
              <p className="type-subtitle" {...reveal}>{c?.intro[lang] ?? (lang === "fr" ? loc.description : loc.descriptionEn ?? loc.description)}</p>
              {c && (
                <div className="grid grid-cols-2 gap-[20px] md:gap-[32px]">
                  <Stat figure={c.stats.averagePrice} label={v.averagePrice} />
                  <Stat figure={c.stats.properties} label={v.properties} />
                </div>
              )}
            </div>
          </div>
          {c && c.gallery.length > 0 && <Mosaic photos={c.gallery} name={loc.name} />}
        </div>
      </section>

      {/* LIST SECTIONS (12:32 · 12:49 · 12:62) */}
      {sections.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "bg-surface-light" : "bg-surface"}>
          <div className="container-wrap section-y grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[96px]">
            <div className="flex flex-col gap-[20px] md:gap-[24px]">
              <p className="type-eyebrow" {...reveal}>{s.eyebrow}</p>
              <h2 className="type-h2" {...reveal}>{s.title}</h2>
              {s.text && <p className="type-body" {...reveal}>{s.text}</p>}
            </div>
            <ul className="border-t border-hairline" {...reveal}>
              {s.items.map((item) => (
                <li key={item} className="py-[12px] border-b border-hairline type-body">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* BAND (Ellington blue) (12:77) */}
      <Band variant="blue" title={v.bandTitle} subtitle={v.bandSubtitle}>
        <TextLink href={consultHref} tone="white">
          {v.bandCta}
        </TextLink>
      </Band>

      {/* PROPERTIES IN THIS REGION (12:84 / 12:245) */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[20px]">
            <h2 className="type-h2" {...reveal}>{v.propertiesTitle}</h2>
            <TextLink href={propsHref} className="self-start md:self-auto" {...reveal}>
              {v.viewAll}
            </TextLink>
          </div>
          {properties.length > 0 ? (
            <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`}>
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="type-body mt-[40px] md:mt-[56px]" {...reveal}>
              {v.empty}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

// Figma "Mosaic (3 photos)" (12:24 / mobile 12:186): 120px below the text
// (mobile 80), 12px gaps. Desktop: large photo (819 × 620) + two stacked on
// the right (409 × 304); mobile: large photo (334 × 262) + two side by side
// below (161 × 121). With 2 photos the right column holds one tall photo
// (mobile: the second photo full width below).
function Mosaic({ photos, name }: { photos: string[]; name: string }) {
  const [main, ...rest] = photos.slice(0, 3);
  const img = (src: string, sizes: string) => <Image src={src} alt={name} fill sizes={sizes} className="object-cover" />;
  return (
    // reveal-grid: the photos fade in one after another, like cards
    <div className="reveal-grid mt-[80px] md:mt-[120px] grid grid-cols-2 md:grid-cols-[819fr_409fr] gap-[12px]">
      <div className="relative col-span-2 md:col-span-1 md:row-span-2 aspect-[334/262] md:aspect-[819/620]">
        {img(main, "(min-width: 768px) 66vw, 100vw")}
      </div>
      {rest.length === 2 &&
        rest.map((src) => (
          <div key={src} className="relative aspect-[161/121] md:aspect-[409/304]">
            {img(src, "(min-width: 768px) 33vw, 50vw")}
          </div>
        ))}
      {rest.length === 1 && (
        <div className="relative col-span-2 md:col-span-1 md:row-span-2 aspect-[334/262] md:aspect-auto">
          {img(rest[0], "(min-width: 768px) 33vw, 100vw")}
        </div>
      )}
    </div>
  );
}
