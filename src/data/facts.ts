export interface Fact {
  id: string;
  value: string | number;
  source: string;
  verifiedAt: string;
  verified: boolean;
  notes?: string;
}

export const FACTS: Record<string, Fact> = {
  // Salario Básico Unificado
  SBU_2024: {
    id: "SBU_2024",
    value: 460,
    source: "Ministerio del Trabajo, año 2024",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Salario Básico Unificado fijado para el año 2024."
  },
  SBU_2025: {
    id: "SBU_2025",
    value: 470,
    source: "Ministerio del Trabajo de Ecuador",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Salario Básico Unificado fijado para el año 2025."
  },
  SBU_2026: {
    id: "SBU_2026",
    value: 482,
    source: "Consejo Nacional de Trabajo y Salarios, resolución del 15-dic-2025 (vigente desde el 1-ene-2026). Confirmar número de Acuerdo Ministerial en trabajo.gob.ec",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Valor fijado para el ejercicio fiscal 2026. Requiere confirmar número de Acuerdo Ministerial en trabajo.gob.ec."
  },
  
  // Porcentajes de Aportaciones
  APORTE_VOLUNTARIO_PCT: {
    id: "APORTE_VOLUNTARIO_PCT",
    value: 17.60,
    source: "Ley de Seguridad Social de Ecuador, Art. 152",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Tasa de aportación para afiliados voluntarios e independientes sin relación de dependencia."
  },
  APORTE_DEPENDIENTE_TOTAL_PCT: {
    id: "APORTE_DEPENDIENTE_TOTAL_PCT",
    value: 20.60,
    source: "Resolución del Consejo Directivo del IESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Suma de aporte personal y aporte patronal ordinario."
  },
  APORTE_PERSONAL_PCT: {
    id: "APORTE_PERSONAL_PCT",
    value: 9.45,
    source: "Ley de Seguridad Social, Art. 116",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "pendiente de confirmar en iess.gob.ec"
  },
  APORTE_PATRONAL_PCT: {
    id: "APORTE_PATRONAL_PCT",
    value: 11.15,
    source: "Ley de Seguridad Social, Art. 117",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "pendiente de confirmar en iess.gob.ec"
  },

  // Subsidio de Maternidad
  MATERNIDAD_SUBSIDIO_IESS_PCT: {
    id: "MATERNIDAD_SUBSIDIO_IESS_PCT",
    value: 75,
    source: "Código del Trabajo de Ecuador, Art. 152 / Ley de Seguridad Social",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Porcentaje del subsidio monetario cubierto por el IESS durante el reposo (25% a cargo del empleador)."
  },
  MATERNIDAD_DIAS_DESCANSO: {
    id: "MATERNIDAD_DIAS_DESCANSO",
    value: 84,
    source: "Código del Trabajo, Art. 152 (12 semanas)",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Días calendario de descanso remunerado por maternidad."
  },
  MATERNIDAD_APORTES_REQ: {
    id: "MATERNIDAD_APORTES_REQ",
    value: 12,
    source: "Reglamento General del Seguro de Salud del IESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Aportaciones continuas requeridas en los 15 meses previos al parto."
  },

  // Pensión de Montepío
  MONTEPIO_VIUDEZ_PCT: {
    id: "MONTEPIO_VIUDEZ_PCT",
    value: 60,
    source: "Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Porcentaje de la pensión del causante para viuda/o o conviviente sin hijos (40% si concurren hijos)."
  },
  MONTEPIO_ORFANDAD_PCT: {
    id: "MONTEPIO_ORFANDAD_PCT",
    value: 40,
    source: "Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Porcentaje global a distribuirse entre hijos huérfanos con derecho."
  },

  // Tasas de Interés Financieras BIESS
  TASA_HIPOTECARIO_MIN: {
    id: "TASA_HIPOTECARIO_MIN",
    value: 5.0,
    source: "Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Tasa nominal mínima para primera vivienda de bajo costo."
  },
  TASA_HIPOTECARIO_MAX: {
    id: "TASA_HIPOTECARIO_MAX",
    value: 8.0,
    source: "Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Tasa nominal máxima aplicable para proyectos inmobiliarios habituales."
  },
  HIPOTECARIO_PLAZO_MAX_ANOS: {
    id: "HIPOTECARIO_PLAZO_MAX_ANOS",
    value: 25,
    source: "Reglamento de Créditos Hipotecarios BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Plazo de amortización máximo para el seguro de desgravamen."
  },
  HIPOTECARIO_MONTO_100_COBERTURA: {
    id: "HIPOTECARIO_MONTO_100_COBERTURA",
    value: 100000,
    source: "Políticas de Crédito Hipotecario del BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Monto máximo del avalúo donde el BIESS financia el 100% de la propiedad."
  },
  HIPOTECARIO_MONTO_MAX: {
    id: "HIPOTECARIO_MONTO_MAX",
    value: 300000,
    source: "Políticas de Crédito Hipotecario del BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Monto máximo absoluto de financiamiento aprobado para un afiliado calificado."
  },

  // Canales de Quejas y Denuncias (Resolución Oficial Septiembre 2025)
  DENUNCIAS_WEB: {
    id: "DENUNCIAS_WEB",
    value: "denuncias.iess.gob.ec",
    source: "Comunicado de Prensa Oficial IESS / Secretaría de Transparencia de Ecuador",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Canal web oficial para reporte de actos de corrupción, falta de medicamentos y baches de citas."
  },
  DENUNCIAS_WHATSAPP: {
    id: "DENUNCIAS_WHATSAPP",
    value: "0962532338",
    source: "Canales de denuncias habilitados en septiembre 2025",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Número del chatbot oficial automatizado habilitado las 24/7 para quejas ciudadanas."
  },
  DENUNCIAS_TELEFONO: {
    id: "DENUNCIAS_TELEFONO",
    value: "1800-4377",
    source: "Línea gratuita de denuncias y soporte telefónico IESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Línea gratuita nacional 1800-IESS (1800-4377) para consultas generales y quejas."
  },

  // Requisitos temporales y mínimos
  QUIROGRAFARIO_APORTES_REQ: {
    id: "QUIROGRAFARIO_APORTES_REQ",
    value: 36,
    source: "Manual del Usuario del Préstamo Quirografario BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Aportaciones acumuladas totales requeridas para solicitar el préstamo."
  },
  QUIROGRAFARIO_CONSECUTIVOS_REQ: {
    id: "QUIROGRAFARIO_CONSECUTIVOS_REQ",
    value: 12,
    source: "Manual del Usuario del Préstamo Quirografario BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Aportaciones consecutivas mínimas requeridas inmediatamente anteriores a la precalificación."
  },
  QUIROGRAFARIO_DISCAPACITADOS_REQ: {
    id: "QUIROGRAFARIO_DISCAPACITADOS_REQ",
    value: 18,
    source: "Políticas Diferenciales del BIESS para Personas con Discapacidad",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Aportes requeridos reducidos para personas con carné del CONADIS."
  },
  QUIROGRAFARIO_NOVACION_PAGO_PCT: {
    id: "QUIROGRAFARIO_NOVACION_PAGO_PCT",
    value: 25,
    source: "Reglamento General de Crédito BIESS",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Porcentaje pagado del crédito vigente para calificar a una novación."
  },
  
  // URLs oficiales de consulta
  URL_IESS_PORTAL: {
    id: "URL_IESS_PORTAL",
    value: "https://www.iess.gob.ec",
    source: "IESS Oficial",
    verifiedAt: "2026-10-01",
    verified: false
  },
  URL_BIESS_PORTAL: {
    id: "URL_BIESS_PORTAL",
    value: "https://www.biess.fin.ec",
    source: "BIESS Oficial",
    verifiedAt: "2026-10-01",
    verified: false
  }
};

/**
 * Helper para formatear valores monetarios o porcentajes según normas de Ecuador
 */
export function getFactValue(key: keyof typeof FACTS): string | number {
  return FACTS[key]?.value ?? "";
}

/**
 * Helper para obtener la nota referencial y advertencia de un fact
 */
export function formatFactNoteString(id: string): string {
  const fact = FACTS[id];
  if (!fact) return "";
  const base = `Dato referencial: ${fact.value} · Fuente: ${fact.source} · Consultado: ${fact.verifiedAt}`;
  if (!fact.verified) {
    return `${base} · Confirma este valor en iess.gob.ec antes de realizar tu trámite`;
  }
  return base;
}
