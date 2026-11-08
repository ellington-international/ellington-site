import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogIndexContent } from "@/components/BlogIndexContent";
import { asLang } from "@/lib/locale";
import { PAGE_META, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

// The journal index exists in all three languages; the articles themselves are
// French-only and always link to /fr/blog/<slug>.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMetadata(lang, "blog", "/blog", {
    openGraph: {
      title: { fr: "Le journal Ellington", en: "The Ellington Journal", nl: "Het Ellington Journal" }[lang],
      description: PAGE_META.blog[lang].description,
      type: "website",
    },
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return <BlogIndexContent posts={posts} />;
}
