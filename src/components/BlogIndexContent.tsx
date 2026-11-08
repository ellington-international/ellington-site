"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "./BlogCard";
import { PageHero } from "./PageHero";
import { useLanguage } from "./LanguageProvider";
import type { BlogCategory, Post } from "@/lib/blog-shared";
import { cardGridCls } from "@/components/ui/card";

const CATEGORIES_ORDER: (BlogCategory | "all")[] = [
  "all",
  "guides-achat",
  "marche",
  "architecture",
  "art-de-vivre",
  "fiscalite",
];

const VALID_CATEGORIES: BlogCategory[] = [
  "guides-achat",
  "marche",
  "architecture",
  "art-de-vivre",
  "fiscalite",
];

export function BlogIndexContent(props: { posts: Post[] }) {
  return (
    <Suspense fallback={null}>
      <BlogIndexInner {...props} />
    </Suspense>
  );
}

function BlogIndexInner({ posts }: { posts: Post[] }) {
  const { t } = useLanguage();
  const params = useSearchParams();
  const initial = (() => {
    const cat = params.get("category");
    if (cat && VALID_CATEGORIES.includes(cat as BlogCategory)) {
      return cat as BlogCategory;
    }
    return "all" as const;
  })();
  const [filter, setFilter] = useState<BlogCategory | "all">(initial);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  // All page texts follow the page language (i18n.ts › journal); only the
  // articles themselves are French.
  const j = t.journal;

  return (
    <>
    {/* HERO — Figma "08 Journal" › Hero (2167:1427); photo from Figma for now */}
    <PageHero
      image="/heroes/journal.jpg"
      title={`${j.titleBefore} ${j.titleAccent}`}
      subtitle={t.heroes.journalSubtitle}
    />
    {/* Figma "08 Journal" › Content starts 72px below the hero (mobile 48) */}
    <div className="pt-[48px] md:pt-[72px] pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-12 border-b border-[var(--border)] pb-6">
          {CATEGORIES_ORDER.map((cat) => {
            const label =
              cat === "all" ? j.all : j.categories[cat];
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`text-[11px] tracking-[0.18em] uppercase px-4 py-2 transition ${
                  active
                    ? "text-accent border-b border-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl italic text-muted-strong">
              {j.empty}
            </p>
          </div>
        ) : (
          <div className={cardGridCls}>
            {filtered.map((p, i) => (
              <BlogCard key={p.slug} post={p} priority={i < 3} />
            ))}
          </div>
        )}

        {/* Disclaimer / FR-only note */}
        {j.frenchOnly && (
          <p className="mt-16 text-center text-xs text-muted">{j.frenchOnly}</p>
        )}

        <p className="text-xs text-muted mt-4 text-center max-w-2xl mx-auto">
          {t.common.contactUs} ·{" "}
          <a
            href="mailto:marc@ellington-international.com"
            className="hover:text-link transition"
          >
            marc@ellington-international.com
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
