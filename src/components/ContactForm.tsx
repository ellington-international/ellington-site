"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ThankYouOverlay } from "./ThankYouOverlay";

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");

    const payload: Record<string, string> = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;
    // FormSubmit configuration fields
    payload._subject = "Nouveau message — site Ellington";
    payload._template = "table";
    payload._captcha = "false";

    // Dev-only test mode: on the local dev server, /contact?test shows the
    // thank-you overlay without sending anything to FormSubmit (no email to
    // Marc). Ignored in production builds.
    if (
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).has("test")
    ) {
      await new Promise((r) => setTimeout(r, 400));
      setState("ok");
      form.reset();
      return;
    }

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/marc@ellington-international.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      // FormSubmit always answers HTTP 200 with a JSON body (sent as
      // text/html), e.g. {"success":"true","message":"…"}. A message that was
      // NOT forwarded comes back as {"success":"false","message":"…"} — for
      // example "This form needs Activation" when the site address (such as
      // localhost) hasn't been activated for this inbox yet. Only a delivered
      // message counts as success; network errors and non-2xx are failures.
      const text = await res.text();
      let json: { success?: string | boolean; message?: string } = {};
      try {
        json = JSON.parse(text);
      } catch {
        /* not JSON: treated as a failure below */
      }
      const delivered = res.ok && String(json.success).toLowerCase() === "true";
      if (delivered) {
        setState("ok");
        form.reset();
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn("FormSubmit did not deliver the message:", res.status, json.message ?? text);
        }
        setState("err");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.warn("FormSubmit request failed:", err);
      setState("err");
    }
  }

  // Success: Figma thank-you overlay (request); the emptied form stays.
  return (
    <div>
      <ThankYouOverlay open={state === "ok"} variant="request" onClose={() => setState("idle")} />
      <h2 className="type-h3 mb-3">
        {t.contactPage.formTitle}
      </h2>
      <p className="text-muted mb-8">{t.contactPage.formSubtitle}</p>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Honeypot — bots fill this, humans don't (FormSubmit spam filter) */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label={t.contactPage.firstName}
            name="firstName"
            required
            placeholder={t.contactPage.firstNamePh}
          />
          <Field
            label={t.contactPage.lastName}
            name="lastName"
            required
            placeholder={t.contactPage.lastNamePh}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label={t.contactPage.emailField}
            name="email"
            type="email"
            required
            placeholder={t.contactPage.emailPh}
          />
          <Field
            label={t.contactPage.phone}
            name="phone"
            type="tel"
            placeholder={t.contactPage.phonePh}
          />
        </div>

        <label className="block">
          <span className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2">
            {t.contactPage.messageLabel} <span className="text-red-500">*</span>
          </span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full bg-[var(--panel)] border border-transparent focus:border-accent transition px-4 py-3.5 text-sm resize-none placeholder:text-muted/70"
            placeholder={t.contactPage.messagePlaceholder}
          />
        </label>

        <p className="text-xs text-muted leading-relaxed">
          {t.contactPage.disclaimer}
        </p>

        {state === "err" && (
          <p className="text-sm text-red-600">
            {lang === "en"
              ? "Sorry, something went wrong. Please try again or email us directly."
              : lang === "nl"
                ? "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks."
                : "Une erreur est survenue. Réessayez ou écrivez-nous directement."}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full flex items-center justify-center gap-2 px-10 py-4 bg-accent hover:bg-accent-hover text-white text-[11px] tracking-[0.22em] uppercase transition disabled:opacity-60"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          {state === "loading" ? t.common.sending : t.contactPage.sendMessage}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.22em] uppercase text-muted mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[var(--panel)] border border-transparent focus:border-accent transition px-4 py-3.5 text-sm placeholder:text-muted/70"
      />
    </label>
  );
}
