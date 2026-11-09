// Scroll reveal: what fades in (shared by the CSS in globals.css, the head
// script in the layout and <ScrollReveal>).
//   1. anything marked with the shared reveal (`<Reveal>` or `{...reveal}`
//      from components/ui/Reveal.tsx → data-reveal) inside <main>;
//   2. the cards of every card grid (`reveal-grid`, from cardGridCls);
//   3. the blocks of article text (`.article-prose`: paragraphs, headings,
//      lists, tables) on journal articles and the legal / privacy pages.
// An element inside another revealed element is left alone (no double
// animation).
export const REVEAL_SELECTOR = [
  "main [data-reveal]:not([data-reveal] *)",
  "main .reveal-grid > :not([data-reveal] *)",
  "main .article-prose > :not([data-reveal] *)",
].join(", ");

// Runs in <head> before the page is painted: switches the reveal on (CSS
// hides the elements above until <ScrollReveal> fades them in), unless the
// visitor asked for reduced motion or the browser lacks what it needs.
// Safety net: if the page script has not started after 5s, everything is
// shown, so content can never stay hidden. It is not final: when the page
// script does start (slow first load in dev, slow network), <ScrollReveal>
// switches the reveal back on for what is still below the screen.
export const REVEAL_HEAD_SCRIPT = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)||!Element.prototype.animate)return;d.setAttribute("data-reveal-on","");setTimeout(function(){if(!window.__revealStarted){d.removeAttribute("data-reveal-on");window.__revealTimedOut=true}},5000)}catch(e){}})();`;
