"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import type { Post } from "@/lib/blog-shared";
import { CATEGORY_LABELS, formatDate } from "@/lib/blog-shared";
import { useLanguage } from "./LanguageProvider";
import { cardImageCls, cardLinkCls, cardPhotoCls, cardTitleHoverCls } from "./ui/card";

// Figma "Journal card" (2048:458): photo 4:5 (the component's "3:2" note is
// outdated), category eyebrow, title (max 2 lines), excerpt (max 3 lines),
// date · reading time with a clock icon on a hairline (bottom of the card,
// aligned across a row). Spacing ≈ ¾ of Figma on client request.
export function BlogCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  const { lang } = useLanguage();
  const cat = CATEGORY_LABELS[post.category]?.[lang] ?? post.category;
  return (
    <Link href={`/blog/${post.slug}`} className={`${cardLinkCls} flex flex-col gap-[15px] h-full`}>
      <div className={`${cardPhotoCls} aspect-[4/5]`}>
        <Image
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
          priority={priority}
          className={cardImageCls}
        />
      </div>
      <div className="flex flex-col gap-[10px] flex-1">
        <p className="type-eyebrow text-muted">{cat}</p>
        <h3 className={`type-h3 line-clamp-2 ${cardTitleHoverCls}`}>
          {post.title}
        </h3>
        <p className="type-small line-clamp-3">{post.excerpt}</p>
        <p className="type-small mt-auto border-t border-hairline pt-[10px] flex items-center gap-[6px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- 16px static icon from Figma */}
          <img src="/ui/icons/date.svg" alt="" width={16} height={16} className="shrink-0" />
          {formatDate(post.publishedAt, lang)}
          {post.readingTime ? ` · ${post.readingTime} min` : ""}
        </p>
      </div>
    </Link>
  );
}
