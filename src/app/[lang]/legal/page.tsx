import type { Metadata } from "next";
import { asLang } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import LegalContent from "./LegalContent";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "legal", "/legal", { robots: { index: false, follow: true } });
}

export default function LegalPage() {
  return <LegalContent />;
}
