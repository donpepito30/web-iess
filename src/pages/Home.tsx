import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  ChevronRight, 
  BadgeInfo, 
  AlertCircle,
  AlertTriangle,
  Activity,
  Clock,
  UserCheck,
  CreditCard,
  Building,
  RefreshCw,
  Printer,
  Copy,
  Check,
  FileText
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "../components/Link";
import SearchBar from "../components/SearchBar";
import Chatbot, { ChatMessage } from "../components/Chatbot";
import AdSlot from "../components/AdSlot";
import { Procedure } from "../data/procedures";
import { SeoCategory } from "../data/seoCategories";

interface HomeProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredProcedures: Procedure[];
  onNavigateToProcedure: (proc: Procedure) => void;
  onNavigateToCity: (city: string) => void;
  onSendMessage: (query: string) => void;
  chatSectionRef: React.RefObject<HTMLElement | null>;
  handleProblemClick: (title: string, desc: string) => void;
  handleFrequentProcedureClick: (title: string, prompt: string) => void;
  activeReqTab: "Jubilación" | "Quirografario" | "Afil. Voluntaria" | "Cesantía";
  setActiveReqTab: (tab: "Jubilación" | "Quirografario" | "Afil. Voluntaria" | "Cesantía") => void;
  TAB_REQUIREMENTS_DATA: any[];
  FREQUENT_PROCEDURES: any[];
  SEO_CATEGORIES: SeoCategory[];
  
  // Form generator props
  generatorType: 'aportes' | 'maternidad';
  setGeneratorType: (val: 'aportes' | 'maternidad') => void;
  copied: boolean;
  setCopied: (val: boolean) => void;
  aportesNombre: string;
  setAportesNombre: (val: string) => void;
  aportesCedula: string;
  setAportesCedula: (val: string) => void;
  aportesEmpleador: string;
  setAportesEmpleador: (val: string) => void;
  aportesFechaInicio: string;
  setAportesFechaInicio: (val: string) => void;
  aportesFechaFin: string;
  setAportesFechaFin: (val: string) => void;
  aportesPeriodos: string;
  setAportesPeriodos: (val: string) => void;
  aportesCiudad: string;
  setAportesCiudad: (val: string) => void;
  
  maternidadNombre: string;
  setMaternidadNombre: (val: string) => void;
  maternidadCedula: string;
  setMaternidadCedula: (val: string) => void;
  maternidadEmpleador: string;
  setMaternidadEmpleador: (val: string) => void;
  maternidadFechaNacimiento: string;
  setMaternidadFechaNacimiento: (val: string) => void;
  maternidadFechaCertificado: string;
  setMaternidadFechaCertificado: (val: string) => void;
  maternidadBanco: string;
  setMaternidadBanco: (val: string) => void;
  maternidadCuentaType: string;
  setMaternidadCuentaType: (val: string) => void;
  maternidadCuentaNum: string;
  setMaternidadCuentaNum: (val: string) => void;
  maternidadMotivoRetraso: string;
  setMaternidadMotivoRetraso: (val: string) => void;
  maternidadCiudad: string;
  setMaternidadCiudad: (val: string) => void;
  
  // Chat props
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  isTyping: boolean;
  apiOnline: boolean | null;
  onClearChat: () => void;
}

