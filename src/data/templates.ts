export interface OficioField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  required?: boolean;
  maxLength?: number;
  description?: string;
}

export interface OficioTemplate {
  id: string;
  name: string;
  emoji: string;
  category: "Pensiones" | "Salud y Subsidios" | "Afiliación y Cartera" | "Trámites Generales" | "BIESS";
  laws: string;
  description: string;
  diagnostico: string;
  proximosPasos: string[];
  fields: OficioField[];
  generateText: (values: Record<string, string>, formatFecha: (d: string) => string) => string;
  timeframe?: string;
}

export const OFICIOS_TEMPLATES: OficioTemplate[] = [
  {
    id: "glosa",
    name: "Impugnación de Glosa Patronal",
    emoji: "⚖️",
    category: "Afiliación y Cartera",
    laws: "Art. 66 num. 23 Constitución, Ley de Seguridad Social Art. 272, Resolución C.D. 677 (noviembre 2024)",
    description: "Para empleadores que han sido notificados con una glosa injustificada y desean impugnarla dentro del plazo legal de 20 días hábiles.",
    diagnostico: "Trámite patronal clave para evitar el cobro coactivo de valores liquidados por inspecciones fiscales del IESS. Conforme la Resolución C.D. 677 y la Ley Orgánica de Optimización de Trámites, la impugnación detiene provisionalmente el estado de coactiva si se presenta a tiempo.",
    proximosPasos: [
      "Lleva el oficio firmado en duplicado a la Dirección Provincial respectiva del IESS (Ventanilla Única de Gestión Documental).",
      "Adjunta copia legible del RUC del empleador, copia de la notificación de la glosa y las pruebas de descargo (roles, contratos firrmados, transferencias que justifiquen el error).",
      "El plazo máximo improrrogable es de 20 días hábiles a partir del día siguiente de la notificación física o virtual."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad de Trámite", type: "text", placeholder: "Ej. Guayaquil", defaultValue: "Quito" },
      { id: "nombreEmpleador", label: "Nombre o Razón Social del Empleador", type: "text", placeholder: "Ej. Distribuidora del Austro S.A." },
      { id: "ruc", label: "RUC / Cédula del Empleador", type: "text", placeholder: "Ej. 0190123456001" },
      { id: "glosaNum", label: "Número de Glosa / Título de Crédito", type: "text", placeholder: "Ej. G-2026-1456" },
      { id: "fechaNotificacion", label: "Fecha de Notificación", type: "date" },
      { id: "motivoFalta", label: "Sustento o Motivo de Descargo", type: "text", placeholder: "Ej. Trabajador estuvo de vacaciones con permiso formal y aportes liquidados debidamente" },
      { id: "representante", label: "Nombre del Representante Legal (si aplica)", type: "text", placeholder: "Ej. Ing. Carlos Alvarado" }
    ],
    generateText: (values, formatFecha) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombreEmpleador || "[Nombre del Empleador/Empresa]";
      const ruc = values.ruc || "[RUC/Cédula]";
      const glosaNum = values.glosaNum || "[Número de Glosa]";
      const fechaNoti = values.fechaNotificacion ? formatFecha(values.fechaNotificacion) : "[Fecha de Notificación]";
      const motivo = values.motivoFalta || "los valores se liquidaron por un error material en la planilla y el trabajador se encontraba debidamente cesante/afiliado";
      const rep = values.representante ? `representada legalmente por ${values.representante}` : "actuando por mis propios derechos";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Subdirección de Cartera y Coactivas / Comisión Provincial de Prestaciones y Reclamaciones
Presente.-

Asunto: Presentación formal de IMPUGNACIÓN DE GLOSA PATRONAL No. ${glosaNum} (Plazo de 20 días hábiles)

Yo, ${nombre}, identificado con RUC/C.C. número ${ruc}, ${rep}, amparado en el Art. 66 numeral 23 de la Constitución de la República del Ecuador (Derecho de Petición), el artículo 272 de la Ley de Seguridad Social y la Resolución C.D. 677 de noviembre de 2024, comparezco ante ustedes para manifestar e impugnar formalmente la glosa indicada bajo las siguientes consideraciones:

1. NOTIFICACIÓN Y PLAZO: Fui notificado con la glosa No. ${glosaNum} con fecha ${fechaNoti}. Al encontrarme dentro del término prioritario e improrrogable de los veinte (20) días hábiles que señala la reglamentación del IESS, presento esta oposición para detener cualquier cobro coactivo.

2. RAZONES DE IMPUGNACIÓN: La glosa de cobro es incongruente y carece de sustento fáctico por cuanto: ${motivo}. Adjunto los respaldos probatorios de que todas nuestras planillas se declararon bajo absoluta legalidad de forma concurrente con el Ministerio del Trabajo.

Por lo expuesto, SOLICITO de manera expresa:
- Se admita a trámite el presente recurso de impugnación.
- Se declare la nulidad, insubsistencia o revocatoria de la glosa patronal No. ${glosaNum} al haberse demostrado el estricto cumplimiento normativo.
- Se ordene archivar el proceso coactivo administrativo de cobro consecuente.

Anexos adjuntos:
- Copia de RUC o cédula.
- Notificación informática de la glosa impugnada.
- Pruebas documentales de descargo de planillas de aportes/roles/permisos.

Atentamente,

_________________________________________
Firma del Empleador / Representante Legal
RUC/C.C.: ${ruc}`;
    }
  },
  {
    id: "aportes",
    name: "Reclamo de Aportes Faltantes",
    emoji: "📁",
    category: "Afiliación y Cartera",
    laws: "Arts. 67 y 369 de la Constitución, Ley de Seguridad Social Art. 73",
    description: "Permite al afiliado denunciar de forma anónima o formal a un empleador que no registra ni paga sus aportaciones reglamentarias obligatorias.",
    diagnostico: "Herramienta de resguardo laboral. El empleador está obligado a registrar la entrada desde el primer día y a pagar los aportes mensuales. El cese de aportes vulnera el acceso inmediato a salud y créditos del BIESS.",
    proximosPasos: [
      "Imprime el oficio firmado.",
      "Llévalo a la Coordinación Provincial de Afiliación y Control de Obligaciones del IESS.",
      "Lleva pruebas que demuestren la relación de dependencia (contrato laboral, transferencias de sueldo, correos formales o roles)."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre Completo del Afiliado", type: "text", placeholder: "Ej. Juan Pérez" },
      { id: "cedula", label: "Cédula de Identidad", type: "text", placeholder: "Ej. 1712345678" },
      { id: "empleador", label: "Empresa o Nombre del Empleador", type: "text", placeholder: "Ej. Almacenes S.A." },
      { id: "fechaInicio", label: "Fecha de Inicio de Labores", type: "date" },
      { id: "fechaFin", label: "Fecha de Fin de Labores o indica (Sigue Activo)", type: "text", placeholder: "Ej. 30/11/2026 o 'Sigue Activo'" },
      { id: "periodos", label: "Meses / Planillas Faltantes", type: "text", placeholder: "Ej. Junio a Noviembre de 2026" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Nombre Completo]";
      const cedula = values.cedula || "[Cédula de Identidad]";
      const empleador = values.empleador || "[Nombre del Empleador]";
      const fechaInicio = values.fechaInicio || "[Fecha de Inicio]";
      const fechaFin = values.fechaFin || "[Fecha de Fin / Sigue Activo]";
      const periodos = values.periodos || "[Periodos Faltantes]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Afiliación y Control de Obligaciones
Presente.-

Asunto: Reclamo formal por evasión y aportación patronal faltante (Falta de Afiliación Laboral)

Yo, ${nombre}, con cédula No. ${cedula}, acudo ante su autoridad amparado en el precepto constitucional del derecho irrenunciable al aseguramiento obligatorio dictaminado en los Arts. 67 y 369 de nuestra Constitución, para solicitar formalmente una inspección de control de obligaciones bajo los siguientes hechos:

1. RELACIÓN LABORAL: Trabajé bajo directa relación de dependencia con el empleador/empresa ${empleador}, habiendo desarrollado mis tareas laborales cotidianas desde el día ${fechaInicio} hasta el ${fechaFin}.

2. INFRACCIÓN LABORAL OBSERVADA: Inspeccionando con detenimiento mi historial de aportes y cartola del IESS, he comprobado con perjuicio directo que el empleador omitió el reporte y pago de mis aportaciones mensuales obligatorias por la cantidad de periodos: ${periodos}.

3. PERJUICIO GENERAL: Esta defraudación e irregularidad me impide acceder plenamente a medicina del seguro social, resguardo de cesantías, décimos acumulados e inhabilita mi precalificación para préstamos quirografarios en el BIESS.

Por lo expuesto, SOLICITO formalmente:
- Se asigne un inspector técnico para recabar las novedades físicas de este consultor laboral en la empresa descrita.
- Se calculen e impongan de forma retroactiva las planillas pendientes y las multas acumuladas que previene la Ley de Seguridad Social.

Anexo: Copia de cédula, copia de contrato o roles de transferencia de salarios.

Atentamente,

_________________________________________
Firma de Solicitante
C.C.: ${cedula}`;
    }
  },
  {
    id: "maternidad",
    name: "Subsidio de Maternidad (Trámite de Pago)",
    emoji: "🤰",
    category: "Salud y Subsidios",
    laws: "Art. 43 Constitución, Ley de Seguridad Social Arts. 106 y 107",
    description: "Ayudas para exigir el pago de los 84 días de subsidio de maternidad en mora de validación técnica bancaria o retrasos del sistema.",
    diagnostico: "Amparo al binomio madre e hijo. Cumpliendo un mínimo de 12 aportes previos al parto, el subsidio entrega el 75% del sueldo por el IESS y el 25% por el empleador.",
    proximosPasos: [
      "Presenta la carta física en la ventanilla única de Subsidios de tu localidad.",
      "Adjunta la partida del bebé de nacido vivo aprobada por el Registro Civil, el certificado de reposo físico validado por un médico del IESS y el certificado de cuenta de banco activa."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre de la Madre", type: "text", placeholder: "Ej. María Espinel" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 0912345678" },
      { id: "empleador", label: "Empleador Actual", type: "text", placeholder: "Ej. Editorial Sur" },
      { id: "fechaNacimiento", label: "Fecha Nacimiento Bebé", type: "date" },
      { id: "banco", label: "Nombre del Banco/Cooperativa", type: "text", placeholder: "Ej. Banco Guayaquil" },
      { id: "cuenta", label: "Número de Cuenta de Depósito", type: "text", placeholder: "Ej. 000412389" },
      { id: "retraso", label: "Causa o motivo de queja", type: "text", placeholder: "Ej. Retraso de acreditación desde hace 45 días hábiles" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Nombre de la Madre]";
      const cedula = values.cedula || "[Cédula]";
      const empleador = values.empleador || "[Empleador]";
      const fechaNac = values.fechaNacimiento || "[Fecha Nacimiento]";
      const banco = values.banco || "[Banco]";
      const cuenta = values.cuenta || "[No. Cuenta]";
      const retraso = values.retraso || "Falta de procesamiento contable en el sistema del IESS";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación de Prestaciones Económicas / Subsidios Maternidad
Presente.-

Asunto: Solicitud de expedición y pago de SUBSIDIO POR MATERNIDAD EN MORA del primer hijo

Yo, ${nombre}, con cédula de ciudadanía No. ${cedula}, en calidad de afiliada con relación de dependencia activa con el patrono ${empleador}, comedidamente expongo:

1. CUMPLIMIENTO LEGAL: Con fecha de parto de mi hijo registrada el ${fechaNac} he acumulado debidamente las 12 imposiciones mensuales que prevé el reglamento oficial antes de la fecha probable de parto, encontrándome al día en mis aportaciones y validada administrativamente.

2. MORA REGISTRADA: El certificado oficial de reposo por maternidad fue subido y validado, pero el desembolso correspondiente se encuentra congelado debido a: ${retraso}.

3. ACCESO ECONÓMICO: Esta vulnerabilidad contraviene los Arts. 35 y 43 de la Constitución que definen el cuidado prioritized a la gestación y el binomio materno-fetal, así como la subsistencia digna en descanso médico obligatorio. Solicito la acreditación en mi cuenta registrada del banco ${banco} No. ${cuenta}.

Pido que se verifique mi expediente que consta cargado en su plataforma y se ordene la transferencia oficial de urgencia de los haberes correspondientes.

Atentamente,

_________________________________________
Firma de Madre Afiliada
C.C.: ${cedula}`;
    }
  },
  {
    id: "montepio",
    name: "Pensión de Montepío (Viudez/Orfandad)",
    emoji: "🕊️",
    category: "Pensiones",
    laws: "Ley de Seguridad Social Art. 191 al 200, Reglamento de Pensiones",
    description: "Para reclamar el derecho a pensión del cónyuge o de los hijos sobrevivientes tras el fallecimiento de un jubilado o afiliado.",
    diagnostico: "La solicitud de Montepío debe formalizarse en un plazo prudencial (máximo 2 años para evitar caducidad administrativa de retroactivos). Cumplidos 6 meses de aportes inmediatos antes del deceso o 36 aportaciones en total, se otorga pensión mensual a viuda e hijos menores.",
    proximosPasos: [
      "Presenta la carpeta física en la Dirección de Pensiones del IESS.",
      "Anexa partida de defunción sellada, copia de cédula militar/civil del causante, acta de matrimonio certificada para viudez o partida de nacimiento para orfandad, y certificado bancario."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombreReclamante", label: "Nombre de la Viuda o Hijo Reclamante", type: "text", placeholder: "Ej. Carmen Ortiz Delgado" },
      { id: "cedulaReclamante", label: "Cédula del Reclamante", type: "text", placeholder: "Ej. 1715698341" },
      { id: "nombreFallecido", label: "Nombre del Afiliado/Jubilado Fallecido", type: "text", placeholder: "Ej. Luis Alberto Mena" },
      { id: "cedulaFallecido", label: "Cédula del Fallecido", type: "text", placeholder: "Ej. 1701235694" },
      { id: "parentesco", label: "Parentesco / Relación con el Fallecido", type: "select", options: ["Cónyuge / Conviviente", "Hijo Menor de 18 años", "Hijo de 18 a 21 años (Estudiante)", "Hijo con Discapacidad", "Padre/Madre dependiente económicamente"] },
      { id: "fechaDefuncion", label: "Fecha de Defunción del Causante", type: "date" }
    ],
    generateText: (values, formatFecha) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombreC = values.nombreReclamante || "[Nombre del Reclamante]";
      const cedulaC = values.cedulaReclamante || "[Cédula de Reclamante]";
      const nombreF = values.nombreFallecido || "[Nombre del Fallecido]";
      const cedulaF = values.cedulaFallecido || "[Cédula de Fallecido]";
      const rel = values.parentesco || "Cónyuge / Conviviente";
      const fechaDef = values.fechaDefuncion ? formatFecha(values.fechaDefuncion) : "[Fecha de Defunción]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Pensiones / Montepío
Presente.-

Asunto: Solicitud formal de derecho y acreditación de PENSIÓN DE MONTEPÍO (Viudez/Orfandad)

Yo, ${nombreC}, de nacionalidad ecuatoriana, identificado con cédula No. ${cedulaC}, en calidad de ${rel} del asegurado fallecido, acudo respetuosamente ante ustedes para exponer y solicitar:

1. FALLECIMIENTO DEL CAUSANTE: Quien en vida fue el señor ${nombreF} con cédula No. ${cedulaF}, falleció el ${fechaDef} habiendo registrado en su trayectoria laboral la calidad de asegurado/jubilado activo conforme las reglas de la Ley de Seguridad Social.

2. DERECHO DE LEY: Dado mi parentesco legal directo y permanente (${rel}), mismo que justifico documentalmente mediante las actas respectivas del Registro Civil, cumplo con todos los supuestos de elegibilidad y plazos para percibir la pensión mensual que correspondiese para mi legítimo sostenimiento.

Por lo tanto, SOLICITO de forma comedida se inicie el expediente de cálculo y entrega formal de mi respectiva pensión líquida de Montepío, disponiéndose la oportuna transferencia retroactiva a la cuenta de banco acreditada en su base de datos virtual.

Adjunto soportes de Ley:
- Inscripción de Defunción legalizada.
- Acta de Matrimonio o Declaratoria de Unión de Hecho / Nacimiento.
- Copias de cédula correspondientes y certificado de estudios (si aplica).

Atentamente,

_________________________________________
Firma de Solicitante
C.C.: ${cedulaC}`;
    }
  },
  {
    id: "cesantia",
    name: "Retiro de Fondos de Cesantía y Seguro Desempleo",
    emoji: "💰",
    category: "Pensiones",
    laws: "Resolución C.D. 515, Ley de Seguridad Social Art. 280",
    description: "Para reclamar el desembolso de los fondos de Cesantía tras 60 días de cese laboral u obtener los 5 meses de Seguro de Desempleo (sólo despido).",
    diagnostico: "La cesantía acumula el 1% del salario mensual pagado por el empleador. El seguro de desempleo cubre hasta el 70% del sueldo por 5 meses si la separación es involuntaria.",
    proximosPasos: [
      "El empleador debe haber subido el Aviso de Salida formal.",
      "El acta de finiquito debe estar registrada en el Ministerio del Trabajo.",
      "Presenta este oficio en ventanilla en caso de que existan glosas o bloqueos de sistema que impidan el trámite en línea."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Afiliado", type: "text", placeholder: "Ej. Carmen Jaramillo" },
      { id: "cedula", label: "Cédula de Identidad", type: "text", placeholder: "Ej. 1723456789" },
      { id: "empleador", label: "Último Empleador", type: "text", placeholder: "Ej. Constructora del Norte" },
      { id: "fechaCese", label: "Fecha de Cese o Salida Laboral", type: "date" },
      { id: "actaNum", label: "Acta de Finiquito / No. Registro de Cese", type: "text", placeholder: "Ej. MDT-2026-0814" },
      { id: "tipoTram", label: "Tipo de Reclamo", type: "select", options: ["Solo Retiro de Cesantía Acumulada", "Acceso al Seguro de Desempleo (5 meses)", "Retiro de Cesantía por Jubilación"] }
    ],
    generateText: (values, formatFecha) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const empleador = values.empleador || "[Último Empleador]";
      const fechaCese = values.fechaCese ? formatFecha(values.fechaCese) : "[Fecha de Cese]";
      const actaNum = values.actaNum || "[No. Acta de Finiquito]";
      const tipo = values.tipoTram || "Acceso de Seguro de Desempleo";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Departamento de Fondos de Reserva y Cesantías / Desempleo
Presente.-

Asunto: Solicitud formal de liquidación y desembolso de FONDOS DE CESANTÍA / SEGURO DE DESEMPLEO

Yo, ${nombre}, en pleno goce de mis facultades mentales y civiles, portador de cédula de identidad No. ${cedula}, expongo respetuosamente ante ustedes:

1. SITUACIÓN DE DESEMPLEO: Registré formalmente mi salida laboral del empleador ${empleador} en fecha ${fechaCese}, cumpliendo más de 60 días continuos con cese de relación de dependencia vigente, según consta validado de forma oportuna a través del portal en línea de la institución con código de registro MDT No. ${actaNum}.

2. SOLICITUD DE TRÁMITE DE LEY: Dado que la plataforma digital presenta un error de precarga de planillas por mora del empleador del cual soy ajeno, requiero formalmente la gestión física y autorización para: ${tipo}.

Apelo a la Resolución C.D. 515 para que se proceda a auditar, aprobar y liberar los dividendos que constan en mis cuentas individuales correspondientes a mis años acumulados de servicios y se liquiden de forma prioritaria en mi cuenta bancaria registrada de forma oficial.

Adjuntos:
- Copia de cédula.
- Acta de finiquito ratificada por Inspector del Ministerio del Trabajo.
- Aviso de salida laboral impreso del IESS.

Atentamente,

_________________________________________
Firma de Afiliado Desempleado
C.C.: ${cedula}`;
    }
  },
  {
    id: "moraSubsidios",
    name: "Reclamo por Mora en Subsidios/Pensiones",
    emoji: "⌛",
    category: "Trámites Generales",
    laws: "Art. 28 de la Ley de Modernización del Estado (Derecho a respuesta en 15 días)",
    description: "Ayuda al jubilado o afiliado a exigir el pago inmediato en ventanilla cuando existe un retraso prolongado de depósitos mensuales.",
    diagnostico: "La demora injustificada en el desembolso de pensiones o subsidios médicos es ilegal. Este oficio exige la aplicación de la Ley de Optimización y Eficiencia de Trámites Administrativos que condena el silencio administrativo.",
    proximosPasos: [
      "Presenta este oficio original firmado ante el Director Provincial del IESS.",
      "Lleva el estado de cuenta impreso de los últimos 3 meses donde se observe el impago, y la copia del trámite de jubilación/solicitud de subsidio inicial cargada en la red."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre", type: "text", placeholder: "Ej. Laura Veloz" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 1823456780" },
      { id: "tipoBeneficio", label: "Tipo de Beneficio Retrasado", type: "select", options: ["Pensión de Jubilación Vejez", "Pensión de Montepío", "Subsidio de Incapacidad Temporal (Enfermedad)", "Fondos de Reserva Retenidos"] },
      { id: "solicitudNum", label: "No. Solicitud de Trámite Inicial", type: "text", placeholder: "Ej. SOL-2026-4569" },
      { id: "mesesImpagos", label: "Semanas / Meses Impagos", type: "text", placeholder: "Ej. Abril y Mayo del 2026" },
      { id: "cuenta", label: "Banco y No. de Cuenta", type: "text", placeholder: "Ej. Banco Pacífico Ahorros 1023456" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const tipo = values.tipoBeneficio || "Pensión de Jubilación";
      const sol = values.solicitudNum || "[No. Solicitud]";
      const meses = values.mesesImpagos || "[Meses impagos]";
      const cuenta = values.cuenta || "[Detalle Cuenta]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Subdirección de Prestaciones / Área Contable y Financiera
Presente.-

Asunto: Exigencia de pago y reclamo formal por Mora Injustificada en Acreditación de ${tipo}

Yo, ${nombre}, en calidad de beneficiario directo, titular de cédula No. ${cedula}, expongo ante ustedes con carácter urgente:

1. ANTECEDENTES: Con fecha reglamentaria ingresé mi solicitud con identificador No. ${sol} para percibir con derecho legal el desembolso de: ${tipo}.

2. MORA ADMINISTRATIVA: He constatado con extrema preocupación que vuestra institución ha acumulado retrasos en mis depósitos correspondientes a: ${meses}, a pesar de que tengo registrada y calificada la cuenta bancaria: ${cuenta}, cumpliendo cada trámite previo.

3. DERECHO DE EXIGENCIA: Al ser pensiones alimentarias de subsistencia vital e irrenunciables, amparadas en la Constitución, el retraso del pago atenta contra mi salud financiera y física. Solicito se aplique el término de atención prioritaria de la Ley de Trámites Administrativos y se depositen mis aportes acumulados inmediatamente.

Pido que se libere vuestro saldo retenido y se ordene la acreditación correspondiente urgente.

Atentamente,

_________________________________________
Firma de Solicitante
C.C.: ${cedula}`;
    }
  },
  {
    id: "prejubilacion",
    name: "Pre-Jubilación Ordinaria",
    emoji: "👴",
    category: "Pensiones",
    laws: "Ley de Seguridad Social Art. 219, 222 (Requisitos de edad y aportes)",
    description: "Para presentar la solicitud previa de jubilación directamente en ventanilla cuando existen aportaciones que no se visualizan.",
    diagnostico: "La jubilación ordinaria exige cumplir con las fórmulas de ley: a mayor edad, menos años de aportes. 40 años de aportes sin límite de edad; 30 años de aportes y 60 de edad; o 15 años de aportes y 65 de edad.",
    proximosPasos: [
      "Obtén tu historial de aportaciones digitales del portal del IESS.",
      "Firma la solicitud e ingrésala en ventanilla en la Dirección de Pensiones para que verifiquen tus aportaciones de empresas liquidadas que ya no existen."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre", type: "text", placeholder: "Ej. Ángel Benavides" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 0612345678" },
      { id: "aportesAnios", label: "Años de aportación estimados", type: "number", placeholder: "Ej. 32" },
      { id: "edad", label: "Edad Actual", type: "number", placeholder: "Ej. 62" },
      { id: "banco", label: "Banco para Acreditación Directa", type: "text", placeholder: "Ej. Banco Bolivariano" },
      { id: "cuenta", label: "Número de Cuenta de Jubilado", type: "text", placeholder: "Ej. 1045239" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const aportes = values.aportesAnios || "[Años Aportes]";
      const edad = values.edad || "[Edad]";
      const banco = values.banco || "[Banco]";
      const cuenta = values.cuenta || "[Cuenta]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Pensiones / Vejez
Presente.-

Asunto: Solicitud de Validación Preliminar y Solicitud Física de Pre-Jubilación de Vejez

Yo, ${nombre}, con cédula No. ${cedula}, acudo ante su despacho para presentar mi expediente previo para jubilación por vejez, amparado en el Art. 219 de la Ley de Seguridad Social, justificando:

1. REQUISITOS CUMPLIDOS: Al contar con una edadCronológica de ${edad} años y calculando un récord aproximado de aportaciones de ${aportes} años (equivalente a más de las imposiciones obligatorias de ley), soy beneficiario del derecho legítimo de jubilación vitalicia.

2. DEPÓSITO DE HABERES: Solicito que una vez calificada la cesación patronal formal del mes en curso, se acredite la pensión a mi cuenta de banco personal autorizada: ${banco} No. ${cuenta}.

Ruego que se ejecute la precalificación técnica eliminando cualquier error de homonimia o aportes fantasmas retenidos de empresas cerradas del austro para liquidar mi jubilación en los próximos 30 días hábiles de ley.

Atentamente,

_________________________________________
Firma de Solicitante (Pre-Jubilado)
C.C.: ${cedula}`;
    }
  },
  {
    id: "actualizacion",
    name: "Actualización de Datos Personales (Bloqueo de Clave)",
    emoji: "📇",
    category: "Trámites Generales",
    laws: "Resolución C.D. 625, Arts. 3 y 34; Ley de Comercio Electrónico",
    description: "Ayuda a exigir desbloqueo de cuenta bancaria o clave en ventanilla si el sistema web presenta errores o caídas.",
    diagnostico: "La actualización web requiere un pre-registro. Si la clave se bloquea o cambiaste de celular, el IESS te obligará a presentarte en ventanilla presencial con este oficio firmado.",
    proximosPasos: [
      "Acude personalmente a un Centro de Atención Universal del IESS.",
      "Lleva tu cédula original y una copia. Presenta este oficio si vas con un apoderado con poder notarial."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre", type: "text", placeholder: "Ej. José Toala" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 1312345678" },
      { id: "correo", label: "Nuevo Correo Electrónico", type: "text", placeholder: "Ej. jose@gmail.com" },
      { id: "celular", label: "Nuevo Celular de Contacto", type: "text", placeholder: "Ej. 0991234567" },
      { id: "direccion", label: "Dirección Domiciliaria", type: "text", placeholder: "Ej. Av. Chone y Esmeraldas" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const correo = values.correo || "[Correo]";
      const celular = values.celular || "[Celular]";
      const direccion = values.direccion || "[Dirección]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación de Servicios al Asegurado / Centro de Atención Universal
Presente.-

Asunto: Solicitud formal de Actualización de Datos Personales Integrales y Reparación de Clave de Red

Yo, ${nombre}, con cédula No. ${cedula}, acudo a ustedes para solicitar formalmente se actualicen mis credenciales informáticas y datos de contacto en su base central de servidores públicos, por motivos de seguridad informática y actualización domiciliaria, solicitando registrar:

- Cédula de Identidad: ${cedula} (adjunta física).
- Correo principal: ${correo}
- Número celular activo: ${celular}
- Dirección registrada: ${direccion}

Adicionalmente, solicito de forma expresa el reseteo y desbloqueo total de mi clave patronal/personal en línea para evitar trámites de suplantación y poder solicitar créditos del BIESS de forma autónoma.

Atentamente,

_________________________________________
Firma de Afiliado
C.C.: ${cedula}`;
    }
  },
  {
    id: "aportesExceso",
    name: "Devolución de Aportes en Exceso",
    emoji: "💸",
    category: "Trámites Generales",
    laws: "Ley de Seguridad Social Art. 83 y 84, Reglamento de Cartera IESS",
    description: "Para trabajadores o empleadores que por error material pagaron un porcentaje de aportes mayor al legal o doble aportación.",
    diagnostico: "La devolución de pagos indebidos es obligatoria por parte del fisco. El IESS debe devolver los montos retenidos de forma injustificada tras auditar la aportación concurrente.",
    proximosPasos: [
      "Presenta la solicitud física en la Unidad de Cartera de tu Dirección Provincial del IESS.",
      "Anexa la copia del comprobante de transferencia y la planilla errónea sellada."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Afiliado o Empresa", type: "text", placeholder: "Ej. Manuel Torres" },
      { id: "cedula", label: "Cédula / RUC", type: "text", placeholder: "Ej. 1715897451" },
      { id: "empleador", label: "Empleador Relacionado", type: "text", placeholder: "Ej. Comercial S.A." },
      { id: "valorEstimado", label: "Valor estimado a devolver (USD)", type: "number", placeholder: "Ej. 240" },
      { id: "banco", label: "Banco y Cuenta de devolución", type: "text", placeholder: "Ej. Produbanco Ahorros 23094823" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const empleador = values.empleador || "[Empleador]";
      const valor = values.valorEstimado || "[Valor USD]";
      const banco = values.banco || "[Detalles Banco]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Departamento de Recaudación y Gestión de Cartera / Pagos en Exceso
Presente.-

Asunto: Solicitud formal de Devolución de Valores Pagados de Forma Indebida o en Exceso

Yo, ${nombre}, con cédula/RUC No. ${cedula}, me dirijo a ustedes amparado en los Arts. 83 y 84 de la Ley de Seguridad Social para solicitar formalmente el reembolso tributario contable de haberes, de conformidad con las siguientes especificaciones:

Por un error material de nómina, se pagaron aportaciones mensuales por un valor superior al debido al empleador ${empleador}, estimándose una recaudación excedente a favor del IESS por el monto aproximado de: USD $${valor}.

Solicito comedidamente que el área técnica contable revise el historial y ordene la transferencia oficial de devolución del dinero cobrado en demasía a mi cuenta autorizada de banco: ${banco}.

Atentamente,

_________________________________________
Firma de Solicitante
C.C.: ${cedula}`;
    }
  },
  {
    id: "convenioPago",
    name: "Convenio de Pago / Exoneración de Intereses",
    emoji: "📝",
    category: "Afiliación y Cartera",
    laws: "Resolución C.D. 625, Reglamento de Recaudación del IESS",
    description: "Ayuda para que pequeñas empresas y empleadores en mora soliciten un plan de pagos y eviten coactivas inmediatas.",
    diagnostico: "La ley del IESS permite otorgar convenios de purga de mora patronal de hasta 36 o 48 meses. El convenio desbloquea los aportes de los empleados temporalmente.",
    proximosPasos: [
      "Presenta la propuesta de pagos físicamente ante la Coordinación de Glosas y Coactivas.",
      "Acompaña garantía suficiente según requiera la cuantía de la deuda."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombreEmpleador", label: "Nombre de la Empresa", type: "text", placeholder: "Ej. Taller Metalúrgico Sol" },
      { id: "ruc", label: "RUC", type: "text", placeholder: "Ej. 1791234567001" },
      { id: "deudaValor", label: "Monto de la Deuda Estimada (USD)", type: "number", placeholder: "Ej. 3500" },
      { id: "mesesPropuestos", label: "Meses de Plazo Propuestos", type: "number", placeholder: "Ej. 24" },
      { id: "causaMora", label: "Breve justificación de la Mora", type: "text", placeholder: "Ej. Caída drástica de ingresos de la empresa durante el periodo fiscal anterior" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombreEmpleador || "[Empresa]";
      const ruc = values.ruc || "[RUC]";
      const deuda = values.deudaValor || "[Monto]";
      const meses = values.mesesPropuestos || "[Meses]";
      const causa = values.causaMora || "[Justificación]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación Provincial de Recaudación y Cobro / Cartera Coactiva
Presente.-

Asunto: Solicitud formal de CONVENIO DE PURGA DE MORA PATRONAL y Planilla de Facilidades de Pago

Yo, ${nombre}, corporación identificada con RUC número ${ruc}, me dirijo a ustedes amparado en las facilidades que dicta la Resolución C.D. 625:

Para sanear las obligaciones patronales pendientes por planilla ordinaria que acumulan un saldo global de USD $${deuda}, propongo de forma voluntaria suscribir un convenio de pagos en cuotas mensuales prorrateadas por un plazo sugerido de: ${meses} meses.

Las razones financieras por las cuales incurrimos en mora temporal corresponden a: ${causa}. Deseamos cumplir de forma pacífica y garantizar que nuestros afiliados recuperen plenamente sus seguros médicos.

Pido que se califique mi solicitud y se fijen de inmediato las tablas de amortización mensuales.

Atentamente,

_________________________________________
Firma de Empleador / Representante
RUC No. ${ruc}`;
    }
  },
  {
    id: "quejaMedica",
    name: "Queja por Mala Atención o Cambio de Médico",
    emoji: "🏥",
    category: "Salud y Subsidios",
    laws: "Art. 360 al 366 Constitución Ecuatoriana (Derecho a Salud de Calidad)",
    description: "Ayuda a denunciar administrativamente el mal trato de un funcionario de salud o solicitar cambio de doctor de cabecera por negligencia.",
    diagnostico: "La queja debe quedar asentada de forma física para activar auditorías internas hospitalarias. También puedes usar el canal denuncias.iess.gob.ec, pero este oficio deja constancia oficial del reclamo.",
    proximosPasos: [
      "Presenta la queja firmada en la Dirección de Atención al Usuario del respectivo Hospital o Clínica del IESS.",
      "Conserva la copia sellada como sustento legal en caso de que requieras acudir a la Defensoría del Pueblo."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Paciente/Afiliado", type: "text", placeholder: "Ej. Gabriel Cañizares" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 0914569832" },
      { id: "hospital", label: "Nombre de la Casa de Salud/Hospital IESS", type: "text", placeholder: "Ej. Hospital Carlos Andrade Marín (HCAM)" },
      { id: "areaOdoctor", label: "Doctor, Médico o Área de la queja", type: "text", placeholder: "Ej. Servicio de Traumatología Urgencias" },
      { id: "hechos", label: "Breve resumen de los malos tratos o fallas", type: "text", placeholder: "Ej. Cancelación abrupta de cita y falta de medicinas prioritarias de dolor" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const hosp = values.hospital || "[Hospital]";
      const area = values.areaOdoctor || "[Doctor/Área]";
      const hechos = values.hechos || "[Descripción hechos]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN AMINISTRATIVA / ATENCIÓN AL USUARIO
${hosp} - Instituto Ecuatoriano de Seguridad Social (IESS)
Presente.-

Asunto: Presentación formal de RECLAMO ADMINISTRATIVO por mala praxis o deficiente atención médica

Yo, ${nombre}, afiliado cotizante del IESS, con cédula No. ${cedula}, acudo ante su autoridad para fundamentar una queja de servicio amparado en el Art. 360 de la Constitución que consagra la calidad médica:

Dejo constancia de que en la referida casa de salud, específicamente en la sección: ${area}, sufrí de una pésima atención debido a: ${hechos}. Esto vulnera los estándares éticos, profesionales y leyes de los centros hospitalarios públicos de Ecuador.

Solicito de la manera más enérgica se asigne una investigación técnica y administrativa, se llame a descargo al personal involucrado, y de ser el caso se me asigne un médico alternativo de inmediato para reanudar mis controles reglamentarios.

Atentamente,

_________________________________________
Firma del Paciente Afiliado
C.C.: ${cedula}`;
    }
  },
  {
    id: "beneficiarios",
    name: "Inscripción y Retiro de Cargas Familiares",
    emoji: "👨‍👩‍👧‍👦",
    category: "Salud y Subsidios",
    laws: "Ley de Seguridad Social Art. 102",
    description: "Para registrar cónyuge o hijos menores para cobertura de salud, o retirarlos del sistema si ya no gozan de dependencia legal.",
    diagnostico: "La cobertura médica se extiende a familiares de forma legal. La tasa adicional del 3.41% de cotizaciones voluntarias permite tener al cónyuge asegurado.",
    proximosPasos: [
      "Presenta este oficio en la Dirección de Aseguramiento de salud de tu provincia.",
      "Adjunta copia de cédula de la carga, la partida de matrimonio o unión de hecho y el certificado de nacimiento actualizado."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombreAfiliado", label: "Nombre del Afiliado Titular", type: "text", placeholder: "Ej. Teresa Ruiz" },
      { id: "cedulaAfiliado", label: "Cédula del Titular", type: "text", placeholder: "Ej. 1723456784" },
      { id: "nombreCarga", label: "Nombre del Beneficiario/Carga", type: "text", placeholder: "Ej. Mateo Ruiz (Hijo)" },
      { id: "cedulaCarga", label: "Cédula de la Carga", type: "text", placeholder: "Ej. 1756485324" },
      { id: "parentesco", label: "Parentesco de la Carga", type: "select", options: ["Cónyuge / Conviviente legal", "Hijo Menor de 18 años", "Hijo con discapacidad total"] },
      { id: "accion", label: "Acción a Realizar", type: "select", options: ["Inscripción oficial de cobertura", "Retiro y salida del beneficiario"] }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombreAfiliado || "[Afiliado]";
      const cedula = values.cedulaAfiliado || "[Cédula Afiliado]";
      const nombreC = values.nombreCarga || "[Nombre Carga]";
      const cedulaC = values.cedulaCarga || "[Cédula de Carga]";
      const parentesco = values.parentesco || "Hijo Menor";
      const accion = values.accion || "Inscripción";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Departamento de Afiliación y Aseguramiento Técnico Familiar
Presente.-

Asunto: Solicitud formal de ${accion.toUpperCase()} de Beneficiario (Carga Familiar)

Yo, ${nombre}, en calidad de afiliado activo cotizante del IESS, con cédula de ciudadanía No. ${cedula}, expongo respetuosamente ante ustedes:

Solicito que se ejecute en su plataforma administrativa la acción de: ${accion} correspondiente a mi carga familiar legal directa de nombre ${nombreC}, portador de la cédula No. ${cedulaC}, bajo la condición acreditada de ${parentesco}.

Adjunto el respaldo de parentesco y pido que se realicen las validaciones de las planillas mensuales para dar cobertura o retiro oficial según dictamina la ley general.

Atentamente,

_________________________________________
Firma del Afiliado Titular
C.C.: ${cedula}`;
    }
  },
  {
    id: "quirografario",
    name: "Auditoría Previa de Quirografario",
    emoji: "💳",
    category: "BIESS",
    laws: "Reglamento del BIESS, Resoluciones del Comité de Crédito",
    description: "Ayuda para solicitar la aprobación de un crédito desbloqueando trabas informáticas o mora patronal del empleador.",
    diagnostico: "El quirografario se calcula según tus Fondos de Reserva y Cesantía. Si tu patrón se encuentra retrasado en planillas, este oficio sirve para exigir desbloqueo por mora involuntaria.",
    proximosPasos: [
      "Acude a las Oficinas de Atención de Crédito del BIESS en tu cantón.",
      "Lleva copia de las dos últimas planillas declaradas del IESS."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Afiliado", type: "text", placeholder: "Ej. Daniel Salazar" },
      { id: "cedula", label: "Cédula de Identidad", type: "text", placeholder: "Ej. 0112345678" },
      { id: "montoAprox", label: "Monto Solicitado Estimado (USD)", type: "number", placeholder: "Ej. 1200" },
      { id: "empleador", label: "Empleador Patrono", type: "text", placeholder: "Ej. Cooperativa Integral" },
      { id: "problema", label: "Traba o Error que muestra el portal del BIESS", type: "text", placeholder: "Ej. Error de cálculo en garantías cesantías o mora patronal indirecta" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const monto = values.montoAprox || "[Monto]";
      const empleador = values.empleador || "[Empleador]";
      const prob = values.problema || "[Error técnico]";

      return `${ciudad}, ${hoy}

Señores
BANCO DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (BIESS)
Oficinas de Crédito Inmediato y Quirografarios
Presente.-

Asunto: Solicitud formal de Auditoría de Garantías y Desbloqueo Preventivo de Crédito Quirografario

Yo, ${nombre}, en calidad de afiliado que registra plenas aportaciones activas, con cédula de ciudadanía No. ${cedula}, me dirijo a ustedes para exponer:

Deseo solicitar un crédito quirografario por el valor estimado de USD $${monto}. Sin embargo, la plataforma informática del BIESS deniega de forma automática la simulación de cobro alegando el siguiente impedimento con mi empleador ${empleador}: ${prob}.

Dado que las leyes garantizan que la mora patronal del empleador no puede imputar ni privar los fondos de reserva al trabajador de forma coactivada, solicito una auditoría técnica individual de mi cuenta para autorizar la liberación de este desembolso de ley.

Atentamente,

_________________________________________
Firma de Solicitante
C.C.: ${cedula}`;
    }
  },
  {
    id: "jubilacionCatastrofica",
    name: "Jubilación por Invalidez o Enfermedad Catastrófica",
    emoji: "🎗️",
    category: "Pensiones",
    laws: "Art. 35 Constitución del Ecuador; Ley de Seguridad Social Art. 185",
    description: "Para afiliados con enfermedades de alta complejidad o catastróficas que impensadamente requieren una pensión de invalidez inmediata.",
    diagnostico: "La pensión de invalidez total exige de una evaluación médica especializada del IESS. En casos de diagnóstico de enfermedad catastrófica, la ley acelera plazos de trámite exonerando mínimos de aportes.",
    proximosPasos: [
      "Adjunta la historia clínica oficial con certificado médico sellado por especialista del hospital IESS.",
      "Lleva el oficio físico en duplicado a la ventanilla de la Comisión Médica Calificadora (Comisión del IESS) en tu provincia."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Paciente", type: "text", placeholder: "Ej. Manuel Cevallos" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 0914235894" },
      { id: "diagnosticoEnf", label: "Nombre de la Enfermedad Catastrófica/Compleja", type: "text", placeholder: "Ej. Insuficiencia Renal Crónica" },
      { id: "hospitalTratante", label: "Hospital del IESS de Tratamiento", type: "text", placeholder: "Ej. Hospital Teodoro Maldonado Carbo" },
      { id: "dictamenNum", label: "No. Clínico / Historial de Consulta", type: "text", placeholder: "Ej. HC-948234-A" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const enf = values.diagnosticoEnf || "[Enfermedad]";
      const hosp = values.hospitalTratante || "[Hospital]";
      const dictamen = values.dictamenNum || "[Código historial]";

      return `${ciudad}, ${hoy}

Señores
COMISIÓN MÉDICA CALIFICADORA DE INCAPACIDAD (VALORACIÓN IESS)
Dirección Provincial de Pensiones y Salud del IESS
Presente.-

Asunto: Solicitud urgente de Calificación de Invalidez y pensión preferente por diagnóstico de Enfermedad Catastrófica

Yo, ${nombre}, de nacionalidad ecuatoriana, titular de la cédula No. ${cedula}, acudo ante vuestras facultades profesionales para elevar mi legítima petición:

He sido diagnosticado formalmente con una patología catalogada como catastrófica / de alta complejidad por médicos del IESS: ${enf}. Recibo controles permanentes y cirugías paliativas en el ${hosp} con número de expediente clínico No. ${dictamen}.

Debido a los dolores crónicos y la pérdida absoluta e irreversible de mi rendimiento laboral ordinario, amparado en el Art. 35 de la Constitución, solicito una evaluación prioritaria médica presencial/domiciliaria para que se expida de urgencia mi dictamen de invalidez permanente definitiva y se ordene el cobro de mi pensional vitalicio.

Atentamente,

_________________________________________
Firma de Paciente Afiliado
C.C.: ${cedula}`;
    }
  },
  {
    id: "enfermedadSubsidio",
    name: "Subsidio de Enfermedad Común/Accidente Laboral",
    emoji: "🩹",
    category: "Salud y Subsidios",
    laws: "Ley de Seguridad Social Art. 108 y 109, Reglamento de Riesgos del Trabajo",
    description: "Ayudas para exigir la convalidación de reposos médicos particulares o cobro en dinero de los subsidios temporales por accidente.",
    diagnostico: "Incapacidad temporal de más de 3 días otorga derecho a subsidio a cargo del IESS. A partir del día 4 y hasta el 90, se subsidia el 75% del salario.",
    proximosPasos: [
      "Carga el certificado en iess.gob.ec en un plazo máximo de 8 días hábiles tras el inicio médico.",
      "Si el portal falla, presenta este oficio presencial en Recepción para evitar pérdidas de cobertura."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Trabajador", type: "text", placeholder: "Ej. Ricardo Flores" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 1723459812" },
      { id: "empleador", label: "Nombre de la Empresa", type: "text", placeholder: "Ej. Textilera Nacional" },
      { id: "incapacidadMotivo", label: "Causa o Lesión Médica", type: "text", placeholder: "Ej. Lesión de muñeca por accidente en área de producción/trabajo" },
      { id: "diasReposo", label: "Días de Reposo Concedidos", type: "number", placeholder: "Ej. 21" },
      { id: "fechaInicioReposo", label: "Fecha de Inicio del Reposo", type: "date" }
    ],
    generateText: (values, formatFecha) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const emp = values.empleador || "[Empleador]";
      const mot = values.incapacidadMotivo || "[Lesión/Causa]";
      const dias = values.diasReposo || "0";
      const fechaRep = values.fechaInicioReposo ? formatFecha(values.fechaInicioReposo) : "[Fecha Inicio]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Departamento de Riesgos del Trabajo / Subsidios y Salud Laboral
Presente.-

Asunto: Solicitud formal de Validación de Certificado Médico y Reclamación de Subsidio Económico por Incapacidad Temporal

Yo, ${nombre}, con cédula No. ${cedula}, empleado con contrato vigente en la empresa ${emp}, comedidamente expongo:

Que sufrí una incapacidad por: ${mot}, de lo cual obtuve un certificado legal de reposo absoluto por la cantidad de ${dias} días contados desde la fecha de inicio ${fechaRep}.

Al no poder ingresar la información en línea por caída del sistema IESS o retrasos imputables de la red, presento este documento físico dentro del plazo reglamentario para que se ordene la convalidación y pago del subsidio del 75% directo.

Atentamente,

_________________________________________
Firma de Empleado Solicitante
C.C.: ${cedula}`;
    }
  },
  {
    id: "ceseVoluntario",
    name: "Cese de Afiliación Voluntaria",
    emoji: "⏹️",
    category: "Salud y Subsidios",
    laws: "Reglamento de Aseguramiento del IESS",
    description: "Para dar aviso formal de cese de aportes voluntarios para evitar deudas o planillas fantasmas acumuladas en el portal.",
    diagnostico: "La afiliación voluntaria puede terminarse en línea. Si el botón de salida no funciona, debes formalizar el aviso de salida voluntaria físicamente para congelar planillas futuras.",
    proximosPasos: [
      "Presenta la carta en los Centros de Atención.",
      "Esto previene cobros coactivos ilegales por meses que ya no cotizaste en Ecuador."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Afiliado", type: "text", placeholder: "Ej. Silvia Falconí" },
      { id: "cedula", label: "Cédula", type: "text", placeholder: "Ej. 1709546284" },
      { id: "fechaCeseDeseada", label: "Fecha Deseada de Fin de Aportes", type: "date" },
      { id: "causaCese", label: "Causa o Motivo de Salida", type: "text", placeholder: "Ej. Ingreso a un nuevo trabajo con dependencia o mudanza del país" }
    ],
    generateText: (values, formatFecha) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const fechaCese = values.fechaCeseDeseada ? formatFecha(values.fechaCeseDeseada) : "[Fecha Deseada]";
      const causa = values.causaCese || "ingreso a dependencia laboral u otra razón personal";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN PROVINCIAL DEL INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)
Coordinación de Afiliación Voluntaria y Coberturas
Presente.-

Asunto: Solicitud formal de CESE y suspensión voluntaria de aportaciones (Aviso de Salida del Seguro Voluntario)

Yo, ${nombre}, con cédula No. ${cedula}, en calidad de afiliado del seguro voluntario independiente, acudo respetuosamente ante ustedes para manifestar:

Es mi deseo expreso notificar el cese definitivo y retiro de mi afiliación voluntaria con vigencia a partir del ${fechaCese}, debido al motivo fáctico de: ${causa}.

Solicito que se anulen planillas posteriores a dicha fecha y se evite acumular mora administrativa coactiva improcedente en mi contra en los reportes de iess.gob.ec.

Atentamente,

_________________________________________
Firma de Afiliado Voluntario
C.C.: ${cedula}`;
    }
  },
  {
    id: "fallaSistema",
    name: "Reclamo por Fallas de la Plataforma IESS",
    emoji: "💻",
    category: "Trámites Generales",
    laws: "Ley Orgánica de Optimización de Trámites Administrativos",
    description: "Reclamo para justificar retrasos en trámites cuando la web del IESS ha estado caída o presenta de forma habitual 'Error 500'.",
    diagnostico: "La inactividad de servidores públicos estatales no puede alegar culpabilidad al ciudadano. Deja constancia de las caídas de sistema para evitar multas de fechas límite.",
    proximosPasos: [
      "Adjunta capturas de pantalla de la red del IESS impresa con el error físico.",
      "Entrega la solicitud firmada en la Dirección de Tecnología de la Información (Sistemas) provincial."
    ],
    fields: [
      { id: "ciudad", label: "Ciudad", type: "text", defaultValue: "Quito" },
      { id: "nombre", label: "Nombre del Afectado", type: "text", placeholder: "Ej. Estefanía Loor" },
      { id: "cedula", label: "Cédula de Identidad", type: "text", placeholder: "Ej. 1312569841" },
      { id: "seccionFalla", label: "Sección o Módulo del Portal con Error", type: "text", placeholder: "Ej. Módulo de Desbloqueo de Clave Patronal o Generación de Fondos" },
      { id: "detallesFalla", label: "Breve descripción del mensaje de error", type: "text", placeholder: "Ej. Error 500 Interno de Servidor y bucle en carga de datos bancarios" }
    ],
    generateText: (values) => {
      const ciudad = values.ciudad || "Quito";
      const hoy = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
      const nombre = values.nombre || "[Tu Nombre]";
      const cedula = values.cedula || "[Cédula]";
      const sec = values.seccionFalla || "[Módulo Web]";
      const det = values.detallesFalla || "[Detalle Error]";

      return `${ciudad}, ${hoy}

Señores
DIRECCIÓN NACIONAL DE TECNOLOGÍAS DE LA INFORMACIÓN / ATENCIÓN CIUDADANA
Instituto Ecuatoriano de Seguridad Social (IESS)
Presente.-

Asunto: Solicitud de Justificación por Imposibilidad Técnica y Reporte de Caída Prolongada de Plataforma Informática

Yo, ${nombre}, con cédula No. ${cedula}, presento ante ustedes este descargo institucional por fuerza mayor técnica:

Manifiesto que el portal del IESS en el aplicativo: ${sec}, ha presentado fallas tecnológicas habituales impidiéndome completar mi trámite habitual a tiempo, señalando el error: ${det}.

Conforme a la Ley de Optimización y Eficiencia de Trámites Públicos, las deficiencias informáticas estatales no pueden generar multas patronales ni de mora civil al ciudadano. Solicito se justifique mi retraso en el trámite y se me brinde soporte especializado.

Atentamente,

_________________________________________
Firma de Afectado Ciudadano
C.C.: ${cedula}`;
    }
  }
];
