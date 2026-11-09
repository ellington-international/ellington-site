"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { TextPage, joinTitle } from "@/components/ui/TextPage";
import { DetailRow } from "@/components/ui/SmallParts";

const EMAIL = "marc@ellington-international.com";

// Not in Figma (step 23): TextPage frame + article typography; the company
// details as Figma "Detail rows".
export default function LegalContent() {
  const { t } = useLanguage();
  const l = t.legalPage;
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

  return (
    <TextPage eyebrow={l.eyebrow} title={joinTitle(l.titleBefore, l.titleAccent)}>
      <h2>{l.editorHeading}</h2>
      <dl className="border-t border-hairline">
        <DetailRow label={l.companyLabel} value={l.companyValue} />
        <DetailRow label={l.formLabel} value={l.formValue} />
        <DetailRow label={l.addressLabel} value={<span className="whitespace-pre-line">{l.addressValue}</span>} />
        <DetailRow label={l.siretLabel} value="983 021 650" />
        <DetailRow label={l.vatLabel} value="FR55 983021650" />
        <DetailRow label={l.phoneLabel} value={<a href="tel:+33674750703">+33 6 74 75 07 03</a>} />
        <DetailRow label={l.emailLabel} value={<a href={`mailto:${EMAIL}`} className="break-all">{EMAIL}</a>} />
        <DetailRow label={l.directorLabel} value={l.directorValue} />
      </dl>

      <h2>{l.hostingHeading}</h2>
      <p>
        {l.hostingBefore}
        <strong>Vercel Inc.</strong>
        {l.hostingAfter}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>

      <h2>{l.ipHeading}</h2>
      <p>{l.ipBody}</p>

      <h2>{l.regulatedHeading}</h2>
      <p>
        {l.regulatedBefore}
        {mail}.
      </p>

      <h2>{l.dataHeading}</h2>
      <p>
        {l.dataBefore}
        {mail}.
      </p>
    </TextPage>
  );
}
