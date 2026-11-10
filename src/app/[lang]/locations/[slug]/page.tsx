import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations, getProperties } from "@/lib/properties";
import { LocationDetail } from "@/components/LocationDetail";
import { normalizeCity } from "@/lib/filters";
import { VILLAGE_CONTENT } from "@/lib/village-content";
import { JsonLd } from "@/components/JsonLd";
import { placeSchema, breadcrumbSchema } from "@/lib/schema";
import { asLang } from "@/lib/locale";
import { HOME_LABEL, OG_LOCALE, languageAlternates } from "@/lib/seo";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

// Pre-render all 6 city pages at build time → static, ultra-fast, indexable.
export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return { title: "Région introuvable | Ellington" };

  // Village intro from the client texts (village-content.ts), else the old data
  const intro = VILLAGE_CONTENT[loc.slug]?.intro[lang];
  const description = intro
    ? intro.length > 160 ? `${intro.slice(0, 157).trimEnd()}…` : intro
    : lang === "fr"
      ? loc.metaDescription ?? loc.description.slice(0, 160)
      : loc.metaDescriptionEn ?? (loc.descriptionEn ?? loc.description).slice(0, 160);
  const title = {
    fr: `Immobilier de prestige à ${loc.name} | Ellington`,
    en: `Luxury real estate in ${loc.name} | Ellington`,
    nl: `Exclusief vastgoed in ${loc.name} | Ellington`,
  }[lang];

  return {
    title,
    description,
    alternates: languageAlternates(lang, `/locations/${loc.slug}`),
    openGraph: {
      title,
      description,
      url: `/${lang}/locations/${loc.slug}`,
      type: "website",
      locale: OG_LOCALE[lang],
      images: [{ url: loc.image, alt: loc.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [loc.image],
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  // "Properties in this region": only this village's listings (Apimo or mock),
  // up to 3. City names compared exactly, ignoring accents, hyphens and a
  // leading "La / Le" (normalizeCity, same as the Buy page filter).
  const all = await getProperties({ category: "sale" });
  const villageProperties = all.filter((p) => normalizeCity(p.city) === normalizeCity(loc.name));

  return (
    <>
      <JsonLd
        data={[
          placeSchema(loc, lang),
          breadcrumbSchema([
            { name: HOME_LABEL[lang], path: `/${lang}` },
            { name: { fr: "Régions", en: "Villages", nl: "Dorpen" }[lang], path: `/${lang}/locations` },
            { name: loc.name, path: `/${lang}/locations/${loc.slug}` },
          ]),
        ]}
      />
      <LocationDetail location={loc} properties={villageProperties.slice(0, 3)} total={villageProperties.length} />
    </>
  );
}
