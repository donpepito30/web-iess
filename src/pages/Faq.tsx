import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import Link from "../components/Link";
import { SEO_CATEGORIES } from "../data/seoCategories";

interface FaqItem {
  q: string;
  a: string;
}

export default function Faq() {
  const faqCategory = SEO_CATEGORIES.find((cat) => cat.slug === "faq");
  const defaultFaqs: FaqItem[] = faqCategory ? faqCategory.faqs : [
    {
      q: "¿Cómo recuperar la clave del IESS si me olvidé?",
      a: "Puedes recuperarla ingresando al portal oficial iess.gob.ec, seleccionando la opción 'Generar/Recuperar Clave', ingresando tu número de cédula y respondiendo las preguntas de seguridad o recibiendo un enlace de restablecimiento en tu correo electrónico registrado."
    },
    {
      q: "¿Cuáles son los requisitos mínimos para jubilarse por vejez?",
      a: "El requisito indispensable es cumplir con la tabla proporcional de edad y aportes vigentes, por ejemplo, tener 60 años de edad y un mínimo de 30 años de aportaciones (360 imposiciones líquidas)."
    },
    {
      q: "¿Cuánto tarda el BIESS en desembolsar un préstamo quirografario?",
      a: "Una vez aprobada la solicitud electrónica y confirmados los códigos de seguridad, el BIESS realiza la transferencia de fondos directamente a tu cuenta bancaria registrada en un lapso estimado de 24 a 72 horas hábiles."
    },
    {
      q: "¿Cuánto se debe pagar mensualmente por la afiliación voluntaria?",
      a: "El costo mensual se calcula aplicando la tasa del 17.60% sobre los ingresos mensuales declarados, los cuales no pueden ser inferiores al Salario Básico Unificado (SBU, USD 482 en 2026). El aporte mínimo mensual en 2026 es de USD 84.83."
    },
    {
      q: "¿Cómo se retiran los fondos de reserva acumulados en el IESS?",
      a: "Los afiliados con derecho a retirar los fondos de reserva (más de 36 aportes o jubilados) pueden solicitar la devolución 100% en línea ingresando con su clave de asegurado en el portal iess.gob.ec y seleccionando 'Fondos de Reserva'."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6 text-left font-sans animate-fade-in">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0a1f42] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#c9a84c]" />
            Preguntas Frecuentes IESS y BIESS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Respuestas autoritativas y verificadas con base en las leyes de seguridad social vigentes.
          </p>
        </div>
        <Link 
          to="/"
          className="text-xs bg-slate-100 hover:bg-slate-200 text-[#0a1f42] px-3 py-1.5 rounded-lg font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer no-underline border"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Inicio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <p className="text-xs sm:text-sm text-slate-550 leading-relaxed text-justify mb-4">
          Encuentre respuestas directas a las dudas más comunes planteadas por los afiliados, jubilados y empleadores ecuatorianos. Estas respuestas cumplen plenamente con las resoluciones oficiales del Consejo Directivo del IESS.
        </p>

        <div className="space-y-3.5">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-[#c9a84c] transition-colors bg-slate-50/20"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left font-extrabold text-xs sm:text-sm text-[#0a1f42] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#c9a84c] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-650 leading-relaxed text-justify bg-white select-text font-medium font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured data FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": defaultFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}
      </script>
    </div>
  );
}
