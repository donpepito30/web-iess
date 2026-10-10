// GA4 Tracking & Analytics Suite for IESS Asistente
// Fully compliant with Google Consent Mode v2 and user privacy policies

export type ConsentStatus = {
  necessary: boolean;
  analytical: boolean;
  advertising: boolean;
};

/**
 * Checks if analytical consent is actively granted
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("cookie_consent_preferences");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.analytical);
  } catch {
    return false;
  }
}

/**
 * General purpose GA4 event sender respecting Consent Mode v2
 */
export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  // Verify user consent before pushing tracking events
  if (!hasAnalyticsConsent() && eventName !== "cookie_consent") {
    return;
  }

  const g = (window as any);
  if (typeof g.gtag === "function") {
    g.gtag("event", eventName, {
      page_path: window.location.pathname,
      ...params,
    });
  } else if (Array.isArray(g.dataLayer)) {
    g.dataLayer.push({
      event: eventName,
      page_path: window.location.pathname,
      ...params,
    });
  }
}

/**
 * Pre-defined tracking helper methods
 */
export const analytics = {
  search: (query: string, resultsCount?: number) => {
    trackEvent("search", {
      search_term: query,
      results_count: resultsCount,
    });
  },

  procedureView: (procedureId: string, procedureTitle: string) => {
    trackEvent("procedure_view", {
      procedure_id: procedureId,
      procedure_title: procedureTitle,
    });
  },

  articleRead: (articleSlug: string, scrollPercent: 50 | 90) => {
    trackEvent("article_read", {
      article_slug: articleSlug,
      scroll_percent: scrollPercent,
      depth_threshold: `${scrollPercent}%`,
    });
  },

  chatStart: (entryPoint: "main_chat" | "fab_chat") => {
    trackEvent("chat_start", {
      entry_point: entryPoint,
    });
  },

  chatMessage: (messageLength: number, role: "user" | "assistant", isSimulated: boolean = false) => {
    // Zero personal data transmitted
    trackEvent("chat_message", {
      message_length: messageLength,
      sender_role: role,
      is_simulated: isSimulated,
    });
  },

  toolStart: (toolName: string) => {
    trackEvent("tool_start", {
      tool_name: toolName,
    });
  },

  toolComplete: (toolName: string, success: boolean = true) => {
    trackEvent("tool_complete", {
      tool_name: toolName,
      success,
    });
  },

  outboundClick: (url: string, destinationType: "iess" | "biess" | "other") => {
    trackEvent("outbound_click", {
      destination_url: url,
      destination_type: destinationType,
      is_satisfaction_goal: destinationType === "iess" || destinationType === "biess",
    });
  },

  adView: (slot: string, format: string) => {
    trackEvent("ad_view", {
      ad_slot: slot,
      ad_format: format,
    });
  },

  cookieConsent: (preferences: ConsentStatus, action: "accept_all" | "reject_all" | "custom_save") => {
    trackEvent("cookie_consent", {
      consent_action: action,
      analytical_granted: preferences.analytical,
      advertising_granted: preferences.advertising,
      necessary_granted: preferences.necessary,
    });
  },
};
