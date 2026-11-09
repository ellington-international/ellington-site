import type { ReactNode } from "react";

// Full-width closing bands from the Figma pages:
//   variant "light" = "Closing band (light blue)" (Sell 11:1221, About 13:88):
//     surface/light, brand/blue text
//   variant "blue"  = "Band (Ellington blue)" (Village 12:77): brand/blue,
//     white text (via .on-photo, so every type style turns white)
// Section padding (144 / 96) and side margins from the tokens. Centred stack,
// max 720px: H2 + Text/Subtitle 24px apart; actions 48px below (16 + 32;
// mobile 40),
// 14px apart (a TextLink, or Primary + Outline buttons).
export function Band({
  variant = "light",
  title,
  subtitle,
  children,
  className = "",
}: {
  variant?: "light" | "blue";
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`${variant === "blue" ? "bg-brand-blue on-photo" : "bg-surface-light"} ${className}`}
    >
      <div className="container-wrap section-y flex flex-col items-center text-center">
        <div className="max-w-[720px] flex flex-col gap-[20px] md:gap-[24px]">
          <h2 className="type-h2">{title}</h2>
          {subtitle && <p className="type-subtitle">{subtitle}</p>}
        </div>
        {children && (
          <div className="mt-[40px] md:mt-[48px] flex flex-wrap items-center justify-center gap-[14px]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
