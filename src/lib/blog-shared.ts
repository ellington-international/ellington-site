import { dict, type Lang } from "./i18n";
// Shared blog primitives — types, labels, pure formatters.
// MUST stay free of any Node-only imports (no fs, no path) so client
// components can use it.

export type BlogCategory =
  | "guides-achat"
  | "marche"
  | "architecture"
  | "art-de-vivre"
  | "fiscalite";

// Category names come from i18n.ts (journal.categories) in all three languages.
export const CATEGORY_LABELS = Object.fromEntries(
  (Object.keys(dict.fr.journal.categories) as BlogCategory[]).map((c) => [
    c,
    { fr: dict.fr.journal.categories[c], en: dict.en.journal.categories[c], nl: dict.nl.journal.categories[c] },
  ]),
) as Record<BlogCategory, Record<Lang, string>>;

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt?: string;
  cover: string;
  coverAlt?: string;
  author?: string;
  readingTime?: number;
  tags?: string[];
  metaDescription?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export function formatDate(
  iso: string,
  lang: "fr" | "en" | "nl" = "fr",
): string {
  const d = new Date(iso);
  const locale = lang === "en" ? "en-GB" : lang === "nl" ? "nl-NL" : "fr-FR";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
