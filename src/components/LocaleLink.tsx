"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "@/lib/locale";
import { useLanguage } from "./LanguageProvider";

/**
 * next/link that keeps the current language: href="/properties" becomes
 * "/en/properties" on an English page. External links, anchors, files and
 * paths that already carry a language are left alone; blog articles always
 * point to /fr (French only). Use it for every internal link.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { lang } = useLanguage();
  return <NextLink href={typeof href === "string" ? localePath(lang, href) : href} {...props} />;
}
