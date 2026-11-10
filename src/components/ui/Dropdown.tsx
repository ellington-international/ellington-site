"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
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
// Closing works the same with a mouse and on touch screens (iPhone):
//   tap / click the field again, choose an option, tap / click anywhere
//   outside (which is also what closes it when another dropdown is opened),
//   or Esc / Tab on the keyboard. Only one dropdown is open at a time.
// No "close on blur": Safari (iOS and macOS) doesn't focus a button when it
// is tapped, so a blur handler closed the list and the same tap re-opened it.
// The page keeps scrolling normally while a list is open; scrolling inside
// the list doesn't scroll the page (overscroll-contain).
// Keyboard: Enter / Space / ↓ / ↑ open; ↑ ↓ Home End move; Enter / Space
// select; Esc closes; typing a letter jumps to the first option with it.

// Options may carry a `group`: a small heading (Caps/Label, muted, hairline
// above) is drawn before the first option of each group. Headings can't be
// chosen and the keyboard skips them. (Not in Figma; used for "Other areas"
// in the Location filter.)
export type DropdownOption = { value: string; label: string; group?: string };

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
    if (refocus) buttonRef.current?.focus({ preventScroll: true });
  };
  const choose = (index: number) => {
    const o = options[index];
    if (o) onChange(o.value);
    close();
  };

  // Close on a click / tap anywhere outside this dropdown (this is also what
  // closes it when another dropdown is opened). Listens to touchstart as well
  // as pointerdown, in the capture phase, so iOS taps on plain text or photos
  // count too and nothing on the page can swallow the event first.
  useEffect(() => {
    if (!open) return;
    const onOutside = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside, true);
    document.addEventListener("touchstart", onOutside, { capture: true, passive: true });
    return () => {
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("touchstart", onOutside, { capture: true });
    };
  }, [open]);

  // When opened: focus the list so the keyboard works on it (without
  // scrolling the page).
  useEffect(() => {
    if (open) listRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Keep the active option visible while moving with the keyboard. Scrolls
  // only the list itself (scrollIntoView would also move the page on iOS).
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
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
          className="absolute left-0 right-0 top-full -mt-px z-30 max-h-[174px] overflow-y-auto overscroll-contain py-[4px] bg-surface border border-hairline shadow-[0_8px_24px_rgba(10,30,50,0.12)] outline-none"
        >
          {options.map((o, i) => (
            <Fragment key={o.value}>
            {o.group && o.group !== options[i - 1]?.group && (
              <li
                role="presentation"
                className="type-label text-muted mt-[4px] px-[14px] pt-[12px] pb-[6px] border-t border-hairline"
              >
                {o.group}
              </li>
            )}
            <li
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
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
