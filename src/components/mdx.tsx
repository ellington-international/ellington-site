import Link from "@/components/LocaleLink";
import type { ComponentProps } from "react";

// MDX renderers for the journal articles. The typography itself is the
// `.article-prose` CSS in globals.css (Figma "08 Article"); these only add
// the structure it needs:
//   - internal links through LocaleLink (keeps the language, SPA navigation)
//   - list items: the text in one block next to the dot / number
//   - tables: a wrapper that scrolls sideways on narrow screens
function CustomA({ href, children, ...rest }: ComponentProps<"a">) {
  if (href && /^(\/|#)/.test(href)) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: CustomA,
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li {...props}>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="article-table">
      <table {...props} />
    </div>
  ),
};
