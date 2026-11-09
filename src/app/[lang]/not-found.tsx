"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

// 404 page (not in Figma, step 23): centred Section header (H1 in the H2
// style), Primary button to Home and a text link to the properties.
export default function NotFound() {
  const { t } = useLanguage();
  const n = t.notFound;
  return (
    <section className="bg-surface pt-nav">
      <div className="container-wrap section-y min-h-[60vh] flex flex-col items-center justify-center">
        <SectionHeader as="h1" align="center" eyebrow={n.eyebrow} title={n.title} />
        <p className="type-body text-center mt-[20px] md:mt-[24px] max-w-[480px]">{n.text}</p>
        <div className="mt-[40px] flex flex-col sm:flex-row items-center gap-x-[32px] gap-y-[24px]">
          <ButtonLink href="/" variant="primary">
            {n.home}
          </ButtonLink>
          <TextLink href="/properties">{n.properties} →</TextLink>
        </div>
      </div>
    </section>
  );
}
