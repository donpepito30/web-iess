export function getSiteUrl(): string {
  let url = "";
  if (typeof process !== "undefined" && process.env && process.env.SITE_URL) {
    url = process.env.SITE_URL;
  } else if (typeof import.meta !== "undefined" && (import.meta as any).env && (import.meta as any).env.VITE_SITE_URL) {
    url = (import.meta as any).env.VITE_SITE_URL;
  }
  
  if (!url) {
    url = "https://ieesciudadano.vercel.app";
  }
  
  // Remove trailing slash if present
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  
  return url;
}

export const CURRENT_YEAR = 2026;

export const SITE = {
  name: "IESS Asistente",
  locale: "es-EC",
  language: "es"
};
