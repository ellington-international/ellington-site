import { notFound } from "next/navigation";

// Any address under /en, /fr or /nl that matches no page shows the site's
// 404 page (../not-found.tsx) inside the normal layout (header, footer,
// language). Without this, Next.js would show its bare default 404.
export default function CatchAll() {
  notFound();
}
