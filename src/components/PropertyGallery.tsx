"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";

interface Picture {
  url: string;
  alt?: string;
}

// Figma "Gallery" (2048:1087, on the page 2049:1170 / mobile 2049:2545) +
// "Thumbnails" (11:22 / 11:290):
//   main photo 16:9 (mobile 334 × 197), white 92 % square arrows (48px,
//   ‹ › in H3) 20px from the sides, counter "1 / 8" bottom right (Text/Small
//   on white 92 %, 12 × 6). Swipe left / right on touch screens.
//   Thumbnails 8px below: 8 in a row (mobile 2 rows of 4), 8px apart, ratio
//   148 × 99; current one full opacity with a 2px champagne line below, the
//   others at 50 %. Only the first 8 are shown; the arrows go through all.
//   Clicking the photo opens it full screen (Esc / arrows / click to close).
export function PropertyGallery({
  pictures,
  title,
  overlay,
}: {
  pictures: Picture[];
  title: string;
  /** Extra element on the photo (the favourite heart, top right) */
  overlay?: ReactNode;
}) {
  const { t } = useLanguage();
  const pd = t.propertyDetail;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef<number | null>(null);

  const total = pictures.length;
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  if (total === 0) return null;
  const main = pictures[active];
  const arrowCls =
    "absolute top-1/2 -translate-y-1/2 size-[48px] flex items-center justify-center bg-white/92 hover:bg-white text-brand-blue font-serif font-medium text-[24px] leading-none transition-colors";

  return (
    <>
      <div
        className="relative aspect-[334/197] md:aspect-[16/9] overflow-hidden bg-surface-light"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null || total < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
      >
        <button type="button" onClick={() => setLightbox(true)} className="absolute inset-0 cursor-zoom-in" aria-label={pd.photoOpen}>
          <Image
            src={main.url}
            alt={main.alt ?? title}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1440px) 1240px, (min-width: 768px) calc(100vw - 200px), calc(100vw - 56px)"
            className="object-cover"
          />
        </button>

        {total > 1 && (
          <>
            <button type="button" onClick={prev} aria-label={pd.photoPrev} className={`${arrowCls} left-[12px] md:left-[20px]`}>
              ‹
            </button>
            <button type="button" onClick={next} aria-label={pd.photoNext} className={`${arrowCls} right-[12px] md:right-[20px]`}>
              ›
            </button>
            <p className="absolute bottom-[12px] right-[12px] md:bottom-[20px] md:right-[20px] bg-white/92 px-[12px] py-[6px] type-small text-brand-blue pointer-events-none" aria-live="polite">
              {active + 1} / {total}
            </p>
          </>
        )}

        {overlay && <div className="absolute top-[12px] right-[12px] md:top-[20px] md:right-[20px]">{overlay}</div>}
      </div>

      {total > 1 && (
        <div className="mt-[8px] grid grid-cols-4 md:grid-cols-8 gap-[8px]">
          {pictures.slice(0, 8).map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={pd.photoN(i + 1)}
              aria-current={i === active}
              className={`relative aspect-[148/99] overflow-hidden transition-opacity ${
                i === active ? "border-b-2 border-brand-accent" : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={p.url} alt="" fill sizes="(min-width: 768px) 148px, 80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full-screen view (not in Figma; kept from the previous gallery) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 text-white font-light text-[32px] leading-none p-3 hover:bg-white/10 transition"
            aria-label={t.nav.close}
          >
            ×
          </button>
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={pd.photoPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white font-serif text-[40px] leading-none p-3 hover:bg-white/10 transition"
            >
              ‹
            </button>
          )}
          <div className="relative max-w-6xl w-full aspect-[3/2]" onClick={(e) => e.stopPropagation()}>
            <Image src={main.url} alt={main.alt ?? title} fill className="object-contain" sizes="100vw" />
          </div>
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={pd.photoNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white font-serif text-[40px] leading-none p-3 hover:bg-white/10 transition"
            >
              ›
            </button>
          )}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 type-small">
            {active + 1} / {total}
          </p>
        </div>
      )}
    </>
  );
}
