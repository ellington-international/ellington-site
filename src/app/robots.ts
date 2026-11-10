import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/locale";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep private / auth-only pages out of the index (in every language).
      disallow: [
        ...LOCALES.flatMap((l) => [`/${l}/mes-favoris`, `/${l}/login`, `/${l}/signup`]),
        "/auth/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
