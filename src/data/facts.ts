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
  SBU_2025: {
    id: "SBU_2025",
    value: 460,
    source: "Ministerio del Trabajo de Ecuador, Acuerdo Ministerial Nro. MDT-2024-175",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Salario Básico Unificado fijado para el año 2025."
  },
  SBU_2026: {
    id: "SBU_2026",
    value: 482,
    source: "Proyección estimada según inflación y canasta básica de Ecuador",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Valor estimado para el ejercicio fiscal 2026. Requiere confirmación con el Registro Oficial."
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
    notes: "Porcentaje de descuento mensual al sueldo del trabajador."
  },
  APORTE_PATRONAL_PCT: {
    id: "APORTE_PATRONAL_PCT",
    value: 11.15,
    source: "Ley de Seguridad Social, Art. 117",
    verifiedAt: "2026-10-01",
    verified: false,
    notes: "Porcentaje de contribución del empleador sobre la nómina."
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
