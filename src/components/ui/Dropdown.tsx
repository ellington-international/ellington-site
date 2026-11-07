"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

// Figma "Search field" (2068:275) = "Filter field" (5:47) + "Dropdown option"
// (2068:53). Label ABOVE a separate white box (Caps/Label, 8px gap):
//   context "light"  label brand/blue, box border line/hairline
//   context "photo"  label white,      box border white
// Box: 42px high, padding 14 / 16, value in Text/Input (text/body), chevron
// 10×6. Open: box border brand/blue, chevron flipped, option list right
// under the box (white, hairline border, soft shadow, max 174px, scrolls).
// Option: 10 / 14 padding, Text/Input; hover/keyboard focus surface/light +
// brand/blue text.
//
// Only one dropdown is open at a time: opening another one is a click (or
// focus) outside the first, which closes it.
// Keyboard: Enter / Space / ↓ / ↑ open; ↑ ↓ Home End move; Enter / Space
// select; Esc closes; typing a letter jumps to the first option with it.

export type DropdownOption = { value: string; label: string };

export function Dropdown({
  label,
  value,
  options,
  onChange,
  context = "light",
  className = "",
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  context?: "light" | "photo";
  className?: string;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selected = options[selectedIndex];

  const openList = (index = selectedIndex) => {
    setActive(index);
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };
  const choose = (index: number) => {
    const o = options[index];
    if (o) onChange(o.value);
    close();
  };

  // Close on a click / tap anywhere outside this dropdown (this is also what
  // closes it when another dropdown is opened).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // When opened: focus the list so the keyboard works on it.
  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  // Keep the active option visible while moving with the keyboard.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onButtonKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  };

  const onListKey = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const k = e.key.toLocaleLowerCase();
          const start = active + 1;
          const order = [...options.slice(start), ...options.slice(0, start)];
          const hit = order.find((o) => o.label.toLocaleLowerCase().startsWith(k));
          if (hit) setActive(options.indexOf(hit));
        }
    }
  };

  const onPhoto = context === "photo";

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col gap-[8px] min-w-0 ${className}`}
      // Focus moving out of the dropdown (Tab, or clicking a link) closes it.
      onBlur={(e) => {
        if (open && !rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <span id={labelId} className={`type-label ${onPhoto ? "text-white" : "text-brand-blue"}`}>
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onButtonKey}
        className={`h-[42px] w-full flex items-center justify-between gap-xs pl-[14px] pr-[16px] bg-surface border text-left transition-colors ${
          open ? "border-brand-blue" : onPhoto ? "border-white" : "border-hairline"
        }`}
      >
        <span id={`${id}-value`} className="type-input text-body-text truncate">
          {selected?.label}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- 10×6 static SVG from Figma */}
        <img
          src="/ui/chevron-down.svg"
          alt=""
          width={10}
          height={6}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          // Keep focus on the list while clicking an option, otherwise the
          // blur above would close it before the click lands.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 right-0 top-full -mt-px z-30 max-h-[174px] overflow-y-auto py-[4px] bg-surface border border-hairline shadow-[0_8px_24px_rgba(10,30,50,0.12)] outline-none"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              data-index={i}
              role="option"
              aria-selected={i === selectedIndex}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`type-input px-[14px] py-[10px] cursor-pointer ${
                i === active ? "bg-surface-light text-brand-blue" : "text-body-text"
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
