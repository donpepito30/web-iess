import { onCLS, onINP, onLCP, onTTFB } from "web-vitals";

// Environment variables with safe fallbacks
export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-placeholder-12345678";
export const ADS_ENABLED = import.meta.env.VITE_ADS_ENABLED === "true";

// Helper to check current template from pathname or global app state
export function getCurrentTemplate(): string {
  if (typeof window === "undefined") return "unknown";
  const path = window.location.pathname;
  if (path === "/" || path === "") return "home";
  if (path.startsWith("/procedimiento/")) return "procedure";
  if (path.startsWith("/blog/")) return "blog_post";
  if (path === "/blog") return "blog_list";
  if (path.startsWith("/iess/")) return "city_page";
  if (path === "/iess") return "city_index";
  if (path === "/faq") return "faq";
  if (path === "/oficios") return "oficios";
  return "other";
}

/**
 * Tracks custom ad performance events in GA4
 */
export function trackAdEvent(
  eventName: "ad_view" | "ad_impression_slot",
  params: { slot: string; format: string; template: string }
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      ...params,
      non_interaction: true,
    });
    console.log(`[Ads Analytics] Tracked event "${eventName}":`, params);
  }
}

/**
 * Injects Google AdSense script asynchronously if ads are enabled and consent is processed.
 * Supports Non-Personalized Ads (NPA) if advertising consent is denied but the network allows it.
 */
export function initAds(consentAdvertisingGranted: boolean) {
  if (typeof window === "undefined") return;

  if (!ADS_ENABLED) {
    console.log("[Ads] Monetization is disabled via VITE_ADS_ENABLED=false");
    return;
  }

  const existingScript = document.getElementById("adsense-script");
  if (existingScript) {
    // Already loaded or loading. Let's adjust personalized settings based on updated consent.
    updateAdSenseConsentSettings(consentAdvertisingGranted);
    return;
  }

  console.log(`[Ads] Initializing monetization (Consent advertising: ${consentAdvertisingGranted})`);

  // Configure non-personalized ads before loading script if consent is denied
  updateAdSenseConsentSettings(consentAdvertisingGranted);

  const script = document.createElement("script");
  script.id = "adsense-script";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  
  // Set non-blocking attributes
  script.setAttribute("data-ad-client", ADSENSE_CLIENT);
  
  document.head.appendChild(script);
}

/**
 * Updates AdSense request settings dynamically depending on the user's advertising consent status.
 */
function updateAdSenseConsentSettings(consentGranted: boolean) {
  if (typeof window === "undefined") return;
  const g = (window as any);
  g.adsbygoogle = g.adsbygoogle || [];
  
  if (!consentGranted) {
    console.log("[Ads] Consent denied. Configuring non-personalized ads (NPA).");
    // Flag AdSense for non-personalized requests
    g.adsbygoogle.requestNonPersonalizedAds = 1;
  } else {
    console.log("[Ads] Consent granted. Configuring personalized ads.");
    g.adsbygoogle.requestNonPersonalizedAds = 0;
  }
}

/**
 * Initialize Web Vitals performance tracking and send metrics to GA4
 */
export function initWebVitals() {
  if (typeof window === "undefined") return;

  function sendToGA4({ name, value, delta, id }: any) {
    if ((window as any).gtag) {
      const template = getCurrentTemplate();
      
      // Values must be rounded integers for general GA4 'value' parameter
      const roundedValue = name === "CLS" ? Math.round(value * 1000) : Math.round(value);
      
      (window as any).gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: id,
        value: roundedValue,
        metric_name: name,
        metric_value: value,
        metric_id: id,
        metric_delta: delta,
        page_path: window.location.pathname,
        page_template: template,
        non_interaction: true,
      });

      // Special event to track CLS impact by page template
      if (name === "CLS") {
        (window as any).gtag("event", "ad_cls_impact", {
          template,
          cls_value: value,
          page_path: window.location.pathname,
          non_interaction: true,
        });
      }
    }
  }

  // Subscribe to performance metrics
  try {
    onCLS(sendToGA4);
    onINP(sendToGA4);
    onLCP(sendToGA4);
    onTTFB(sendToGA4);
    console.log("[Performance] Web Vitals metric collection initialized.");
  } catch (err) {
    console.warn("[Performance] Failed to initialize web vitals listeners:", err);
  }
}

/**
 * Convenient alias for initAds
 */
export const initAdSense = (consentAdvertisingGranted: boolean = false) => {
  initAds(consentAdvertisingGranted);
};
