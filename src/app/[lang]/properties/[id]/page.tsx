import { notFound } from "next/navigation";
import { propertyDescription, propertyTitle } from "@/lib/property-text";
import { getProperty, getProperties } from "@/lib/properties";
import { getUserFavoriteIds } from "@/app/actions/favorites";
import type { Metadata } from "next";
import { PropertyDetailContent } from "@/components/PropertyDetailContent";
import { JsonLd } from "@/components/JsonLd";
import { propertySchema, breadcrumbSchema } from "@/lib/schema";
import { asLang } from "@/lib/locale";
import { HOME_LABEL, OG_LOCALE, languageAlternates } from "@/lib/seo";

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, id } = await params;
  const lang = asLang(raw);
  const p = await getProperty(id);
  if (!p) return { title: "Propriété introuvable" };
  // Listing texts from Apimo in the page language (French fallback).
  return {
    title: `${propertyTitle(p, lang)} — ${p.city}`,
    description: propertyDescription(p, lang).slice(0, 155),
    alternates: languageAlternates(lang, `/properties/${p.id}`),
    openGraph: { url: `/${lang}/properties/${p.id}`, locale: OG_LOCALE[lang] },
  };
}

export default async function PropertyDetail({ params }: Props) {
  const { lang: raw, id } = await params;
  const lang = asLang(raw);
  const property = await getProperty(id);
  if (!property) notFound();

  const all = await getProperties();
  const similar = all
    .filter((p) => p.id !== property.id && p.region === property.region)
    .slice(0, 3);

  const favoredIds = await getUserFavoriteIds();
  const initialFavored = favoredIds.includes(property.id);
  const similarFavoredIds = favoredIds.filter((id) => similar.some((s) => s.id === id));

  return (
    <>
      <JsonLd
        data={[
          propertySchema(property, lang),
          breadcrumbSchema([
            { name: HOME_LABEL[lang], path: `/${lang}` },
            { name: { fr: "Acheter", en: "Buy", nl: "Kopen" }[lang], path: `/${lang}/properties` },
            { name: propertyTitle(property, lang), path: `/${lang}/properties/${property.id}` },
          ]),
        ]}
      />
      <PropertyDetailContent
        property={property}
        similar={similar}
        initialFavored={initialFavored}
        similarFavoredIds={similarFavoredIds}
      />
    </>
  );
}
