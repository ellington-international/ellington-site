import Image from "next/image";

// Logo officiel Ellington Properties — bouclier navy + couronne + "E"
// PNG fourni par le client via Apimo, déposé dans public/brand/logo.png.
//
// Le logo source étant navy sur fond transparent, on utilise un filtre CSS
// `invert` quand il faut l'afficher en blanc sur fond sombre (hero du home).
//
// `sizes` permet d'indiquer à next/image la taille rendue pour qu'il serve
// la bonne résolution. Par défaut 40px (taille du header). Passer "200px"
// (ou plus) pour les usages en grand (ex: divider About) afin d'éviter le flou.

/**
 * Figma component "Logo" (5:16): crest (SVG exported from Figma, 32×38) +
 * "ELLINGTON" wordmark in Cormorant Garamond Medium 22, tracking .2em.
 * tone "blue" on white / solid nav, "white" on photos and the blue footer.
 * Used by the header (redesign step 6); the footer switches to it in step 7.
 */
export function LogoLockup({
  tone = "blue",
  className = "",
}: {
  tone?: "blue" | "white";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[12px] ${className}`}>
      <Image
        src={tone === "white" ? "/brand/crest-white.svg" : "/brand/crest-blue.svg"}
        alt=""
        width={32}
        height={38}
        priority
        unoptimized
        className="h-[38px] w-auto shrink-0"
      />
      <span
        className={`font-serif font-medium text-[22px] tracking-[0.2em] uppercase leading-none whitespace-nowrap ${
          tone === "white" ? "text-white" : "text-brand-blue"
        }`}
      >
        Ellington
      </span>
    </span>
  );
}

export function Logo({
  className = "",
  invert = false,
  black = false,
  sizes = "40px",
  priority = true,
}: {
  className?: string;
  invert?: boolean;
  /** Render the navy logo as pure black (header on white background). */
  black?: boolean;
  sizes?: string;
  /** Disable for decorative/off-screen usages (e.g. card hover watermark). */
  priority?: boolean;
}) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ aspectRatio: "764 / 1024" }}
      aria-hidden
    >
      <Image
        src="/brand/logo.png"
        alt="Ellington Properties"
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
        style={
          invert
            ? { filter: "brightness(0) invert(1)" }
            : black
              ? { filter: "brightness(0)" }
              : undefined
        }
      />
    </span>
  );
}
