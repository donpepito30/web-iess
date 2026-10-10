import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Calculator, 
  FileText, 
  Copy, 
  Check, 
  AlertTriangle, 
  ArrowLeft, 
  Calendar, 
  Award, 
  Coins 
} from "lucide-react";
import { Link } from "./Link";
import { getFactValue } from "../data/facts";
import { analytics } from "../lib/analytics";

// Helper to push GA4 events safely
const logGA4Event = (eventName: string, params?: Record<string, any>) => {
  if (eventName === "tool_start" && params?.tool_name) {
    analytics.toolStart(params.tool_name);
  } else if (eventName === "tool_complete" && params?.tool_name) {
    analytics.toolComplete(params.tool_name, params.cumple_requisitos ?? true);
  }
};

/**
 * TOOL 1: Calculadora de Jubilación Ordinaria por Vejez
 */
export function CalculadoraJubilacion() {
  const [edad, setEdad] = useState<number | "">("");
  const [aportesAnos, setAportesAnos] = useState<number | "">("");
  const [aportesMeses, setAportesMeses] = useState<number | "">("");
  const [genero, setGeneras] = useState<string>("m");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    logGA4Event("tool_start", { tool_name: "calculadora_jubilacion" });
  }, []);

  const totalImposiciones = (Number(aportesAnos || 0) * 12) + Number(aportesMeses || 0);
  const edadNum = Number(edad || 0);

  // Reglas vigentes de jubilación (basado en facts.ts)
  const reglas = [
    { id: 1, edadReq: 0, imposicionesReq: 480, desc: "Cualquier edad con 40 años de aportes (480 imposiciones)" },
    { id: 2, edadReq: 60, imposicionesReq: 360, desc: "60 años de edad y 30 años de aportes (360 imposiciones)" },
    { id: 3, edadReq: 65, imposicionesReq: 180, desc: "65 años de edad y 15 años de aportes (180 imposiciones)" },
    { id: 4, edadReq: 70, imposicionesReq: 120, desc: "70 años de edad y 10 años de aportes (120 imposiciones)" }
  ];

  const resultadosReglas = reglas.map((regla) => {
    const faltaEdad = regla.edadReq === 0 ? 0 : Math.max(0, regla.edadReq - edadNum);
    const faltaImposiciones = Math.max(0, regla.imposicionesReq - totalImposiciones);
    const cumple = faltaEdad === 0 && faltaImposiciones === 0;

    return {
      ...regla,
      faltaEdad,
      faltaImposiciones,
      cumple
    };
  });

  const cumpleAlguna = resultadosReglas.some(r => r.cumple);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edad || (aportesAnos === "" && aportesMeses === "")) return;
    setShowResult(true);
    logGA4Event("tool_complete", { 
      tool_name: "calculadora_jubilacion", 
      edad: edadNum, 
      total_imposiciones: totalImposiciones,
      cumple_requisitos: cumpleAlguna
    });
  };

  const getResultText = () => {
    let text = `--- RESULTADOS DE SIMULACIÓN DE JUBILACIÓN IESS 2026 ---\n`;
    text += `Edad ingresada: ${edadNum} años\n`;
    text += `Aportes registrados: ${totalImposiciones} imposiciones (${Math.floor(totalImposiciones / 12)} años y ${totalImposiciones % 12} meses)\n\n`;
    if (cumpleAlguna) {
      text += `¡ENHORABUENA! Cumple con los requisitos para jubilarse bajo la siguiente norma:\n`;
      resultadosReglas.filter(r => r.cumple).forEach(r => {
        text += `- ${r.desc}\n`;
      });
    } else {
      text += `Actualmente NO es elegible para jubilarse. Progreso para calificar:\n`;
      resultadosReglas.forEach(r => {
        text += `- Opción (${r.desc}): `;
        if (r.faltaEdad > 0 && r.faltaImposiciones > 0) {
          text += `Le faltan ${r.faltaEdad} años de edad y ${r.faltaImposiciones} aportaciones (${Math.ceil(r.faltaImposiciones / 12)} años).\n`;
        } else if (r.faltaEdad > 0) {
          text += `Le faltan ${r.faltaEdad} años de edad (Ya cumple los aportes requeridos).\n`;
        } else {
          text += `Le faltan ${r.faltaImposiciones} aportaciones (${Math.ceil(r.faltaImposiciones / 12)} años) de servicio.\n`;
        }
      });
    }
    text += `\n*Nota: Simulación informativa basada en la Ley de Seguridad Social de Ecuador. Confirme su historial en el portal oficial del IESS.`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* CARD INTERACTIVA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a1f42]">
            <Calculator className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#0a1f42]">Simulador de Elegibilidad de Jubilación por Vejez</h2>
            <p className="text-xs text-slate-500">Consulte al instante si cumple con las combinaciones de edad y tiempo de servicio.</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-600">Edad Actual (Años)</label>
            <input 
              type="number" 
              value={edad} 
              min={18} 
              max={110} 
              onChange={(e) => setEdad(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej. 62" 
              required
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-600">Años de Aportación</label>
            <input 
              type="number" 
              value={aportesAnos} 
              min={0} 
              max={60} 
              onChange={(e) => setAportesAnos(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej. 28" 
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-600">Meses Adicionales</label>
            <input 
              type="number" 
              value={aportesMeses} 
              min={0} 
              max={11} 
              onChange={(e) => setAportesMeses(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej. 4" 
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
            />
          </div>

          <div className="md:col-span-12 pt-2 flex justify-end">
            <button 
              type="submit" 
              className="w-full md:w-auto text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider"
            >
              Simular Requisitos <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </form>

        {showResult && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 text-left">
            <h3 className="text-sm font-extrabold uppercase text-[#0a1f42] tracking-wider mb-2 flex items-center gap-1.5">
              <span>📊</span> Resultados de la Simulación de Elegibilidad
            </h3>

            {/* Banner de elegibilidad */}
            <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              cumpleAlguna 
                ? "bg-emerald-50 border-emerald-200 text-emerald-850" 
                : "bg-amber-50 border-amber-200 text-amber-850"
            }`}>
              {cumpleAlguna ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                  {cumpleAlguna ? "¡ELEGIBLE PARA LA JUBILACIÓN!" : "AÚN NO ES ELEGIBLE PARA JUBILARSE"}
                </h4>
                <p className="text-xs leading-relaxed mt-1 opacity-90">
                  {cumpleAlguna 
                    ? `Según sus datos, cumple plenamente con los requisitos del IESS para jubilarse. Puede iniciar su solicitud oficial en línea en el portal iess.gob.ec.`
                    : `Dispone de un total de ${totalImposiciones} aportes mensuales. Revise abajo el progreso detallado para cada una de las opciones de jubilación.`
                  }
                </p>
              </div>
            </div>

            {/* Listado de progreso detallado de reglas */}
            <div className="space-y-3.5 pt-2">
              {resultadosReglas.map((r) => (
                <div key={r.id} className={`p-3.5 rounded-lg border flex flex-col sm:flex-row justify-between sm:items-center gap-2 transition-all ${
                  r.cumple 
                    ? "bg-white border-emerald-200 shadow-xs" 
                    : "bg-slate-50/50 border-slate-200"
                }`}>
                  <div>
                    <span className="inline-block text-[9px] font-black uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border mb-1.5">
                      Condición {r.id}
                    </span>
                    <h5 className="text-xs font-extrabold text-slate-800 leading-snug">{r.desc}</h5>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {r.cumple ? (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                        ✓ Cumplido
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 border border-slate-350 px-2.5 py-1 rounded-full flex flex-col text-right">
                        {r.faltaEdad > 0 && `+${r.faltaEdad} años de edad`}
                        {r.faltaImposiciones > 0 && `+${r.faltaImposiciones} aportes (${Math.ceil(r.faltaImposiciones / 12)} años)`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Descargo y Botón de copiar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50/50 border border-dashed p-3.5 rounded-xl mt-3 font-sans">
              <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-xl">
                ⚠️ <strong>Descargo</strong>: Este valor es referencial y no vinculante. No constituye asesoría legal ni una aprobación del trámite. Confirme su récord de cotizaciones reales de forma directa en el portal del IESS.
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    ¡COPIADO!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    COPIAR RESULTADO
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BLOQUE EXPLICATIVO DE 500+ PALABRAS */}
      <div className="prose prose-slate max-w-none text-left font-sans text-slate-700 text-sm leading-relaxed space-y-4">
        <h3 className="text-base font-extrabold text-[#0a1f42] uppercase tracking-wider border-b pb-2">
          Cómo se calcula y cuáles son las bases legales de la Jubilación por Vejez
        </h3>
        <p>
          En el Ecuador, la **Jubilación por Vejez** es un beneficio económico vitalicio otorgado por el Instituto Ecuatoriano de Seguridad Social (IESS). Está sustentada en la Constitución de la República de Ecuador y en la Ley de Seguridad Social vigente. Para calificar al cobro mensual de la pensión, el sistema nacional de reparto exige una proporcionalidad estricta entre la edad cronológica del afiliado y el número mínimo de aportaciones mensuales realizadas (denominadas técnicamente "imposiciones").
        </p>
        <p>
          A diferencia de otros sistemas pensionales privados, las imposiciones en el IESS no prescriben ni caducan aunque el trabajador permanezca cesante o deje de aportar temporalmente durante periodos de desempleo. Toda cotización realizada bajo relación de dependencia o mediante la afiliación voluntaria independiente se consolida y suma automáticamente en su cuenta individual del historial de aportaciones.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Porcentajes de liquidación y bases de cálculo de la pensión
        </h4>
        <p>
          El cálculo definitivo del monto mensual de su pensión de jubilación se rige bajo una fórmula matemática aprobada por el Consejo Directivo del IESS. Esta base se calcula tomando el promedio consolidado de los **cinco (5) años con los mejores sueldos** de toda su historia laboral (es decir, las 60 remuneraciones mensuales más altas declaradas sobre las cuales aportó).
        </p>
        <p>
          Ese promedio se multiplica por un coeficiente de liquidación fijado por ley que depende de los años completos de cotización que posea acumulados. El porcentaje de liquidación mínima empieza en el **50%** del promedio para quienes se jubilan con el tiempo mínimo de servicio exigido (ej. 10 años de aportes a los 70 de edad) y se incrementa de forma progresiva hasta alcanzar un tope máximo del **100%** del promedio para aquellos afiliados que acrediten 40 años completos de aportaciones o más al seguro social.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Preguntas Frecuentes sobre Requisitos de Jubilación
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Qué pasa si me faltan pocos aportes para jubilarme?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Si le faltan imposiciones para calificar pero ya cumple la edad mínima, puede optar por la **afiliación voluntaria independiente** aportando de forma mensual por su propia cuenta para completar las cuotas requeridas de forma ágil y 100% legal.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Existe un monto mínimo y máximo para las pensiones de jubilación?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Sí, los límites de pensión de jubilación mínima y máxima se determinan anualmente por el IESS según el Salario Básico Unificado (SBU). El monto mínimo se calcula proporcionalmente al tiempo de servicio para garantizar la subsistencia.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs">
            <strong>Fuentes Oficiales consultadas:</strong> Ley de Seguridad Social de Ecuador, Resoluciones vigentes del Consejo Directivo del IESS. Última verificación: Octubre de 2026.
          </div>
          <Link 
            to="/procedimiento/jubilacion-vejez" 
            className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] shrink-0"
          >
            Ver guía paso a paso del trámite →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * TOOL 2: Calculadora de Aporte de Afiliación Voluntaria
 */
export function CalculadoraAporteVoluntario() {
  const [salario, setSalario] = useState<number | "">("");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    logGA4Event("tool_start", { tool_name: "calculadora_aporte_voluntario" });
  }, []);

  const sbu2026 = Number(getFactValue("SBU_2026")) || 482;
  const tasaPct = Number(getFactValue("APORTE_VOLUNTARIO_PCT")) || 17.60;
  
  const salarioNum = Number(salario || 0);
  const aporteMensual = salarioNum * (tasaPct / 100);

  const isMinValido = salarioNum >= sbu2026;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salario) return;
    setShowResult(true);
    logGA4Event("tool_complete", { 
      tool_name: "calculadora_aporte_voluntario", 
      salario_declarado: salarioNum,
      aporte_calculado: isMinValido ? aporteMensual : 0,
      valido: isMinValido
    });
  };

  const getResultText = () => {
    let text = `--- CÁLCULO DE APORTE MENSUAL VOLUNTARIO IESS 2026 ---\n`;
    text += `Salario Básico Unificado de referencia: $${sbu2026} USD\n`;
    text += `Ingreso mensual declarado: $${salarioNum.toFixed(2)} USD\n`;
    text += `Porcentaje de cotización obligatorio: ${tasaPct.toFixed(2)}%\n\n`;
    if (isMinValido) {
      text += `SU APORTE MENSUAL A PAGAR SERÁ DE: $${aporteMensual.toFixed(2)} USD\n`;
      text += `*Nota: El pago debe realizarse puntualmente de forma mensual hasta el día 15 de cada mes vencido.`;
    } else {
      text += `ERROR: El ingreso declarado no puede ser inferior al Salario Básico Unificado vigente ($${sbu2026} USD).`;
    }
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* CARD INTERACTIVA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a1f42]">
            <Coins className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#0a1f42]">Calculadora de Aporte Mensual para Afiliados Voluntarios</h2>
            <p className="text-xs text-slate-500">Determine el costo exacto de su cotización de seguridad social voluntaria para el año 2026.</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 space-y-1.5 text-left">
            <label className="block text-xs font-bold uppercase text-slate-600">Ingreso Mensual Declarado (USD)</label>
            <input 
              type="number" 
              value={salario} 
              min={100} 
              max={10000} 
              onChange={(e) => setSalario(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={`Mínimo Salario Básico de $${sbu2026} USD`}
              required
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
            />
            <p className="text-[10px] text-slate-400">
              * El ingreso declarado sirve de base para el cálculo de su futura pensión y de sus coberturas financieras en el BIESS.
            </p>
          </div>

          <div className="md:col-span-4 pt-1.5 flex items-end">
            <button 
              type="submit" 
              className="w-full text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider h-11"
            >
              Calcular Aporte <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </form>

        {showResult && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 text-left">
            <h3 className="text-sm font-extrabold uppercase text-[#0a1f42] tracking-wider mb-2 flex items-center gap-1.5">
              <span>💰</span> Liquidación Mensual del Aporte
            </h3>

            {isMinValido ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Sueldo Declarado</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#0a1f42]">${salarioNum.toFixed(2)} USD</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Tasa de Aporte</span>
                    <span className="text-sm sm:text-base font-extrabold text-[#0a1f42]">{tasaPct.toFixed(2)}%</span>
                  </div>
                  <div className="col-span-2 bg-[#0a1f42] text-white rounded-lg p-2.5 flex flex-col justify-center border border-slate-800">
                    <span className="block text-[9px] uppercase font-extrabold text-slate-350 tracking-wider">Aporte Mensual a Cancelar</span>
                    <span className="text-lg font-black text-[#c9a84c]">${aporteMensual.toFixed(2)} USD</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-800">Plazos y calendario de pagos:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Usted debe cancelar este valor de forma mensual **hasta el día 15 del mes subsiguiente** al cobro. Por ejemplo, su aporte del mes de enero de 2026 se puede pagar máximo hasta el 15 de febrero de 2026. El retraso generará recargos retroactivos de mora e inhabilitación temporal de sus derechos a citas médicas gratuitas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border bg-red-50 border-red-200 text-red-800 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wide">INGRESO MENSUAL INVALIDO</h4>
                  <p className="text-xs leading-relaxed mt-1">
                    La Ley de Seguridad Social de Ecuador prohíbe de forma estricta que los afiliados independientes o voluntarios coticen bajo una base salarial inferior al **Salario Básico Unificado (SBU)** determinado para el ejercicio fiscal corriente. El salario básico actual es de **$${sbu2026} USD**. Por favor, corrija el valor ingresado.
                  </p>
                </div>
              </div>
            )}

            {/* Descargo y Botón de copiar */}
            {isMinValido && (
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50/50 border border-dashed p-3.5 rounded-xl mt-3 font-sans">
                <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-xl">
                  ⚠️ <strong>Descargo</strong>: Los valores de cotización son orientativos y referenciales según la norma general. No consideran condiciones especiales de afiliación de trabajos específicos.
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      ¡COPIADO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      COPIAR RESULTADO
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BLOQUE EXPLICATIVO DE 500+ PALABRAS */}
      <div className="prose prose-slate max-w-none text-left font-sans text-slate-700 text-sm leading-relaxed space-y-4">
        <h3 className="text-base font-extrabold text-[#0a1f42] uppercase tracking-wider border-b pb-2">
          Todo sobre el esquema de cotización voluntaria en el IESS de Ecuador
        </h3>
        <p>
          La **Afiliación Voluntaria** es un régimen de la seguridad social del Ecuador concebido para brindar un amparo total ante contingencias de salud y jubilación a todas las personas que ejerzan actividades de forma autónoma, profesionales en el libre ejercicio de su profesión, empresarios independientes, personas dedicadas al trabajo doméstico no remunerado, y ecuatorianos migrantes que residan en el extranjero.
        </p>
        <p>
          El costo mensual de la aportación voluntaria se calcula aplicando la tasa obligatoria del **17.60%** (fijada por el Reglamento de Aseguramiento del IESS) de forma directa sobre la remuneración mensual declarada por el solicitante en el momento de realizar su registro electrónico en la página web oficial.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Por qué el Salario Básico es el límite legal del aporte
        </h4>
        <p>
          De acuerdo con el artículo de recaudaciones de la Ley de Seguridad Social, la base de aportación declarada por el asegurado voluntario nunca podrá ser menor al **Salario Básico Unificado (SBU)** legalmente vigente en el Ecuador para el año del ejercicio contable correspondiente. Esto significa que para el año fiscal **2026**, al estar el sueldo mínimo fijado en **$${sbu2026} USD**, el valor de aporte mensual más bajo aceptado por los servidores del IESS es de **$${aporteMensual.toFixed(2)} USD** mensuales.
        </p>
        <p>
          Si el afiliado opta por declarar ingresos mayores (ejemplo: $1,000 USD al mes debido a honorarios profesionales facturados de forma constante), el aporte se recalculará automáticamente proporcional al valor. Declarar ingresos acordes a su realidad laboral es sumamente beneficioso para su bienestar futuro, dado que la pensión de jubilación vitalicia posterior se computa tomando como base los 5 mejores años de aportes de toda su trayectoria.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Preguntas Frecuentes sobre la Afiliación Voluntaria
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿La afiliación voluntaria incluye acceso a fondos de reserva?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              No, la afiliación voluntaria no da derecho a la acumulación de fondos de reserva ni subsidios de desempleo convencionales, dado que estos son exclusivos de las relaciones bajo dependencia patronal ordinaria.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Cómo evito acumular deudas si decido suspender el seguro?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Para dejar de pagar de forma temporal y evitar acumular mora involuntaria, debe ingresar a iess.gob.ec y solicitar formalmente el **Cese de Afiliación Voluntaria**. No basta con dejar de realizar las transferencias.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs">
            <strong>Fuentes Oficiales consultadas:</strong> Resoluciones CD 625 y de Cartera y Aseguramiento del IESS. Última verificación: Octubre de 2026.
          </div>
          <Link 
            to="/procedimiento/afiliacion-voluntaria" 
            className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] shrink-0"
          >
            Ver guía paso a paso del trámite →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * TOOL 3: Calculadora de Subsidio de Maternidad
 */
export function CalculadoraMaternidad() {
  const [promedioSueldo, setPromedioSueldo] = useState<number | "">("");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    logGA4Event("tool_start", { tool_name: "calculadora_subsidio_maternidad" });
  }, []);

  const promedioNum = Number(promedioSueldo || 0);

  // El IESS asume el 75%, el empleador asume el 25% por ley
  // Licencia de 12 semanas (84 días calendarios)
  const factorIess = 0.75;
  const factorEmpleador = 0.25;

  const totalIess = promedioNum * factorIess * (84 / 30);
  const totalEmpleador = promedioNum * factorEmpleador * (84 / 30);
  const totalSubsidio = promedioNum * (84 / 30);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promedioSueldo) return;
    setShowResult(true);
    logGA4Event("tool_complete", { 
      tool_name: "calculadora_subsidio_maternidad", 
      promedio_salario: promedioNum,
      subsidio_estimado_iess: totalIess
    });
  };

  const getResultText = () => {
    let text = `--- ESTIMACIÓN DE SUBSIDIO DE MATERNIDAD IESS 2026 ---\n`;
    text += `Promedio de salario mensual ingresado (últimos 12 meses): $${promedioNum.toFixed(2)} USD\n`;
    text += `Duración reglamentaria de la licencia: 84 días calendarios (12 semanas)\n\n`;
    text += `DETALLE DE PAGOS COMPARTIDOS:\n`;
    text += `- PORCIÓN ASUMIDA POR EL IESS (75%): $${totalIess.toFixed(2)} USD\n`;
    text += `- PORCIÓN ASUMIDA POR EL EMPLEADOR (25%): $${totalEmpleador.toFixed(2)} USD\n`;
    text += `- INGRESO TOTAL COMPENSADO DURANTE LICENCIA (100%): $${totalSubsidio.toFixed(2)} USD\n\n`;
    text += `*Nota: Requiere registrar al menos 12 aportaciones mensuales antes del parto para calificar al subsidio.`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* CARD INTERACTIVA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a1f42]">
            <Calendar className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#0a1f42]">Simulador de Subsidio Económico por Maternidad</h2>
            <p className="text-xs text-slate-500">Calcule los montos compartidos que recibirá del IESS y su empleador durante las 12 semanas de reposo.</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 space-y-1.5 text-left">
            <label className="block text-xs font-bold uppercase text-slate-600">Sueldo Promedio de Cotización (Últimos 12 meses)</label>
            <input 
              type="number" 
              value={promedioSueldo} 
              min={100} 
              max={15000} 
              onChange={(e) => setPromedioSueldo(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej. 850" 
              required
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0a1f42] focus:ring-1 focus:ring-[#0a1f42]"
            />
            <p className="text-[10px] text-slate-400">
              * Ingrese el promedio neto de remuneraciones sobre las que aportó en el año inmediatamente anterior al parto.
            </p>
          </div>

          <div className="md:col-span-4 pt-1.5 flex items-end">
            <button 
              type="submit" 
              className="w-full text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider h-11"
            >
              Simular Subsidio <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </form>

        {showResult && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 text-left">
            <h3 className="text-sm font-extrabold uppercase text-[#0a1f42] tracking-wider mb-2 flex items-center gap-1.5">
              <span>📊</span> Desglose Estimado de Coberturas de Maternidad
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-500">Porción IESS (75%)</span>
                <span className="block text-lg font-black text-[#0a1f42]">${totalIess.toFixed(2)} USD</span>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Valor transferido de manera directa por el IESS a su cuenta registrada tras procesar la aprobación médica.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-500">Porción Empleador (25%)</span>
                <span className="block text-lg font-black text-[#0a1f42]">${totalEmpleador.toFixed(2)} USD</span>
                <p className="text-[10px] text-slate-400 leading-snug">
                  Compensado directamente por la empresa en sus roles ordinarios de pago durante los meses de la licencia.
                </p>
              </div>

              <div className="bg-[#0a1f42] border border-slate-800 p-4 rounded-xl space-y-1 text-white flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-350 tracking-wider">Total Compensado (100%)</span>
                  <span className="block text-xl font-black text-[#c9a84c]">${totalSubsidio.toFixed(2)} USD</span>
                </div>
                <p className="text-[9px] text-slate-300 leading-tight">
                  Suma total percibida durante las 12 semanas (84 días) correspondientes a su descanso por maternidad.
                </p>
              </div>
            </div>

            {/* Descargo y Botón de copiar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50/50 border border-dashed p-3.5 rounded-xl mt-3 font-sans">
              <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-xl">
                ⚠️ <strong>Descargo</strong>: Los valores indicados son aproximados basados en la normativa general de reparto compartido del salario. No constituyen una obligación de desembolso por parte del IESS.
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    ¡COPIADO!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    COPIAR RESULTADO
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BLOQUE EXPLICATIVO DE 500+ PALABRAS */}
      <div className="prose prose-slate max-w-none text-left font-sans text-slate-700 text-sm leading-relaxed space-y-4">
        <h3 className="text-base font-extrabold text-[#0a1f42] uppercase tracking-wider border-b pb-2">
          Cómo opera la licencia y compensación por maternidad en Ecuador
        </h3>
        <p>
          El **Subsidio de Maternidad** es un amparo monetario prioritario diseñado por la seguridad social en Ecuador para asegurar el sustento y estabilidad de la madre afiliada y de su recién nacido. Está amparado en el artículo 152 del Código de Trabajo y la normativa de salud y subsidios de la seguridad social.
        </p>
        <p>
          Por ley, toda trabajadora que da a luz tiene derecho irrenunciable a una licencia de maternidad remunerada de **12 semanas (84 días calendario)** consecutivos. Durante este lapso de descanso obligatorio (que la madre puede distribuir de forma prenatal y postnatal según prescripción médica oficial), la trabajadora no recibe su salario regular de la empresa, sino una compensación compartida.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Porcentaje de aportación compartida entre IESS y Empleador
        </h4>
        <p>
          La carga económica de la licencia se distribuye legalmente de la siguiente forma: el **IESS financia el 75%** del salario base de la trabajadora a través del subsidio directo de maternidad, mientras que el **empleador cubre únicamente el 25%** restante de su remuneración mensual en rol. En partos múltiples, la normativa expande de forma estricta la licencia en **10 días adicionales** bajo el mismo esquema de porcentajes de pago.
        </p>
        <p>
          Para calificar al cobro de esta prestación, el IESS exige que la afiliada registre al menos **12 aportaciones mensuales continuas** o discontinuas dentro de los 15 meses previos a la fecha estimada del parto, manteniendo la afiliación activa al inicio de la licencia.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Preguntas Frecuentes sobre el Subsidio de Maternidad
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Qué sucede si fui atendida en una clínica privada?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Debe certificar y **homologar** su certificado médico particular dentro de los 8 días hábiles posteriores al parto ingresando al portal de iess.gob.ec para habilitar el subsidio del IESS.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿La licencia del padre (paternidad) es cubierta por el IESS?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              No, la licencia por paternidad de 10 a 15 días laborables es pagada al **100% por el empleador** directamente, de acuerdo con el Código del Trabajo de Ecuador, por lo que no interviene un subsidio del IESS.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs">
            <strong>Fuentes Oficiales consultadas:</strong> Código del Trabajo de Ecuador, Reglamento de Subsidios Monetarios IESS. Última verificación: Octubre de 2026.
          </div>
          <Link 
            to="/procedimiento/subsidio-maternidad" 
            className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] shrink-0"
          >
            Ver guía paso a paso del trámite →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * TOOL 4: Verifica Requisitos Préstamo Quirografario
 */
export function VerificaQuirografario() {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q4, setQ4] = useState<string | null>(null);
  const [q5, setQ5] = useState<string | null>(null);
  const [q6, setQ6] = useState<string | null>(null);
  const [q7, setQ7] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    logGA4Event("tool_start", { tool_name: "verifica_quirografario" });
  }, []);

  const totalAportes = getFactValue("QUIROGRAFARIO_APORTES_REQ") || 36;
  const continuos = getFactValue("QUIROGRAFARIO_CONSECUTIVOS_REQ") || 12;

  const qualifies = q1 === "yes" && q2 === "yes" && q3 === "yes" && q4 === "yes" && q5 === "yes" && q6 === "no" && q7 === "yes";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7) return;
    setShowResult(true);
    logGA4Event("tool_complete", { 
      tool_name: "verifica_quirografario", 
      califica: qualifies
    });
  };

  const getResultText = () => {
    let text = `--- AUDITORÍA DE REQUISITOS QUIROGRAFARIO BIESS 2026 ---\n`;
    text += `¿Cumple con las ${totalAportes} aportaciones acumuladas?: ${q1 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Últimos ${continuos} aportes continuos?: ${q2 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Es afiliado activo/jubilado?: ${q3 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Empleador al día?: ${q4 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Posee fondos de reserva/cesantía?: ${q5 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Registra deudas en mora?: ${q6 === "yes" ? "SÍ" : "NO"}\n`;
    text += `¿Cuenta bancaria validada?: ${q7 === "yes" ? "SÍ" : "NO"}\n\n`;
    if (qualifies) {
      text += `¡PREAPROBADO! Cumple con la totalidad de los requisitos técnicos del BIESS para solicitar un Préstamo Quirografario inmediato.`;
    } else {
      text += `ACTUALMENTE NO CALIFICA. Debe subsanar las observaciones indicadas en el reporte del sistema.`;
    }
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderRadio = (name: string, val: string | null, setVal: (v: string) => void) => {
    return (
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setVal("yes")}
          className={`py-1.5 px-4 text-xs font-bold rounded-lg border transition-all ${
            val === "yes"
              ? "bg-[#0a1f42] text-white border-[#0a1f42]"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Sí
        </button>
        <button
          type="button"
          onClick={() => setVal("no")}
          className={`py-1.5 px-4 text-xs font-bold rounded-lg border transition-all ${
            val === "no"
              ? "bg-[#0a1f42] text-white border-[#0a1f42]"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          No
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* CARD INTERACTIVA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0a1f42]">
            <Award className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#0a1f42]">Autoevaluación de Requisitos para Préstamo Quirografario</h2>
            <p className="text-xs text-slate-500">Responda a este cuestionario oficial para verificar si la plataforma del BIESS aceptará su crédito.</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-5 text-left font-sans">
          
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">1. ¿Registra al menos {totalAportes} aportaciones mensuales totales en su historial del IESS?</h4>
              <p className="text-[10.5px] text-slate-500">Pueden ser de diferentes empleadores de forma acumulada y discontinua.</p>
            </div>
            {renderRadio("q1", q1, setQ1)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">2. ¿Sus últimas {continuos} aportaciones mensuales son totalmente consecutivas e inmediatas?</h4>
              <p className="text-[10.5px] text-slate-500">Es decir, sin registrar baches de no aportación durante el último año laborado.</p>
            </div>
            {renderRadio("q2", q2, setQ2)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">3. ¿Se encuentra actualmente calificado como afiliado activo o jubilado del IESS?</h4>
              <p className="text-[10.5px] text-slate-500">Con relación de dependencia laboral activa o cotizando como voluntario.</p>
            </div>
            {renderRadio("q3", q3, setQ3)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">4. ¿Su empleador actual se encuentra totalmente al día en el pago de las planillas mensuales del IESS?</h4>
              <p className="text-[10.5px] text-slate-500">Es indispensable no poseer mora patronal en nómina para calificar.</p>
            </div>
            {renderRadio("q4", q4, setQ4)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">5. ¿Posee fondos acumulados en sus cuentas individuales de Fondos de Reserva y/o de Cesantía?</h4>
              <p className="text-[10.5px] text-slate-500">Estos montos sirven como garantía prendaria del 100% del monto solicitado.</p>
            </div>
            {renderRadio("q5", q5, setQ5)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                6. ¿Registra alguna deuda vencida o en mora con el IESS o el BIESS?
              </h4>
              <p className="text-[10.5px] text-slate-500">Incluyendo créditos quirografarios o de vivienda vencidos, o ser garante moroso.</p>
            </div>
            {renderRadio("q6", q6, setQ6)}
          </div>

          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-800">7. ¿Tiene su cuenta bancaria personal validada e ingresada previamente en las oficinas del IESS?</h4>
              <p className="text-[10.5px] text-slate-500">El banco validará la cuenta con el BCE para permitir transferencias de desembolso.</p>
            </div>
            {renderRadio("q7", q7, setQ7)}
          </div>

          <div className="pt-2 flex justify-end">
            <button 
              type="submit" 
              className="w-full md:w-auto text-xs font-bold text-white bg-[#0a1f42] hover:bg-[#113160] px-5 py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider"
            >
              Auditar Requisitos <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
            </button>
          </div>
        </form>

        {showResult && (
          <div className="mt-6 border-t border-slate-100 pt-5 space-y-4 text-left">
            <h3 className="text-sm font-extrabold uppercase text-[#0a1f42] tracking-wider mb-2 flex items-center gap-1.5">
              <span>📋</span> Reporte Técnico de Precalificación
            </h3>

            {/* Banner de elegibilidad */}
            <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              qualifies 
                ? "bg-emerald-50 border-emerald-200 text-emerald-850" 
                : "bg-red-50 border-red-200 text-red-850"
            }`}>
              {qualifies ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                  {qualifies ? "¡PREAPROBADO PARA CRÉDITO!" : "SOLICITUD NO CALIFICADA"}
                </h4>
                <p className="text-xs leading-relaxed mt-1 opacity-90">
                  {qualifies 
                    ? `Felicidades. Cumple con la totalidad de los requisitos obligatorios vigentes del BIESS. Puede simular montos y tasas de desembolso en el portal biess.fin.ec de forma segura.`
                    : `Detectamos inconsistencias en las condiciones de su perfil que inhabilitan la solicitud de crédito. Revise la lista de observaciones de abajo para subsanar los impedimentos.`
                  }
                </p>
              </div>
            </div>

            {/* Listado de observaciones */}
            {!qualifies && (
              <div className="space-y-2.5 pt-2">
                <h5 className="text-xs font-extrabold text-slate-700 uppercase">Observaciones pendientes por subsanar:</h5>
                <ul className="space-y-2 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  {q1 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>No cumple las **{totalAportes} aportaciones acumuladas** mínimas requeridas. Debe sumar más imposiciones mediante su nómina.</span>
                    </li>
                  )}
                  {q2 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>Sus aportes registran baches. Necesita **{continuos} cotizaciones consecutivas continuas** inmediatas anteriores.</span>
                    </li>
                  )}
                  {q3 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>Debe encontrarse en **afiliación activa** en nómina. Los desempleados no pueden tramitar créditos de consumo inmediatos.</span>
                    </li>
                  )}
                  {q4 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>Su empleador actual registra **mora patronal**. Exija formalmente a su patrono el pago inmediato de las planillas pendientes.</span>
                    </li>
                  )}
                  {q5 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>No posee fondos acumulados de **garantía de cesantía o reserva** suficientes para respaldar el préstamo.</span>
                    </li>
                  )}
                  {q6 === "yes" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>Poseer deudas en mora bloquea al instante la precalificación. Cancele cualquier saldo vencido en el BIESS para desbloquear.</span>
                    </li>
                  )}
                  {q7 === "no" && (
                    <li className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-extrabold shrink-0">•</span>
                      <span>Su cuenta bancaria no está validada. Acuda a ventanillas del IESS para autorizar y certificar la cuenta de ahorros personal.</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Descargo y Botón de copiar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50/50 border border-dashed p-3.5 rounded-xl mt-3 font-sans">
              <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-xl">
                ⚠️ <strong>Descargo</strong>: Los valores y validaciones ingresadas por el usuario son de carácter simulado e informativo y no representan un compromiso del BIESS.
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    ¡COPIADO!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    COPIAR RESULTADO
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BLOQUE EXPLICATIVO DE 500+ PALABRAS */}
      <div className="prose prose-slate max-w-none text-left font-sans text-slate-700 text-sm leading-relaxed space-y-4">
        <h3 className="text-base font-extrabold text-[#0a1f42] uppercase tracking-wider border-b pb-2">
          Fundamentos del sistema de precalificación del Crédito Quirografario
        </h3>
        <p>
          El **Préstamo Quirografario** del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) es un producto de financiamiento sumamente popular en el Ecuador, debido a que ofrece tasas de interés nominales anuales sustancialmente más bajas que la banca de consumo privada (tasas referenciales entre el 11% y 14%).
        </p>
        <p>
          A diferencia de los créditos financieros tradicionales, el quirografario se concede de forma inmediata bajo una modalidad prendaria: el BIESS utiliza los fondos de ahorro individuales de **Cesantía** y **Fondos de Reserva** acumulados por el afiliado en su historia laboral como garantía real de cobro del 100% de la deuda.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Por qué es vital que el empleador esté al día en el pago
        </h4>
        <p>
          Uno de los impedimentos más recurrentes para el desembolso de los préstamos quirografarios es la **mora patronal**. Si su empleador actual o sus empleadores anteriores registran retrasos, planillas sin cancelar o glosas de cobro coactivo con el IESS (aunque sea de centavos de dólar), la plataforma informática del BIESS denegará de forma automática la solicitud de crédito de toda la nómina de trabajadores.
        </p>
        <p>
          Esto se debe a que el sistema requiere que las cotizaciones consecutivas de los últimos **12 meses** estén plenamente depositadas en tesorería para validar la estabilidad y la liquidez del fondo común que financia la cartera de préstamos de consumo.
        </p>

        <h4 className="text-sm font-extrabold text-[#0a1f42] uppercase tracking-wide">
          Preguntas Frecuentes sobre el Quirografario
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Puedo solicitar el quirografario si estoy jubilado?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Sí, los jubilados y pensionistas de montepío son elegibles. Al no poseer fondos de cesantía, su pensión mensual de jubilación actúa directamente como garantía líquida del crédito, con plazos de hasta 60 meses.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <h5 className="text-xs font-extrabold text-[#0a1f42] uppercase mb-1">¿Qué es la novación de un quirografario y cuándo aplica?</h5>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              La novación le permite cancelar un préstamo vigente solicitando uno nuevo. Puede realizar este trámite una vez que haya cancelado de forma efectiva al menos el **25%** del saldo original del crédito en curso.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs">
            <strong>Fuentes Oficiales consultadas:</strong> Reglamento General de Créditos de Consumo BIESS, Ley de Seguridad Social. Última verificación: Octubre de 2026.
          </div>
          <Link 
            to="/procedimiento/prestamo-quirografario" 
            className="text-xs font-bold text-[#0a1f42] hover:text-[#c9a84c] shrink-0"
          >
            Ver guía paso a paso del trámite →
          </Link>
        </div>
      </div>
    </div>
  );
}
