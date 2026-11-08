"use client";

// TEMPORARY demos for /styleguide (steps 10–11). Delete with the page (step 24).
import { useState } from "react";
import { Chip } from "@/components/ui/SmallParts";
import { Button } from "@/components/ui/Button";
import { ThankYouOverlay } from "@/components/ThankYouOverlay";

export function ChipDemo() {
  const items = ["All", "Buyer's guides", "Market analysis", "Lifestyle", "Villages"];
  const [active, setActive] = useState(items[0]);
  return (
    <div className="flex flex-wrap gap-x-[28px] gap-y-sm">
      {items.map((i) => (
        <Chip key={i} active={active === i} onClick={() => setActive(i)}>
          {i}
        </Chip>
      ))}
    </div>
  );
}

export function OverlayDemo() {
  const [open, setOpen] = useState<null | "request" | "newsletter">(null);
  return (
    <div className="flex flex-wrap gap-sm">
      <Button variant="primary" onClick={() => setOpen("request")}>
        Open “request” overlay
      </Button>
      <Button variant="outline" onClick={() => setOpen("newsletter")}>
        Open “newsletter” overlay
      </Button>
      <ThankYouOverlay open={open !== null} variant={open ?? "request"} onClose={() => setOpen(null)} />
    </div>
  );
}
