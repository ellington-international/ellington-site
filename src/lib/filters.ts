// Property search filters shared by the home hero search and the Buy page,
// so both offer the same options and speak the same URL query
// (?city=…&type=…&minPrice=…&maxPrice=…&beds=…).
import type { Dict } from "./i18n";

export const PRICE_RANGES = [
  { key: "all" as const, min: 0, max: Infinity },
  { key: "under3" as const, min: 0, max: 3_000_000 },
  { key: "r3to6" as const, min: 3_000_000, max: 6_000_000 },
  { key: "r6to10" as const, min: 6_000_000, max: 10_000_000 },
  { key: "r10to15" as const, min: 10_000_000, max: 15_000_000 },
  { key: "over15" as const, min: 15_000_000, max: Infinity },
];

export const PROPERTY_TYPES = ["villa", "penthouse", "apartment", "estate"] as const;

export const BEDROOM_OPTIONS = [0, 1, 2, 3, 4, 5];

export type FilterOption = { value: string; label: string };

/** Option lists for the four dropdowns, in the current language. */
export function filterOptions(t: Dict, cities: string[]) {
  return {
    location: [
      { value: "", label: t.search.allLocations },
      ...cities.map((c) => ({ value: c, label: c })),
    ] satisfies FilterOption[],
    type: [
      { value: "", label: t.search.allTypes },
      ...PROPERTY_TYPES.map((tp) => ({ value: tp, label: t.types[tp] })),
    ] satisfies FilterOption[],
    budget: PRICE_RANGES.map((r, i) => ({
      value: String(i),
      label: t.priceRanges[r.key],
    })) satisfies FilterOption[],
    bedrooms: BEDROOM_OPTIONS.map((n) => ({
      value: String(n),
      label: n === 0 ? t.search.allBedrooms : `${n}+`,
    })) satisfies FilterOption[],
  };
}

/** URL query for the Buy page from the four filter values. */
export function filterQuery({
  city,
  type,
  priceIdx,
  beds,
}: {
  city: string;
  type: string;
  priceIdx: number;
  beds: number;
}) {
  const q = new URLSearchParams();
  if (city) q.set("city", city);
  if (type) q.set("type", type);
  const range = PRICE_RANGES[priceIdx];
  if (range && range.key !== "all") {
    q.set("minPrice", String(range.min));
    if (Number.isFinite(range.max)) q.set("maxPrice", String(range.max));
  }
  if (beds > 0) q.set("beds", String(beds));
  const s = q.toString();
  return s ? `?${s}` : "";
}
