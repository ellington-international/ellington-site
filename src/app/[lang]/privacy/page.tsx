import type { Metadata } from "next";
import { asLang } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import PrivacyContent from "./PrivacyContent";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "privacy", "/privacy", { robots: { index: true, follow: true } });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
