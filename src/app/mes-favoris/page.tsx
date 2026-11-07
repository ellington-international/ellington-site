import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { LogoutButton } from "@/components/LogoutButton";
import { cardGridCls } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mes favoris",
  description: "Retrouvez les biens que vous avez sauvegardés.",
};

export default async function MesFavorisPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/mes-favoris");

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

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted-strong mb-3">
              Espace personnel
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">Mes favoris</h1>
            <p className="text-sm text-muted">
              Connecté avec <span className="text-foreground">{user.email}</span>
            </p>
          </div>
          <LogoutButton />
        </div>

        {favorites.length === 0 ? (
          <div className="border border-[var(--border)] py-20 text-center">
            <p className="text-muted mb-6">
              Vous n'avez pas encore de bien favori.
            </p>
            <Link
              href="/properties"
              className="inline-block text-[13px] tracking-[0.18em] uppercase px-6 py-3 bg-accent text-white hover:bg-accent-hover transition"
            >
              Découvrir le portefeuille
            </Link>
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
  );
}
