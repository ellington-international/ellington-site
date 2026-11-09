// Server-only: filesystem reader for MDX blog posts.
// Do NOT import this file from a client component — use blog-shared.ts instead.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogCategory, Post, PostFrontmatter } from "./blog-shared";

export type { BlogCategory, Post, PostFrontmatter } from "./blog-shared";
export { CATEGORY_LABELS, formatDate } from "./blog-shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: Post[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    const fm = data as PostFrontmatter;
    return {
      ...fm,
      slug,
      content,
      readingTime: fm.readingTime ?? estimateReadingTime(content),
    };
  });
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

// "Keep reading": articles of the same category first, then the others
// (newest first), so the section is never empty while other articles exist.
export function getRelatedPosts(post: Post, n = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}
