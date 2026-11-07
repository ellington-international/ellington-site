import Link from "next/link";
import type { ComponentProps } from "react";

// Figma component "Link" (2048:48): text link with an underline, 2 tones ×
// Default / Hover. Caps/Button text, 6px between text and underline.
//
//   blue   on white / light   underline line/hairline → hover brand/accent (champagne)
//   white  on photo / blue    underline white 50 %    → hover white
//
// The arrow is part of the label (e.g. "View all →"), as in Figma.

export type TextLinkTone = "blue" | "white";

const TONES: Record<TextLinkTone, string> = {
  blue: "text-brand-blue border-hairline hover:border-brand-accent",
  white: "text-white border-white/50 hover:border-white",
};

export function textLinkClasses({
  tone = "blue",
  className = "",
}: { tone?: TextLinkTone; className?: string } = {}) {
  return [
    "type-button inline-flex items-center pb-[6px] border-b whitespace-nowrap transition-colors duration-200",
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current",
    TONES[tone],
    className,
  ].join(" ");
}

export function TextLink({
  tone,
  className,
  ...props
}: { tone?: TextLinkTone } & ComponentProps<typeof Link>) {
  return <Link className={textLinkClasses({ tone, className })} {...props} />;
}
