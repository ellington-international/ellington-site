"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/components/LocaleLink";
import { dict } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { ThankYouOverlay } from "./ThankYouOverlay";
import { Button } from "./ui/Button";

// Figma "09 Contact" › Form column (13:1934 / mobile 13:2049):
//   "Send us a message" (H2) + subtitle, 24px apart (mobile 20); form 28px
//   below: First / Last name, Email / Phone in two columns (20px gaps; mobile
//   one column, 24px apart), Message (160px), privacy note (Text/Small, with
//   a link to the privacy page), Primary "Send message".
//   Inputs: Caps/Label in brand/blue, 8px, white box with hairline border,
//   14 × 10 padding, Text/Input, placeholder #8ea0b3 (Figma).
// No Subject select and no consent checkbox (decision 7). The request comes
// from the address instead (decision 6): ?subject=valuation | consultation
// (+ &city= or &village=) or ?property=REF. It shows as a line above the
// form, starts the message, and becomes the e-mail subject for Marc (in
// French, whatever the page language).
// Success: the thank-you overlay (request). Dev only: /contact?test sends
// nothing (dry run).

type Request = { line: string; message: string; subjectFr: string } | null;

function useRequest(): Request {
  const params = useSearchParams();
  const { t } = useLanguage();
  const c = t.contactPage;
  const fr = dict.fr.contactPage;
  const clean = (v: string | null) => (v ?? "").trim().slice(0, 60);
  const subject = clean(params.get("subject"));
  const place = clean(params.get("city") || params.get("village"));
  const property = clean(params.get("property"));

  if (subject === "valuation") return { line: c.reqValuation, message: c.msgValuation, subjectFr: fr.reqValuation };
  if (subject === "consultation")
    return place
      ? { line: c.reqConsultationIn(place), message: c.msgConsultationIn(place), subjectFr: fr.reqConsultationIn(place) }
      : { line: c.reqConsultation, message: c.msgConsultation, subjectFr: fr.reqConsultation };
  if (property) return { line: c.reqProperty(property), message: c.msgProperty(property), subjectFr: fr.reqProperty(property) };
  return null;
}

export function ContactForm() {
  const { t } = useLanguage();
  const c = t.contactPage;
  const request = useRequest();
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");

    const payload: Record<string, string> = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // FormSubmit configuration fields
    payload._subject = request ? `${request.subjectFr} — site Ellington` : "Nouveau message — site Ellington";
    if (request) payload.Demande = request.subjectFr;
    payload._template = "table";
    payload._captcha = "false";

    // Dev-only dry run: /contact?test shows the overlay without sending.
    if (process.env.NODE_ENV === "development" && new URLSearchParams(window.location.search).has("test")) {
      await new Promise((r) => setTimeout(r, 400));
      setState("ok");
      form.reset();
      return;
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/marc@ellington-international.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      // FormSubmit always answers HTTP 200 with a JSON body (sent as
      // text/html): {"success":"true"} when the message was forwarded,
      // {"success":"false","message":"…"} when not (e.g. an unactivated site
      // address such as localhost). Only a delivered message counts.
      const text = await res.text();
      let json: { success?: string | boolean; message?: string } = {};
      try {
        json = JSON.parse(text);
      } catch {
        /* not JSON: failure below */
      }
      if (res.ok && String(json.success).toLowerCase() === "true") {
        setState("ok");
        form.reset();
      } else {
        if (process.env.NODE_ENV === "development") console.warn("FormSubmit did not deliver the message:", res.status, json.message ?? text);
        setState("err");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.warn("FormSubmit request failed:", err);
      setState("err");
    }
  }

  // Privacy note with the Figma wording; the phrase "privacy policy" links
  // to the privacy page.
  const [before, after] = c.disclaimer.split(c.privacyPhrase);

  return (
    <div>
      <ThankYouOverlay open={state === "ok"} variant="request" onClose={() => setState("idle")} />
      <div className="flex flex-col gap-[20px] md:gap-[24px]">
        <h2 className="type-h2">{c.formTitle}</h2>
        <p className="type-body">{c.formSubtitle}</p>
      </div>

      {request && (
        <p className="mt-[28px] flex flex-wrap items-baseline gap-x-[12px] gap-y-[4px]">
          <span className="type-label">{c.requestLabel}</span>
          <span className="type-eyebrow text-brand-accent">{request.line}</span>
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-[28px] grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[24px] md:gap-y-[20px]">
        {/* Honeypot — bots fill this, humans don't (FormSubmit spam filter) */}
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <Field label={c.firstName} name="firstName" required placeholder={c.firstNamePh} autoComplete="given-name" />
        <Field label={c.lastName} name="lastName" required placeholder={c.lastNamePh} autoComplete="family-name" />
        <Field label={c.emailField} name="email" type="email" required placeholder={c.emailPh} autoComplete="email" />
        <Field label={c.phone} name="phone" type="tel" placeholder={c.phonePh} autoComplete="tel" />
        <label className="md:col-span-2 flex flex-col gap-[8px]">
          <span className="type-label text-brand-blue">{c.messageLabel} *</span>
          <textarea
            name="message"
            required
            defaultValue={request?.message ?? ""}
            placeholder={c.messagePlaceholder}
            className={`${inputCls} h-[160px] resize-y`}
          />
        </label>

        <p className="md:col-span-2 type-small">
          {after !== undefined ? (
            <>
              {before}
              <Link href="/privacy" className="underline decoration-hairline underline-offset-[0.2em] hover:decoration-brand-accent transition-colors">
                {c.privacyPhrase}
              </Link>
              {after}
            </>
          ) : (
            c.disclaimer
          )}
        </p>

        {state === "err" && (
          <p className="md:col-span-2 type-small text-[#b42318]" role="alert">
            {c.sendError}
          </p>
        )}

        <div className="md:col-span-2">
          <Button type="submit" variant="primary" disabled={state === "loading"}>
            {state === "loading" ? t.common.sending : c.sendMessage}
          </Button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full px-[14px] py-[10px] bg-surface border border-hairline type-input text-body-text placeholder:text-[#8ea0b3] focus:border-brand-blue transition-colors";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-[8px]">
      <span className="type-label text-brand-blue">
        {label}
        {required && " *"}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className={inputCls} />
    </label>
  );
}
