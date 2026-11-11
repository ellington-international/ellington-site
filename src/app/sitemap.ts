import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locations, getProperties } from "@/lib/properties";
import { getAllPosts } from "@/lib/blog";
import { LOCALES } from "@/lib/locale";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Every page is listed once per language (/en, /fr, /nl), and each entry names
// its other language versions (hreflang), as Google recommends. Blog articles
// are French-only: listed once, under /fr. No unprefixed URLs, no /rentals.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const url = (lang: string, path: string) => `${SITE_URL}/${lang}${path === "/" ? "" : path}`;
  const allLanguages = (path: string, lastModified: Date, changeFrequency: Freq, priority: number) =>
    LOCALES.map((lang) => ({
      url: url(lang, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, url(l, path)])),
          "x-default": url("en", path), // "/" is a 301 to /en: point at /en itself
        },
      },
    }));

  const staticPages: { path: string; changeFrequency: Freq; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/properties", changeFrequency: "daily", priority: 0.9 },
    // /rentals is intentionally left out: the page stays, but is not listed (decision 4)
    { path: "/locations", changeFrequency: "monthly", priority: 0.8 },
    { path: "/sell", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/legal", changeFrequency: "yearly", priority: 0.2 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticEntries = staticPages.flatMap((p) => allLanguages(p.path, now, p.changeFrequency, p.priority));

  const locationEntries = locations.flatMap((l) => allLanguages(`/locations/${l.slug}`, now, "monthly", 0.7));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: url("fr", `/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Property detail pages (best effort — comes from Apimo, skip on failure).
  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const properties = await getProperties();
    propertyEntries = properties.flatMap((p) => allLanguages(`/properties/${p.id}`, now, "weekly", 0.8));
  } catch {
    // listing unavailable at build — static + content pages still indexed
  }

  return [...staticEntries, ...locationEntries, ...postEntries, ...propertyEntries];
}
