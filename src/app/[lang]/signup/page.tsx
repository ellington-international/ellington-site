import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { asLang } from "@/lib/locale";
import { PAGE_META } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return PAGE_META.signup[asLang((await params).lang)];
}

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
