import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { LogoutButton } from "@/components/LogoutButton";
import { cardGridCls } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dict } from "@/lib/i18n";
import { asLang } from "@/lib/locale";
import { PAGE_META } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return PAGE_META.favorites[asLang((await params).lang)];
}

export default async function MesFavorisPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${lang}/login?next=/${lang}/mes-favoris`);

  const { data: rows } = await supabase
    .from("favorites")
    .select("property_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const ids = rows?.map((r) => r.property_id) ?? [];
  const all = await getProperties();
  const favorites = ids
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const f = dict[lang].favoritesPage;

  // Not in Figma (step 23): Section header (H1 in the H2 style), logout as a
  // text link, the property cards grid; empty state in a hairline box with a
  // Primary button.
  return (
    <section className="bg-surface pt-nav">
      <div className="container-wrap section-y">
        <SectionHeader
          as="h1"
          eyebrow={f.eyebrow}
          title={f.title}
          subtitle={
            <span className="type-small block">
              {f.signedInAs} <span className="text-brand-blue">{user.email}</span>
            </span>
          }
          action={<LogoutButton />}
        />

        <div className="mt-[40px] md:mt-[56px]">
          {favorites.length === 0 ? (
            <div className="border border-hairline px-[24px] py-[64px] md:py-[96px] flex flex-col items-center gap-[28px] text-center">
              <p className="type-body">{f.empty}</p>
              <ButtonLink href="/properties" variant="primary">
                {f.discover}
              </ButtonLink>
            </div>
          ) : (
            <div className={cardGridCls}>
              {favorites.map((p) => (
                <PropertyCard key={p.id} property={p} initialFavored />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
