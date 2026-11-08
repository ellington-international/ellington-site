// Instant skeleton shown while the property page loads (Apimo can be slow on
// a cold cache). Same layout as the Figma property page ("03 Property"):
// back link, title row with price, 16:9 gallery + 8 thumbnails, then the
// main column (key figures, text) and the aside boxes. Blocks in
// surface/light, gently pulsing (no pulse with "reduce motion").
export default function PropertyLoading() {
  const block = "bg-surface-light";
  return (
    <div className="container-wrap pt-[calc(var(--nav-height)+48px)] pb-section motion-safe:animate-pulse" aria-busy="true">
      <div className={`${block} h-[19px] w-[180px]`} />

      <div className="mt-[32px] flex flex-col md:flex-row md:items-end md:justify-between gap-[16px] md:gap-[40px]">
        <div className="flex flex-col gap-[16px] w-full max-w-[820px]">
          <div className={`${block} h-[17px] w-[120px]`} />
          <div className={`${block} h-[29px] md:h-[43px] w-full`} />
          <div className={`${block} h-[29px] md:h-[43px] w-2/3`} />
        </div>
        <div className={`${block} h-[29px] md:h-[43px] w-[90px]`} />
      </div>

      <div className={`${block} mt-[36px] aspect-[334/197] md:aspect-[16/9]`} />
      <div className="mt-[8px] grid grid-cols-4 md:grid-cols-8 gap-[8px]">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`${block} aspect-[148/99]`} />
        ))}
      </div>

      <div className="mt-[48px] md:mt-[72px] grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-x-[80px] gap-y-[56px]">
        <div className="flex flex-col gap-[56px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[20px] md:gap-x-[32px] gap-y-[24px]">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="border-t border-hairline pt-[24px] flex flex-col gap-[12px]">
                <div className={`${block} h-[44px] md:h-[62px] w-3/4`} />
                <div className={`${block} h-[15px] w-1/2`} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className={`${block} h-[44px] md:h-[62px] w-[260px]`} />
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`${block} h-[15px] ${i === 5 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[36px] md:gap-[48px]">
          {[251, 256, 132].map((h) => (
            <div key={h} className="border-t border-hairline pt-[24px]">
              <div className={block} style={{ height: h - 24 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
