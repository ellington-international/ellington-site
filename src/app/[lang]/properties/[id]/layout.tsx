import { notFound } from "next/navigation";
import { getProperties, getProperty } from "@/lib/properties";

// Real 404 for listings that don't exist (sold, removed, mistyped IDs).
// The page has a loading skeleton (loading.tsx), so it starts streaming
// before it knows whether the listing exists, and a streamed response can no
// longer change its status: notFound() in the page alone gives the 404 page
// with status 200 (a "soft 404" for Google, e.g. on old /properties/<id>
// links). This layout sits outside the skeleton's boundary, so checking here
// sets a real 404 status (Next.js docs, loading.js › Status Codes).
// It checks the ID against the listing list (cached for 10 minutes, so it's
// quick and the skeleton still shows), and only looks the listing up directly
// when the ID is not in the list.
export default async function PropertyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; id: string }>;
}) {
  const { id } = await params;
  const listed = (await getProperties()).some((p) => p.id === id);
  if (!listed && !(await getProperty(id))) notFound();
  return children;
}
