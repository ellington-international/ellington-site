import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locations, getProperties } from "@/lib/properties";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
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

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Property detail pages (best effort — comes from Apimo, skip on failure).
  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const properties = await getProperties();
    propertyEntries = properties.map((p) => ({
      url: `${SITE_URL}/properties/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // listing unavailable at build — static + content pages still indexed
  }

  return [
    ...staticEntries,
    ...locationEntries,
    ...postEntries,
    ...propertyEntries,
  ];
}
