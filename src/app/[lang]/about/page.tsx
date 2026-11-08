import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { asLang } from "@/lib/locale";
import { HOME_LABEL, pageMetadata } from "@/lib/seo";
import AboutContent from "./AboutContent";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const lang = asLang((await params).lang);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: HOME_LABEL[lang], path: `/${lang}` },
          { name: { fr: "À propos", en: "About", nl: "Over ons" }[lang], path: `/${lang}/about` },
        ])}
      />
      <AboutContent />
    </>
  );
}
