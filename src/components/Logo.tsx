import Image from "next/image";

/**
 * Figma component "Logo" (5:16): crest (SVG exported from Figma, 32×38) +
 * "ELLINGTON" wordmark in Cormorant Garamond Medium 22, tracking .2em.
 * tone "blue" on white / solid nav, "white" on photos and the blue footer.
 * Used by the header (redesign step 6); the footer switches to it in step 7.
 *
 * `compact` (header, scrolled past 80px): the wordmark fades out (300ms,
 * opacity only, so it keeps its width and nothing in the nav shifts); below
 * 1024px the crest also slides to the centre of the header bar. The centre
 * comes from container-query units: the header row is an @container, so
 * 50cqw = half its content width (side margins excluded) and the crest,
 * which starts at the row's left edge, moves by 50cqw − 16px (half its
 * width). "Reduce motion": switches instantly.
 */
export function LogoLockup({
  tone = "blue",
  compact = false,
  className = "",
}: {
  tone?: "blue" | "white";
  compact?: boolean;
  className?: string;
}) {
  const motion = "transition duration-300 ease-out motion-reduce:transition-none";
  return (
    <span className={`inline-flex items-center gap-[12px] ${className}`}>
      <Image
        src={tone === "white" ? "/brand/crest-white.svg" : "/brand/crest-blue.svg"}
        alt=""
        width={32}
        height={38}
        priority
        unoptimized
        className={`h-[38px] w-auto shrink-0 ${motion} ${compact ? "max-lg:translate-x-[calc(50cqw-16px)]" : ""}`}
      />
      <span
        aria-hidden={compact || undefined}
        className={`font-serif font-medium text-[22px] tracking-[0.2em] uppercase leading-none whitespace-nowrap ${motion} ${
          tone === "white" ? "text-white" : "text-brand-blue"
        } ${compact ? "opacity-0 pointer-events-none" : ""}`}
      >
        Ellington
      </span>
    </span>
  );
}
