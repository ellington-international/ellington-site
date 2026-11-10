import { SITE_URL } from "./site";
import { propertyDescription, propertyTitle } from "./property-text";
import { hasPrice } from "./properties";
import type { Lang } from "./i18n";

const IN_LANGUAGE: Record<Lang, string> = { fr: "fr-FR", en: "en", nl: "nl" };
import type { Property, Location } from "./types";

const ORG_ID = `${SITE_URL}/#organization`;

// Real-estate agency (RealEstateAgent ⊂ LocalBusiness) — sitewide entity.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: "Ellington Properties",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/og.jpg`,
    description:
      "Agence immobilière de prestige spécialisée dans les biens d'exception sur le Golfe de Saint-Tropez et la Côte d'Azur.",
    email: "marc@ellington-international.com",
    telephone: "+33674750703",
    priceRange: "€€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Espace Lemarquis, Quartier Bertaud",
      postalCode: "83580",
      addressLocality: "Gassin",
      addressRegion: "Var",
      addressCountry: "FR",
    },
    areaServed: [
      "Saint-Tropez",
      "Ramatuelle",
      "Gassin",
      "Grimaud",
      "Port-Grimaud",
      "Sainte-Maxime",
      "Côte d'Azur",
    ],
    knowsLanguage: ["fr", "en", "nl"],
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${lang}`,
    name: "Ellington Properties",
    inLanguage: IN_LANGUAGE[lang],
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${lang}/properties?city={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Map our property type to a concrete schema.org Accommodation subtype.
function residenceType(t: string): string {
  if (["villa", "estate", "chalet", "townhouse"].includes(t)) return "House";
  if (["penthouse", "apartment"].includes(t)) return "Apartment";
  return "Residence";
}

// A property-for-sale listing. Price is included ONLY when it is a real value
// (some Apimo feeds return 0 — we never publish a 0 € offer).
export function propertySchema(p: Property, lang: Lang) {
  const url = `${SITE_URL}/${lang}/properties/${p.id}`;
  const images = p.pictures.map((pic) => pic.url).slice(0, 6);

  const about: Record<string, unknown> = {
    "@type": residenceType(p.type),
    name: propertyTitle(p, lang),
    address: {
      "@type": "PostalAddress",
      addressLocality: p.city,
      addressRegion: "Var",
      addressCountry: "FR",
    },
  };
  if (p.bedrooms > 0) about.numberOfBedrooms = p.bedrooms;
  if (p.bathrooms > 0) about.numberOfBathroomsTotal = p.bathrooms;
  if (p.rooms > 0) about.numberOfRooms = p.rooms;
  if (p.area > 0)
    about.floorSize = {
      "@type": "QuantitativeValue",
      value: p.area,
      unitCode: "MTK", // square metre
    };
  if (p.yearBuilt) about.yearBuilt = p.yearBuilt;
  if (p.coordinates)
    about.geo = {
      "@type": "GeoCoordinates",
      latitude: p.coordinates.lat,
      longitude: p.coordinates.lng,
    };

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: propertyTitle(p, lang),
    url,
    description: propertyDescription(p, lang).slice(0, 300),
    about,
  };
  if (images.length) node.image = images;
  if (hasPrice(p)) {
    node.offers = {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.currency || "EUR",
      availability: "https://schema.org/InStock",
      url,
    };
  }
  return node;
}

// A region / locality page.
export function placeSchema(loc: Location, lang: Lang) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: loc.name,
    url: `${SITE_URL}/${lang}/locations/${loc.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: "Var",
      addressCountry: "FR",
    },
  };
  if (loc.image)
    node.image = loc.image.startsWith("http")
      ? loc.image
      : `${SITE_URL}${loc.image}`;
  if (loc.coordinates)
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    };
  return node;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
