import type { ComponentProps, ReactNode } from "react";

// Small Figma components (step 10). All server-safe (no state).

/**
 * Figma "Chip" (5:68): category filter. Caps/Label, 6px vertical padding,
 * 1px bottom line. Default text/muted, no line; hover brand/blue + hairline;
 * active brand/blue + brand/accent (champagne) line.
 */
export function Chip({
  active = false,
  className = "",
  ...props
}: { active?: boolean } & ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`type-label py-[6px] border-b transition-colors ${
        active
          ? "text-brand-blue border-brand-accent"
          : "text-muted border-transparent hover:text-brand-blue hover:border-hairline"
      } ${className}`}
      {...props}
    />
  );
}

/** Figma "Tag" (5:61): property feature. Brand/blue box, white Text/Input, 14 × 8. */
export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`type-input inline-block px-[14px] py-[8px] bg-brand-blue text-white ${className}`}>
      {children}
    </span>
  );
}

/**
 * Figma "Stat" (6:16): key figure. Hairline on top, 24px, figure in the H2
 * style (Cormorant Medium Italic 56/40) in brand/accent, 12px, Caps/Label.
 */
export function Stat({ figure, label, className = "" }: { figure: ReactNode; label: ReactNode; className?: string }) {
  return (
    <div className={`border-t border-hairline pt-[24px] flex flex-col gap-[12px] ${className}`}>
      <p className="type-h2 text-brand-accent">{figure}</p>
      <p className="type-label">{label}</p>
    </div>
  );
}

/**
 * Figma "Detail row" (6:20): label (Caps/Label, muted) left, value (Text/Value,
 * brand/blue) right, baseline-aligned, 16px padding, hairline below.
 * Use inside a <dl>.
 */
export function DetailRow({ label, value, className = "" }: { label: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={`flex items-baseline justify-between gap-sm py-[16px] border-b border-hairline ${className}`}>
      <dt className="type-label">{label}</dt>
      <dd className="type-value text-right">{value}</dd>
    </div>
  );
}

/**
 * Figma "Info box" (6:54): sidebar block (Property, Contact). Hairline on top,
 * 24px, H3 title, 14px, content (Text/Small by default; buttons or detail
 * rows can go inside).
 */
export function InfoBox({ title, children, className = "" }: { title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`border-t border-hairline pt-[24px] flex flex-col gap-[14px] ${className}`}>
      <h3 className="type-h3">{title}</h3>
      <div className="type-small flex flex-col gap-[14px]">{children}</div>
    </div>
  );
}
