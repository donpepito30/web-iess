import React, { useState, useEffect } from "react";
import { ShieldAlert, Settings, Check, X } from "lucide-react";

interface CookieSettings {
  necessary: boolean;
  analytical: boolean;
  advertising: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytical: false,
    advertising: false
  });

  useEffect(() => {
    // 1. Initialize Consent Mode v2 variables to "denied" by default
    if (typeof window !== "undefined") {
      const g = (window as any);
      g.dataLayer = g.dataLayer || [];
      function gtag() {
        g.dataLayer.push(arguments);
      }
      if (!g.gtag) {
        g.gtag = gtag;
      }
      
      // Default GCM v2 denied
      g.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }

    // 2. Load preferences from localStorage
    const savedConsent = localStorage.getItem("cookie_consent_preferences");
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(savedConsent) as CookieSettings;
        setSettings(parsed);
        applyConsent(parsed);
      } catch (e) {
        setShowBanner(true);
      }
    }

    // 3. Listen for global open event
    const handleOpenConsent = () => {
      setShowBanner(true);
      setShowSettings(true);
    };
    window.addEventListener("open-cookie-settings", handleOpenConsent);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenConsent);
    };
  }, []);

  const applyConsent = (pref: CookieSettings) => {
    if (typeof window !== "undefined") {
      const g = (window as any);
      g.dataLayer = g.dataLayer || [];
      
      // Google Consent Mode v2 Updates
      g.gtag('consent', 'update', {
        'analytics_storage': pref.analytical ? 'granted' : 'denied',
        'ad_storage': pref.advertising ? 'granted' : 'denied',
        'ad_user_data': pref.advertising ? 'granted' : 'denied',
        'ad_personalization': pref.advertising ? 'granted' : 'denied'
      });

      // Push custom event for tag manager or other scripts
      g.dataLayer.push({
        event: 'consent_updated',
        consent_necessary: pref.necessary,
        consent_analytical: pref.analytical,
        consent_advertising: pref.advertising
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytical: true,
      advertising: true
    };
    setSettings(allAccepted);
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(allAccepted));
    applyConsent(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true,
      analytical: false,
      advertising: false
    };
    setSettings(allRejected);
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(allRejected));
    applyConsent(allRejected);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie_consent_preferences", JSON.stringify(settings));
    applyConsent(settings);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-4 sm:p-5 z-100 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-[#0a1f42]">
            Consentimiento de Privacidad y Cookies
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Utilizamos cookies independientes para optimizar análisis estadísticos y publicidad. Cumplimos rigurosamente la Ley de Protección de Datos Personales (LOPDP) de Ecuador. Puedes personalizar tus preferencias.
          </p>
        </div>
      </div>

      {showSettings && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3">
          {/* Necessary */}
          <div className="flex items-start justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-[#0a1f42] block">Necesarias y Técnicas</span>
              <span className="text-slate-500 block leading-normal">Obligatorias para el funcionamiento del portal, guardar tus preferencias de privacidad y oficios.</span>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="mt-1 w-4 h-4 text-[#c9a84c] border-slate-300 rounded focus:ring-[#c9a84c] accent-[#c9a84c]"
            />
          </div>

          {/* Analytical */}
          <div className="flex items-start justify-between gap-3 text-xs border-t border-slate-200 pt-3">
            <div className="space-y-0.5">
              <span className="font-extrabold text-[#0a1f42] block">Cookies Estadísticas (GA4)</span>
              <span className="text-slate-500 block leading-normal">Permiten monitorear visitas anónimas, rendimiento de lectura del blog y tiempos de respuesta.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.analytical}
              onChange={(e) => setSettings({ ...settings, analytical: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#c9a84c] border-slate-300 rounded focus:ring-[#c9a84c] accent-[#c9a84c]"
            />
          </div>

          {/* Advertising */}
          <div className="flex items-start justify-between gap-3 text-xs border-t border-slate-200 pt-3">
            <div className="space-y-0.5">
              <span className="font-extrabold text-[#0a1f42] block">Cookies Publicitarias e IA</span>
              <span className="text-slate-500 block leading-normal">Permiten mostrar anuncios personalizados mediante Google AdSense y optimizar interacciones del chatbot.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.advertising}
              onChange={(e) => setSettings({ ...settings, advertising: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#c9a84c] border-slate-300 rounded focus:ring-[#c9a84c] accent-[#c9a84c]"
            />
          </div>
        </div>
      )}

      {/* Buttons block */}
      <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
        {showSettings ? (
          <>
            <button
              onClick={handleSavePreferences}
              className="flex-grow py-2 px-3 bg-[#0a1f42] text-white hover:bg-[#0c2a5c] rounded-xl border border-transparent transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Guardar preferencias
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="py-2 px-3 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Atrás
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAcceptAll}
              className="flex-grow py-2 px-3 bg-[#0a1f42] text-white hover:bg-[#0c2a5c] rounded-xl border border-transparent transition-colors cursor-pointer"
            >
              Aceptar todo
            </button>
            <button
              onClick={handleRejectAll}
              className="py-2 px-3 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Rechazar todo
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="py-2 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl border border-transparent transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" /> Configurar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
