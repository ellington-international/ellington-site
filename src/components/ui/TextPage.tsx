import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

// Text pages that are not in Figma (legal notice, privacy policy), step 23.
// Same frame as the journal articles: one 720px column, 144px padding
// (mobile 96) below the navigation; header = Section header (eyebrow + H1 in
// the H2 style), then 56px (mobile 40) to the text, which uses the article
// typography (`.article-prose` in globals.css).
export function TextPage({ eyebrow, title, note, children }: { eyebrow: ReactNode; title: ReactNode; note?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-surface pt-nav">
      <div className="container-wrap section-y">
        <div className="max-w-[720px] mx-auto">
          <SectionHeader as="h1" eyebrow={eyebrow} title={title} />
          {note && <p className="type-small mt-[20px]">{note}</p>}
          <div className="article-prose mt-[40px] md:mt-[56px]">{children}</div>
        </div>
      </div>
    </section>
  );
}

// Old two-part titles ("Seasonal" + "rentals", NL "Privacy-" + "verklaring")
// joined into one: no space after a trailing hyphen.
export function joinTitle(before: string, accent: string) {
  return before.endsWith("-") ? before.slice(0, -1) + accent : `${before} ${accent}`;
}
