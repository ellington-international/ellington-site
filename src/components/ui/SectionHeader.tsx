import type { ReactNode } from "react";
import { reveal } from "./Reveal";

// Section header used across the Figma pages (e.g. Home › Featured properties
// › Head 9:60): eyebrow (Caps/Eyebrow), H2, optional subtitle (Text/Subtitle),
// 24px apart (mobile 20), max 640px wide. Optional action (usually a TextLink):
//   align "left"   desktop: action at the bottom right; mobile: below (32px)
//   align "center" everything centred, action below (32px)
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  align = "left",
  as: H = "h2",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-[32px] ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={`flex flex-col gap-[20px] md:gap-[24px] max-w-[640px] ${centered ? "items-center" : ""}`}>
        {eyebrow && <p className="type-eyebrow" {...reveal}>{eyebrow}</p>}
        <H className="type-h2" {...reveal}>{title}</H>
        {subtitle && <p className="type-subtitle" {...reveal}>{subtitle}</p>}
      </div>
      {action && <div className="shrink-0" {...reveal}>{action}</div>}
    </div>
  );
}
