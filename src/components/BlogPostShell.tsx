"use client";

import type { Post } from "@/lib/blog-shared";
import { formatDate } from "@/lib/blog-shared";
import { BlogCard } from "./BlogCard";
import { PageHero } from "./PageHero";
import { useLanguage } from "./LanguageProvider";
import { TextLink } from "./ui/TextLink";
import { Band } from "./ui/Band";
import { cardGridCls } from "./ui/card";

// Figma "08.1–08.3 Article" (e.g. 2186:1439 / mobile 2189:1333):
//   Hero: the article's cover, "Category · date · reading time" (Caps/Eyebrow)
//     and the title (H1 tag, H2 size).
//   Article: one 720px column, 144px padding (mobile 96): "← Back to journal",
//     56px, then the MDX text styled by `.article-prose` (globals.css).
//   Blue band "Speak with an Ellington advisor" → contact (consultation).
//   Keep reading: H2 + the other articles (journal cards), 48px below.
export function BlogPostShell({
  post,
  categoryLabel,
  related,
  children,
}: {
  post: Post;
  categoryLabel: string;
  related: Post[];
  children: React.ReactNode;
}) {
  const { t, lang } = useLanguage();
  const j = t.journal;

  return (
    <>
      <PageHero
        image={post.cover}
        imageAlt={post.coverAlt ?? post.title}
        titleSize="h2"
        eyebrow={[
          categoryLabel,
          formatDate(post.publishedAt, lang),
          post.readingTime ? j.readingTime.replace("{n}", String(post.readingTime)) : null,
        ]
          .filter(Boolean)
          .join("  ·  ")}
        title={post.title}
      />

      <article className="bg-surface">
        <div className="container-wrap section-y">
          <div className="max-w-[720px] mx-auto">
            <div className="flex">
              <TextLink href="/blog">← {j.back}</TextLink>
            </div>
            <div className="article-prose mt-[56px]">{children}</div>
          </div>
        </div>
      </article>

      <Band variant="blue" title={j.bandTitle} subtitle={j.bandSubtitle}>
        <TextLink href="/contact?subject=consultation" tone="white">
          {j.bandCta}
        </TextLink>
      </Band>

      {related.length > 0 && (
        <section className="bg-surface">
          <div className="container-wrap section-y">
            <h2 className="type-h2">{j.keepReading}</h2>
            <div className={`${cardGridCls} mt-[40px] md:mt-[48px]`}>
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
