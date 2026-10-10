import React, { useEffect } from "react";
import { 
  X, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle, 
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import { Procedure, PROCEDURES_DATA } from "../data/procedures";
import { BLOG_POSTS } from "../data/blogPosts";
import Link from "../components/Link";
import AdSlot from "../components/AdSlot";
import { analytics } from "../lib/analytics";

interface ProcedurePageProps {
  procedure: Procedure;
  onClear: () => void;
  onConsultChatbot: (query: string) => void;
}

export default function ProcedurePage({
  procedure,
  onClear,
  onConsultChatbot
}: ProcedurePageProps) {
  if (!procedure) return null;

  useEffect(() => {
    analytics.procedureView(procedure.id, procedure.title);
  }, [procedure.id, procedure.title]);

  const handleOutboundClick = (url: string) => {
    const isBiess = url.includes("biess.fin.ec");
    const isIess = url.includes("iess.gob.ec");
    analytics.outboundClick(url, isBiess ? "biess" : isIess ? "iess" : "other");
  };

  return (
    <div className="space-y-6 text-left font-sans animate-fade-in max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#c9a84c] bg-amber-400/10 px-2.5 py-1 rounded">
            Normativa de {procedure.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0a1f42] mt-2 tracking-tight">
            {procedure.title}
          </h1>
        </div>
        <button 
          onClick={onClear}
          type="button"
          className="p-2.5 text-xs bg-[#c9a84c] text-[#0a1f42] hover:bg-slate-900 hover:text-white font-extrabold rounded-xl transition-all border border-transparent shadow active:scale-95 duration-100 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4 font-black" /> Volver al Inicio
        </button>
      </div>

      {/* Main content sections grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6 text-slate-800 text-xs sm:text-sm">
        
        {/* 1. ¿Quién puede hacer este trámite? */}
        <section>
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
            <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-xs">✓</span>
            ¿Quién puede hacer este trámite?
          </h2>
          <p className="mt-2 text-slate-600 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-lg border-l-2 border-emerald-500">
            {procedure.whoCanDo}
          </p>
        </section>

        {/* 2. Requisitos */}
        <section>
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
            <span className="bg-[#fcf7e6] text-[#9a7e36] px-1.5 py-0.5 rounded text-xs">📋</span>
            Requisitos indispensables
          </h2>
          <ul className="mt-2.5 space-y-2 pl-1 list-none">
            {procedure.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-600 leading-relaxed font-normal">
                <CheckCircle className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Pasos para tramitarlo */}
        <section>
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
            <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-xs">🔢</span>
            Pasos obligatorios para tramitarlo
          </h2>
          <div className="mt-3 space-y-3.5 pl-1">
            {procedure.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#0a1f42] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="procedure-mid" format="in-article" />

        {/* 4. Dónde tramitarlo */}
        <section>
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide">
            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs">🔗</span>
            ¿Dónde tramitarlo?
          </h2>
          <div className="mt-2.5 flex flex-wrap gap-2 items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-700 font-semibold">{procedure.whereTo.label}</span>
            {procedure.whereTo.url && (
              <a 
                href={procedure.whereTo.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleOutboundClick(procedure.whereTo.url)}
                className="bg-[#0a1f42] hover:bg-[#123060] text-white font-bold py-1.5 px-4 rounded-md text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors no-underline cursor-pointer"
              >
                Web Oficial
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </section>

        {/* 5. Errores frecuentes */}
        <section>
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide text-rose-800">
            <span className="bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded text-xs">⚠️</span>
            Errores frecuentes a evitar
          </h2>
          <ul className="mt-2.5 space-y-1.5 pl-1 bg-red-50/50 p-3 rounded-xl border border-dotted border-red-200 list-none">
            {procedure.commonErrors.map((err, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 font-medium leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{err}</span>
              </li>
            ))}
          </ul>
        </section>

        <AdSlot slot="procedure-bottom" format="display" />

        {/* Enlazado Contextual Interno */}
        <section className="space-y-4">
          <h2 className="text-slate-900 font-bold flex items-center gap-1.5 border-b border-slate-100 pb-1.5 text-xs sm:text-sm uppercase tracking-wide text-[#0a1f42]">
            <span>🔗</span>
            Contenidos y Recursos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Col 1: Trámites Relacionados */}
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-150">
              <span className="text-[10px] font-extrabold uppercase text-[#0a1f42] block mb-2 font-mono">📁 Trámites de Apoyo</span>
              <div className="space-y-2">
                {PROCEDURES_DATA.filter(p => p.id !== procedure.id && (p.category === procedure.category || p.category === "Trámites y Afiliación")).slice(0, 3).map(p => (
                  <Link 
                    key={p.id} 
                    to={`/procedimiento/${p.id.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="block p-2 bg-white rounded-lg border border-slate-200 hover:border-[#c9a84c] transition-colors text-[11px] font-bold text-slate-700 hover:text-[#0a1f42] hover:no-underline leading-tight"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2: Guías Recomendadas */}
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-150">
              <span className="text-[10px] font-extrabold uppercase text-[#0a1f42] block mb-2 font-mono">✍️ Guías Prácticas</span>
              <div className="space-y-2">
                {BLOG_POSTS.filter(post => post.category === procedure.category || post.keywords.some(kw => procedure.title.toLowerCase().includes(kw.toLowerCase()))).slice(0, 2).concat(BLOG_POSTS.slice(0, 1)).slice(0, 2).map(p => (
                  <Link 
                    key={p.id} 
                    to={`/blog/${p.slug}`} 
                    className="block p-2 bg-white rounded-lg border border-slate-200 hover:border-[#c9a84c] transition-colors text-[11px] font-bold text-slate-700 hover:text-[#0a1f42] hover:no-underline leading-tight truncate"
                    title={p.title}
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3: Herramientas */}
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-150">
              <span className="text-[10px] font-extrabold uppercase text-[#0a1f42] block mb-2 font-mono">🛠️ Formato de Ley</span>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                <p className="text-[10px] text-slate-500 leading-snug">Genera gratis cartas formales de reclamo patronal o subsidios de ley en segundos.</p>
                <Link 
                  to="/oficios" 
                  className="block text-center py-1.5 bg-[#0a1f42] hover:bg-[#152e55] text-white rounded-md text-[9px] font-black uppercase tracking-wider hover:no-underline"
                >
                  Generar Oficio Libre
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Normativa & Más ayuda */}
        <section className="bg-slate-50 rounded-xl p-4 border border-dotted border-slate-200">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-800 font-bold mb-1">¿Necesitas más ayuda?</h4>
              <p className="text-slate-500 leading-normal mb-3">{procedure.needsMoreHelp}</p>
              
              {procedure.referenceNorm && (
                <div className="text-[10px] text-slate-400 font-medium font-mono mb-2">
                  Norma de sustento: {procedure.referenceNorm}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button 
              onClick={() => {
                const pm = `Hola, tengo una pregunta sobre el trámite de "${procedure.title}". ¿Me podrías detallar más sobre los requisitos indispensables y los pasos a seguir?`;
                onConsultChatbot(pm);
              }}
              type="button"
              className="flex-1 bg-[#c9a84c] hover:bg-[#b0923f] text-[#0a1f42] font-extrabold py-2 px-3 rounded-lg text-xs uppercase tracking-wider text-center cursor-pointer"
            >
              Preguntar al Chatbot 💬
            </button>
            <button 
              onClick={onClear}
              type="button"
              className="sm:w-32 bg-slate-250 hover:bg-slate-300 text-slate-700 font-bold py-2 px-3 rounded-lg text-xs uppercase tracking-wider text-center cursor-pointer border"
            >
              Cerrar Guía
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
