// Figma "Scroll cue" (e.g. 2286:4869): Caps/Label "Scroll" at 85 % white over
// a 1px line at 60 % white, 12px apart; line 48px (mobile 36). Sits at the
// bottom centre of a photo hero and jumps to the section below (a plain
// anchor link, so it works without JavaScript; smooth scrolling comes from
// globals.css and respects "reduce motion").
export function ScrollCue({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`absolute z-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[12px] group ${className}`}
    >
      <span className="type-label text-white/85 group-hover:text-white transition-colors">{label}</span>
      <span className="block w-px h-[36px] md:h-[48px] bg-white/60" aria-hidden />
    </a>
  );
}
