export const DEFAULT_SITE_URL = "https://ieesciudadano.vercel.app";

/**
 * Server-only site URL getter.
 * Reads strictly from process.env.SITE_URL without referencing import.meta,
 * preventing esbuild CJS bundle warnings.
 */
export function getSiteUrlServer(): string {
  let url = "";
  if (typeof process !== "undefined" && process.env && process.env.SITE_URL) {
    url = process.env.SITE_URL;
  }

  if (!url) {
    url = DEFAULT_SITE_URL;
  }

  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

/**
 * Client-only site URL getter.
 * Reads strictly from import.meta.env.VITE_SITE_URL.
 * If VITE_SITE_URL is not provided, extracts origin from injected <link rel="canonical">
 * or window.location.origin.
 */
export function getSiteUrlClient(): string {
  let url = "";

  if (typeof import.meta !== "undefined" && (import.meta as any).env && (import.meta as any).env.VITE_SITE_URL) {
    url = (import.meta as any).env.VITE_SITE_URL;
  }

  if (!url && typeof document !== "undefined") {
    const canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (canonicalLink && canonicalLink.href) {
      try {
        const parsed = new URL(canonicalLink.href);
        url = parsed.origin;
      } catch {
        // invalid URL fallback
      }
    }
  }

  if (!url && typeof window !== "undefined" && window.location && window.location.origin) {
    url = window.location.origin;
  }

  if (!url) {
    url = DEFAULT_SITE_URL;
  }

  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
}

/**
 * Default alias for client-side usage
 */
export const getSiteUrl = getSiteUrlClient;

export const CURRENT_YEAR = 2026;

export const SITE = {
  name: "IESS Asistente",
  locale: "es-EC",
  language: "es"
};
