"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "./BlogCard";
import { PageHero } from "./PageHero";
import { useLanguage } from "./LanguageProvider";
import { Chip } from "./ui/SmallParts";
import type { BlogCategory, Post } from "@/lib/blog-shared";
import { cardGridCls } from "@/components/ui/card";

// Figma "08 Journal — Desktop" (13:1717) / "— Mobile" (13:1830).
const CATEGORIES: BlogCategory[] = ["guides-achat", "marche", "architecture", "art-de-vivre", "fiscalite"];

export function BlogIndexContent(props: { posts: Post[] }) {
  return (
    <Suspense fallback={null}>
      <BlogIndexInner {...props} />
    </Suspense>
  );
}

function BlogIndexInner({ posts }: { posts: Post[] }) {
  const { t } = useLanguage();
  const j = t.journal;
  const params = useSearchParams();
  const fromUrl = params.get("category");
  const [filter, setFilter] = useState<BlogCategory | "all">(
    fromUrl && CATEGORIES.includes(fromUrl as BlogCategory) ? (fromUrl as BlogCategory) : "all",
  );

  const filtered = useMemo(() => (filter === "all" ? posts : posts.filter((p) => p.category === filter)), [posts, filter]);

  // Keep the address in step with the chosen chip (shareable, back button)
  // without a page reload.
  const choose = (cat: BlogCategory | "all") => {
    setFilter(cat);
    const url = new URL(window.location.href);
    if (cat === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", cat);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {/* HERO (2167:1427) — photo from Figma for now */}
      <PageHero image="/heroes/journal.jpg" title={`${j.titleBefore} ${j.titleAccent}`} subtitle={t.heroes.journalSubtitle} />

      {/* CONTENT (13:1722): 72px below the hero (mobile 48) */}
      <section className="bg-surface">
        <div className="container-wrap pt-[48px] md:pt-[72px] pb-section">
          {/* Category filter: Chips 28px apart (rows 12), hairline below */}
          <div className="flex flex-wrap gap-x-[28px] gap-y-[12px] pb-[16px] border-b border-hairline" role="group" aria-label={j.eyebrow}>
            <Chip active={filter === "all"} onClick={() => choose("all")}>
              {j.all}
            </Chip>
            {CATEGORIES.map((cat) => (
              <Chip key={cat} active={filter === cat} onClick={() => choose(cat)}>
                {j.categories[cat]}
              </Chip>
            ))}
          </div>

          {/* Cards 56px below (mobile 40) */}
          {filtered.length === 0 ? (
            <p className="type-body mt-[40px] md:mt-[56px]" aria-live="polite">
              {j.empty}
            </p>
          ) : (
            <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`} aria-live="polite">
              {filtered.map((p, i) => (
                <BlogCard key={p.slug} post={p} priority={i < 3} />
              ))}
            </div>
          )}

          {/* Notes (13:1764): hairline on top, 28px; "French only" notice
              (EN / NL pages) left, contact right; mobile stacked */}
          <div className="mt-[40px] md:mt-[56px] pt-[28px] border-t border-hairline flex flex-col md:flex-row md:justify-between gap-x-[40px] gap-y-[4px] type-small">
            {j.frenchOnly ? <p>{j.frenchOnly}</p> : <span aria-hidden />}
            <p>
              {t.common.contactUs} ·{" "}
              <a href="mailto:marc@ellington-international.com" className="hover:text-brand-blue transition-colors">
                marc@ellington-international.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
