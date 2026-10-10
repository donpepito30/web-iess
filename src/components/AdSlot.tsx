import React, { useEffect, useRef, useState } from "react";
import { ADS_ENABLED, ADSENSE_CLIENT, trackAdEvent, getCurrentTemplate } from "../lib/ads";

interface AdSlotProps {
  slot: string;
  format: "in-article" | "display" | "sticky-footer" | "sidebar";
  minHeight?: number;
}

export default function AdSlot({ slot, format, minHeight }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  // Determine standard minimum height based on format to reserve space and eliminate CLS
  const getMinHeight = () => {
    if (minHeight !== undefined) return minHeight;
    switch (format) {
      case "sticky-footer":
        return 90; // Standard mobile banner / desktop leaderboard heights
      case "sidebar":
        return 600; // Standard skyscraper
      case "in-article":
        return 280; // Standard in-article rectangle
      case "display":
        return 250; // Standard square / banner
      default:
        return 150;
    }
  };

  const resolvedMinHeight = getMinHeight();

  // Helper to parse cookie consent from localStorage
  const checkConsent = () => {
    try {
      const saved = localStorage.getItem("cookie_consent_preferences");
      if (saved) {
        const parsed = JSON.parse(saved);
        return !!parsed.advertising;
      }
    } catch (e) {
      console.warn("[AdSlot] Error reading cookie consent preferences:", e);
    }
    return false;
  };

  // 1. Monitor consent status
  useEffect(() => {
    // Check initially
    setHasConsent(checkConsent());

    // Listen to localStorage changes (from other tabs / components)
    const handleStorageChange = () => {
      setHasConsent(checkConsent());
    };
    window.addEventListener("storage", handleStorageChange);

    // Dynamic dataLayer interception or click tracking fallback to detect consent changes in real-time
    const interval = setInterval(() => {
      const currentConsent = checkConsent();
      setHasConsent((prev) => {
        if (prev !== currentConsent) {
          return currentConsent;
        }
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 2. IntersectionObserver for Lazy Loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "200px 0px", // Trigger slightly before it comes into view for better UX
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 3. Load AdSense ad unit once element is visible, consent is resolved, and ads are enabled
  useEffect(() => {
    if (!isVisible) return;
    if (!ADS_ENABLED) return;

    // We can show ads either if they granted consent OR if we display non-personalized ads (which is safe)
    // If we have no consent, we load but AdSense is configured for non-personalized ads (requestNonPersonalizedAds=1) in ads.ts.
    // However, we only load AdSense if ads are globally enabled.

    try {
      const g = (window as any);
      g.adsbygoogle = g.adsbygoogle || [];
      
      // Prevent double pushing for the same element
      if (!isLoaded) {
        g.adsbygoogle.push({});
        setIsLoaded(true);

        // Track events
        const template = getCurrentTemplate();
        trackAdEvent("ad_view", { slot, format, template });
        trackAdEvent("ad_impression_slot", { slot, format, template });
        console.log(`[AdSlot] Injected ad unit ${slot} for format "${format}"`);
      }
    } catch (err) {
      console.error("[AdSlot] Error pushing to adsbygoogle:", err);
    }
  }, [isVisible, isLoaded]);

  // Safety filter to enforce non-negotiable principles:
  // "en páginas de quejas/denuncias y de emergencia médica, sin anuncios."
  const isExcludedPage = () => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    
    return (
      path.includes("queja") ||
      path.includes("denuncia") ||
      path.includes("oficios") ||
      path.includes("reclamo") ||
      path.includes("emergencia") ||
      path.includes("urgencia") ||
      title.includes("queja") ||
      title.includes("denuncia") ||
      title.includes("oficio") ||
      title.includes("reclamo") ||
      title.includes("emergencia") ||
      title.includes("urgencia")
    );
  };

  // If ads are globally disabled or this is an excluded page, do not render anything to preserve editorial spacing
  if (!ADS_ENABLED || isExcludedPage()) {
    return null;
  }

  // Choose appropriate class name depending on format
  const getFormatClasses = () => {
    switch (format) {
      case "sticky-footer":
        return "fixed bottom-0 left-0 right-0 z-50 bg-slate-50 border-t border-slate-200 py-1.5 flex flex-col items-center justify-center shadow-lg w-full";
      case "sidebar":
        return "sticky top-20 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center select-none w-full";
      case "in-article":
        return "my-6 p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col items-center justify-center select-none w-full";
      case "display":
        return "my-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center select-none w-full";
      default:
        return "my-4 w-full";
    }
  };

  return (
    <div
      ref={containerRef}
      className={getFormatClasses()}
      style={{ minHeight: format === "sticky-footer" ? undefined : `${resolvedMinHeight}px` }}
    >
      {/* Label "Publicidad" in quiet, non-obtrusive, compliant text */}
      <div className="text-[9px] text-slate-400 uppercase font-mono tracking-widest mb-1.5 text-center w-full select-none">
        Publicidad — {hasConsent ? "Anuncio Personalizado" : "Anuncio No Personalizado"}
      </div>

      <div className="w-full flex items-center justify-center overflow-hidden">
        {/* AdSense ins element */}
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            height: format === "sticky-footer" ? "90px" : "auto",
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format === "in-article" ? "fluid" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