export default function Home({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredProcedures,
  onNavigateToProcedure,
  onNavigateToCity,
  onSendMessage,
  chatSectionRef,
  handleProblemClick,
  handleFrequentProcedureClick,
  activeReqTab,
  setActiveReqTab,
  TAB_REQUIREMENTS_DATA,
  FREQUENT_PROCEDURES,
  SEO_CATEGORIES,
  
  generatorType,
  setGeneratorType,
  copied,
  setCopied,
  aportesNombre,
  setAportesNombre,
  aportesCedula,
  setAportesCedula,
  aportesEmpleador,
  setAportesEmpleador,
  aportesFechaInicio,
  setAportesFechaInicio,
  aportesFechaFin,
  setAportesFechaFin,
  aportesPeriodos,
  setAportesPeriodos,
  aportesCiudad,
  setAportesCiudad,
  
  maternidadNombre,
  setMaternidadNombre,
  maternidadCedula,
  setMaternidadCedula,
  maternidadEmpleador,
  setMaternidadEmpleador,
  maternidadFechaNacimiento,
  setMaternidadFechaNacimiento,
  maternidadFechaCertificado,
  setMaternidadFechaCertificado,
  maternidadBanco,
  setMaternidadBanco,
  maternidadCuentaType,
  setMaternidadCuentaType,
  maternidadCuentaNum,
  setMaternidadCuentaNum,
  maternidadMotivoRetraso,
  setMaternidadMotivoRetraso,
  maternidadCiudad,
  setMaternidadCiudad,
  
  chatMessages,
  chatInput,
  setChatInput,
  isTyping,
  apiOnline,
  onClearChat
}: HomeProps) {
  
  const handleSearchSubmit = () => {
    const element = document.getElementById("catalogo-tramites");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 min-w-0 font-sans">
      {/* SECCIÓN SEO LOCAL: CIUDADES DE ECUADOR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] flex items-center gap-2">
              <span className="text-xl">📍</span>
              Asesoría y Trámites del IESS por Ciudad
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Consulta oficinas de atención, horarios de ventanilla, hospitales del seguro y consejos locales verificados sin intermediarios.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['quito', 'guayaquil', 'cuenca', 'ambato', 'machala'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => onNavigateToCity(city)}
                className="text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
              >
                <span className="text-sm">🏢</span>
                IESS {city.charAt(0).toUpperCase() + city.slice(1)}
              </button>
            ))}
            <Link
              to="/iess"
              className="text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 bg-amber-50 hover:bg-[#c9a84c]/20 text-[#0a1f42] border border-amber-200 uppercase tracking-wide cursor-pointer hover:no-underline"
            >
              📂 Ver Directorio Completo (24 Capitales) &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE 8 TARJETAS DE TRÁMITES FRECUENTES CON EMOJIS */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
            <span className="text-2xl leading-none">🔥</span>
            Trámites Frecuentes IESS y BIESS
          </h2>
          <p className="text-xs text-slate-500">
            Haz clic en cualquier tarjeta para consultar requisitos, tiempos estimados de atención y guías directamente con el chatbot.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {FREQUENT_PROCEDURES.map((proc, index) => (
            <div
              key={index}
              onClick={() => handleFrequentProcedureClick(proc.title, proc.query)}
              className="bg-white border border-slate-200 p-3 sm:p-3.5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer group hover:border-[#c9a84c] hover:-translate-y-0.5 duration-150 flex flex-col justify-between h-[125px] relative"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-2xl" role="img" aria-label={proc.title}>
                    {proc.emoji}
                  </span>
                  <span className={`text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${
                    proc.timeframe.toLowerCase().includes("inmediato")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {proc.timeframe}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#0a1f42] mt-3 group-hover:text-[#c9a84c] transition-colors leading-tight line-clamp-2">
                  {proc.title}
                </h3>
              </div>

              <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                Consultar
                <ArrowRight className="w-3 h-3 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DE REQUISITOS CON 4 PESTAÑAS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
            <span className="text-2xl leading-none">📋</span>
            Guía Rápida de Requisitos y Pasos de Ley
          </h2>
          <p className="text-xs text-slate-500">
            Selecciona una de las 4 categorías principales para consultar requisitos mínimos vigentes y el paso a paso del trámite oficial.
          </p>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex border-b border-slate-100 mb-5 overflow-x-auto gap-1 scrollbar-none">
          {(["Jubilación", "Quirografario", "Afil. Voluntaria", "Cesantía"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveReqTab(tab)}
              className={`py-2 px-4 text-xs font-bold whitespace-nowrap rounded-t-lg border-b-2 transition-all duration-155 cursor-pointer ${
                activeReqTab === tab
                  ? "border-[#c9a84c] text-[#0a1f42] bg-slate-50/70"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/30"
              }`}
            >
              <span className="mr-1.5">
                {TAB_REQUIREMENTS_DATA.find(t => t.id === tab)?.emoji}
              </span>
              {tab}
            </button>
          ))}
        </div>

        {/* Contenedor de Dos Columnas */}
        {(() => {
          const currentData = TAB_REQUIREMENTS_DATA.find((t) => t.id === activeReqTab);
          if (!currentData) return null;
          return (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna 1: Requisitos con ✓ Verde */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-left">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span>
                    Requisitos de Ley {activeReqTab}
                  </h3>
                  <ul className="space-y-2 list-none pl-0">
                    {currentData.requirements.map((req: string, ridx: number) => (
                      <li key={ridx} className="text-xs text-slate-750 flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-extrabold shrink-0 mt-0.5">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Columna 2: Pasos Numerados */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 text-left">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0a1f42] mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <span className="text-slate-400 font-mono text-xs">#</span>
                    Pasos para Tramitarlo
                  </h3>
                  <ol className="space-y-2.5 list-none pl-0">
                    {currentData.steps.map((step: string, sidx: number) => (
                      <li key={sidx} className="text-xs text-slate-750 flex items-start gap-2.5 leading-relaxed">
                        <span className="w-5 h-5 bg-[#0a1f42] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {sidx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Acceso de consulta rápida */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/20 border border-dashed border-amber-200 p-3 rounded-xl text-left">
                <div className="flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span className="text-xs text-[#0a1f42] font-semibold">
                    ¿Tienes dudas específicas sobre {currentData.title}?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const freqItem = FREQUENT_PROCEDURES.find(f => f.title.includes(activeReqTab) || activeReqTab.includes(f.title));
                    const query = freqItem ? freqItem.query : `Hola, necesito consultar sobre: ${currentData.title}`;
                    handleFrequentProcedureClick(currentData.title, query);
                  }}
                  className="w-full sm:w-auto text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Consultar en Chatbot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      <AdSlot slot="home-mid-rect" format="in-article" />

      {/* DIRECTORIO DE GUÍAS DE SEGURIDAD SOCIAL (15 PILARES SEO) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-[#9c7d31] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            📂 Biblioteca Legal
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
            <span className="text-2xl leading-none">📂</span>
            Directorio de Guías de Seguridad Social
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Accede a las páginas pilar optimizadas con la normativa legal de 2026, requisitos actualizados del IESS/BIESS, errores comunes y herramientas integradas de ley.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {SEO_CATEGORIES.map((cat) => {
            const emojis: Record<string, string> = {
              afiliacion: "📂",
              "historia-laboral": "⏱️",
              "prestamos-biess": "💰",
              "fondos-reserva": "🛡️",
              cesantia: "🚪",
              jubilacion: "👴",
              salud: "🏥",
              certificados: "📜",
              empleadores: "🏢",
              herramientas: "🛠️",
              faq: "❓",
              noticias: "📰",
              blog: "✍️",
              tramites: "📋"
            };
            return (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                className="bg-slate-50/40 border border-slate-200/80 p-3.5 rounded-xl shadow-2xs hover:shadow hover:border-[#c9a84c] hover:bg-white transition-all cursor-pointer group flex gap-3 h-full items-start block hover:no-underline text-left"
              >
                <span className="text-2xl shrink-0 mt-0.5">{emojis[cat.slug] || "📂"}</span>
                <div className="flex-grow">
                  <h3 className="text-xs font-extrabold text-[#0a1f42] group-hover:text-[#c9a84c] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="text-[9px] font-bold text-[#c9a84c] inline-flex items-center gap-0.5 mt-2.5 opacity-80 group-hover:opacity-100 transition-all uppercase tracking-wider">
                    Ver Guía Pilar <ArrowRight className="w-2.5 h-2.5 shrink-0" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <AdSlot slot="home-bottom-display" format="display" />

      {/* GENERADOR DE SOLICITUDES Y OFICIOS DE LEY - EVITA TRAMITADORES */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/10 border-2 border-[#c9a84c] rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 bg-amber-150 text-[#9c7d31] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            🛡️ Defensa al Ciudadano
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
            <span className="text-2xl leading-none">🛠️</span>
            Formularios y Oficios Libres (Evita Tramitadores)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Muchos "tramitadores" cobran montos abusivos (hasta $35) solo por llenar una carta de reclamo dirigida al IESS. Completa tus datos abajo y genera gratis un oficio formal sustentado en la Constitución y la Ley de Seguridad Social para defender tus derechos de forma 100% gratuita. Por favor, selecciona una categoría:
          </p>
        </div>

        {/* Tabs for Generator Selection */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => { setGeneratorType('aportes'); setCopied(false); }}
            className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              generatorType === 'aportes'
                ? 'bg-[#0a1f42] text-white border-[#0a1f42] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>📁</span> Reclamo de Aportes Faltantes
          </button>
          <button
            type="button"
            onClick={() => { setGeneratorType('maternidad'); setCopied(false); }}
            className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              generatorType === 'maternidad'
                ? 'bg-[#0a1f42] text-white border-[#0a1f42] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>🤰</span> Pago de Subsidio Maternidad
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
          {/* Form Input fields */}
          <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-4 shadow-xs text-left">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#c9a84c]" />
                Rellenar Datos Formulario
              </h3>

              {generatorType === 'aportes' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre Completo del Afiliado</label>
                    <input
                      type="text"
                      value={aportesNombre}
                      onChange={(e) => setAportesNombre(e.target.value)}
                      placeholder="Ej. Juan Carlos Pérez Mina"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Cédula de Identidad</label>
                      <input
                        type="text"
                        value={aportesCedula}
                        onChange={(e) => setAportesCedula(e.target.value)}
                        placeholder="Ej. 1712345678"
                        maxLength={10}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Ciudad de Trámite</label>
                      <input
                        type="text"
                        value={aportesCiudad}
                        onChange={(e) => setAportesCiudad(e.target.value)}
                        placeholder="Ej. Guayaquil"
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre del Empleador o Empresa</label>
                    <input
                      type="text"
                      value={aportesEmpleador}
                      onChange={(e) => setAportesEmpleador(e.target.value)}
                      placeholder="Ej. Corporación Comercial S.A."
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Inicio Labores</label>
                      <input
                        type="date"
                        value={aportesFechaInicio}
                        onChange={(e) => setAportesFechaInicio(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Fin Labores</label>
                      <input
                        type="date"
                        value={aportesFechaFin}
                        onChange={(e) => setAportesFechaFin(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Meses/Periodos Faltantes a Reclamar</label>
                    <input
                      type="text"
                      value={aportesPeriodos}
                      onChange={(e) => setAportesPeriodos(e.target.value)}
                      placeholder="Ej. Enero a Septiembre del 2026 (9 planillas impagas)"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Nombre de la Madre Afiliada</label>
                    <input
                      type="text"
                      value={maternidadNombre}
                      onChange={(e) => setMaternidadNombre(e.target.value)}
                      placeholder="Ej. María Elena Espinel Cruz"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Cédula de Identidad</label>
                      <input
                        type="text"
                        value={maternidadCedula}
                        onChange={(e) => setMaternidadCedula(e.target.value)}
                        placeholder="Ej. 0912345678"
                        maxLength={10}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Ciudad de Trámite</label>
                      <input
                        type="text"
                        value={maternidadCiudad}
                        onChange={(e) => setMaternidadCiudad(e.target.value)}
                        placeholder="Ej. Quito"
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Empleador actual</label>
                    <input
                      type="text"
                      value={maternidadEmpleador}
                      onChange={(e) => setMaternidadEmpleador(e.target.value)}
                      placeholder="Ej. Unidad Educativa del Norte"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha de Nacimiento del Bebé</label>
                      <input
                        type="date"
                        value={maternidadFechaNacimiento}
                        onChange={(e) => setMaternidadFechaNacimiento(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Fecha Certificado Médico</label>
                      <input
                        type="date"
                        value={maternidadFechaCertificado}
                        onChange={(e) => setMaternidadFechaCertificado(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Tipo Cuenta</label>
                      <select
                        value={maternidadCuentaType}
                        onChange={(e) => setMaternidadCuentaType(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#0a1f42] bg-white h-[34px]"
                      >
                        <option value="Ahorros">Ahorros</option>
                        <option value="Corriente">Corriente</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Banco Oficial</label>
                      <input
                        type="text"
                        value={maternidadBanco}
                        onChange={(e) => setMaternidadBanco(e.target.value)}
                        placeholder="Ej. Pichincha"
                        className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">No. Cuenta</label>
                      <input
                        type="text"
                        value={maternidadCuentaNum}
                        onChange={(e) => setMaternidadCuentaNum(e.target.value)}
                        placeholder="Ej. 220145892"
                        className="w-full text-xs border border-[#cbd5e1] rounded px-2 py-1.5 focus:outline-none focus:border-[#0a1f42]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-600 mb-1">Observación o Motivo del Retraso</label>
                    <input
                      type="text"
                      value={maternidadMotivoRetraso}
                      onChange={(e) => setMaternidadMotivoRetraso(e.target.value)}
                      placeholder="Ej. Demora en la validación del certificado físico"
                      className="w-full text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="text-[10px] text-slate-500 font-medium leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="font-extrabold text-[#0a1f42] block mb-0.5">💡 Utilidad Comprobada:</span>
                Rellena todos los casilleros de la izquierda y verás cómo redactamos oportunamente la petición formal a la derecha. Ningún intermediario te cobrará de más.
              </div>
              
              <button
                type="button"
                onClick={() => onSendMessage(
                  generatorType === 'aportes' 
                    ? "Hola. Requiero que me orientes sobre los formularios del IESS y qué leyes amparan mi reclamo de aportes faltantes y afiliación laboral retroactiva."
                    : "Hola. Por favor facilítame asistencia sobre la normativa del subsidio de maternidad del IESS, montos de pago y plazos pensionales."
                )}
                className="w-full text-[11px] font-extrabold text-[#0a1f42] bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] p-2 rounded transition-colors uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-205 cursor-pointer"
              >
                <span>💬</span> Preguntar normativa al Asistente
              </button>
            </div>
          </div>

          {/* Document Live Preview Panel */}
          <div className="xl:col-span-7 flex flex-col h-full justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-[#0a1f42] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                  Vista Previa (Oficio del IESS listo)
                </h3>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const fileContent = generatorType === 'aportes' 
                        ? `
${aportesCiudad || "Quito"}, ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Afiliación y Control Patronal
Presente.-

Asunto: Solicitud formal de investigación e impugnación por aportes faltantes y falta de registro de afiliación laboral (Glosa Patronal / Art. 67 y 369 de la Constitución)

Yo, ${aportesNombre || "[Tu Nombre Completo]"}, con cédula de ciudadanía No. ${aportesCedula || "[Tu Cédula]"}, en mi calidad de afiliado del IESS, me dirijo a ustedes amparado en el Art. 66 num. 23 de la Constitución de la República del Ecuador (Derecho a dirigir quejas y peticiones formales), y los Arts. 67 y 369 de la norma ibídem que garantizan la seguridad social como un derecho legítimo e irrenunciable.

Por medio de la presente, presento mi reclamo formal y solicito se inicie el proceso administrativo de inspección e investigación laboral al empleador ${aportesEmpleador || "[Nombre del Empleador/Empresa]"}, bajo las siguientes consideraciones de hecho:

1. Relación laboral: Presté mis servicios bajo relación de dependencia laboral para el empleador antes mencionado desde el ${aportesFechaInicio || "[Fecha de Inicio]"} hasta el ${aportesFechaFin || "[Fecha de Fin]"}.
2. Novedad de aportes: Revisando mi historial laboral digital a través del portal oficial iess.gob.ec, he verificado con preocupación de que no constan registradas ni pagadas las aportaciones correspondientes a los periodos: ${aportesPeriodos || "[Meses/Periodos Faltantes]"}.
3. Perjuicios: Esta mora de aportaciones del empleador vulnera directamente mi récord de imposiciones líquidas obligatorias, bloqueando mi ahorro por fondos de reserva y cesantía, y previniendo que precalifique para préstamos quirografarios en el BIESS o futuras jubilaciones ordinarias por vejez, según las Resoluciones C.D. 625 y C.D. 677.

Por lo expuesto, solicito expresamente:
- Se ordene una inspección laboral urgente en las oficinas del empleador para validar la relación laboral descrita.
- Se liquiden y emitan las glosas de cobro, multas e intereses acumulados correspondientes a favor del afiliado perjudicado de acuerdo con el marco legal.
- Se registre oportunamente mi historial de aportaciones retroactivas una vez recaudados los valores de las planillas en mora.

Adjunto copias físicas de soporte:
- Copia de cédula de ciudadanía legible.
- Reporte impreso de historia laboral obtenido en el portal web (iess.gob.ec).
- [Opcional] Pruebas de relación laboral (actas, roles de pago o comprobantes).

Atentamente,

_________________________________________
Firma de Solicitante
Nombre: ${aportesNombre || "[Tu Nombre Completo]"}
C.C.: ${aportesCedula || "[Tu Cédula]"}
                    `
                        : `
${maternidadCiudad || "Quito"}, ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Prestaciones de Salud / Subsidios Económicos
Presente.-

Asunto: Solicitud formal de acreditación y pago de subsidio por maternidad en mora (Licencia por ley de 84 días)

Yo, ${maternidadNombre || "[Nombre de la Madre]"}, con cédula No. ${maternidadCedula || "[Tu Cédula]"}, en calidad de afiliada activa, me dirijo a ustedes amparada en los Arts. 35 y 43 de la Constitución de la República del Ecuador (atención prioritaria al subsidio de maternidad, gestación y parto), en concordancia con la Ley de Seguridad Social.

Por medio de este oficio, presento mi reclamo formal y solicito se ordene la inmediata acreditación financiera de mi subsidio de maternidad, considerando:

1. Relación laboral: Presto mis servicios para el empleador ${maternidadEmpleador || "[Nombre del Empleador o Empresa]"} y cumplo con el requisito de 12 aportes mensuales mínimos.
2. Certificado validado: El parto fue el ${maternidadFechaNacimiento || "[Fecha de Parto]"}. El certificado médico que valida mi periodo de licencia temporal y cese de labores fue aprobado con fecha ${maternidadFechaCertificado || "[Fecha de Certificado médica]"}.
3. Cuenta bancaria registrada: Mi cuenta autorizada es de tipo ${maternidadCuentaType || "Ahorros"} No. ${maternidadCuentaNum || "[Número de Cuenta]"} del ${maternidadBanco || "[Institución de la cuenta]"} registrada debidamente.
4. Mora observada: Los fondos no se han transferido a mi cuenta debido al siguiente problema: ${maternidadMotivoRetraso || "[Describa el retraso o falta de pago]"}.

Por lo expresado, ruego a ustedes autorizar la liberación presupuestaria y pago inmediato por transferencia a mi cuenta bancaria.

Adjunto como soportes:
- Copia legible de cédula.
- Acta de nacimiento / Nacido vivo emitido por el Registro Civil.
- Certificado médico del IESS de validación aprobado.
- Certificado bancario de cuenta activa.

Atentamente,

_________________________________________
Firma de Madre Afiliada
Nombre: ${maternidadNombre || "[Nombre de la Madre]"}
C.C.: ${maternidadCedula || "[Tu Cédula]"}
                    `;
                      navigator.clipboard.writeText(fileContent.trim());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="bg-slate-100 hover:bg-[#c9a84c] hover:text-white text-slate-700 text-[11px] font-bold py-1 px-3 rounded flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Texto
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="bg-[#0a1f42] hover:bg-slate-800 text-white text-[11px] font-bold py-1 px-3 rounded flex items-center gap-1.5 transition-all border border-[#0a1f42] cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#c9a84c]" />
                    Imprimir
                  </button>
                </div>
              </div>

              {/* Styled Letter Sandbox */}
              <div className="bg-white border-2 border-slate-200 rounded-xl shadow-inner p-5 text-slate-800 text-[11px] font-serif leading-relaxed h-[350px] overflow-y-auto relative scrollbar-thin">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center text-4xl p-1 font-sans font-black">
                    IESS
                  </div>
                  <span className="text-[9px] font-sans font-black uppercase tracking-widest mt-1 block">TRÁMITE CIUDADANO</span>
                </div>

                <div className="relative space-y-3.5 font-sans select-text">
                  <p className="text-right font-medium text-slate-600">
                    {generatorType === 'aportes' ? (aportesCiudad || "Quito") : (maternidadCiudad || "Quito")}, 
                    {" "}{new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <div className="font-bold space-y-0.5 uppercase tracking-wide text-slate-800">
                    <p>Señores</p>
                    <p className="text-[#0a1f42] text-xs font-black">DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)</p>
                    <p className="text-[10px] text-[#c9a84c] font-bold">
                      {generatorType === 'aportes' 
                        ? "Coordinación Provincial de Afiliación y Control de Obligaciones"
                        : "Coordinación Provincial de Subsidios y Prestaciones Económicas"
                      }
                    </p>
                    <p className="text-slate-500 font-normal">Presente.-</p>
                  </div>

                  <p className="font-extrabold text-slate-900 border-l-2 border-[#c9a84c] pl-2 text-[10.5px]">
                    ASUNTO:{" "}
                    {generatorType === 'aportes'
                      ? `Solicitud formal de investigación e impugnación de aportes patronales faltantes para el afiliado ${aportesNombre || "[Tu Nombre]"}`
                      : `Solicitud de acreditación oficial de subsidio de maternidad para la asegurada ${maternidadNombre || "[Tu Nombre]"}`
                    }
                  </p>

                  <p className="text-justify leading-snug">
                    Yo, <span className="font-bold border-b border-slate-350 pb-px">{generatorType === 'aportes' ? (aportesNombre || "_____________________") : (maternidadNombre || "_____________________")}</span>, 
                    con cédula de identidad No. <span className="font-bold font-mono bg-slate-50 px-1 rounded">{generatorType === 'aportes' ? (aportesCedula || "__________") : (maternidadCedula || "__________")}</span>, 
                    en pleno goce de mis derechos constitucionales y en mi calidad de afiliado, me dirijo a sus dignas autoridades amparado en el 
                    <span className="font-semibold text-[#0a1f42]"> Art. 66 numeral 23 de la Constitución de la República del Ecuador </span> 
                    (petición individual y reclamo de ley) y los artículos 67 y 369 de nuestra carta magna de seguridad social.
                  </p>

                  {generatorType === 'aportes' ? (
                    <div className="space-y-2 text-justify leading-snug">
                      <p>
                        Presento un reclamo de aportes contra mi empleador 
                        {" "}<span className="font-bold text-slate-900">{aportesEmpleador || "[Nombre del Empleador o Empresa]"}</span>, fundamentando las novedades:
                      </p>
                      <div className="pl-3 space-y-1 bg-slate-50 border-l-2 border-slate-200 py-1 rounded">
                        <p>
                          • <span className="font-semibold">Lapso laboral:</span> Desde el 
                          {" "}<span className="font-bold font-mono">{aportesFechaInicio || "___/___/____"}</span> hasta el <span className="font-bold font-mono">{aportesFechaFin || "___/___/____"}</span>.
                        </p>
                        <p>
                          • <span className="font-semibold">Periodos impagos:</span> Al revisar mi historia laboral en el portal del IESS se constata la total falta de registro laboral retroactivo en: 
                          {" "}<span className="font-bold text-red-700">{aportesPeriodos || "[Describa meses faltantes]"}</span>.
                        </p>
                      </div>
                      <p>
                        Esta mora vulnera de forma absoluta mi derecho al fondo de reserva, cesantías parciales e historial de aportes mínimos para préstamos de vivienda del BIESS o jubilación de invalidez y vejez conforme las Resoluciones C.D. 625 y C.D. 677.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-justify leading-snug">
                      <p>
                        Solicito la acreditación efectiva correspondientes a mi licencia médica de maternidad por 84 días frente a mi empleador 
                        {" "}<span className="font-bold text-slate-900">{maternidadEmpleador || "[Nombre del Empleador o Empresa]"}</span>, de acuerdo a la ley:
                      </p>
                      <div className="pl-3 space-y-1 bg-slate-50 border-l-2 border-slate-200 py-1 rounded">
                        <p>
                          • <span className="font-semibold">Fecha Parto:</span> Sucedido el día <span className="font-bold font-mono">{maternidadFechaNacimiento || "___/___/____"}</span>.
                        </p>
                        <p>
                          • <span className="font-semibold">Validación Médica del IESS:</span> Certificado emitido en fecha <span className="font-bold font-mono">{maternidadFechaCertificado || "___/___/____"}</span>.
                        </p>
                        <p>
                          • <span className="font-semibold">Depósito solicitado:</span> Cuenta de <span className="font-bold font-mono">{maternidadCuentaType}</span> No. <span className="font-bold font-mono">{maternidadCuentaNum || "_______________"}</span> del Banco/Cooperativa <span className="font-bold">{maternidadBanco || "_______________"}</span>.
                        </p>
                        <p>
                          • <span className="font-semibold">Inconveniente de cobro:</span> {maternidadMotivoRetraso || "[Describa la traba del sistema]"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1 leading-snug">
                    <p className="font-extrabold text-[#0a1f42] text-[10px] tracking-wide uppercase">PETICIÓN FORMAL REGLAMENTARIA:</p>
                    <p className="text-justify text-slate-700">
                      {generatorType === 'aportes' 
                        ? "Solicito se ordene una inspección patronal técnica en el domicilio fiscal de la empresa, emitiendo glosas acumuladas de cobro con intereses correspondientes y asentándose las imposiciones legalmente debidas."
                        : "Solicito que se agilice la liberación de fondos del subsidio de maternidad correspondiente y se disponga de inmediato la transferencia oficial a mi cuenta bancaria debidamente validada."
                      }
                    </p>
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    * Se anexan justificativos de cédula física, historia laboral, partida de nacido vivo, libreta de ahorros e informe de consulta del IESS.
                  </p>

                  <div className="pt-4 text-center space-y-1 font-sans">
                    <p>Atentamente,</p>
                    <div className="w-40 h-px bg-slate-300 mx-auto my-5"></div>
                    <p className="font-extrabold uppercase text-slate-800">{generatorType === 'aportes' ? (aportesNombre || "_____________________") : (maternidadNombre || "_____________________")}</p>
                    <p className="text-[9px] text-slate-500 font-mono">CÉDULA: {generatorType === 'aportes' ? (aportesCedula || "__________") : (maternidadCedula || "__________")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-blue-50/70 border border-blue-150 p-2.5 rounded-lg flex items-start gap-2 text-[10.5px] text-[#0a1f42]">
              <span className="text-base shrink-0">📍</span>
              <div>
                <span className="font-bold block">Pasos para realizar el trámite presencial en 5 minutos:</span>
                <ol className="list-decimal pl-3.5 space-y-0.5 mt-0.5 font-medium text-slate-700">
                  <li>Haz clic en <span className="font-bold uppercase text-[#0a1f42]">"Copiar Texto"</span> e ingresa en Microsoft Word o Google Docs en tu computadora, luego imprímelo en dos ejemplares.</li>
                  <li>Firma ambas hojas. Lleva ambas copias físicas al <span className="font-bold">Centro de Atención Universal</span> del IESS más cercano.</li>
                  <li>Entrega el documento en la ventanilla de <span className="font-bold">Recepción de Correspondencia</span>. Conserva la copia que te sellen como recibido.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PROCEDURES EXPLORER GRID */}
      <div id="catalogo-tramites" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0a1f42] flex items-center gap-2">
              <BadgeInfo className="w-5 h-5 text-[#c9a84c]" />
              Catálogo de Trámites y Coberturas del IESS
            </h2>
            <p className="text-xs text-slate-500">Selecciona un tema o escribe en el buscador para ver requisitos y guías paso a paso.</p>
          </div>
          <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">
            Mostrando {filteredProcedures.length}
          </span>
        </div>

        {/* Inline Connected Categories / Themes Selector */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] sm:text-xs font-extrabold px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0a1f42] text-white shadow-sm ring-2 ring-[#c9a84c]/50"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {cat === "All" ? "🔍 Todos los Temas" : cat}
              </button>
            );
          })}
        </div>

        {filteredProcedures.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 mb-1">No se encontraron trámites</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Prueba buscando otra palabra clave como "jubilación", "biess", o "enfermedad". También puedes consultar directamente al Chatbot.
            </p>
            <button 
              type="button"
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-xs bg-[#0a1f42] text-white py-2 px-4 rounded-md font-bold hover:bg-[#113160] transition-colors cursor-pointer"
            >
              Restaurar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProcedures.map((proc) => (
              <button 
                key={proc.id}
                type="button"
                onClick={() => onNavigateToProcedure(proc)}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-[#c9a84c] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full relative overflow-hidden text-left"
              >
                <div>
                  <span className="inline-block text-[10px] uppercase font-extrabold tracking-wider text-[#0a1f42] bg-[#f0f4fa] px-2.5 py-0.5 rounded-full mb-3 font-sans">
                    {proc.category}
                  </span>
                  <h3 className="text-base font-bold text-[#0a1f42] group-hover:text-[#c9a84c] transition-colors mb-2 line-clamp-1 font-sans">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {proc.whoCanDo}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider font-sans w-full">
                  <span className="text-[#c9a84c] flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c9a84c]" />
                    {proc.requirements.length} Requisitos
                  </span>
                  <span className="text-[#0a1f42] group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                    Ver Guía
                    <ChevronRight className="w-4 h-4 shrink-0 text-[#c9a84c]" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN CON 8 TARJETAS DE PROBLEMAS COMUNES */}
      <div className="mt-2 text-left">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0a1f42] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Problemas Comunes: ¿Cómo actuar?
          </h2>
          <p className="text-xs text-slate-500">¿Sufres alguna de estas situaciones en el IESS? Haz clic en la tarjeta para indicarle al Asistente y obtener solución inmediata.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => handleProblemClick("Demoras en citas médicas", "Tiempos excesivos para agendamiento o retrasos severos en sala de espera de consulta externa")}
            className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Citas y Atención</span>
                <Activity className="w-4 h-4 text-red-500 shrink-0" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                1. Demoras en citas médicas
              </h3>
              <p className="text-[11px] text-slate-500 leading-snug">
                Tiempos de espera excesivos para ser atendido por un especialista o agendar consulta externa.
              </p>
            </div>
            <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
              Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          <div 
            onClick={() => handleProblemClick("Falta de medicamentos", "Desabastecimiento de recetas médicas básicas o insumos terapéuticos obligatorios")}
            className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Farmacia IESS</span>
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                2. Falta de medicamentos
              </h3>
              <p className="text-[11px] text-slate-500 leading-snug">
                Falta de abastecimiento en farmacias IESS de fármacos básicos o tratamientos continuos.
              </p>
            </div>
            <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
              Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          <div 
            onClick={() => handleProblemClick("Glosas y multas injustas del IESS", "Notificaciones de cobros de glosas, sanciones o multas improcedentes emitidas a empleadores")}
            className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Empleadores</span>
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                3. Glosas y multas injustas
              </h3>
              <p className="text-[11px] text-slate-500 leading-snug">
                Responsabilidad patronal, planillas incorrectas o resoluciones sancionatorias no válidas de la directiva.
              </p>
            </div>
            <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
              Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          <div 
            onClick={() => handleProblemClick("Aportes que no aparecen en tu historia laboral", "Falta de visualización de imposiciones devengadas o aportes patronales pagados")}
            className="bg-white border border-slate-200 border-l-4 border-l-red-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 duration-150 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold text-red-600 tracking-wide uppercase">Afiliados</span>
                <UserCheck className="w-4 h-4 text-red-500 shrink-0" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0a1f42] group-hover:text-red-600 transition-colors mb-1 leading-snug">
                4. Aportes no reflejados
              </h3>
              <p className="text-[11px] text-slate-500 leading-snug">
                Meses laborados y aportados que no constan registrados en tu historial laboral digital del portal.
              </p>
            </div>
            <span className="text-[10px] mt-3 inline-flex items-center gap-0.5 font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded self-start">
              Reportar <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE CANALES DE QUEJAS */}
      <div className="bg-[#0a1f42] border border-[#1b3154] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c] opacity-5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="mb-4">
          <span className="text-[9px] uppercase font-bold tracking-widest text-[#c9a84c] bg-amber-500/10 px-2 py-0.5 rounded border border-[#c9a84c]/20 inline-block mb-1.5">
            🔴 Canales Oficiales 2026
          </span>
          <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2 text-white">
            Canales de Quejas y Denuncias IESS
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mt-1">
            La directiva nacional del IESS pone a disposición canales digitales y presenciales para reportar mala atención, falta de insumos, o cobros indebidos de forma 100% confidencial.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <div 
            onClick={() => handleFrequentProcedureClick("Denuncia Portal Web", "Hola. Deseo saber cómo poner una denuncia en línea a través del Portal Web de denuncias del IESS (denuncias.iess.gob.ec), qué datos me van a solicitar y qué tipo de irregularidades o problemas médicos/administrativos puedo reportar.")}
            className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xl">💻</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">24/7 ONLINE</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                Portal Web Oficial
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                denuncias.iess.gob.ec para reportes en el sitio web de atención directa.
              </p>
            </div>
            <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
              Ver guía <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => handleFrequentProcedureClick("Denuncia WhatsApp", "Hola. Necesito información sobre cómo funciona el chatbot oficial de denuncias de WhatsApp del IESS en el número 0962532338. ¿Qué puedo reportar por ahí y qué datos son confidenciales?")}
            className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xl">💬</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/20">CHAT BOT</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                Chat de WhatsApp
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                Número 0962532338 habilitado para recepcionar denuncias vía chat de texto de manera inmediata.
              </p>
            </div>
            <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
              Ver guía <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => handleFrequentProcedureClick("Contacto Telefónico", "Hola. Quiero saber cuál es el canal telefónico oficial del IESS para presentar quejas, cuál es el número y el horario de atención para ayuda directa.")}
            className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xl">📞</span>
                <span className="text-[8px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20">1800-IESS</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                Línea Gratuita
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                Llama sin costo al número de de la institución: 1800-4377 para soporte directo.
              </p>
            </div>
            <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
              Ver guía <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => handleFrequentProcedureClick("Denuncia Presencial", "Hola. Necesito saber cómo y dónde presentar una queja o denuncia formal de forma presencial en las oficinas del IESS, horario de atención y qué documentos llevar.")}
            className="bg-[#112444] border border-[#1d335c] rounded-xl p-3 hover:border-[#c9a84c] hover:bg-[#152c53] transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xl">🏢</span>
                <span className="text-[8px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20">PRESENCIAL</span>
              </div>
              <h3 className="text-xs font-bold text-white mt-2.5 group-hover:text-[#c9a84c] transition-colors">
                Centros de Atención
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug mt-1">
                Acude a los Centros de Atención Universal a nivel nacional (lun-vie, 08:00 - 17:00).
              </p>
            </div>
            <div className="text-[10px] font-bold text-[#c9a84c] flex items-center gap-0.5 mt-2">
              Ver guía <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* CHATBOT INTERACTIVO SECCIÓN INLINE */}
      <Chatbot 
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        isTyping={isTyping}
        apiOnline={apiOnline}
        onSendMessage={onSendMessage}
        onClearChat={onClearChat}
        chatSectionRef={chatSectionRef}
      />
    </div>
  );
}
