import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { getCities, getFeaturedProperties } from "@/lib/properties";
import { HomeContent } from "@/components/HomeContent";
import { asLang } from "@/lib/locale";
import { OG_LOCALE, languageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

// Title and description: the site defaults from the [lang] layout.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return {
    alternates: languageAlternates(lang, "/"),
    openGraph: { url: `/${lang}`, locale: OG_LOCALE[lang], images: ["/og.jpg"] },
  };
}

export default async function HomePage() {
  // Server-side : load posts + properties (Apimo or mock fallback) at build time / ISR
  // cities: same list as the Buy page, for the hero search Location filter
  const [posts, featured, cities] = await Promise.all([
    Promise.resolve(getAllPosts()),
    getFeaturedProperties(),
    getCities(),
  ]);
  return <HomeContent posts={posts} featured={featured.slice(0, 3)} cities={cities} />;
}
