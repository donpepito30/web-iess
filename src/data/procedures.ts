import { getFactValue } from "./facts";

export interface ProcedureSource {
  label: string;
  url: string;
  accessedAt: string;
}

export interface Procedure {
  id: string;
  title: string;
  category: 'Jubilación' | 'Seguros y Subsidios' | 'Créditos' | 'Trámites y Afiliación';
  whoCanDo: string;
  requirements: string[];
  steps: string[];
  whereTo: {
    label: string;
    url?: string;
    physical?: string;
  };
  commonErrors: string[];
  needsMoreHelp: string;
  referenceNorm?: string;
  dateModified: string;
  sources: ProcedureSource[];
}

export const PROCEDURES_DATA: Procedure[] = [
  {
    id: "jubilacion-vejez",
    title: "Jubilación por Vejez",
    category: "Jubilación",
    whoCanDo: "El afiliado del IESS que cumpla con alguna de las combinaciones de edad y aportes acumulados.",
    requirements: [
      "Tener al menos 480 imposiciones (40 años de aportes) a cualquier edad, o 60 años de edad + 360 imposiciones (30 años), o 65 años de edad + 180 imposiciones (15 años), o 70 años de edad + 120 imposiciones (10 años).",
      "Estar en situación de cese laboral (no tener relación de dependencia activa).",
      "Haber registrado la salida laboral (aviso de cese) en el sistema del IESS.",
      "Cuenta bancaria personal registrada y autorizada en el IESS.",
      "Correo electrónico activo registrado en el portal.",
      "No tener deudas vencidas con el IESS ni con el BIESS (incluyendo préstamos quirografarios en mora).",
      "Sin obligaciones patronales pendientes (si aplica)."
    ],
    steps: [
      "Verificar tu historial de aportes y saldo acumulado ingresando a iess.gob.ec en Servicios en Línea.",
      "Registrar el cese laboral con tu empleador para que suba el Aviso de Salida al sistema.",
      "Ingresar a iess.gob.ec -> sección 'Trámites Virtuales' -> 'Asegurados' -> 'Pensionistas' -> 'Jubilación'.",
      "Iniciar sesión con tu número de cédula y clave personal.",
      "Completar el formulario de solicitud en línea.",
      "Registrar o confirmar tu cuenta bancaria de ahorros o corriente para la acreditación mensual.",
      "Enviar la solicitud (se aconseja realizarla antes del día 25 de cada mes para acelerar el procesamiento)."
    ],
    whereTo: {
      label: "iess.gob.ec (Sección Trámites Virtuales)",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Presentar la solicitud teniendo préstamos quirografarios o hipotecarios vencidos en el BIESS (el trámite se bloquea automáticamente).",
      "No registrar el cese o aviso de salida por parte del empleador antes de intentar la solicitud.",
      "Presentar la solicitud después del día 25 (el procesamiento se traslada automáticamente al mes siguiente).",
      "No tener la cuenta de banco correctamente validada y autorizada por oficinas presenciales del IESS."
    ],
    needsMoreHelp: `Si tienes dudas sobre tus aportaciones acumuladas, puedes solicitar un desglose de aportes o llamar al ${getFactValue("DENUNCIAS_TELEFONO")} para soporte independiente y personalizado.`,
    referenceNorm: "Constitución de la República del Ecuador (Arts. 67 y 369), Ley de Seguridad Social.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Constitución de la República del Ecuador", url: "https://www.asambleanacional.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ley de Seguridad Social - Registro Oficial", url: "https://www.iess.gob.ec/documents/10162/13686/Ley_de_Seguridad_Social", accessedAt: "2026-10-01" },
      { label: "Portal del Asegurado - Trámites de Pensiones IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "jubilacion-invalidez",
    title: "Jubilación por Invalidez",
    category: "Jubilación",
    whoCanDo: "Afiliados activos o cesantes que presenten una incapacidad física o mental calificada oficialmente por la Comisión Médica.",
    requirements: [
      "Tener un dictamen de invalidez emitido por la Comisión Médica Calificadora del IESS (Comecap).",
      "Sufrir una pérdida de capacidad de trabajo igual o superior al 67% (invalidez absoluta) o entre el 50% y el 66% (invalidez parcial permanente).",
      "Para invalidez absoluta: No requiere número mínimo de aportes (debe ocurrir durante el empleo).",
      "Para invalidez parcial permanente: Mínimo 60 imposiciones acumuladas en el IESS."
    ],
    steps: [
      "Ingresar la solicitud de evaluación médica a través del portal de iess.gob.ec o presencialmente.",
      "Someterse a la valoración física, funcional y psicológica encomendada por la Comisión Médica (Comecap).",
      "Esperar la notificación del dictamen médico oficial.",
      "Con el dictamen favorable, ingresar la solicitud formal de pensión por invalidez en el portal de pensionistas."
    ],
    whereTo: {
      label: "Portal IESS o Dirección Provincial del IESS más cercana",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Intentar jubilarse por incapacidad temporal (esta se rige bajo subsidios de enfermedad, no jubilación vitalicia).",
      "No asistir a las citas programadas de valoración por la Comecap (causa el archivo de la solicitud)."
    ],
    needsMoreHelp: "La valoración de Comecap es de exclusivo criterio científico y médico.",
    referenceNorm: "Ley de Seguridad Social de Ecuador, Reglamento de la Comisión Médica Calificadora.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Reglamento del Seguro de Invalidez, Vejez y Muerte", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Resolución C.D. 554 del Consejo Directivo", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "montepio",
    title: "Pensión de Montepío",
    category: "Jubilación",
    whoCanDo: "Cónyuge, conviviente legalmente reconocido o hijos sobrevivientes del afiliado o jubilado fallecido.",
    requirements: [
      "El afiliado fallecido debe haber registrado al menos 6 imposiciones en los últimos 12 meses anteriores a su deceso, o un mínimo de 36 imposiciones a lo largo de su vida laboral.",
      "Para cónyuge o conviviente: Acreditar casamiento o unión de hecho legalmente inscrita.",
      "Hijos menores de 18 años (o hasta 21 años cumplidos si demuestran estar estudiando, o sin límite si presentan discapacidad)."
    ],
    steps: [
      "Reunir documentos: Partida de defunción, cédula de los beneficiarios, acta de matrimonio o unión de hecho, y partidas de nacimiento de hijos.",
      "Ingresar a iess.gob.ec -> sección de Montepío e ingresar con los datos de viudedad u orfandad.",
      "Registrar los datos y subir los justificativos digitales requeridos.",
      "Completar la cuenta bancaria de los beneficiarios para acreditar las cuotas mensuales correspondientes."
    ],
    whereTo: {
      label: "iess.gob.ec -> Pensiones -> Montepío",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Intentar tramitarlo cuando el difunto no cumplía con el mínimo de 6 aportes anuales o 36 generales.",
      "No registrar uniones de hecho de forma oportuna en el Registro Civil antes del suceso."
    ],
    needsMoreHelp: "Si eres padre dependiente económicamente y no existen cónyuges ni hijos sobrevivientes, puedes solicitar una pensión de montepío adicional.",
    referenceNorm: "Administración del Seguro de Pensiones, Ley de Seguridad Social.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Normativa de Montepío IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Registro Civil de Ecuador", url: "https://www.registrocivil.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "prestamo-quirografario",
    title: "Préstamo Quirografario",
    category: "Créditos",
    whoCanDo: "Afiliados bajo relación de dependencia, jubilados y pensionistas de montepío.",
    requirements: [
      `Para afiliados activos: Mínimo ${getFactValue("QUIROGRAFARIO_APORTES_REQ")} aportaciones mensuales en total, de las cuales al menos ${getFactValue("QUIROGRAFARIO_CONSECUTIVOS_REQ")} deben ser consecutivas e inmediatas.`,
      "No tener obligaciones en mora o vencidas con el BIESS o el IESS.",
      "Mantener valores de garantía acumulados en Fondos de Reserva y/o Cesantía que respalden el 100% del monto solicitado.",
      "Empleador actual sin registrar mora patronal alguna con el IESS.",
      "Tener una cuenta bancaria vigente y debidamente registrada en la plataforma del BIESS.",
      "No tener otras solicitudes paralelas activas de quirografarios, hipotecarios o retiro de cesantía.",
      `Para personas con discapacidad: Requisito reducido de solo ${getFactValue("QUIROGRAFARIO_DISCAPACITADOS_REQ")} aportaciones mensuales acumuladas.`
    ],
    steps: [
      "Ingresar al portal oficial biess.fin.ec.",
      "Seleccionar la opción 'Quirografarios' en el menú principal.",
      "Hacer clic en 'Solicitar Préstamo' e ingresar con cédula y clave del IESS.",
      "El sistema validará automáticamente tus requisitos y garantías acumuladas.",
      "Seleccionar el monto a solicitar (máximo 95% de tus fondos de reserva y cesantía) y el plazo de amortización.",
      "Verificar y confirmar la cuenta bancaria de desembolso.",
      "Enviar la solicitud y esperar el desembolso."
    ],
    whereTo: {
      label: "BIESS Portal de Préstamos (biess.fin.ec)",
      url: String(getFactValue("URL_BIESS_PORTAL"))
    },
    commonErrors: [
      "Tener planillas pendientes de pago del mes en curso por parte del patrono (bloquea la validación del historial continuo; esperar 48h posterior al pago).",
      "No registrar o no registrar de manera diferenciada la cuenta de banco en la base del BIESS (mucha gente cree que por registrarla en el IESS ya está en el BIESS).",
      "Tener un empleador moroso en cualquier obligación histórica."
    ],
    needsMoreHelp: `Puedes novar tu crédito quirografario vigente una vez que hayas cancelado al menos el ${getFactValue("QUIROGRAFARIO_NOVACION_PAGO_PCT")}% del monto total original.`,
    referenceNorm: "Reglamento de Crédito del BIESS.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Portal del BIESS - Manual de Préstamo Quirografario", url: "https://www.biess.fin.ec/quirografarios", accessedAt: "2026-10-01" },
      { label: "Resoluciones de Crédito del Directorio del BIESS", url: "https://www.biess.fin.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "prestamo-hipotecario",
    title: "Préstamo Hipotecario",
    category: "Créditos",
    whoCanDo: "Afiliados activos bajo relación de dependencia, afiliados voluntarios (incluyendo migrantes residentes en el exterior) y jubilados.",
    requirements: [
      "Tener al menos 36 aportaciones mensuales y vigentes.",
      "Dar positivo en la calificación crediticia del BIESS (evaluación de capacidad de endeudamiento y score bureaus).",
      "No poseer préstamos hipotecarios vigentes o pendientes de pago con el IESS/BIESS.",
      "No figurar como garante en mora de préstamos hipotecarios de terceros.",
      "No tener deudas o gastos pendientes por solicitudes anteriores anuladas.",
      "No estar catalogado con enfermedad catastrófica o degenerativa según los registros clínicos."
    ],
    steps: [
      "Ingresar a biess.fin.ec -> sección de Préstamos Hipotecarios.",
      "Elegir el destino de la solicitud (Compra de vivienda terminada, terreno, construcción, remodelación, etc.).",
      "Llenar la precalificación en línea utilizando los números de cédula correspondientes.",
      "En caso de precalificar, armar la carpeta con planos, avalúos de la propiedad y escrituras.",
      "Cargar toda la documentación escaneada o entregarla a los analistas acreditados por el BIESS.",
      "Hacer el seguimiento a la calificación, escrituración y desembolso final."
    ],
    whereTo: {
      label: "BIESS Portal Hipotecario (biess.fin.ec)",
      url: String(getFactValue("URL_BIESS_PORTAL"))
    },
    commonErrors: [
      "No verificar con anticipación que el avalúo catastral oficial de la vivienda coincida con el precio real acordado.",
      "Haber cancelado una solicitud de crédito previa pero dejar pendientes pequeños saldos por gastos de escrituración o instrumentación legal (bloquea nuevas peticiones)."
    ],
    needsMoreHelp: `El BIESS ofrece financiamientos de hasta el 100% para viviendas de hasta USD ${getFactValue("HIPOTECARIO_MONTO_100_COBERTURA")}, con plazos máximos de hasta ${getFactValue("HIPOTECARIO_PLAZO_MAX_ANOS")} años y tasas preferenciales entre el ${getFactValue("TASA_HIPOTECARIO_MIN")}% y el ${getFactValue("TASA_HIPOTECARIO_MAX")}% anual, con tope de USD ${getFactValue("HIPOTECARIO_MONTO_MAX")}.`,
    referenceNorm: "Resoluciones de Vivienda del BIESS.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Banco del IESS (BIESS) - Guías de Préstamos Hipotecarios", url: "https://www.biess.fin.ec/hipotecarios", accessedAt: "2026-10-01" },
      { label: "Superintendencia de Bancos del Ecuador", url: "https://www.superbancos.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "afiliacion-voluntaria",
    title: "Afiliación Voluntaria",
    category: "Trámites y Afiliación",
    whoCanDo: "Trabajadores independientes, profesionales independientes, por cuenta propia, estudiantes, amas de casa y ecuatorianos migrantes.",
    requirements: [
      "No registrar un contrato bajo relación de dependencia activo en el IESS.",
      "Ser mayor de 18 años y contar con cédula de ciudadanía o carné de refugiado/residente.",
      `Declarar un ingreso mensual de referencia no inferior al Salario Básico Unificado (SBU, USD ${getFactValue("SBU_2026")} en el año 2026).`,
      "Tener una cuenta bancaria personal para programar débitos automáticos obligatorios."
    ],
    steps: [
      "Ingresar a iess.gob.ec y acceder a 'Afiliación Voluntaria'.",
      "Llenar los datos solicitados: Cédula, fecha de nacimiento, estado civil.",
      `Declarar el ingreso mensual sobre el cual deseas cotizar (mínimo USD ${getFactValue("SBU_2026")}).`,
      `La tasa de aportación obligatoria del ${getFactValue("APORTE_VOLUNTARIO_PCT")}% se calculará sobre dicho valor.`,
      "Definir el método de pago obligatorio (preferiblemente débito bancario automático).",
      "Efectuar el pago puntual del primer aporte mensual para habilitar todos los derechos de cobertura."
    ],
    whereTo: {
      label: "iess.gob.ec -> Tramitar Afiliación Voluntaria",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Fijar un ingreso mensual referencial inferior al Salario Básico vigente en el año correspondiente (el sistema arrojará un error inmediato).",
      "Dejar pasar más de 30 días calendario sin pagar la planilla inicial de aportación voluntaria (provoca la anulación inmediata de la afiliación)."
    ],
    needsMoreHelp: `La afiliación voluntaria te otorga seguro médico nacional gratuito en la red IESS, préstamos de quirografarios a partir del sexto mes de aportes, acceso a hipotecarios desde las 36 imposiciones y el derecho a jubilarte por vejez con aporte del ${getFactValue("APORTE_VOLUNTARIO_PCT")}%.`,
    referenceNorm: "Resolución C.D. 625 (Reglamento de Aseguramiento).",
    dateModified: "2026-10-01",
    sources: [
      { label: "IESS - Reglamento de Aseguramiento Voluntario", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Resolución C.D. 625 - Consejo Directivo", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "subsidio-enfermedad",
    title: "Subsidio por Enfermedad",
    category: "Seguros y Subsidios",
    whoCanDo: "Afiliados bajo relación de dependencia y afiliados voluntarios que sufran incapacidad física temporal para realizar sus labores.",
    requirements: [
      "Tener aportes al día.",
      "Contar con certificado médico/incapacidad emitido y validado por un médico del IESS.",
      "La incapacidad debe durar más de 3 días consecuentes (el subsidio empieza a pagarse desde el cuarto día de reposo)."
    ],
    steps: [
      "Acudir a consulta en el centro médico del IESS donde el doctor determine el número de días de reposo y cargue digitalmente la orden de reposo.",
      "Si la atención es con médico particular, acudir antes de las 72 horas laborales para validar el reposo médico privado en las oficinas del IESS.",
      "El empleador es notificado y debe registrar la novedad correspondiente en el módulo patronal.",
      "El IESS procesa y acredita los porcentajes correspondientes directamente a tu cuenta bancaria personal asignada."
    ],
    whereTo: {
      label: "Centros médicos del IESS o Portal Administrativo iess.gob.ec",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "No validar los certificados emitidos por médicos privados dentro del plazo máximo legal de 72 horas posteriores a la finalización del reposo.",
      "Exigir subsidio por los primeros 3 días de enfermedad (por ley, el subsidio corre del IESS desde el día cuarto en adelante)."
    ],
    needsMoreHelp: "Del día 4 al 90 de reposo, el IESS subsidia el 75% de tu sueldo base de cotización, y del día 91 al 180 el subsidio se reajusta al 66% de tu promedio salarial.",
    referenceNorm: "Reglamento de Prestaciones de Salud y Enfermedad de la Seguridad Social.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Reglamento General de Seguro de Salud IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ministerio de Salud Pública de Ecuador", url: "https://www.salud.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "subsidio-maternidad",
    title: "Subsidio por Maternidad",
    category: "Seguros y Subsidios",
    whoCanDo: "Afiliadas activas que den a luz y cumplan con los plazos continuos de aportaciones previas.",
    requirements: [
      "Registrar un mínimo de 12 aportaciones mensuales consecutivas dentro de los 15 meses de referencia antes del parto.",
      "Contar con el certificado prenatal expedido por ginecólogos autorizados del IESS."
    ],
    steps: [
      "Registrar las atenciones médicas y obtener el certificado médico que señale la fecha probable o efectiva de parto.",
      "Cargar o validar el certificado en el sistema institucional del IESS.",
      "El empleador debe autorizar los 84 días de licencia por maternidad en el módulo.",
      "El IESS abona el 100% de tu sueldo promedio directamente al banco (el subsidio asume una parte y el empleador otra conforme a ley)."
    ],
    whereTo: {
      label: "Subdirección de Prestaciones de Salud del IESS",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Tener baches en el aporte que impidan la sumatoria de las 12 cuotas mínimas previas al dar a luz.",
      "Confundir la licencia del padre (paternidad de 10 días es pagada directamente por el patrono y no representa subsidio por el IESS)."
    ],
    needsMoreHelp: "Si sufres un parto múltiple, la licencia obligatoria se aumenta en 10 días remunerados adicionales por cada nuevo hijo.",
    referenceNorm: "Código del Trabajo (Art. 152), Ley de Seguridad Social.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Código del Trabajo de Ecuador", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-01" },
      { label: "IESS - Subsidios Pecuniarios", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "cesantia-desempleo",
    title: "Cesantía y Seguro de Desempleo",
    category: "Seguros y Subsidios",
    whoCanDo: "Asegurados que queden desempleados debido a desvinculación o cese de funciones.",
    requirements: [
      "Para solicitar fondos de Cesantía: Estar cesante por un mínimo de 60 días calendario.",
      "Para el Seguro de Desempleo: Acumular al menos 24 aportaciones mensuales en total, con un mínimo de 6 consecutivas previas al despido.",
      "La pérdida laboral debe obedecer a motivos involuntarios (ej. despido, quiebra, liquidación). No aplica por renuncia voluntaria.",
      "Presentar el acta de liquidación o desvinculación formal validada por el Ministerio del Trabajo de ser requerida."
    ],
    steps: [
      "Asegurarte de contar con el Aviso de Salida laboral y finiquito registrado ante el Ministerio del Trabajo.",
      "Esperar los plazos correspondientes según la opción (60 días de espera total para cesantía o trámite inmediato para desempleo).",
      "Acceder a iess.gob.ec -> menú 'Servicios en línea' -> 'Cesantía y Seguro Desempleo'.",
      "Colocar tu clave personal de afiliado.",
      "El sistema calculará tus cuotas (S.D. cubre hasta un 70% de tus últimos 6 sueldos durante 5 meses continuos o un solo retiro de Fondo Cesantía según deudas).",
      "Confirmar el envío del trámite en línea."
    ],
    whereTo: {
      label: "iess.gob.ec -> Servicios en línea -> Cesantía",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Solicitar el Seguro de Desempleo habiendo renunciado voluntariamente (es exclusivo para despidos intempestivos o desvinculaciones involuntarias).",
      "Solicitar cesantía teniendo deudas en mora vigentes con el BIESS (los saldos acumulados de cesantía actúan como garantía real, por lo que quedan inmovilizados)."
    ],
    needsMoreHelp: "El Seguro de Desempleo abarca un máximo de 5 meses decrecientes conforme el tiempo acumulado o vacancia.",
    referenceNorm: "Resolución C.D. 515 (Reglamento de Cesantía y Seguro de Desempleo).",
    dateModified: "2026-10-01",
    sources: [
      { label: "Resolución C.D. 515 - Reglamento IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ministerio del Trabajo de Ecuador", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "responsabilidad-patronal",
    title: "Responsabilidad Patronal (Reforma CD 677)",
    category: "Trámites y Afiliación",
    whoCanDo: "Empleadores que registren trabajadores no afiliados o en mora al momento de ocurrir incidentes o de requerir atenciones.",
    requirements: [
      "La falta de afiliación desde el primer día de trabajo del empleado.",
      "Mora patronal o retraso en las cotizaciones al IESS.",
      "La ocurrencia de accidentes laborales o diagnósticos de enfermedades catastróficas sin que el afiliado se encuentre debidamente al día."
    ],
    steps: [
      "El IESS emite una glosa o liquidación económica en contra de la empresa sancionada.",
      "El patrono debe compensar con recursos privados la totalidad de gastos médicos incurridos, subsidios transferidos y pensiones de vejez estimuladas.",
      "Proceder con el plan de regularización, cancelación o convenios de pago para dar de baja la sanción bajo la Reforma de la Resolución C.D. 677 de noviembre de 2024."
    ],
    whereTo: {
      label: "Unidad de Control de Recaudación y Cartera del IESS",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Afectar los préstamos personales y subsidios de los demás colaboradores de la empresa por mora patronal.",
      "Creer que los intereses de mora pueden subsanar de manera retroactiva los accidentes sin incurrir en Responsabilidad Patronal (el siniestro genera glosa inmediata)."
    ],
    needsMoreHelp: "La Resolución C.D. 677 de noviembre de 2024 introduce rigurosas medidas para evitar la repetición y reajustar los procesos de cobros de cartera patronal.",
    referenceNorm: "Resolución C.D. 677 del Consejo Directivo del IESS.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Resolución C.D. 677 - Gaceta Oficial IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "aviso-entrada-salida",
    title: "Avisos de Entrada y Salida",
    category: "Trámites y Afiliación",
    whoCanDo: "Empleadores públicos o privados y personas jurídicas.",
    requirements: [
      "Contratación laboral efectiva (para el aviso de entrada).",
      "Plazo de presentación del Aviso de Entrada: primer día de labores o máximo en un plazo de 15 días posteriores.",
      "Culminación de funciones contractuales (para el aviso de salida, obligatorio para que el afiliado pueda pensionarse o retirar fondos)."
    ],
    steps: [
      "Ingresar a iess.gob.ec -> sección de Empleadores.",
      "Hacer clic en 'Avisos de Entrada y Salida' y acceder con usuario patronal y clave.",
      "Registrar los datos de identidad del colaborador.",
      "Completar fecha exacta de reingreso o finalización, tipo de jornada ordinaria/parcial, y salario básico contractual.",
      "Validar el registro y guardar la constancia firmada en formato digital."
    ],
    whereTo: {
      label: "iess.gob.ec -> Empleadores -> Avisos de Entrada/Salida",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "No subir oportunamente el aviso de salida al destituir o desvincular a un empleado (impide que el ciudadano solicite su jubilación o seguro de desempleo).",
      "Consignar salarios o montos contractuales falsos para pagar menos cotización (se sanciona severamente por fraude de aportación)."
    ],
    needsMoreHelp: "Un empleador en mora patronal de cotizaciones e imposiciones bloquea los préstamos quirografarios de todos sus trabajadores en nómina.",
    referenceNorm: "Resoluciones de Cartera y Aseguramiento, C.D. 625 del IESS.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Manual del Empleador - IESS", url: "https://www.iess.gob.ec/empleadores", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "actualizacion-datos",
    title: "Actualización de Datos Personales",
    category: "Trámites y Afiliación",
    whoCanDo: "Cualquier persona afiliada activa, voluntaria, pasiva, jubilada de vejez o montepío.",
    requirements: [
      "Para trámite en línea: Solo disponible si ya realizaste una validación facial o biométrica presencial en ventanilla anteriormente.",
      "Para trámite presencial: Cédula de identidad física y vigente.",
      "Para representantes curadores: Sentencia judicial firme validad por el departamento legal del IESS de la provincia respectiva."
    ],
    steps: [
      "Si accedes en línea: Ir a iess.gob.ec -> sección de trámites, colocar usuario y clave personal, y actualizar campos de celular, dirección o mail.",
      "Si el sistema te solicita validación presencial: Acudir directamente a un Centro de Atención Universal del IESS.",
      "Presentarte de lunes a viernes (horario de 08:00 a 17:00) con tu cédula de ciudadanía.",
      "Solicitar validación de datos biométricos para certificar la titularidad de tu información."
    ],
    whereTo: {
      label: "Centros de Atención Universal en todas las Direcciones Provinciales",
      physical: "Centros de Atención Universal (CAU) a nivel nacional"
    },
    commonErrors: [
      "Asistir solo con copias de cédula sin llevar el documento auténtico y vigente.",
      "No validar a los curadores o tutores legales a nivel jurídico previo a solicitar cambios de jubilaciones."
    ],
    needsMoreHelp: "Mantener los datos actualizados previene hackeos de cuentas IESS o desvíos accidentales de saldos de préstamos.",
    referenceNorm: "Resolución C.D. 625 (Arts. 3 y 34), Resolución C.D. 535.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Canal Presencial CAU - IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "quejas-canales-denuncia",
    title: "Canales de Denuncias (Septiembre 2025)",
    category: "Trámites y Afiliación",
    whoCanDo: "Todos los asegurados, afiliados, jubilados, dependientes y ciudadanos preocupados.",
    requirements: [
      "Nombre, número de cédula, teléfono de contacto y correo electrónico del denunciante (esta información y base de datos es tratada con estricta confidencialidad).",
      "Detalles del incidente: fecha, hospital, oficina, o nombre del funcionario (si aplica)."
    ],
    steps: [
      `Saber que el IESS habilitó canales oficiales 24/7 en septiembre de 2025 para reportar irregularidades.`,
      `Puedes ingresar en la web oficial a ${getFactValue("DENUNCIAS_WEB")}.`,
      `O enviar un mensaje interactivo de WhatsApp al chatbot ${getFactValue("DENUNCIAS_WHATSAPP")}.`,
      "Seguir el menú guiado en pantalla para ingresar tu denuncia de forma segura, confidencial y expedita."
    ],
    whereTo: {
      label: "denuncias.iess.gob.ec y WhatsApp 0962532338",
      url: `https://${getFactValue("DENUNCIAS_WEB")}`
    },
    commonErrors: [
      "Compartir datos delicados en redes sociales ajenas a los dos canales autorizados.",
      "Creer que reportar maltratos o faltantes médicos tiene algún costo o requiere de abogados patrocinadores."
    ],
    needsMoreHelp: "Puedes reportar: Maltrato presencial/médico, instalaciones sucias o en mal estado, tiempos excesivos para citas, faltas de medicinas, o presuntos casos de corrupción.",
    referenceNorm: "Ley de Trámites Administrativos de Ecuador.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Secretaría Nacional de Transparencia de Ecuador", url: "https://www.transparencia.gob.ec", accessedAt: "2026-10-01" },
      { label: "Portal del Asegurado - Denuncias IESS", url: "https://denuncias.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "como-obtener-clave-iess-primera-vez",
    title: "Obtención de Clave de Afiliado",
    category: "Trámites y Afiliación",
    whoCanDo: "Cualquier persona previamente registrada en el IESS (afiliado activo, voluntario o jubilado).",
    requirements: [
      "Cédula de identidad de Ecuador vigente.",
      "Correo electrónico personal y activo registrado en la plataforma.",
      "Responder de forma correcta las preguntas desafío financieras/laborales."
    ],
    steps: [
      "Ingresar a iess.gob.ec -> Trámites Virtuales -> Asegurados -> Afiliados -> Generar/Recuperar Clave.",
      "Escribir su número de cédula de ciudadanía de 10 dígitos sin guiones.",
      "Aprobar el cuestionario interactivo de seguridad de 3 preguntas de opción múltiple.",
      "Acceder a su buzón de correo electrónico registrado y abrir el enlace de confirmación antes de 15 minutos.",
      "Fijar una contraseña segura que contenga letras y números de entre 8 y 15 caracteres."
    ],
    whereTo: {
      label: "iess.gob.ec (Módulo de Generación de Claves)",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Fallar tres veces consecutivas en las preguntas de seguridad (bloquea la validación en línea).",
      "Dejar pasar el lapso de 15 minutos sin hacer clic en el enlace temporal recibido por correo electrónico."
    ],
    needsMoreHelp: "Si su correo está desactualizado o no aprueba las preguntas de seguridad, acuda a un Centro de Atención Universal (CAU) con su cédula de identidad.",
    referenceNorm: "Resolución C.D. 625 (Reglamento de Atención Universal IESS).",
    dateModified: "2026-10-01",
    sources: [
      { label: "IESS - Solicitud de Clave de Afiliado", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Resolución C.D. 625 - Reglamento de Atención Universal", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "como-consultar-aportes-iess-historial-laboral",
    title: "Consulta de Aportes e Historial Laboral",
    category: "Trámites y Afiliación",
    whoCanDo: "Afiliados bajo relación de dependencia, afiliados voluntarios y jubilados de la seguridad social.",
    requirements: [
      "Número de cédula de ciudadanía ecuatoriana o código provisional de afiliación.",
      "Clave personal de afiliado del IESS unificada."
    ],
    steps: [
      "Ingresar a iess.gob.ec -> Asegurados -> Afiliados -> Historial Laboral.",
      "Iniciar sesión digitando su cédula y clave de seguridad unificada.",
      "Hacer clic en el menú lateral izquierdo en 'Consultas' -> 'Aportes' para visualizar imposiciones mensuales.",
      "Seleccionar 'Historial Laboral' o 'Resumen de Aportes' para descargar la certificación consolidada.",
      "Descargar la certificación consolidada en formato PDF firmado electrónicamente."
    ],
    whereTo: {
      label: "iess.gob.ec (Módulo de Historial Laboral)",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Pensar que las imposiciones dobles de un mismo mes cuentan como dos meses de servicio para calificar para la jubilación.",
      "Reclamar falta de aportes patronales antes del día 15 del mes en curso, dado que el empleador dispone hasta ese plazo de pago legal."
    ],
    needsMoreHelp: "Si faltan aportes de un empleador, interponga una queja o reclamo formal por falta de afiliación laboral en iess.gob.ec.",
    referenceNorm: "Ley de Seguridad Social, Artículos de Recaudación y Control de Mora.",
    dateModified: "2026-10-01",
    sources: [
      { label: "IESS - Consulta de Aportes en Línea", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ley de Seguridad Social de Ecuador - Artículos de Recaudación", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "como-saber-si-estoy-afiliado-al-iess",
    title: "Consulta de Estado de Afiliación",
    category: "Trámites y Afiliación",
    whoCanDo: "Cualquier ciudadano con número de cédula de ciudadanía o código de extranjero.",
    requirements: [
      "Número de cédula de ciudadanía de Ecuador o código provisional de afiliación.",
      "Fecha de nacimiento de la persona a consultar."
    ],
    steps: [
      "Ingresar al portal web iess.gob.ec -> Servicios en Línea -> Asegurados -> Ciudadanos -> Certificado de Afiliación.",
      "Digitar el número de cédula de ciudadanía de 10 dígitos sin guiones ni espacios.",
      "Ingresar la fecha de nacimiento en el formato correspondiente.",
      "Completar la validación de seguridad (captcha visual).",
      "Visualizar el estado actual y hacer clic en 'Descargar Certificado' para guardar la certificación en PDF."
    ],
    whereTo: {
      label: "iess.gob.ec (Certificado de Afiliación)",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "Introducir guiones o espacios en el campo del número de cédula.",
      "Intentar descargar un certificado expirado (los documentos descargados solo tienen 30 días de vigencia)."
    ],
    needsMoreHelp: "Si tu estado reporta 'Cesante' pero te encuentras laborando bajo dependencia, solicita la regularización de inmediato con tu empleador o ingresa una queja en línea.",
    referenceNorm: "Ley de Seguridad Social de Ecuador.",
    dateModified: "2026-10-01",
    sources: [
      { label: "IESS - Consulta de Afiliación", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: "afiliacion-trabajo-hogar-iess-requisitos",
    title: "Afiliación del Trabajo del Hogar",
    category: "Trámites y Afiliación",
    whoCanDo: "Empleadores domésticos (para trabajadoras remuneradas) o personas que realizan tareas domésticas en su hogar sin sueldo.",
    requirements: [
      "Cédula de identidad vigente del afiliado y del empleador (si aplica).",
      "Contrato de trabajo doméstico registrado en el portal SUT del Ministerio del Trabajo (para trabajadoras remuneradas).",
      "Estar en el Registro Social del MIES y tener entre 15 y 65 años (para seguro no remunerado de amas de casa)."
    ],
    steps: [
      "Registrar la cuenta patronal doméstica del empleador en iess.gob.ec -> Empleadores -> Registro de Empleador -> Trabajo Doméstico (si aplica).",
      "Generar el aviso de entrada en línea detallando el sueldo (mínimo el SBU de $482 para el año 2026) y la jornada laboral.",
      "Para amas de casa, ingresar a iess.gob.ec -> Asegurados -> Afiliados -> Trabajo del Hogar No Remunerado con su cédula de identidad.",
      "Completar la encuesta socioeconómica cruzada con el MIES para establecer la tarifa subsidiada correspondiente.",
      "Confirmar el registro e imprimir el comprobante de afiliación especial."
    ],
    whereTo: {
      label: "iess.gob.ec (Portal de Empleadores / Asegurados)",
      url: String(getFactValue("URL_IESS_PORTAL"))
    },
    commonErrors: [
      "No registrar el aviso de salida a tiempo tras finalizar la relación laboral (genera cobros acumulados).",
      "Creer que el seguro especial subsidiado para amas de casa da derecho a consultas o cirugías en los hospitales del IESS (solo cubre jubilación e invalidez)."
    ],
    needsMoreHelp: "La afiliación doméstica extemporánea o su evasión constituye una infracción penal severa que puede ser sancionada con prisión de tres a siete días.",
    referenceNorm: "Ley de Seguridad Social de Ecuador - Régimen Especial de Trabajo del Hogar.",
    dateModified: "2026-10-01",
    sources: [
      { label: "Ley de Seguridad Social - Régimen Especial", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ministerio del Trabajo de Ecuador", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-01" }
    ]
  }
];
