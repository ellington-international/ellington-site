"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import type { Post } from "@/lib/blog-shared";
import { formatDate } from "@/lib/blog-shared";
import { BlogCard } from "./BlogCard";
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
      {/* HERO */}
      <header className="relative h-[60svh] min-h-[420px] flex items-end overflow-hidden text-white">
        <Image
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75 z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-10 pb-14 md:pb-20 w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/80 hover:text-white mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            {j.back}
          </Link>
          <p className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold)] mb-5">
            {categoryLabel}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/75">
            <span>{post.author ?? j.team}</span>
            <span className="opacity-50">·</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, lang)}
            </time>
            {post.readingTime && (
              <>
                <span className="opacity-50">·</span>
                <span>{j.readingTime.replace("{n}", String(post.readingTime))}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
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
