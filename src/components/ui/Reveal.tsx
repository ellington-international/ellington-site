import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// THE shared scroll reveal (one for the whole site). Mark an element and it
// fades in + moves up 20px over 0.7s the first time it comes into view;
// several elements arriving together follow each other 80ms apart. The
// engine is <ScrollReveal> in the layout (one observer for every page,
// also for content added later); the CSS is in globals.css.
//
//   <h2 className="type-h2" {...reveal}>…</h2>     mark an existing element
//   <Reveal className="…">…</Reveal>               or wrap (a <div>)
//   <Reveal as="section">…</Reveal>
//
// Cards of every card grid and article text are revealed automatically
// (see lib/reveal.ts). Never the hero or the header. Without JavaScript or
// with "reduce motion", nothing is ever hidden.
export const reveal = { "data-reveal": "" } as const;
// Fade only (no movement), 900ms: for large full-bleed graphics.
//   <div {...revealFade}>…</div>
// An element can start later than its neighbours with --reveal-delay
// (added to the stagger), per breakpoint if needed:
//   <p className="xl:[--reveal-delay:200ms]" {...reveal}>…</p>
// A marked element inside another marked element is not revealed on its own
// (it comes in with its parent), so mark siblings to reveal them separately.
export const revealFade = { "data-reveal": "fade" } as const;

type RevealProps<T extends ElementType> = { as?: T; children?: ReactNode } & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Reveal<T extends ElementType = "div">({ as, children, ...rest }: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
