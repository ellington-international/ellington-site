"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "./BlogCard";
import { useLanguage } from "./LanguageProvider";
import { CATEGORY_LABELS, type BlogCategory, type Post } from "@/lib/blog-shared";

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
  const { t, lang } = useLanguage();
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

  const allLabel = lang === "en" ? "All articles" : "Tous les articles";
  const eyebrow = lang === "en" ? "The Journal" : "Le journal";
  const titleBefore = lang === "en" ? "Stories from the" : "Chroniques du";
  const titleAccent = lang === "en" ? "Gulf" : "Golfe";
  const subtitle =
    lang === "en"
      ? "Buyer's guides, market analyses and Riviera lifestyle — our editorial selection."
      : "Guides d'achat, analyses de marché et art de vivre — notre sélection éditoriale.";

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.32em] uppercase text-accent mb-5">
            {eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            {titleBefore}{" "}
            <em className="italic">{titleAccent}</em>
          </h1>
          <p className="type-subtitle">{subtitle}</p>
        </header>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-12 border-b border-[var(--border)] pb-6">
          {CATEGORIES_ORDER.map((cat) => {
            const label =
              cat === "all" ? allLabel : CATEGORY_LABELS[cat][lang];
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
              {lang === "en"
                ? "No article in this category yet."
                : "Aucun article dans cette catégorie pour le moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <BlogCard key={p.slug} post={p} priority={i < 3} />
            ))}
          </div>
        )}

        {/* Disclaimer / FR-only note */}
        {lang === "en" && (
          <p className="mt-16 text-center text-xs text-muted">
            Articles are currently published in French only — English versions coming soon.
          </p>
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
  );
}
