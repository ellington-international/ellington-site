// Instant skeleton shown while the property server component fetches (Apimo).
// Without this, a dynamic route shows nothing on client navigation until the
// render completes — which feels frozen when the Apimo cache is cold.
export default function PropertyLoading() {
  return (
    <div className="pt-28 pb-20 animate-pulse">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* back button */}
        <div className="h-12 w-56 bg-[var(--panel)] mb-10" />

        {/* header: city, title, price */}
        <div className="mb-10">
          <div className="h-4 w-40 bg-[var(--panel)] mb-4" />
          <div className="h-12 w-3/4 max-w-2xl bg-[var(--panel)] mb-3" />
          <div className="h-8 w-32 bg-[var(--panel)]" />
        </div>

        {/* gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-3 aspect-[16/10] bg-[var(--panel)]" />
          <div className="hidden md:grid grid-rows-3 gap-3">
            <div className="bg-[var(--panel)]" />
            <div className="bg-[var(--panel)]" />
            <div className="bg-[var(--panel)]" />
          </div>
        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="h-28 bg-[var(--panel)]" />
              <div className="h-28 bg-[var(--panel)]" />
              <div className="h-28 bg-[var(--panel)]" />
              <div className="h-28 bg-[var(--panel)]" />
            </div>
            <div className="space-y-3">
              <div className="h-8 w-48 bg-[var(--panel)] mb-4" />
              <div className="h-4 w-full bg-[var(--panel)]" />
              <div className="h-4 w-full bg-[var(--panel)]" />
              <div className="h-4 w-5/6 bg-[var(--panel)]" />
            </div>
          </div>
          <div className="h-80 bg-[var(--panel)]" />
        </div>
      </div>
    </div>
  );
}
