export type PropertyCategory = "sale" | "rent";
export type PropertyType =
  | "villa"
  | "penthouse"
  | "apartment"
  | "estate"
  | "chalet"
  | "townhouse"
  | "land";

export type PropertyStatus = "available" | "under_offer" | "sold";

// Shape modeled to be near-compatible with Apimo's REST schema so the swap
// from mock data to live API requires only a thin adapter.
export interface Property {
  id: string;
  reference: string;
  category: PropertyCategory;
  type: PropertyType;
  status: PropertyStatus;

  title: string;
  subtitle?: string;
  description: string;
  /** Apimo texts per language (title + description); read them with
   *  propertyTitle / propertyDescription (lib/property-text.ts). */
  texts?: Partial<Record<"fr" | "en" | "nl", { title?: string; description?: string }>>;

  city: string;
  region: string; // e.g. "Côte d'Azur"
  district?: string;
  country: string;
  coordinates?: { lat: number; lng: number };

  price: number;
  currency: "EUR";
  pricePeriod?: "week" | "month";

  area: number; // m²
  landArea?: number; // m²
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt?: number;

  features: string[];
  pictures: { url: string; alt?: string }[];

  /** DPE — Diagnostic de Performance Énergétique (A–G classes). */
  energyClass?: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  /** GES — Gaz à Effet de Serre (A–G classes). */
  ghgClass?: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  /** Date du diagnostic (post 1er juillet 2021 = nouveau DPE opposable). */
  energyDiagnosticDate?: string;
  /** Coût annuel d'énergie estimé — range (€) pour un usage standard. */
  energyCostMin?: number;
  energyCostMax?: number;
  /** DPE consumption value (kWh/m²/year) */
  energyValue?: number;
  /** GES emission value (kg CO₂/m²/year) */
  ghgValue?: number;
  /** Reference year of the energy cost estimate ("2023 prices") */
  energyCostYear?: number;

  isFeatured?: boolean;
  isExclusive?: boolean;
}

export interface Location {
  slug: string;
  name: string;
  nameEn?: string;
  /** Short one-liner shown under the title on the detail page */
  tagline?: string;
  taglineEn?: string;
  /** Dutch tagline (draft, client review) */
  taglineNl?: string;
  /** Lead paragraph (already used on the index list) */
  description: string;
  descriptionEn?: string;
  /** Optional secondary paragraph for the detail page (2nd block of editorial copy) */
  longDescription?: string;
  longDescriptionEn?: string;
  /** Bullet points highlighting the city's selling points */
  highlights?: string[];
  highlightsEn?: string[];
  /** Key facts displayed as a stat grid (label/value pairs) */
  keyFacts?: { label: string; labelEn?: string; value: string }[];
  /** SEO meta description override (defaults to description if not set) */
  metaDescription?: string;
  metaDescriptionEn?: string;
  image: string;
  coordinates?: { lat: number; lng: number };
  propertyCount?: number;
  /** "Activities & Experiences" — short list of things to do locally. */
  activities?: string[];
  activitiesEn?: string[];
  /** "Our Favourite Places" — named restaurants, beach clubs, addresses. */
  favouritePlaces?: { name: string; category?: string; image?: string }[];
}
