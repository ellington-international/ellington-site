import type { Property } from "./types";

type Lang = "fr" | "en" | "nl";

// Listing texts in the visitor's language (Apimo provides FR / EN / NL per
// listing, not always all three). Order: current language → French →
// whatever the listing has (`title` / `description`: French, or the first
// language Apimo gave, e.g. an English-only listing).
export function propertyTitle(p: Property, lang: Lang): string {
  return p.texts?.[lang]?.title || p.texts?.fr?.title || p.title;
}

export function propertyDescription(p: Property, lang: Lang): string {
  return p.texts?.[lang]?.description || p.texts?.fr?.description || p.description;
}
