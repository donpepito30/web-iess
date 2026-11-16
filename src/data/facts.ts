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
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Salario Básico Unificado fijado para el año 2024."
  },
  SBU_2025: {
    id: "SBU_2025",
    value: 470,
    source: "Ministerio del Trabajo de Ecuador",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Salario Básico Unificado fijado para el año 2025."
  },
  SBU_2026: {
    id: "SBU_2026",
    value: 482,
    source: "Consejo Nacional de Trabajo y Salarios, resolución del 15-dic-2025 (vigente desde el 1-ene-2026). Confirmar número de Acuerdo Ministerial en trabajo.gob.ec",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Valor oficial fijado para el ejercicio fiscal 2026."
  },
  
  // Porcentajes de Aportaciones
  APORTE_VOLUNTARIO_PCT: {
    id: "APORTE_VOLUNTARIO_PCT",
    value: 17.60,
    source: "Ley de Seguridad Social de Ecuador, Art. 152",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Tasa de aportación para afiliados voluntarios e independientes sin relación de dependencia."
  },
  APORTE_DEPENDIENTE_TOTAL_PCT: {
    id: "APORTE_DEPENDIENTE_TOTAL_PCT",
    value: 20.60,
    source: "Resolución del Consejo Directivo del IESS / Ley de Seguridad Social",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Suma de aporte personal y aporte patronal ordinario."
  },
  APORTE_PERSONAL_PCT: {
    id: "APORTE_PERSONAL_PCT",
    value: 9.45,
    source: "Ley de Seguridad Social, Art. 116",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Aporte personal obligatorio del trabajador bajo relación de dependencia."
  },
  APORTE_PATRONAL_PCT: {
    id: "APORTE_PATRONAL_PCT",
    value: 11.15,
    source: "Ley de Seguridad Social, Art. 117",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Aporte patronal obligatorio a cargo del empleador."
  },

  // Subsidio de Maternidad
  MATERNIDAD_SUBSIDIO_IESS_PCT: {
    id: "MATERNIDAD_SUBSIDIO_IESS_PCT",
    value: 75,
    source: "Código del Trabajo de Ecuador, Art. 152 / Ley de Seguridad Social",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Porcentaje del subsidio monetario cubierto por el IESS durante el reposo (25% a cargo del empleador)."
  },
  MATERNIDAD_DIAS_DESCANSO: {
    id: "MATERNIDAD_DIAS_DESCANSO",
    value: 84,
    source: "Código del Trabajo, Art. 152 (12 semanas)",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Días calendario de descanso remunerado por maternidad."
  },
  MATERNIDAD_APORTES_REQ: {
    id: "MATERNIDAD_APORTES_REQ",
    value: 12,
    source: "Reglamento General del Seguro de Salud del IESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Aportaciones continuas requeridas en los 15 meses previos al parto."
  },

  // Pensión de Montepío
  MONTEPIO_VIUDEZ_PCT: {
    id: "MONTEPIO_VIUDEZ_PCT",
    value: 60,
    source: "Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS",
    verifiedAt: "2026-11-16",
    verified: true,
    notes: "Porcentaje de la pensión del causante para viuda/o o conviviente sin hijos (40% si concurren hijos)."
  },
  MONTEPIO_ORFANDAD_PCT: {
    id: "MONTEPIO_ORFANDAD_PCT",
    value: 40,
    source: "Reglamento del Seguro de Invalidez, Vejez y Muerte del IESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Conflicto de fuentes (40 % vs 20 % por hijo); confirmar en el Reglamento del IESS"
  },

  // Tasas de Interés Financieras BIESS - Hipotecarios
  TASA_HIPOTECARIO_MIN: {
    id: "TASA_HIPOTECARIO_MIN",
    value: 6.8,
    source: "Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Tasa nominal mínima para líneas de crédito hipotecario no preferenciales."
  },
  TASA_HIPOTECARIO_MAX: {
    id: "TASA_HIPOTECARIO_MAX",
    value: 9.1,
    source: "Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Tasa nominal máxima para líneas de crédito hipotecario no preferenciales."
  },
  HIPOTECARIO_PLAZO_MAX_ANOS: {
    id: "HIPOTECARIO_PLAZO_MAX_ANOS",
    value: 25,
    source: "Reglamento de Créditos Hipotecarios BIESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Plazo de amortización máximo para el seguro de desgravamen."
  },

  // Programa Preferencial Credicasa BIESS
  CREDICASA_TASA: {
    id: "CREDICASA_TASA",
    value: 2.99,
    source: "Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Tasa de interés preferencial para primera vivienda del programa Credicasa BIESS."
  },
  CREDICASA_MONTO_MAX: {
    id: "CREDICASA_MONTO_MAX",
    value: 65000,
    source: "Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Monto máximo de financiamiento para el programa preferencial Credicasa."
  },
  CREDICASA_APORTES_REQ: {
    id: "CREDICASA_APORTES_REQ",
    value: 36,
    source: "Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) - Línea Credicasa",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Requisito de 36 aportaciones acumuladas (últimas 13 consecutivas) para afiliados en relación de dependencia."
  },

  // Canales de Quejas y Denuncias
  DENUNCIAS_WEB: {
    id: "DENUNCIAS_WEB",
    value: "denuncias.iess.gob.ec",
    source: "Comunicado de Prensa Oficial IESS / Secretaría de Transparencia de Ecuador",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Canal web oficial para reporte de actos de corrupción, falta de medicamentos y baches de citas."
  },
  DENUNCIAS_WHATSAPP: {
    id: "DENUNCIAS_WHATSAPP",
    value: "0962532338",
    source: "Canales de denuncias habilitados en septiembre 2025",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Número del chatbot oficial automatizado habilitado las 24/7 para quejas ciudadanas."
  },
  DENUNCIAS_TELEFONO: {
    id: "DENUNCIAS_TELEFONO",
    value: "1800-4377",
    source: "Línea gratuita de denuncias y soporte telefónico IESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Línea gratuita nacional 1800-IESS (1800-4377) para consultas generales y quejas."
  },

  // Préstamo Quirografario BIESS
  QUIROGRAFARIO_APORTES_REQ: {
    id: "QUIROGRAFARIO_APORTES_REQ",
    value: 12,
    source: "Manual del Usuario del Préstamo Quirografario BIESS / biess.fin.ec",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Aportaciones acumuladas mínimas requeridas para solicitar el préstamo quirografario."
  },
  QUIROGRAFARIO_MONTO_MAX: {
    id: "QUIROGRAFARIO_MONTO_MAX",
    value: 38560,
    source: "Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) / 80 Salarios Básicos Unificados",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Monto máximo legal para préstamos quirografarios equivalente a 80 SBU."
  },
  QUIROGRAFARIO_TASA_MIN: {
    id: "QUIROGRAFARIO_TASA_MIN",
    value: 6.5,
    source: "Tarifario de Crédito del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Tasa de interés nominal mínima referencial para créditos quirografarios BIESS."
  },
  QUIROGRAFARIO_PLAZO_MAX_MESES: {
    id: "QUIROGRAFARIO_PLAZO_MAX_MESES",
    value: 60,
    source: "Reglamento de Créditos Quirografarios del BIESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Plazo máximo de amortización de hasta 60 meses (5 años)."
  },
  QUIROGRAFARIO_DISCAPACITADOS_REQ: {
    id: "QUIROGRAFARIO_DISCAPACITADOS_REQ",
    value: 18,
    source: "Políticas Diferenciales del BIESS para Personas con Discapacidad",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Aportes requeridos reducidos para personas con carné del CONADIS."
  },
  QUIROGRAFARIO_NOVACION_PAGO_PCT: {
    id: "QUIROGRAFARIO_NOVACION_PAGO_PCT",
    value: 25,
    source: "Reglamento General de Crédito BIESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Porcentaje pagado del crédito vigente para calificar a una novación."
  },

  // Plazos Patronales de Entrada y Salida
  AVISO_ENTRADA_DIAS: {
    id: "AVISO_ENTRADA_DIAS",
    value: 15,
    source: "Ley de Seguridad Social de Ecuador, Art. 73",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Plazo máximo de 15 días posteriores al inicio de labores para registrar el aviso de entrada."
  },
  AVISO_SALIDA_DIAS: {
    id: "AVISO_SALIDA_DIAS",
    value: 3,
    source: "Ley de Seguridad Social de Ecuador / Reglamento del IESS",
    verifiedAt: "2026-11-16",
    verified: false,
    notes: "Plazo legal de 3 días posteriores a la separación laboral para registrar el aviso de salida."
  },
  
  // URLs oficiales de consulta
  URL_IESS_PORTAL: {
    id: "URL_IESS_PORTAL",
    value: "https://www.iess.gob.ec",
    source: "IESS Oficial",
    verifiedAt: "2026-11-16",
    verified: false
  },
  URL_BIESS_PORTAL: {
    id: "URL_BIESS_PORTAL",
    value: "https://www.biess.fin.ec",
    source: "BIESS Oficial",
    verifiedAt: "2026-11-16",
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
