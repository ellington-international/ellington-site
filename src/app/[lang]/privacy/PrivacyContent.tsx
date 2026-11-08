"use client";

import { ManageCookiesButton } from "@/components/ManageCookiesButton";
import { useLanguage } from "@/components/LanguageProvider";

const EMAIL = "marc@ellington-international.com";

export default function PrivacyContent() {
  const { t } = useLanguage();
  const p = t.privacyPage;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <header className="mb-14">
          <p className="text-[11px] tracking-[0.32em] uppercase text-accent mb-5">
            {p.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl">
            {p.titleBefore} <em className="italic">{p.titleAccent}</em>
          </h1>
          <p className="text-sm text-muted mt-4">{p.lastUpdated}</p>
        </header>

        <div className="space-y-12 text-foreground/90 leading-[1.85]">
          <section>
            <p className="text-sm">{p.intro}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.controllerHeading}</h2>
            <p className="text-sm">
              {p.controllerBody}
              <br />
              {p.controllerContact}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {EMAIL}
              </a>{" "}
              · +33 6 74 75 07 03
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.collectedHeading}</h2>
            <p className="text-sm mb-4">{p.collectedIntro}</p>
            <ul className="text-sm space-y-3 list-none">
              {p.collectedItems.map((item) => (
                <li
                  key={item.label}
                  className="pl-5 border-l border-accent/40"
                >
                  <strong className="text-foreground">{item.label}</strong> —{" "}
                  {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.legalBasisHeading}</h2>
            <p className="text-sm mb-3">{p.legalBasisIntro}</p>
            <ul className="text-sm space-y-2 list-disc pl-5">
              {p.legalBasisItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.recipientsHeading}</h2>
            <p className="text-sm mb-3">{p.recipientsIntro}</p>
            <ul className="text-sm space-y-2 list-disc pl-5">
              {p.recipientsItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.retentionHeading}</h2>
            <ul className="text-sm space-y-2 list-disc pl-5">
              {p.retentionItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.body}
                </li>
              ))}
            </ul>
          </section>

          <section id="cookies" className="scroll-mt-32">
            <h2 className="font-serif text-2xl mb-4">{p.cookiesHeading}</h2>
            <p className="text-sm mb-4">{p.cookiesIntro}</p>
            <ul className="text-sm space-y-3 list-none">
              {p.cookiesItems.map((item) => (
                <li
                  key={item.label}
                  className="pl-5 border-l border-accent/40"
                >
                  <strong className="text-foreground">{item.label}</strong> —{" "}
                  {item.body}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ManageCookiesButton className="text-[12px] tracking-[0.18em] uppercase px-5 py-3 border border-[var(--border-strong)] text-foreground hover:bg-[var(--background-elev)] transition">
                {p.cookiesManageBtn}
              </ManageCookiesButton>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.rightsHeading}</h2>
            <p className="text-sm mb-3">{p.rightsIntro}</p>
            <ul className="text-sm space-y-2 list-disc pl-5">
              {p.rightsItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.body}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4">
              {p.rightsFooterBefore}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {EMAIL}
              </a>
              {p.rightsFooterAfter}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.complaintHeading}</h2>
            <p className="text-sm">
              {p.complaintBefore}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                CNIL
              </a>
              {p.complaintAfter}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.securityHeading}</h2>
            <p className="text-sm">{p.securityBody}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{p.evolutionHeading}</h2>
            <p className="text-sm">{p.evolutionBody}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
