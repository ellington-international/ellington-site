import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  CATEGORY_LABELS,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/blog";
import { BlogPostShell } from "@/components/BlogPostShell";
import { mdxComponents } from "@/components/mdx";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

// Articles are French-only: pre-rendered under /fr only. /en/blog/<slug> and
// /nl/blog/<slug> are redirected to /fr by the proxy (and below, as a backup).
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== "fr") return [];
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article introuvable | Ellington" };

  const description = post.metaDescription ?? post.excerpt;
  const title = `${post.title} | Ellington`;

  return {
    title,
    description,
    // French only: canonical and hreflang point to the one /fr version
    alternates: { canonical: `/fr/blog/${post.slug}`, languages: { fr: `/fr/blog/${post.slug}` } },
    openGraph: {
      title,
      description,
      url: `/fr/blog/${post.slug}`,
      type: "article",
      locale: "fr_FR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [{ url: post.cover, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "fr") permanentRedirect(`/fr/blog/${slug}`);
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const categoryLabel = CATEGORY_LABELS[post.category]?.fr ?? post.category;

  // JSON-LD Article structured data → rich snippets in Google search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author ?? "Équipe Ellington",
    },
    publisher: {
      "@type": "Organization",
      name: "Ellington",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/fr/blog/${post.slug}`,
    },
    articleSection: categoryLabel,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostShell post={post} categoryLabel={categoryLabel} related={related}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </BlogPostShell>
    </>
  );
}
