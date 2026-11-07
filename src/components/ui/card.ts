// Shared bits of the three Figma cards (Property 2048:447, Journal 2048:458,
// Village 2048:466). The card root is a link with the `group` class.
//
// Hover (and keyboard focus): the photo zooms in slightly (≈6 %, Figma's
// hover frame enlarges the image by that much) and the title gets a
// champagne (brand/accent) underline.

/** Photo frame: light-blue placeholder while loading, clips the zoom. */
export const cardPhotoCls = "relative overflow-hidden bg-surface-light";

/** The <Image> inside the photo frame. */
export const cardImageCls =
  "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/** Card title underline on hover / focus. */
export const cardTitleHoverCls =
  "decoration-brand-accent decoration-1 underline-offset-[0.18em] group-hover:underline group-focus-visible:underline";

/** Focus ring for the card link (not in Figma, keyboard use). */
export const cardLinkCls =
  "group outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-blue";

/** Every card grid: 3 columns desktop, 2 tablet, 1 mobile. Columns 32px
 *  apart (space/gap); rows 56px desktop / 48px mobile (client feedback:
 *  Figma's 36px read as too tight between tall photos). */
export const cardGridCls =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gap gap-y-[48px] md:gap-y-[56px]";

/** Number formatting for areas, per language (504 m², 3,016 / 3 016 / 3.016 m²). */
export function formatArea(n: number, lang: "fr" | "en" | "nl") {
  const locale = lang === "en" ? "en-GB" : lang === "nl" ? "nl-NL" : "fr-FR";
  return `${n.toLocaleString(locale)} m²`;
}
