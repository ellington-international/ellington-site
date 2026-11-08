"use client";

import { useLanguage } from "@/components/LanguageProvider";

const EMAIL = "marc@ellington-international.com";

export default function LegalContent() {
  const { t } = useLanguage();
  const l = t.legalPage;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <header className="mb-14">
          <p className="text-[11px] tracking-[0.32em] uppercase text-accent mb-5">
            {l.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl">
            {l.titleBefore} <em className="italic">{l.titleAccent}</em>
          </h1>
        </header>

        <div className="space-y-12 text-foreground/90 leading-[1.85]">
          <section>
            <h2 className="font-serif text-2xl mb-4">{l.editorHeading}</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-3 gap-x-6 text-sm">
              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.companyLabel}
              </dt>
              <dd>{l.companyValue}</dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.formLabel}
              </dt>
              <dd>{l.formValue}</dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.addressLabel}
              </dt>
              <dd className="whitespace-pre-line">{l.addressValue}</dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.siretLabel}
              </dt>
              <dd>983 021 650</dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.vatLabel}
              </dt>
              <dd>FR55 983021650</dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.phoneLabel}
              </dt>
              <dd>
                <a href="tel:+33674750703" className="hover:text-link transition">
                  +33 6 74 75 07 03
                </a>
              </dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.emailLabel}
              </dt>
              <dd>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-link transition"
                >
                  {EMAIL}
                </a>
              </dd>

              <dt className="text-muted text-[11px] tracking-[0.18em] uppercase">
                {l.directorLabel}
              </dt>
              <dd>{l.directorValue}</dd>
            </dl>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{l.hostingHeading}</h2>
            <p className="text-sm">
              {l.hostingBefore}
              <strong>Vercel Inc.</strong>
              {l.hostingAfter}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                vercel.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{l.ipHeading}</h2>
            <p className="text-sm">{l.ipBody}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{l.regulatedHeading}</h2>
            <p className="text-sm">
              {l.regulatedBefore}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">{l.dataHeading}</h2>
            <p className="text-sm">
              {l.dataBefore}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
