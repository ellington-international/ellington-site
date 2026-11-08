import Link from "@/components/LocaleLink";
import type { ComponentProps } from "react";

// Figma component "Button" (5:29): 4 styles × Default / Hover.
// Caps/Button text (Inter Regular 12, uppercase, .2em), 1px border,
// padding --button-pad-x / --button-pad-y (22 × 14).
//
//   primary  main action          blue fill, white text  → hover blue-deep
//   outline  secondary (on white) blue border, blue text  → hover blue fill, white text
//   white    main action on photo/blue  white fill, blue text → hover surface/light
//   ghost    secondary on photo/blue    white border, white text → hover white 10 %
//
// size "compact" = the smaller padding (18 × 8) the navigation uses for its
// Contact button in Figma.

export type ButtonVariant = "primary" | "outline" | "white" | "ghost";
export type ButtonSize = "default" | "compact";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue border-brand-blue text-white hover:bg-brand-blue-deep hover:border-brand-blue-deep",
  outline:
    "bg-transparent border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
  white:
    "bg-surface border-surface text-brand-blue hover:bg-surface-light hover:border-surface-light",
  ghost:
    "bg-transparent border-white text-white hover:bg-white/10",
};

const SIZES: Record<ButtonSize, string> = {
  default: "px-btn-x py-btn-y",
  compact: "px-[18px] py-[8px]",
};

/** The class list for a button look, for the rare element that can't use
 *  <Button> or <ButtonLink> (e.g. a form library's submit). */
export function buttonClasses({
  variant = "primary",
  size = "default",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return [
    "type-button inline-flex items-center justify-center gap-xs border whitespace-nowrap transition-colors duration-200",
    // Not in Figma, needed for keyboard use and forms
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(" ");
}

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

/** A real <button> (form submit, opening a dialog, …). */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

/** A link that looks like a button (navigation to another page). */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
