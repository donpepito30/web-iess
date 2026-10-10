import React from "react";
import { X, ArrowRight, CornerDownRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import Link from "../components/Link";
import AdSlot from "../components/AdSlot";
import { CITIES_DATA } from "../data/cities";

interface CityPageProps {
  selectedCity: string; // 'directory' or city slug
  clearSelectedCity: () => void;
  navigateToCity: (city: string) => void;
  onConsultChatbot: (query: string) => void;
}

export default function CityPage({
  selectedCity,
  clearSelectedCity,
  navigateToCity,
  onConsultChatbot
}: CityPageProps) {
  
  if (selectedCity === 'directory') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-6 text-left font-sans animate-fade-in w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] flex items-center gap-2">
              <span className="text-xl">📍</span>
              Asesoría y Trámites del IESS por Ciudad
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Consulta oficinas de atención, horarios de ventanilla, hospitales del seguro y consejos locales verificados sin intermediarios.
            </p>
          </div>
          <button
            onClick={clearSelectedCity}
            type="button"
            className="text-xs bg-slate-100 hover:bg-slate-200 text-[#0a1f42] px-3 py-1.5 rounded-lg font-extrabold transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer border"
          >
            <X className="w-3.5 h-3.5" /> Volver al Inicio
          </button>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-650 leading-relaxed text-justify">
            Consulte nuestro directorio local verificado del Instituto Ecuatoriano de Seguridad Social. Acceda a la ubicación geográfica real, horarios de ventanilla de los Centros de Atención Universal (CAU), agencias de atención del BIESS y de salud provinciales.
          </div>

          <AdSlot slot="city-directory-top" format="display" />
          
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b pb-1">Ciudades Verificadas e Indexadas</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pl-0 list-none">
              {Object.values(CITIES_DATA)
                .filter(city => {
                  const wordCount = city.uniqueContent.split(/\s+/).filter(Boolean).length;
                  const verifiedCount = city.dependencies.filter(dep => dep.verifiedAt !== null && dep.address !== null).length;
                  return wordCount >= 600 && verifiedCount >= 2;
                })
                .map(city => (
                  <li key={city.slug} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-[#c9a84c] transition-colors flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-lg block">📍</span>
                      <h4 className="text-xs font-black text-[#0a1f42] mt-1">
                        <Link to={`/iess/${city.slug}`} className="hover:text-[#c9a84c] hover:no-underline text-[#0a1f42]">
                          IESS {city.name}
                        </Link>
                      </h4>
                      <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider mt-0.5">{city.province}</p>
                    </div>
                    <Link to={`/iess/${city.slug}`} className="text-[10px] font-bold text-[#c9a84c] hover:underline uppercase tracking-wide pt-1">Ver Oficinas &rarr;</Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b pb-1">Capitales de Provincia bajo Proceso de Auditoría</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pl-0 list-none opacity-85">
              {Object.values(CITIES_DATA)
                .filter(city => {
                  const wordCount = city.uniqueContent.split(/\s+/).filter(Boolean).length;
                  const verifiedCount = city.dependencies.filter(dep => dep.verifiedAt !== null && dep.address !== null).length;
                  return !(wordCount >= 600 && verifiedCount >= 2);
                })
                .map(city => (
                  <li key={city.slug} className="bg-slate-50/70 border border-slate-200/65 rounded-lg p-3 text-left">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-700 font-sans">📍 IESS {city.name}</span>
                      <span className="text-[8px] uppercase tracking-wide font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded shadow-2xs border border-amber-100 font-sans">Bajo Auditoría</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight font-sans">Provincia de {city.province}. Pendiente de verificación física de oficinas.</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const cityData = CITIES_DATA[selectedCity];
  if (!cityData) return null;
  const hasVerifiedDeps = cityData.dependencies && cityData.dependencies.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm text-left font-sans animate-fade-in w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#0a1f42] flex items-center gap-2">
            <span className="text-xl">📍</span>
            IESS {cityData.name}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Provincia de {cityData.province}. Turnos, ventanillas y centros de salud del IESS.
          </p>
        </div>
        <button
          onClick={clearSelectedCity}
          type="button"
          className="text-xs bg-slate-100 hover:bg-slate-200 text-[#0a1f42] px-3 py-1.5 rounded-lg font-extrabold transition-colors flex items-center gap-1.5 self-start sm:self-center cursor-pointer border"
        >
          <X className="w-3.5 h-3.5" /> Volver al Inicio
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        {/* Unique content (verified markdown long text) */}
        <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h2 className="text-lg font-black text-[#0a1f42] mt-5 mb-3 border-b border-slate-100 pb-1.5" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-sm sm:text-base font-extrabold text-[#0a1f42] mt-4 mb-2.5" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xs sm:text-sm font-black text-slate-800 mt-3 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-justify text-slate-650" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1.5 list-none" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-2 list-none" {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
            }}
          >
            {cityData.uniqueContent}
          </ReactMarkdown>
        </div>

        <AdSlot slot="city-page-mid" format="in-article" />

        {/* Verified Dependencies cards */}
        {hasVerifiedDeps ? (
          <div className="pt-6 border-t border-slate-150 space-y-4">
            <h4 className="text-xs sm:text-sm font-black text-[#0a1f42] uppercase tracking-wider">🏢 Oficinas y Dependencias Reales del IESS en {cityData.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cityData.dependencies.map((dep: any, idx: number) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200 rounded-xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[8.5px] uppercase font-black text-white bg-[#0a1f42] px-2 py-0.5 rounded shadow-2xs">
                      {dep.type === "CAU" ? "Atención Universal" : dep.type === "Hospital" ? "Unidad Médica" : "Agencia BIESS"}
                    </span>
                    <span className="text-[8.5px] font-mono text-slate-400">Verificado</span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-black text-[#0a1f42] leading-tight">{dep.name}</h5>
                  <div className="text-[11px] leading-relaxed text-slate-600 space-y-1.5 pt-2 border-t border-slate-200/60 font-sans">
                    <p>📍 <strong>Dirección:</strong> {dep.address || "Bajo Auditoría"}</p>
                    <p>📞 <strong>Teléfono:</strong> {dep.phone || "Bajo Auditoría"}</p>
                    <p>⏱️ <strong>Horario:</strong> {dep.hours || "Bajo Auditoría"}</p>
                    <p className="text-[9.5px] text-slate-400 italic font-mono">📅 Auditado el {dep.verifiedAt} via {dep.source}</p>
                  </div>
                  {dep.mapsUrl && (
                    <div className="pt-1.5">
                      <a
                        href={dep.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 bg-amber-50 hover:bg-[#c9a84c]/20 text-[#0a1f42] text-[10.5px] font-black px-2.5 py-1.5 rounded-lg border border-slate-200 no-underline transition-all cursor-pointer font-sans"
                      >
                        🗺️ Ver en Google Maps &rarr;
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-red-50/75 border border-red-200 text-red-900 p-4.5 rounded-xl text-xs sm:text-sm leading-relaxed space-y-2 mt-4 font-sans">
            <p className="font-extrabold uppercase">⚠️ DIRECCIÓN BAJO AUDITORÍA EDITORIAL</p>
            <p className="text-justify text-red-850">
              Actualmente, las dependencias físicas del IESS en <strong>{cityData.name}</strong> se encuentran bajo un proceso de revisión y auditoría para evitar el marcado engañoso o direcciones ficticias en buscadores. Visite los canales oficiales o las ventanillas del IESS provincial para soporte directo.
            </p>
          </div>
        )}

        {/* Local consultation CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/25 border border-dashed border-amber-250 p-4 rounded-xl">
          <div className="text-slate-500 text-[10.5px]">
            Consulte de forma interactiva sobre regulaciones locales del IESS en la provincia de <span className="font-bold text-slate-700">{cityData.province}</span>.
          </div>
          <button
            onClick={() => {
              const query = `Hola. Necesito soporte para trámites presenciales del IESS en la ciudad de ${cityData.name}, provincia de ${cityData.province}. ¿Qué dependencias verified oficiales están operando, qué debo llevar y qué alternativas digitales tengo?`;
              onConsultChatbot(query);
            }}
            type="button"
            className="bg-[#0a1f42] hover:bg-[#113160] text-white font-extrabold py-2 px-4 rounded-xl transition-all text-xs cursor-pointer uppercase tracking-wider"
          >
            Consultar al Asistente Virtual sobre {cityData.name} 💬
          </button>
        </div>
      </motion.div>
    </div>
  );
}
