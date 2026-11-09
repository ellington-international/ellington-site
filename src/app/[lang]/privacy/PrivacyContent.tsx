"use client";

import { ManageCookiesButton } from "@/components/ManageCookiesButton";
import { useLanguage } from "@/components/LanguageProvider";
import { TextPage, joinTitle } from "@/components/ui/TextPage";
import { buttonClasses } from "@/components/ui/Button";

const EMAIL = "marc@ellington-international.com";

// Not in Figma (step 23): TextPage frame + article typography (intro as the
// lead, H2 headings, champagne-dot lists, bold parts in blue).
type Item = { label: string; body: string };
function List({ items, dash = true }: { items: readonly Item[]; dash?: boolean }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.label}>
          <div className="min-w-0 flex-1">
            <strong>{item.label}</strong>
            {dash ? " — " : " "}
            {item.body}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyContent() {
  const { t } = useLanguage();
  const p = t.privacyPage;
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

  return (
    <TextPage eyebrow={p.eyebrow} title={joinTitle(p.titleBefore, p.titleAccent)} note={p.lastUpdated}>
      <p>{p.intro}</p>

      <h2>{p.controllerHeading}</h2>
      <p>
        {p.controllerBody}
        <br />
        {p.controllerContact}
        {mail} · +33 6 74 75 07 03
      </p>

      <h2>{p.collectedHeading}</h2>
      <p>{p.collectedIntro}</p>
      <List items={p.collectedItems} />

      <h2>{p.legalBasisHeading}</h2>
      <p>{p.legalBasisIntro}</p>
      <List items={p.legalBasisItems} />

      <h2>{p.recipientsHeading}</h2>
      <p>{p.recipientsIntro}</p>
      <List items={p.recipientsItems} dash={false} />

      <h2>{p.retentionHeading}</h2>
      <List items={p.retentionItems} />

      <h2 id="cookies" className="scroll-mt-nav">
        {p.cookiesHeading}
      </h2>
      <p>{p.cookiesIntro}</p>
      <List items={p.cookiesItems} />
      <div className="pt-[8px]">
        <ManageCookiesButton className={buttonClasses({ variant: "outline" })}>{p.cookiesManageBtn}</ManageCookiesButton>
      </div>

      <h2>{p.rightsHeading}</h2>
      <p>{p.rightsIntro}</p>
      <List items={p.rightsItems} />
      <p>
        {p.rightsFooterBefore}
        {mail}
        {p.rightsFooterAfter}
      </p>

      <h2>{p.complaintHeading}</h2>
      <p>
        {p.complaintBefore}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          CNIL
        </a>
        {p.complaintAfter}
      </p>

      <h2>{p.securityHeading}</h2>
      <p>{p.securityBody}</p>

      <h2>{p.evolutionHeading}</h2>
      <p>{p.evolutionBody}</p>
    </TextPage>
  );
}
