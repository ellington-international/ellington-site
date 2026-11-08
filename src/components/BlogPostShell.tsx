"use client";

import Link from "@/components/LocaleLink";
import type { Post } from "@/lib/blog-shared";
import { formatDate } from "@/lib/blog-shared";
import { BlogCard } from "./BlogCard";
import { PageHero } from "./PageHero";
import { textLinkClasses } from "./ui/TextLink";
import { useLanguage } from "./LanguageProvider";
import { cardGridCls } from "@/components/ui/card";

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
  // Page texts from i18n.ts › journal (articles are French-only, so this page
  // is normally shown under /fr; the texts still follow the page language).
  const j = t.journal;

  return (
    <article className="pb-20">
      {/* HERO — Figma "08.1 Article" › Hero (2186:1441): the article's cover,
          caps line (category · date · reading time) and the title in H2 */}
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

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
        {/* Figma: "Back to journal" link at the top of the article column */}
        <Link href="/blog" className={`${textLinkClasses()} inline-block mb-[36px]`}>
          ← {j.back}
        </Link>
        <div className="prose-ellington">{children}</div>

        {/* TAGS */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.18em] uppercase text-muted border border-[var(--border)] px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-[var(--background-elev)] border border-[var(--border)] p-10 md:p-12 text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-accent mb-4">
            {t.aboutPage.ctaEyebrow}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-5">
            {j.ctaTitle}
          </h2>
          <p className="text-muted-strong max-w-md mx-auto mb-7">
            {j.ctaText}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover text-white text-[11px] tracking-[0.22em] uppercase transition"
          >
            {t.common.contactUs}
          </Link>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-24 pt-16 border-t border-[var(--border)]">
          <h2 className="font-serif text-3xl md:text-4xl mb-10">
            <em className="italic">{j.related}</em>
          </h2>
          <div className={cardGridCls}>
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
