import type { ReactNode } from "react";
import { revealFade } from "./Reveal";

// Full-bleed Golfe graphic band (Figma "Photo (bleeds to the edge)":
// Locations 2342:4727, About 2342:4730 / mobile 2345:2345). Edge to edge,
// anchored left; land (brand/blue) top-left, white sea bottom-right.
//
// Figma fills the frame with a cropped raster of the map. We draw the same
// coastline from our brand/blue SVG (golfe-graphic-band.svg = golfe-graphic.svg
// with preserveAspectRatio="none"), placed so it matches the Figma crop:
// full width, 68.96 % of the width high (the SVG squashed to 0.818 of its
// height), its top above the frame. The values below are percentages of the
// frame height, measured against the Figma renders (within ~5px at 1440).
//
// Children are laid over the graphic (text, crest), positioned in % of the
// frame so they keep their place on the sea at every width.
const CROPS = {
  // 1440 × 809
  locations: { aspect: "aspect-[1440/809]", top: "-27.01%", height: "122.75%" },
  // 1440 × 800 (mobile 390 × 217, same proportions)
  about: { aspect: "aspect-[1440/800]", top: "-28.44%", height: "124.13%" },
} as const;

export function GolfeBand({
  crop,
  className = "",
  children,
}: {
  crop: keyof typeof CROPS;
  className?: string;
  children?: ReactNode;
}) {
  const c = CROPS[crop];
  return (
    <div className={`relative ${c.aspect} ${className}`}>
      {/* Only the map is clipped: overlays may reach a few px past the edge
          (the mobile About crest does in Figma). The map fades in (no
          movement, 900ms); overlays are siblings, so they can be revealed on
          their own, a little later (--reveal-delay). */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden {...revealFade}>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, stretched on purpose */}
        <img
          src="/locations/golfe-graphic-band.svg"
          alt=""
          className="absolute left-0 w-full max-w-none pointer-events-none select-none"
          style={{ top: c.top, height: c.height }}
        />
      </div>
      {children}
    </div>
  );
}
