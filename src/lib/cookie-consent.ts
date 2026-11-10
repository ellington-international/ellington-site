export type ConsentChoice = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export const CONSENT_STORAGE_KEY = "ellington:cookie-consent";
export const CONSENT_VERSION = 1;

export const OPEN_CONSENT_EVENT = "ellington:open-cookie-consent";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice & { version?: number };
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Omit<ConsentChoice, "essential" | "timestamp">) {
  if (typeof window === "undefined") return;
  const value = {
    ...choice,
    essential: true as const,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
}
export function openConsentBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
