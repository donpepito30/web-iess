import React from "react";
import { ArrowLeft, FileText, Copy, Printer, Check } from "lucide-react";
import Link from "../components/Link";
import { OFICIOS_TEMPLATES } from "../data/templates";

interface OficiosProps {
  selectedOficioId: string;
  setSelectedOficioId: (val: string) => void;
  oficioFormValues: Record<string, string>;
  setOficioFormValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  oficioCopied: boolean;
  setOficioCopied: (val: boolean) => void;
  onConsultChatbot: (query: string) => void;
}

export default function Oficios({
  selectedOficioId,
  setSelectedOficioId,
  oficioFormValues,
  setOficioFormValues,
  oficioCopied,
  setOficioCopied,
  onConsultChatbot
}: OficiosProps) {

  const formatFecha = (fechaStr: string) => {
    if (!fechaStr) return "";
    const partes = fechaStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return fechaStr;
  };

  const curOficio = OFICIOS_TEMPLATES.find(o => o.id === selectedOficioId) || OFICIOS_TEMPLATES[0];

  // Prepare form fields with formatted dates
  const preparedValues: Record<string, string> = { ...oficioFormValues };
  curOficio.fields.forEach(field => {
    if (field.type === "date" && preparedValues[field.id]) {
      preparedValues[field.id] = formatFecha(preparedValues[field.id]);
    }
  });

  const docContent = curOficio.generateText(preparedValues, formatFecha);

  return (
    <div className="space-y-6 font-sans text-slate-800 animate-fade-in w-full">
      {/* BRANDING FORMULARIOS COMPLETOS */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border-2 border-[#c9a84c] rounded-2xl p-5 shadow-sm text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-xl font-extrabold text-[#0a1f42]">
                Generador Integral de Oficios y Peticiones de Ley
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              ¿Sabías que muchos "tramitadores" afuera de los Centros de Atención cobran de $15 a $35 solo por llenar solicitudes básicas? Con nuestra herramienta gratuita, genera oficios formales sustentados en la Constitución del Ecuador y la normativa del IESS para ejercer tus derechos de forma 100% gratuita y sin intermediarios.
            </p>
          </div>
          <div className="bg-[#0a1f42] text-white rounded-lg px-4 py-2 text-center shrink-0 shadow-sm border border-slate-800">
            <span className="block text-lg font-black text-[#c9a84c]">{OFICIOS_TEMPLATES.length}</span>
            <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-300">Formatos Oficiales</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* Selector de Trámite en Sidebar */}
          <div className="xl:col-span-5 space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-650 mb-2">
                1. Selecciona el trámite de tu interés:
              </label>
              <select
                value={selectedOficioId}
                onChange={(e) => {
                  setSelectedOficioId(e.target.value);
                  window.history.pushState(null, "", `/herramientas/oficios/${e.target.value}`);
                }}
                className="w-full text-xs font-bold border-2 border-[#0a1f42] rounded-xl px-3 py-2.5 bg-white text-[#0a1f42] focus:outline-none focus:ring-2 focus:ring-[#0a1f42]/20 h-11"
              >
                <optgroup label="💼 Afiliación, Glosas y Cartera">
                  <option value="glosa">Impugnación de Glosa Patronal (20 días)</option>
                  <option value="aportes">Reclamo de Aportes Faltantes</option>
                  <option value="convenioPago">Convenio de Pago y Exoneración</option>
                  <option value="fallaSistema">Fallas del Sistema Informático</option>
                </optgroup>
                <optgroup label="🤰 Salud, Maternidad y Subsidios">
                  <option value="maternidad">Subsidio de Maternidad (84 días)</option>
                  <option value="enfermedadSubsidio">Subsidio por Enfermedad Común/Accidente</option>
                  <option value="aportesExceso">Devolución de Aportes en Exceso</option>
                  <option value="quejaMedica">Cambio de Médico o Queja Médica</option>
                </optgroup>
                <optgroup label="👴 Jubilación y Pensiones">
                  <option value="montepio">Pensión de Montepío (Fallecimiento)</option>
                  <option value="prejubilacion">Pre-Jubilación Ordinaria</option>
                  <option value="jubilacionCatastrofica">Jubilación por Enfermedad Catastrófica</option>
                </optgroup>
                <optgroup label="💰 Préstamos y Cesantía (BIESS)">
                  <option value="quirografario">Préstamo Quirografario (Auditoría Previa)</option>
                  <option value="cesantia">Retiro de Cesantía por Desempleo</option>
                </optgroup>
                <optgroup label="📋 Trámites Generales y Beneficios">
                  <option value="actualizacion">Actualización de Datos Personales</option>
                  <option value="moraSubsidios">Reclamo por Mora en Subsidios/Pensiones</option>
                  <option value="beneficiarios">Inscripción / Retiro de Beneficiarios</option>
                  <option value="ceseVoluntario">Cese de Afiliación Voluntaria</option>
                </optgroup>
              </select>
            </div>

            {/* Mostrar Base Legal del Oficio seleccionado */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3.5 space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0a1f42] uppercase">
                <span>🛡️</span> Fundamento Legal del Oficio:
              </div>
              <ul className="space-y-1.5 list-none pl-0">
                {curOficio.laws.split(", ").map((law, lidx) => (
                  <li key={lidx} className="text-[10.5px] leading-relaxed text-slate-700 flex items-start gap-1.5">
                    <span className="text-amber-500 shrink-0 select-none">•</span>
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FORMULARIO DINÁMICO */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5 text-left">
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#0a1f42] border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <span>✍️</span> Datos Necesarios del Trámite
              </h3>
              <div className="space-y-3.5">
                {curOficio.fields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wide text-slate-600 font-sans">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={oficioFormValues[field.id] || field.defaultValue || ""}
                        onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42] h-9"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === "date" ? (
                      <input
                        type="date"
                        value={oficioFormValues[field.id] || ""}
                        onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42]"
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        value={oficioFormValues[field.id] || ""}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        onChange={(e) => setOficioFormValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                        className="w-full text-xs border border-slate-205 rounded-lg px-2.5 py-1.5 bg-white font-medium font-sans focus:ring-1 focus:ring-[#0a1f42] focus:border-[#0a1f42]"
                      />
                    )}
                    {field.description && (
                      <p className="text-[9px] text-slate-400 italic mt-0.5">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onConsultChatbot(
                      `Hola. Necesito ayuda para tramitar: ${curOficio.name}. ¿Cuáles son los requisitos obligatorios anexos y qué leyes me respaldan?`
                    );
                  }}
                  className="w-full bg-slate-100 hover:bg-[#c9a84c]/20 hover:text-[#0a1f42] text-[10px] font-extrabold text-[#0a1f42] py-2 rounded-lg transition-colors uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-200 cursor-pointer"
                >
                  <span>💬</span> Consultar en el Chatbot
                </button>
              </div>
            </div>
          </div>

          {/* VISTA PREVIA DEL DOCUMENTO DE LEY (lado derecho) */}
          <div className="xl:col-span-7 flex flex-col justify-between space-y-4 text-left">
            <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              {/* Botones de Acción */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-150">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 border px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                  Solicitud en Vivo
                </span>
                <div className="flex gap-2 font-sans">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(docContent.trim());
                      setOficioCopied(true);
                      setTimeout(() => setOficioCopied(false), 2000);
                    }}
                    className="bg-slate-100 hover:bg-[#c9a84c] hover:text-white text-slate-700 text-[10.5px] font-extrabold py-1 px-2.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {oficioCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ¡COPIADO!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        COPIAR TEXTO
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="bg-[#0a1f42] hover:bg-slate-800 text-white text-[10.5px] font-extrabold py-1 px-2.5 rounded-lg border border-[#0a1f42] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    IMPRIMIR
                  </button>
                </div>
              </div>

              {/* Hoja de Oficio Terminado */}
              <div className="bg-slate-50 border-2 border-slate-250 rounded-xl p-5 font-serif text-[11px] leading-relaxed text-slate-800 h-[450px] overflow-y-auto relative shadow-inner select-text scrollbar-thin text-left">
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center text-4xl p-1 font-sans font-black">
                    IESS
                  </div>
                  <span className="text-[9px] font-sans font-black uppercase tracking-widest mt-1 block">TRÁMITE CIUDADANO</span>
                </div>

                <p className="whitespace-pre-wrap relative font-sans">{docContent}</p>
              </div>

              {/* Diagnóstico y Próximos Pasos de Ley */}
              <div className="mt-4 bg-slate-50 border-l-4 border-l-[#0a1f42] p-3.5 rounded-r-xl space-y-2 font-sans">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#0a1f42] uppercase tracking-wider">
                  <span>📍</span> Diagnóstico de su caso y Pasos para Radicarlo:
                </div>
                <div className="text-[10.5px] leading-relaxed text-slate-700 space-y-1">
                  <p>
                    <span className="font-extrabold text-[#0a1f42]">Trámite:</span> {curOficio.name}
                  </p>
                  {curOficio.timeframe && (
                    <p>
                      <span className="font-extrabold text-[#0a1f42]">Plazo Reglamentario:</span> {curOficio.timeframe}
                    </p>
                  )}
                  <p className="font-semibold text-slate-800">Próximos pasos recomendados:</p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-650 font-medium">
                    <li>Haz clic en <span className="font-bold uppercase text-[#0a1f42] text-[9.5px]">"Copiar Texto"</span> e ingresa en Microsoft Word o Google Docs para imprimirlo en <span className="font-extrabold">original y copia</span>.</li>
                    <li>Firma de puño y letra ambas copias físicas.</li>
                    <li>Acude al <span className="font-semibold text-slate-800">Centro de Atención Universal</span> del IESS de tu ciudad (Ventanilla de Correspondencia).</li>
                    <li>Entrega el original junto a los documentos de soporte recomendados y haz que te sellen la copia física con la fecha de recibido para llevar tu control.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque explicativo */}
      <div className="prose prose-slate max-w-none text-left font-sans text-slate-700 text-sm leading-relaxed space-y-4">
        <h3 className="text-base font-extrabold text-[#0a1f42] uppercase tracking-wider border-b pb-2">
          Defensa ciudadana y marco legal del Derecho de Petición en Ecuador
        </h3>
        <p>
          Toda persona natural en el territorio nacional cuenta con la garantía de dirigir quejas y peticiones de forma directa ante las autoridades de la administración pública y de la seguridad social del Ecuador. Este derecho está consagrado de forma explícita en el **artículo 66, numeral 23 de la Constitución de la República de Ecuador** (Derecho de Petición).
        </p>
        <p>
          A través de esta plataforma digital independiente, los asegurados pueden redactar de forma gratuita, técnica e integral, oficios y apelaciones formales ajustados a la Ley de Seguridad Social y las resoluciones administrativas vigentes del Consejo Directivo (como la **Resolución C.D. 677** para regularización patronal o la **Resolución C.D. 515** para seguros de desempleo).
        </p>
        <p>
          Al generar su solicitud y radicarla en las ventanillas físicas del IESS, la institución pública tiene la obligación legal de responder de forma escrita, motivada y expedita en los plazos fijados por el Código Orgánico Administrativo (COA), protegiendo sus intereses como cotizante de la seguridad social y erradicando la necesidad de recurrir a intermediarios o "tramitadores" privados que realizan cobros abusivos e innecesarios.
        </p>
      </div>
    </div>
  );
}
