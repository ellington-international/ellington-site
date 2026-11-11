"use client";

import { useEffect } from "react";
import { REVEAL_SELECTOR } from "@/lib/reveal";

// Engine of the shared scroll reveal (components/ui/Reveal.tsx), mounted
// once in the layout. The elements (lib/reveal.ts) are hidden by CSS from
// the first paint while html[data-reveal-on] is set (head script). Each is
// faded in once, when it comes into view: opacity 0 → 1 and 20px up, 0.7s,
// ease-out; elements arriving together follow each other 80ms apart (cards
// of a grid one after another). The fade is a Web Animation that keeps its
// end state until it finishes; then the element gets data-revealed and the
// animation is dropped (see show()). Written after hydration only, so the
// server and client HTML still match.
// A MutationObserver picks up everything added later: cards after
// filtering, Apimo results, the next page after client navigation. A
// language switch reloads the page, so it starts fresh.
// TEMPORARY (client check): very obvious motion — 80px over 1.5s. To be
// toned down to the subtle version (20px, 700ms) once confirmed; the same
// distance is in globals.css (› Scroll reveal).
const DURATION = 1500;
const STAGGER_MS = 80;
const MAX_STAGGER = 6;
// Standard ease-out: the movement is spread over the whole duration (the
// previous curve did ~99 % of it in the first half, so it hardly showed).
const EASING = "ease-out";
const FRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(80px)" },
  { opacity: 1, transform: "none" },
];
// Fade-only variant (data-reveal="fade", revealFade): for large full-bleed
// graphics, which would look heavy moving up. Opacity only, 900ms.
const FADE_DURATION = 900;
const FADE_FRAMES: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];

/** Extra delay from the element's --reveal-delay (CSS, so it can differ per
 *  breakpoint, e.g. xl:[--reveal-delay:200ms]), in ms; added to the stagger. */
const extraDelay = (el: Element) => {
  const v = getComputedStyle(el).getPropertyValue("--reveal-delay").trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return 0;
  return v.endsWith("ms") ? n : v.endsWith("s") ? n * 1000 : n;
};

declare global {
  interface Window {
    __revealStarted?: boolean;
    __revealTimedOut?: boolean;
  }
}

export function ScrollReveal() {
  useEffect(() => {
    const html = document.documentElement;
    const main = document.querySelector("main");
    if (!main) return;
    const seen = new WeakSet<Element>();
    const shown = new WeakSet<Element>();
    // duration 0 = show at once (already on screen / scrolled past).
    // When the animation ends, the element is marked data-revealed (the CSS
    // stops hiding it) and the animation is cancelled. A finished animation
    // kept alive with fill: "forwards" holds its element on a compositing
    // layer; with dozens of them (cards, photos) iPad Safari runs out of
    // layer memory and stops painting some layers — including the fixed
    // header while scrolling.
    const show = (el: Element, delay: number, duration?: number) => {
      shown.add(el);
      const fade = el.getAttribute("data-reveal") === "fade";
      const anim = el.animate(fade ? FADE_FRAMES : FRAMES, {
        duration: duration ?? (fade ? FADE_DURATION : DURATION),
        delay: duration === 0 ? 0 : delay + extraDelay(el),
        easing: EASING,
        fill: "forwards",
      });
      anim.finished
        .then(() => {
          el.setAttribute("data-revealed", "");
          anim.cancel();
        })
        .catch(() => {}); // cancelled elsewhere (element removed): nothing to do
    };

    if (!html.hasAttribute("data-reveal-on")) {
      // Not on: reduced motion / old browser (stay off), or the head
      // script's 5s safety net fired because this script started late
      // (slow first load). Then switch it back on — but first show
      // everything already on screen or above at once (a 0ms animation
      // that keeps its end state), so nothing visible disappears.
      if (!window.__revealTimedOut || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      main.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          seen.add(el);
          show(el, 0, 0);
        }
      });
      html.setAttribute("data-reveal-on", "");
    }
    window.__revealStarted = true;

    // Cards of the same grid row that are not shown yet come along with a
    // card that enters: e.g. a horizontal swipe row (Home, mobile) clips the
    // cards beyond the screen edge, so they would never count as "in view".
    const rowMates = (el: Element): Element[] => {
      const grid = el.parentElement;
      if (!grid?.classList.contains("reveal-grid")) return [];
      const r = el.getBoundingClientRect();
      return Array.from(grid.children).filter((c) => {
        if (c === el || shown.has(c) || !seen.has(c)) return false;
        const rc = c.getBoundingClientRect();
        return rc.top < r.bottom && rc.bottom > r.top; // same row
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const set = new Set<Element>();
        for (const e of entries) {
          if (!e.isIntersecting || shown.has(e.target)) continue;
          set.add(e.target);
          rowMates(e.target).forEach((m) => set.add(m));
        }
        const entering = [...set].sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        });
        entering.forEach((el, i) => {
          observer.unobserve(el);
          show(el, Math.min(i, MAX_STAGGER) * STAGGER_MS);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      main.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Already scrolled past (back navigation, anchor link): show at once.
        if (el.getBoundingClientRect().bottom < 0) show(el, 0, 0);
        else observer.observe(el);
      });
    };

    scan();
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (!queued)
        queued = requestAnimationFrame(() => {
          queued = 0;
          scan();
        });
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
