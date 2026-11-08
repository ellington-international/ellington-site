import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { asLang } from "@/lib/locale";
import { PAGE_META } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ signup?: string; next?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return PAGE_META.login[asLang((await params).lang)];
}

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  return <AuthForm mode="login" signupSuccess={sp.signup === "success"} next={sp.next} />;
}
