import Link from "@/components/LocaleLink";
import type { ComponentProps } from "react";

// Custom MDX renderers for our editorial style.
// Internal links go through Next.js <Link> for SPA navigation.
function CustomA({ href, children, ...rest }: ComponentProps<"a">) {
  if (href && /^(\/|#)/.test(href)) {
    return (
      <Link href={href} className="text-accent underline-offset-4 hover:underline">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline-offset-4 hover:underline"
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="font-serif text-3xl md:text-4xl mt-16 mb-6 leading-tight"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="font-serif text-2xl mt-12 mb-4 leading-snug"
      {...props}
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      className="font-serif text-xl mt-8 mb-3 italic"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-lg leading-[1.85] text-foreground/90 mb-6" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90 marker:text-accent" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/90 marker:text-accent marker:font-serif" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="leading-[1.75] text-lg" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-2 border-accent pl-6 my-8 italic font-serif text-2xl leading-snug text-foreground/85"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead className="bg-[var(--background-elev)] border-y border-[var(--border)]" {...props} />
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="text-[10px] tracking-[0.18em] uppercase text-muted text-left px-4 py-3 font-normal" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="px-4 py-3 border-b border-[var(--border)] align-top" {...props} />
  ),
  a: CustomA,
  hr: () => <hr className="my-12 border-[var(--border)]" />,
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};
