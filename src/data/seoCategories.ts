export interface SeoSubcategory {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoTool {
  title: string;
  description: string;
  type: string;
  actionLabel: string;
  query: string;
}

export interface SeoCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  pilarText: string;
  subcategories: SeoSubcategory[];
  faqs: SeoFaq[];
  tools: SeoTool[];
  news: { title: string; date: string; summary: string }[];
  commonErrors: string[];
  relatedPostsSlugs: string[];
}

export const SEO_CATEGORIES: SeoCategory[] = [
  {
    id: "afiliacion",
    title: "Afiliación al IESS",
    slug: "afiliacion",
    description: "Guía completa sobre las modalidades de afiliación al IESS en Ecuador. Conoce los costos, porcentajes de aportación y los beneficios de estar asegurado.",
    metaTitle: "Afiliación IESS Voluntaria e Independiente - Requisitos y Costos 2026",
    metaDescription: "Todo sobre la afiliación al IESS en Ecuador. Requisitos para la afiliación voluntaria, costos de aportes mensuales, cobertura de salud y jubilación.",
    pilarText: `## La Importancia de la Afiliación al Seguro Social en Ecuador

La afiliación al **Instituto Ecuatoriano de Seguridad Social (IESS)** es un derecho constitucional de los trabajadores ecuatorianos y un pilar fundamental para garantizar la tranquilidad de las familias. Estar afiliado te da acceso directo a un sistema integral de protección que cubre contingencias como enfermedad, maternidad, paternidad, riesgos del trabajo, cesantía, desempleo, invalidez y vejez.

En el Ecuador existen distintas modalidades de aportación para adaptarse a la realidad de cada ciudadano, ya sea un profesional independiente, un empleado en relación de dependencia o un migrante ecuatoriano en el extranjero.

### Modalidades de Afiliación Principales

1. **Afiliación Bajo Relación de Dependencia**: Es obligatoria para todo trabajador contratado por un empleador. El aporte total equivale al **20.6%** del sueldo, donde el empleado asume el **9.45%** y el empleador cubre el **11.15%**.
2. **Afiliación Voluntaria**: Diseñada para profesionales independientes, emprendedores y personas sin relación de dependencia activa. El afiliado asume el costo completo del aporte, fijado en el **17.6%** del salario mensual declarado (no menor al salario básico unificado vigente).
3. **Afiliación de Personas sin Ingresos (Trabajo del Hogar)**: Permite a las personas dedicadas de forma exclusiva a las tareas del hogar afiliarse voluntariamente. El Estado subsidia una porción del aporte según el nivel socioeconómico de la familia.

---

## Beneficios Directos de Estar Afiliado al IESS

* **Salud Integral**: Atención médica, cirugías, tratamientos complejos y medicamentos en los hospitales del IESS y prestadores externos acreditados.
* **Seguro de Maternidad y Paternidad**: Subsidios por incapacidad temporal y cobertura total del parto.
* **Jubilación Ordinaria**: Pensión mensual vitalicia al cumplir la edad y el tiempo de aportes mínimos requeridos.
* **Acceso a Financiamiento**: Calificar para Préstamos Quirografarios e Hipotecarios a través del BIESS.
* **Seguro de Desempleo y Cesantía**: Retiro de fondos acumulados al quedar desocupado de forma temporal.`,
    subcategories: [
      {
        id: "afiliacion-voluntaria",
        title: "Afiliación Voluntaria",
        slug: "voluntaria",
        description: "Modalidad para trabajadores independientes, profesionales sin relación de dependencia y ecuatorianos en el exterior."
      },
      {
        id: "afiliacion-dependiente",
        title: "Relación de Dependencia",
        slug: "dependiente",
        description: "Aportes obligatorios mediante rol de pagos para servidores públicos y trabajadores de empresas privadas."
      },
      {
        id: "trabajo-hogar",
        title: "Trabajo no Remunerado del Hogar",
        slug: "trabajo-hogar",
        description: "Régimen especial de afiliación para personas dedicadas exclusivamente a las labores del hogar, con subsidio estatal."
      }
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta la afiliación voluntaria en el Ecuador?",
        a: "Para el afiliado voluntario, el porcentaje de aporte es del 17.6% calculado sobre el ingreso mensual que declare (el cual no puede ser inferior al Salario Básico Unificado vigente, que en 2026 es de $460, resultando en un aporte mínimo mensual de $80.96)."
      },
      {
        q: "¿Cuáles son los beneficios de salud que ofrece la afiliación?",
        a: "La afiliación da derecho a consulta médica general y especializada, exámenes de laboratorio, entrega de medicamentos, cirugías, hospitalización y tratamientos de enfermedades de alta complejidad desde el tercer mes consecutivo de aportes."
      },
      {
        q: "¿Cómo se realiza el pago mensual de las aportaciones voluntarias?",
        a: "Los pagos se realizan a mes vencido, entre el 1 y el 15 de cada mes, a través de débito automático bancario registrado en el portal, o en ventanillas de recaudación autorizadas (bancos locales, Servipagos, Banco del Barrio)."
      }
    ],
    tools: [
      {
        title: "Formato de Solicitud de Desbloqueo de Clave",
        description: "Genera el oficio formal requerido para reactivar tu cuenta virtual del IESS.",
        type: "oficio",
        actionLabel: "Generar Formato",
        query: "Hola, deseo generar un formato de oficio para solicitar el desbloqueo de mi clave del IESS."
      },
      {
        title: "Simulador de Aportación Voluntaria",
        description: "Calcula el costo exacto de tu aporte según tus ingresos estimados de 2026.",
        type: "calculadora",
        actionLabel: "Iniciar Simulación",
        query: "Hola, ayúdame a calcular el valor de mis aportaciones voluntarias si declaro un ingreso de 500 dólares mensuales."
      }
    ],
    news: [
      {
        title: "Actualización de aportes por el nuevo salario básico de $460",
        date: "02 de Enero de 2026",
        summary: "El aporte mínimo de afiliación voluntaria se ajusta automáticamente a $80.96 tras la fijación del nuevo salario básico."
      },
      {
        title: "IESS amplía servicios virtuales de afiliación rápida desde el celular",
        date: "14 de Marzo de 2026",
        summary: "A través de la nueva aplicación móvil, los ciudadanos pueden completar el registro voluntario en menos de 5 minutos utilizando reconocimiento facial."
      }
    ],
    commonErrors: [
      "No registrar una cuenta bancaria autorizada para el débito automático de tus aportes voluntarios, lo que genera mora automática el día 16 de cada mes.",
      "Afiliarse voluntariamente teniendo deudas activas o multas patronales pendientes en el sistema del IESS.",
      "Intentar desafiliarse de manera incorrecta dejando de pagar, en lugar de solicitar la suspensión formal en la plataforma web."
    ],
    relatedPostsSlugs: [
      "afiliacion-voluntaria-iess-requisitos-beneficios-2026",
      "como-obtener-clave-iess-primera-vez",
      "como-saber-si-estoy-afiliado-al-iess",
      "afiliacion-trabajo-hogar-iess-requisitos"
    ]
  },
  {
    id: "historia-laboral",
    title: "Historia Laboral",
    slug: "historia-laboral",
    description: "Consulta y descarga tu mecanizado de aportes del IESS. Verifica el tiempo de aportación y detecta incumplimientos patronales.",
    metaTitle: "Mecanizado del IESS - Historia Laboral y Consulta de Aportes en Línea",
    metaDescription: "Guía completa para consultar tu historia laboral del IESS. Descarga el mecanizado de aportes con validez jurídica y reclama aportaciones pendientes.",
    pilarText: `## ¿Qué es la Historia Laboral del IESS y por qué es Vital?

La **Historia Laboral** es el registro consolidado de toda tu trayectoria de aportación al sistema de seguridad social ecuatoriano. Contiene la información exacta del número de días aportados, los sueldos declarados por cada uno de tus empleadores a lo largo de tu vida laboral, y las aportaciones que has realizado de forma independiente.

Este documento, conocido comúnmente como **"Mecanizado del IESS"**, es indispensable para:
* Acreditar tu tiempo de experiencia laboral oficial.
* Calificar a préstamos quirografarios y de vivienda en el BIESS.
* Verificar que tu empleador te registre en el IESS con el salario real percibido y pague los aportes a tiempo.
* Determinar el momento exacto en el que alcanzas los requisitos de tu jubilación de vejez.

---

## Cómo Consultar y Descargar el Mecanizado en Línea

La consulta de tu historial de aportes está digitalizada y cuenta con todas las garantías de seguridad informática. El documento descargable en formato PDF posee un código de verificación QR que certifica su validez jurídica ante cualquier entidad pública o privada.

### Pasos para Descargar tu Historia Laboral:
1. Dirígete a la página web oficial del IESS: [iess.gob.ec](https://www.iess.gob.ec).
2. Busca la sección de **Trámites Virtuales** e ingresa a **Asegurados** -> **Afiliados** -> **Historia Laboral**.
3. Escribe tu número de cédula y tu clave de seguridad personal.
4. En el menú lateral izquierdo, haz clic en **Consultas** y luego selecciona **Aportes**.
5. Verás el listado cronológico completo. Para exportarlo, desplázate al final de la página y selecciona **Imprimir o Guardar como PDF**.`,
    subcategories: [
      {
        id: "mecanizado-aportes",
        title: "Mecanizado de Aportes",
        slug: "mecanizado",
        description: "Consulta cronológica detallada de todas las imposiciones y sueldos declarados por empleador."
      },
      {
        id: "reclamo-aportes-impagos",
        title: "Reclamo de Aportaciones",
        slug: "reclamos",
        description: "Denuncias virtuales confidenciales por falta de afiliación o retrasos en el pago de aportes de tu empresa."
      },
      {
        id: "correccion-tiempos",
        title: "Corrección de Datos Laborales",
        slug: "correccion",
        description: "Trámite de rectificación cuando el sistema no refleja aportaciones antiguas o contiene inconsistencias de nombre."
      }
    ],
    faqs: [
      {
        q: "¿Qué significa que un aporte aparezca en estado 'Bloqueado' o 'Mora'?",
        a: "Significa que tu empleador no ha cancelado la planilla mensual del seguro social a tiempo. Aunque las semanas figuren en tu historial, no podrás utilizarlas como garantía para préstamos del BIESS hasta que la deuda sea saneada."
      },
      {
        q: "¿Cómo puedo denunciar a un empleador que no me afilió desde el primer día?",
        a: "Puedes presentar un reclamo formal y 100% confidencial en el portal web del IESS en la sección 'Denuncias de Afiliación'. No requieres abogado y se programará una inspección patronal inmediata."
      },
      {
        q: "¿El mecanizado de aportes descargado de internet tiene validez para trámites legales?",
        a: "Sí, todos los certificados de historia laboral emitidos por la web del IESS incluyen una firma electrónica institucional y un código QR de validación que los hace totalmente válidos para juicios o trámites notariales."
      }
    ],
    tools: [
      {
        title: "Oficio para Reclamo de Aportaciones No Declaradas",
        description: "Genera una carta formal dirigida a la inspección patronal exigiendo la regularización de tus aportes faltantes.",
        type: "oficio",
        actionLabel: "Generar Reclamo",
        query: "Hola, necesito redactar un reclamo formal para el IESS porque mi ex empleador no pagó mis aportes y aparece en mora."
      }
    ],
    news: [
      {
        title: "IESS lanza portal unificado para agilizar denuncias por evasión patronal",
        date: "12 de Febrero de 2026",
        summary: "El nuevo canal agiliza los tiempos de resolución para que los aportes evadidos sean reincorporados a la historia laboral del afiliado en menos de 45 días."
      }
    ],
    commonErrors: [
      "No verificar periódicamente los sueldos declarados en el mecanizado, permitiendo que empleadores declaren salarios inferiores para pagar menos aportación.",
      "Confundir aportaciones en mora con aportaciones perdidas. Las aportaciones en mora sí cuentan para el tiempo de jubilación una vez que el patrono cancele.",
      "No actualizar tus datos de contacto y correo electrónico dentro de la plataforma de historia laboral."
    ],
    relatedPostsSlugs: [
      "jubilacion-por-vejez-requisitos-2026",
      "como-consultar-aportes-iess-historial-laboral",
      "como-saber-si-estoy-afiliado-al-iess"
    ]
  },
  {
    id: "prestamos-biess",
    title: "Préstamos BIESS",
    slug: "prestamos-biess",
    description: "Accede a las líneas de financiamiento del BIESS: préstamos quirografarios de consumo e hipotecarios para compra de vivienda.",
    metaTitle: "Préstamos BIESS - Requisitos Quirografarios e Hipotecarios 2026",
    metaDescription: "Consulta de préstamos del BIESS. Requisitos de préstamos quirografarios rápidos, simulador de crédito hipotecario para vivienda y tasas de interés vigentes.",
    pilarText: `## El Rol de Financiamiento del Banco del IESS (BIESS)

El **Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)** es la entidad financiera pública encargada de administrar de manera eficiente e invertir los fondos de reserva y cesantía de los afiliados y jubilados, retornando el valor a los asegurados a través de préstamos con condiciones muy favorables en comparación con la banca tradicional.

El BIESS ofrece financiamientos destinados a cubrir necesidades inmediatas de consumo o a hacer realidad el sueño de adquirir vivienda propia, terreno, oficinas o ampliaciones.

### Tipos de Financiamiento del BIESS

1. **Préstamos Quirografarios (Créditos de Consumo)**: Son préstamos rápidos de libre disponibilidad. El monto concedido depende de la garantía acumulada que poseas en tus cuentas de **Cesantía y Fondos de Reserva**. El desembolso se realiza en tu cuenta bancaria registrada en un plazo de **24 a 72 horas hábiles** tras la aprobación virtual.
2. **Préstamos Hipotecarios (Créditos de Vivienda)**: Destinados a la adquisición de viviendas terminadas, construcción de casas, compra de terrenos, oficinas, locales comerciales o sustitución de hipotecas de otros bancos. Ofrecen plazos de pago de hasta **25 años** y tasas de interés preferenciales desde el **5.99%** para Viviendas de Interés Social (VIS).
3. **Préstamos Prendarios**: Préstamos inmediatos respaldados por garantías de joyas de oro de alta calidad, ideales para solventar urgencias extremas.`,
    subcategories: [
      {
        id: "quirografarios",
        title: "Préstamos Quirografarios",
        slug: "quirografarios",
        description: "Créditos rápidos de consumo garantizados por tus fondos acumulados de cesantía y reserva."
      },
      {
        id: "hipotecarios",
        title: "Préstamos Hipotecarios",
        slug: "hipotecarios",
        description: "Financiamiento a largo plazo para compra de casa, construcción, terreno o sustitución de hipotecas bancarias."
      },
      {
        id: "reestructuracion-deudas",
        title: "Refinanciamiento y Alivio",
        slug: "alivio-financiero",
        description: "Planes especiales para reestructurar deudas de créditos vigentes y evitar procesos coactivos."
      }
    ],
    faqs: [
      {
        q: "¿Cuántas aportaciones necesito acumuladas para un préstamo quirografario?",
        a: "Se requiere poseer al menos 36 aportaciones acumuladas en total, y que las últimas 12 aportaciones sean consecutivas e inmediatamente anteriores a la solicitud (para el caso de afiliados activos)."
      },
      {
        q: "¿Puedo realizar abonos extraordinarios a mi deuda del BIESS?",
        a: "Sí, puedes realizar abonos extraordinarios a capital o pre-cancelar la totalidad de tu préstamo quirografario o hipotecario en cualquier momento generando la orden de pago en línea, sin penalizaciones financieras."
      },
      {
        q: "¿Qué pasa si me quedo desempleado mientras pago un préstamo?",
        a: "En créditos quirografarios, el saldo de la deuda puede cruzarse y cancelarse directamente de tus fondos de cesantía en garantía. Para hipotecarios, debes acogerte al seguro de desempleo o solicitar un acuerdo de pago inmediato para evitar que se afecte tu historial de crédito."
      }
    ],
    tools: [
      {
        title: "Oficio de Queja por Retraso en Desembolso de Quirografario",
        description: "Redacta de inmediato una carta al BIESS si tu dinero aprobado lleva más de 5 días laborables sin acreditarse.",
        type: "oficio",
        actionLabel: "Generar Queja",
        query: "Hola, ayúdame a hacer un oficio de queja dirigida al BIESS por el retraso del desembolso de mi préstamo quirografario."
      },
      {
        title: "Simulador de Capacidad de Pago BIESS",
        description: "Estima el cupo máximo de endeudamiento mensual según tus sueldos reportados.",
        type: "calculadora",
        actionLabel: "Calcular Cupo",
        query: "Hola, simula mi cupo de pago mensual si gano un sueldo de 800 dólares y tengo gastos promedio."
      }
    ],
    news: [
      {
        title: "BIESS flexibiliza condiciones de hipotecarios y aumenta cobertura de avalúos",
        date: "05 de Mayo de 2026",
        summary: "La junta de política financiera autoriza al BIESS a financiar hasta el 100% del avalúo comercial en propiedades de interés social de hasta $90,000."
      }
    ],
    commonErrors: [
      "Intentar solicitar el quirografario si tu empleador está en mora patronal (el sistema rechaza la solicitud de manera automática).",
      "No tener actualizadas o autorizadas las cuentas de correo electrónico y de banco, impidiendo la recepción del código de confirmación OTP durante la firma electrónica del pagaré.",
      "Exceder la capacidad de pago permitida del 30% de tus ingresos mensuales consolidados en el sistema."
    ],
    relatedPostsSlugs: ["prestamo-quirografario-biess-requisitos-montos-2026"]
  },
  {
    id: "fondos-reserva",
    title: "Fondos de Reserva",
    slug: "fondos-reserva",
    description: "Consulta tus fondos de reserva acumulados. Pasos para acumular o solicitar la devolución de tus fondos de forma segura.",
    metaTitle: "Fondos de Reserva del IESS - Consulta de Saldos y Devolución 2026",
    metaDescription: "Aprende cómo consultar tus fondos de reserva del IESS en Ecuador. Requisitos para el retiro de fondos de reserva, acumulación mensual y plazos oficiales.",
    pilarText: `## ¿Qué son los Fondos de Reserva del IESS?

Los **Fondos de Reserva** representan un beneficio social de ahorro obligatorio a mediano plazo que corresponde a todo trabajador en relación de dependencia laboral, una vez que ha cumplido más de un **(1) año continuo de servicio** para el mismo empleador.

El valor del fondo equivale al **8.33%** de la remuneración mensual percibida por el trabajador, la cual incluye sueldo básico, horas extras, comisiones y otros pagos complementarios permanentes.

### Modalidades de Cobro y Ahorro

Por disposición legal en el Ecuador, el afiliado tiene dos opciones claras para la gestión de sus fondos de reserva:

1. **Mensualización**: Recibir el **8.33%** directamente acreditado en su rol de pagos cada mes, junto con su sueldo regular. Para esto, el trabajador debe enviar una solicitud electrónica a través de la web del IESS.
2. **Acumulación (Fondo de Reserva en el BIESS)**: Dejar que el empleador deposite mensualmente dicho valor en el IESS, donde queda custodiado y acumulado generando intereses financieros anuales. Este fondo sirve como garantía directa para solicitar préstamos quirografarios de emergencia.

---

## Cómo Solicitar la Devolución de Fondos de Reserva

Si has acumulado tus fondos en el IESS y deseas retirarlos, puedes hacerlo de manera virtual siempre que cumplas con los tiempos de permanencia mínimos determinados por la ley ecuatoriana.

### Requisitos para el Retiro:
* **Afiliados activos**: Contar con un mínimo de **36 aportaciones mensuales de fondos de reserva** acumuladas en el sistema (3 años de aportaciones).
* **Afiliados cesantes**: No es necesario cumplir el límite de aportes, solo basta con acreditar el estado de desempleo por más de 60 días consecutivos en el sistema.
* **Jubilados**: Pueden retirar el total acumulado en cualquier momento sin importar el número de aportes ni tiempos mínimos de espera.`,
    subcategories: [
      {
        id: "devolucion-fondos",
        title: "Devolución de Fondos",
        slug: "devolucion",
        description: "Retiro y transferencia electrónica de tus fondos acumulados directamente a tu cuenta bancaria personal."
      },
      {
        id: "solicitud-acumulacion",
        title: "Acumulación o Mensualización",
        slug: "acumulacion-mensualizacion",
        description: "Envío o modificación de la solicitud virtual para decidir si ahorras tus fondos o los cobras en el rol de pagos."
      }
    ],
    faqs: [
      {
        q: "¿A partir de qué mes mi empleador debe empezar a pagarme fondos de reserva?",
        a: "A partir del primer mes de tu segundo año de trabajo continuo con el mismo empleador (es decir, luego de cumplir los 12 primeros meses de labores bajo el mismo RUC patronal)."
      },
      {
        q: "¿Cuánto tiempo toma la acreditación de los fondos de reserva en el banco?",
        a: "Una vez completada con éxito la solicitud de devolución en la página web del IESS, la transferencia bancaria toma entre 3 y 5 días hábiles en acreditarse en tu cuenta bancaria registrada."
      },
      {
        q: "¿Puedo retirar mis fondos de reserva si tengo un préstamo quirografario vigente?",
        a: "No de forma libre. Si tienes un préstamo quirografario pendiente, tus fondos de reserva acumulados actúan como garantía de pago y se encuentran bloqueados. Solo podrás retirar el excedente que quede libre de compromisos de deuda."
      }
    ],
    tools: [
      {
        title: "Oficio por Falta de Pago de Fondos de Reserva Patronal",
        description: "Genera el requerimiento formal para que la dirección de recaudación del IESS sancione y cobre a tu patrono en mora.",
        type: "oficio",
        actionLabel: "Redactar Oficio",
        query: "Hola, deseo un oficio para denunciar que mi empresa no está pagando mis fondos de reserva mensuales al IESS."
      }
    ],
    news: [
      {
        title: "Fondos de Reserva generaron rendimiento récord de intereses en 2026",
        date: "28 de Enero de 2026",
        summary: "La tasa de rendimiento anual que paga el BIESS por los fondos de reserva acumulados superó el 6.2%, incentivando el ahorro de los afiliados."
      }
    ],
    commonErrors: [
      "Intentar retirar los fondos antes de acumular las 36 aportaciones requeridas, lo que provoca que el sistema bloquee el botón de retiro en línea.",
      "Tener la cuenta bancaria bloqueada o inactiva en el sistema financiero al momento de realizar la solicitud de desembolso.",
      "Suponer que los fondos se acumulan de manera automática al cambiar de empresa; al ingresar a un nuevo empleo, se requiere completar nuevamente un año continuo de servicios."
    ],
    relatedPostsSlugs: ["prestamo-quirografario-biess-requisitos-montos-2026"]
  },
  {
    id: "cesantia",
    title: "Cesantía",
    slug: "cesantia",
    description: "Requisitos y plazos para solicitar la devolución del fondo de cesantía del IESS. Conoce cómo retirar tu dinero al quedar desempleado.",
    metaTitle: "Fondo de Cesantía IESS - Consulta de Saldos y Retiro de Fondos 2026",
    metaDescription: "Guía paso a paso para el retiro de fondos de cesantía del IESS en Ecuador. Requisitos, plazos para afiliados desempleados y jubilados, y consulta de saldos.",
    pilarText: `## El Fondo de Cesantía del IESS y su Función Social

El **Fondo de Cesantía** es un mecanismo de ahorro obligatorio diseñado específicamente como red de seguridad económica inmediata en caso de pérdida involuntaria de empleo o retiro definitivo de la vida laboral activa.

Este fondo se nutre mensualmente con el aporte del **2.0%** de la remuneración imponible del afiliado activo privado o público, más el **1.0%** que aporta el empleador, acumulando mensualmente un **3.0%** en tu cuenta individual e intransferible.

---

## Requisitos y Plazos Vigentes para Retirar la Cesantía

A diferencia de otros beneficios de ahorro, la cesantía se rige bajo estrictas reglas de cese laboral con el fin de proteger al afiliado frente a periodos de desempleo imprevistos.

### Requisitos Generales de Retiro:
1. **Tiempo de Espera (Alineado a Ley)**: Estar en situación de cesantía laboral por un periodo mínimo de **60 días consecutivos** (2 meses) contados a partir de tu fecha de aviso de salida laboral en el sistema.
2. **Número de Aportes Mínimos**: Registrar al menos **24 aportaciones mensuales** (no necesariamente consecutivas) antes de la solicitud de devolución.
3. **Aviso de Salida del Empleador**: Comprobar que tu empleador ingresó correctamente tu aviso de salida en el sistema de historia laboral del IESS.
4. **No tener deudas pendientes**: El afiliado no debe tener préstamos quirografarios en mora ya que estos fondos se toman como garantía directa de saldo.

### Retiro Excepcional para Jubilados
Los afiliados que cumplan las condiciones para jubilarse por vejez, invalidez o discapacidad, o que hayan cumplido **65 años de edad**, quedan exentos de cumplir los 60 días de cese laboral y pueden retirar la totalidad de su fondo de cesantía acumulado de forma inmediata.`,
    subcategories: [
      {
        id: "retiro-cesantia",
        title: "Retiro y Devolución",
        slug: "retiro-cesantia",
        description: "Proceso electrónico para solicitar el desembolso total de tus fondos acumulados a tu cuenta bancaria registrada."
      },
      {
        id: "cesantia-garantia",
        title: "Uso de Cesantía como Garantía",
        slug: "garantia-cesantia",
        description: "Regulaciones y saldos retenidos como colateral prendario automático de tus deudas vigentes con el BIESS."
      }
    ],
    faqs: [
      {
        q: "¿Puedo cobrar el Seguro de Desempleo y el Fondo de Cesantía al mismo tiempo?",
        a: "No de forma simultánea e independiente en su totalidad. El Seguro de Desempleo se financia en parte con tu fondo de cesantía acumulado. Si decides activar el Seguro de Desempleo, recibirás pagos mensuales programados, pero se reducirá el saldo de tu fondo de cesantía global disponible."
      },
      {
        q: "¿Qué sucede con los fondos de cesantía si el afiliado fallece?",
        a: "Los fondos acumulados no se pierden. Son heredables y se entregan en su totalidad a los derechohabientes del afiliado fallecido (esposa/o, hijos menores de edad) a través del trámite formal de Cesantía por Mortuoria presencial."
      }
    ],
    tools: [
      {
        title: "Oficio de Impugnación por Retención Indebida de Cesantía",
        description: "Genera el oficio formal si el IESS bloqueó la devolución de tu cesantía sin justificación legal ni deudas activas.",
        type: "oficio",
        actionLabel: "Generar Oficio de Apelación",
        query: "Hola, requiero crear una carta de impugnación por retención indebida de mi fondo de cesantía del IESS."
      }
    ],
    news: [
      {
        title: "IESS implementa sistema electrónico de cesantía directa en 24 horas para jubilados",
        date: "25 de Febrero de 2026",
        summary: "A partir de este mes, la cesantía para nuevos jubilados se liquida y acredita en sus cuentas de forma automática junto con su primer pago de pensión."
      }
    ],
    commonErrors: [
      "Intentar realizar el trámite de devolución antes de cumplir estrictamente los 60 días de espera contados a partir del cese laboral oficial.",
      "Presentar la solicitud de cesantía teniendo deudas de aportes patronales rezagadas que impiden calificar la situación de desempleo formal del afiliado.",
      "Desconocer que el fondo de cesantía es retenido temporalmente si eres garante de un préstamo hipotecario o quirografario del BIESS en estado de mora."
    ],
    relatedPostsSlugs: ["jubilacion-por-vejez-requisitos-2026"]
  },
  {
    id: "jubilacion",
    title: "Jubilación",
    slug: "jubilacion",
    description: "Toda la información sobre jubilación por vejez, invalidez, discapacidad y pensión de montepío. Tablas de aportes y cálculo de pensión.",
    metaTitle: "Jubilación IESS Ecuador - Tipos, Requisitos y Tabla de Aportes 2026",
    metaDescription: "Guía completa de jubilación del IESS en Ecuador. Requisitos detallados de jubilación por vejez, pensiones por invalidez, discapacidad, cálculo de pensión y montepío.",
    pilarText: `## El Sistema de Pensiones del IESS en Ecuador

La **Jubilación** es el derecho supremo que otorga el sistema de seguridad social del Ecuador a los afiliados que, tras años de esfuerzo y aportaciones constantes, deciden retirarse de la vida productiva activa. El régimen del IESS garantiza la entrega de una pensión mensual vitalicia, la cual se reajusta anualmente para mantener su poder adquisitivo frente a la inflación económica nacional.

Existen distintas causales y modalidades de jubilación para brindar una cobertura integral a los asegurados según su edad, salud o condiciones de vida.

---

## Tipos de Jubilación en el Ecuador

### 1. Jubilación Ordinaria por Vejez
Es la modalidad más común. Para calificar, la ley exige una combinación de edad cronológica y aportaciones mensuales registradas (imposiciones):
* **Cualquier edad**: Acreditar un mínimo de **480 imposiciones** (40 años de aportes).
* **60 años de edad**: Acreditar un mínimo de **360 imposiciones** (30 años de aportes).
* **65 años de edad**: Acreditar un mínimo de **180 imposiciones** (15 años de aportes).
* **70 años de edad**: Acreditar un mínimo de **120 imposiciones** (10 años de aportes).

### 2. Jubilación por Invalidez
Aplica para afiliados activos o cesantes que presenten una incapacidad física o mental permanente diagnosticada formalmente por la **Comisión Médica del IESS (Comecap)**. Requiere un mínimo de 60 aportaciones mensuales acumuladas para invalidez parcial permanente.

### 3. Jubilación por Discapacidad
Para afiliados calificados oficialmente con una discapacidad de al menos el 30% por el Ministerio de Salud Pública. Exige un mínimo de **300 imposiciones** (25 años de aportes) sin límite de edad de jubilación.

### 4. Pensión de Montepío
Es una pensión mensual que se concede a las familias de los jubilados o afiliados fallecidos (cónyuges o convivientes, hijos menores de 18 años o hijos con discapacidad sin límite de edad) para evitar el desamparo familiar.`,
    subcategories: [
      {
        id: "jubilacion-vejez",
        title: "Jubilación por Vejez",
        slug: "vejez",
        description: "Requisitos de jubilación regular basada en la combinación de edad y años de aportaciones patronales."
      },
      {
        id: "jubilacion-invalidez-causa",
        title: "Jubilación por Invalidez",
        slug: "invalidez",
        description: "Pensión vitalicia para afiliados que sufren accidentes o enfermedades catastróficas validadas médicamente."
      },
      {
        id: "montepio-familiar",
        title: "Pensión de Montepío",
        slug: "montepio",
        description: "Pensión de orfandad y viudez destinada a los derechohabientes del afiliado o jubilado fallecido."
      }
    ],
    faqs: [
      {
        q: "¿Cómo se calcula la pensión de jubilación mensual en el IESS?",
        a: "La pensión mensual se calcula en función del promedio de las remuneraciones registradas en los cinco (5) años de mejor sueldo de aportaciones del afiliado. Ese promedio se multiplica por el porcentaje de la tabla de coeficientes según tus años de aporte acumulados (desde el 50% hasta alcanzar el 100% de tu sueldo promedio)."
      },
      {
        q: "¿Existe un límite máximo y mínimo para la pensión jubilar en Ecuador?",
        a: "Sí, el IESS fija topes mínimos y máximos basados en el Salario Básico Unificado vigente. El tope mínimo de pensión empieza en el 50% de un SBU ($230 para quienes tienen pocos aportes) y el tope máximo puede alcanzar el 550% de un SBU ($2,530) para quienes han aportado por más de 40 años."
      },
      {
        q: "¿El jubilado del IESS sigue teniendo derecho a la atención de salud gratuita?",
        a: "Sí, el jubilado conserva de forma vitalicia el derecho a la atención de salud gratuita en los hospitales del IESS sin necesidad de realizar aportaciones mensuales adicionales."
      }
    ],
    tools: [
      {
        title: "Oficio de Apelación por Cálculo Erróneo de Pensión",
        description: "Genera el reclamo formal si el IESS calculó tu jubilación mensual por debajo del valor que legalmente te correspondía.",
        type: "oficio",
        actionLabel: "Iniciar Reclamo de Cálculo",
        query: "Hola, deseo redactar un oficio para impugnar y reclamar el cálculo de mi pensión de jubilación que me parece bajo."
      },
      {
        title: "Simulador de Pensión Jubilar Mensual",
        description: "Calcula un estimado de tu futura pensión con base en tus mejores promedios mensuales.",
        type: "calculadora",
        actionLabel: "Estimar Pensión",
        query: "Hola, estimemos el valor de mi pensión si mis mejores 5 años de sueldos promedian 750 dólares mensuales y tengo 35 años de aportes."
      }
    ],
    news: [
      {
        title: "IESS pagó de forma exitosa los décimos complementarios a nivel nacional",
        date: "20 de Junio de 2026",
        summary: "Más de 600,000 jubilados del Ecuador recibieron la acreditación puntual de su decimotercera pensión anual según cronograma institucional."
      }
    ],
    commonErrors: [
      "Presentar la solicitud de jubilación virtual teniendo préstamos quirografarios en mora con el BIESS, lo que causa la anulación instantánea de la solicitud.",
      "No verificar que la empresa haya ingresado formalmente el Aviso de Salida al sistema del IESS, dejando al solicitante como un empleado activo ante el sistema.",
      "Creer que los aportes del seguro privado o de otros regímenes extranjeros se homologan automáticamente sin haber completado un convenio de portabilidad formal previa."
    ],
    relatedPostsSlugs: [
      "jubilacion-por-vejez-requisitos-2026",
      "pension-montepio-iess-requisitos-sobrevivientes-2026"
    ]
  },
  {
    id: "salud",
    title: "Salud IESS",
    slug: "salud",
    description: "Información sobre agendamiento de citas médicas, emergencias y coberturas de salud en la red del seguro social ecuatoriano.",
    metaTitle: "Citas Médicas IESS - Agendamiento, Emergencias y Cobertura de Salud",
    metaDescription: "Todo sobre el seguro de salud del IESS en Ecuador. Agendamiento de citas médicas por internet (Call Center 140), atención de urgencias y prestadores externos.",
    pilarText: `## El Seguro de Salud Individual y Familiar del IESS

El **Seguro de Salud del IESS** es uno de los servicios más utilizados de la institución. Cuenta con una amplia red nacional de hospitales de primer, segundo y tercer nivel, además de convenios estratégicos con clínicas privadas acreditadas para brindar una cobertura de salud integral.

El acceso al servicio de salud está garantizado para el afiliado titular, jubilados y los beneficiarios con extensiones de salud correspondientes.

---

## Cómo Agendar Citas Médicas en el IESS

El agendamiento de citas de consulta externa se realiza a través de canales digitales e informáticos autorizados por la institución, eliminando las largas filas presenciales de antes.

### Canales Oficiales de Agendamiento:
1. **Llamada Telefónica (Call Center)**: Marcar de forma gratuita al número **140** desde cualquier teléfono fijo o celular en el Ecuador de lunes a viernes.
2. **Plataforma Web en Línea**:
   * Ingresa a [iess.gob.ec](https://www.iess.gob.ec).
   * Busca la sección de **Citas Médicas en Línea**.
   * Identifícate con tu número de cédula y clave del IESS.
   * Selecciona tu especialidad básica requerida (Medicina General, Ginecología, Pediatría u Odontología) y la clínica u hospital más cercano a tu domicilio.

### Derivación a Prestadores Externos (Clínicas Privadas)
Cuando la red de hospitales propios del IESS no posee turnos disponibles para especialidades complejas o cirugías en un periodo prudencial, el sistema deriva automáticamente al paciente a una clínica privada en convenio (como Solca, clínicas cardiológicas u hospitales docentes), cubriendo el IESS el 100% de los costos médicos.`,
    subcategories: [
      {
        id: "agendamiento-citas",
        title: "Agendamiento de Citas",
        slug: "citas-medicas",
        description: "Pasos y números de teléfono oficiales para separar turnos de medicina general y especialidades médicas."
      },
      {
        id: "maternidad-subsidios",
        title: "Subsidios de Salud y Maternidad",
        slug: "subsidios-maternidad",
        description: "Validación de descansos médicos de clínicas privadas y cobro de subsidios monetarios por enfermedad."
      }
    ],
    faqs: [
      {
        q: "¿Cómo puedo afiliar a mi cónyuge o conviviente de hecho para que reciba salud?",
        a: "Puedes afiliar a tu cónyuge o conviviente mediante el pago de una prima adicional del 3.41% de tu sueldo imponible. El trámite se completa ingresando a la sección 'Extensión de Cobertura de Salud para Cónyuge' en el portal de afiliados."
      },
      {
        q: "¿Los hijos del afiliado tienen cobertura de salud gratuita?",
        a: "Sí, todos los hijos de afiliados activos tienen cobertura de salud integral gratuita en el IESS desde su nacimiento hasta el día en que cumplan los 18 años de edad, sin costo de aportación adicional."
      }
    ],
    tools: [
      {
        title: "Oficio de Queja por Falta de Medicinas o Retraso en Cita",
        description: "Genera un reclamo formal dirigido al Defensor del Paciente del Hospital del IESS por negligencia en el abastecimiento o turnos.",
        type: "oficio",
        actionLabel: "Redactar Queja de Salud",
        query: "Hola, ayúdame a redactar una queja formal dirigida al director del Hospital del IESS por falta de medicamentos para una enfermedad."
      }
    ],
    news: [
      {
        title: "IESS amplía abastecimiento de fármacos de alta complejidad en hospitales provinciales",
        date: "10 de Abril de 2026",
        summary: "Se destinó un presupuesto especial de 45 millones para reabastecer las farmacias de oncología, cardiología y endocrinología a nivel nacional."
      }
    ],
    commonErrors: [
      "Perder la cita agendada por el Call Center 140 sin cancelarla con 24 horas de anticipación. Acumular 3 faltas consecutivas provoca la suspensión del sistema de agendamiento por 6 meses.",
      "Acudir directamente a emergencias por dolencias de consulta general. Las urgencias se reservan exclusivamente para casos que pongan en riesgo la vida del paciente.",
      "No validar los descansos médicos de clínicas particulares en las ventanillas de salud del IESS dentro del plazo de 8 días hábiles posteriores a su emisión."
    ],
    relatedPostsSlugs: ["subsidio-maternidad-iess-requisitos-calculo-2026"]
  },
  {
    id: "certificados",
    title: "Certificados IESS",
    slug: "certificados",
    description: "Descarga certificados oficiales del IESS: certificado de afiliación, certificado de no adeudar y de derecho a prestaciones médicas.",
    metaTitle: "Certificado de Afiliación e Inexistencia de Obligaciones del IESS",
    metaDescription: "Pasos para descargar el certificado de afiliación al IESS, certificado de no adeudar al seguro social de forma gratuita y con validez jurídica.",
    pilarText: `## Certificados Electrónicos Oficiales del IESS

La digitalización total de los procesos de seguridad social en el Ecuador permite a los ciudadanos acceder de forma instantánea a **Certificados Electrónicos** oficiales con plena validez legal. Estos documentos cuentan con un sello digital criptográfico de seguridad y un código de verificación que puede ser consultado en línea por cualquier institución pública o privada.

Ya sea para postular a un puesto de trabajo, tramitar un crédito bancario, solicitar visas de viaje o acreditar el cumplimiento de obligaciones fiscales, los certificados del IESS son emitidos de manera totalmente gratuita.

---

## Certificados Principales Disponibles para Descarga

### 1. Certificado de Afiliación (Certificado de Asegurado)
Este documento certifica si una persona se encuentra afiliada activamente al seguro social ecuatoriano, detallando los periodos de aportación o, en su defecto, haciendo constar que el solicitante no es afiliado (útil para solicitar bonos gubernamentales o exoneraciones estudiantiles).

### 2. Certificado de Cumplimiento de Obligaciones (Inexistencia de Deuda Patronal)
Conocido como **"Certificado de no adeudar al IESS"**. Es requerido obligatoriamente para contratos con el sector público, trámites notariales, compras de bienes inmuebles o trámites societarios por parte de personas naturales con personal a cargo o empleadores.

### 3. Certificado de Derecho a Salud
Este certificado verifica si el afiliado o sus dependientes directos han acumulado las aportaciones reglamentarias necesarias y poseen el derecho activo a recibir atención médica y cirugías inmediatas en el IESS.`,
    subcategories: [
      {
        id: "certificado-afiliacion",
        title: "Certificado de Afiliación",
        slug: "afiliacion",
        description: "Documento oficial gratuito que demuestra si eres o no afiliado activo al IESS."
      },
      {
        id: "certificado-no-adeudar",
        title: "Certificado de No Adeudar",
        slug: "no-adeudar",
        description: "Certificado patronal que hace constar que no posees obligaciones económicas pendientes con el IESS."
      }
    ],
    faqs: [
      {
        q: "¿Cómo descargar el certificado de afiliación al IESS paso a paso?",
        a: "Ingresa a iess.gob.ec -> menú 'Trámites Virtuales' -> 'Asegurados' -> 'Afiliados' -> 'Certificado de Afiliación'. Digita tu número de cédula y fecha de nacimiento. El sistema generará el archivo PDF imprimible de inmediato."
      },
      {
        q: "¿Los certificados del IESS tienen algún costo monetario?",
        a: "No, la emisión de todos los certificados electrónicos e impresos que proporciona el IESS es 100% gratuita y puede realizarse en línea las 24 horas del día."
      }
    ],
    tools: [
      {
        title: "Oficio de Reclamo por Bloqueo de Certificado Patronal",
        description: "Genera el reclamo formal si el sistema te impide descargar tu certificado patronal de no adeudar pese a estar al día.",
        type: "oficio",
        actionLabel: "Generar Carta de Reclamo",
        query: "Hola, ayúdame a generar un oficio formal de reclamo para solicitar el desbloqueo de mi certificado patronal del IESS."
      }
    ],
    news: [
      {
        title: "IESS moderniza su pasarela de validación QR para certificados en 2026",
        date: "08 de Junio de 2026",
        summary: "El nuevo motor QR elimina tiempos de espera, permitiendo a notarías y bancos validar de manera segura la autenticidad de los certificados del IESS en segundos."
      }
    ],
    commonErrors: [
      "Digitar de forma incorrecta la fecha de nacimiento en el portal público de generación rápida, lo que bloquea temporalmente el sistema por seguridad.",
      "Intentar descargar el certificado de no adeudar teniendo multas de tránsito con la ANT o glosas patronales que aún no se reflejan en tu portal web pero sí en la base de datos fiscal.",
      "No percatarse de la fecha de caducidad de los certificados; por seguridad, la mayoría de estos certificados de afiliación o deudas tienen una vigencia limitada de 30 días."
    ],
    relatedPostsSlugs: ["afiliacion-voluntaria-iess-requisitos-beneficios-2026"]
  },
  {
    id: "empleadores",
    title: "Empleadores",
    slug: "empleadores",
    description: "Guía patronal para el registro de empresas, avisos de entrada y salida, pagos de planillas e impugnación de glosas del IESS.",
    metaTitle: "Portal de Empleadores IESS - Registro Patronal y Control de Glosas",
    metaDescription: "Todo para empleadores del IESS en Ecuador. Requisitos para el Registro Patronal, avisos de entrada y salida, planillas de aportes e impugnación de glosas.",
    pilarText: `## Responsabilidad Patronal y el Seguro Social en Ecuador

En la República del Ecuador, todo empleador tiene la obligación legal irrenunciable de registrar e inscribir a sus trabajadores bajo relación de dependencia en el **Instituto Ecuatoriano de Seguridad Social (IESS)** desde el primer día de inicio de labores en la empresa o institución.

El incumplimiento de estas obligaciones patronales, el retraso en el pago de planillas mensuales o la subdeclaración de sueldos (evasión) es castigada con severas multas, intereses del mercado y la imposición de **Glosas del IESS**, las cuales representan cobros coactivos inmediatos.

---

## Obligaciones Clave del Empleador ante el IESS

1. **Inscripción de Trabajadores (Aviso de Entrada)**: Debe realizarse dentro de los primeros **quince (15) días hábiles** de iniciada la relación laboral a través del portal de empleadores.
2. **Registro de Cese Laboral (Aviso de Salida)**: Debe reportarse en el sistema dentro del término de **tres (3) días hábiles** posteriores a la fecha de finalización del contrato laboral.
3. **Pago Oportuno de Planillas**: Las planillas mensuales de aportes del seguro social deben cancelarse hasta el **día quince (15) de cada mes vencido**. El impago el día 16 genera mora patronal automática e intereses de mora compuestos.
4. **Declaración del Salario Real**: Las aportaciones deben calcularse sobre la totalidad de la materia gravable (sueldo ordinario, comisiones, horas extras). El no hacerlo constituye delito de retención ilegal de aportaciones.`,
    subcategories: [
      {
        id: "registro-patronal",
        title: "Registro Patronal RUC",
        slug: "registro-patronal",
        description: "Pasos para registrar tu empresa por primera vez ante el IESS y recibir tu clave patronal de operaciones."
      },
      {
        id: "impugnacion-glosas",
        title: "Impugnación de Glosas",
        slug: "glosas",
        description: "Procedimiento formal para apelar y justificar multas o glosas emitidas erróneamente por inspectores."
      }
    ],
    faqs: [
      {
        q: "¿De cuánto es la tasa de interés por mora patronal en el IESS?",
        a: "La tasa de interés por mora patronal es fijada mensualmente por el Banco Central del Ecuador y se capitaliza mensualmente, siendo históricamente de las tasas punitivas más altas para desincentivar el impago al seguro social."
      },
      {
        q: "¿Qué sucede si mi trabajador sufre un accidente laboral y estoy en mora patronal?",
        a: "Se configura una Responsabilidad Patronal de extrema gravedad. El IESS brindará la atención de salud completa e inmediata al trabajador lesionado, pero cobrará al empleador en mora el 100% de todos los costos médicos generados, cirugías, tratamientos y el valor capitalizado de su pensión de invalidez si quedase incapacitado."
      }
    ],
    tools: [
      {
        title: "Oficio para Impugnación de Glosa del IESS",
        description: "Genera el escrito de apelación y descargo patronal ante la Subdirección Provincial de Cartera y Coactivas.",
        type: "oficio",
        actionLabel: "Generar Impugnación de Glosa",
        query: "Hola, necesito un formato de oficio de impugnación de glosa patronal por un error en el aviso de salida de un empleado."
      }
    ],
    news: [
      {
        title: "IESS aprueba amnistía temporal de recargos para incentivar el cumplimiento de PYMEs",
        date: "11 de Abril de 2026",
        summary: "Los empleadores que se acojan a convenios de pago a plazos podrán beneficiarse de una reducción del 80% en los intereses y multas acumuladas."
      }
    ],
    commonErrors: [
      "No ingresar el Aviso de Salida de los ex empleados a tiempo, provocando que el sistema continúe facturando planillas mensuales de aportación de forma indefinida.",
      "Pagar el aporte correspondiente únicamente sobre el sueldo básico, omitiendo registrar comisiones o comisiones de ventas que forman parte legal de la materia gravable.",
      "Desconocer que el Representante Legal de la empresa asume la responsabilidad civil y penal personal por las deudas patronales vigentes del negocio."
    ],
    relatedPostsSlugs: ["subsidio-maternidad-iess-requisitos-calculo-2026"]
  },
  {
    id: "herramientas",
    title: "Herramientas Digitales",
    slug: "herramientas",
    description: "Generador de oficios formales de ley y simuladores interactivos de pensiones e interés patronal del IESS.",
    metaTitle: "Herramientas del IESS - Generador de Oficios y Simuladores 2026",
    metaDescription: "Accede a herramientas interactivas para trámites del IESS. Generador automático de 17 oficios legales, solicitudes y simuladores de pensión e ingresos.",
    pilarText: `## Facilitando tus Trámites ante el Seguro Social

Para agilizar y democratizar el acceso a la defensa de los derechos de los asegurados en el Ecuador, hemos diseñado esta suite de **Herramientas Digitales y Asistencia Legal Automatizada**. 

Estas utilidades te permiten prescindir de tramitadores y redactores externos, permitiéndote elaborar escritos formales de descargo, simular obligaciones patronales e inclusive proyectar el monto aproximado de tu jubilación vitalicia con total precisión jurídica.

---

## Oficios de Ley y Simuladores Disponibles

Nuestra plataforma integra un **Generador Inteligente de Oficios de Ley** que cuenta con formatos normalizados listos para su firma y presentación formal ante las diferentes ventanillas de recaudación, coactivas o comisiones médicas del IESS.

### Principales Soluciones Integradas:
* **Impugnación de Glosas Patronales**: Escritos formales con argumentos de ley para que el empleador apele multas indebidas.
* **Apelaciones de Pensiones y Cálculo**: Solicitudes dirigidas a la Comisión Nacional de Apelaciones por irregularidades en la liquidación de jubilaciones.
* **Simuladores de Prestaciones**: Estimaciones basadas en las normativas del Banco del IESS (BIESS) y tablas de amortización.`,
    subcategories: [
      {
        id: "oficios-ley",
        title: "Generador de Oficios",
        slug: "oficios",
        description: "Formatos preestablecidos y autocompletados para desbloqueo de claves, quejas de salud, apelaciones de jubilación."
      },
      {
        id: "simuladores-biess",
        title: "Calculadoras y Simuladores",
        slug: "simuladores",
        description: "Proyecta los montos mínimos de tus préstamos quirografarios y jubilación ordinaria."
      }
    ],
    faqs: [
      {
        q: "¿Los oficios generados en esta web tienen costo legal?",
        a: "No, el generador de formatos de oficios de ley es totalmente gratuito. Su fin es social y busca dar las herramientas necesarias para la defensa de los derechos del afiliado."
      },
      {
        q: "¿Qué validez tienen estos escritos ante el IESS?",
        a: "Los oficios siguen la estructura legal y formal exigida por el Código Orgánico Administrativo (COA) y la Ley de Seguridad Social, sirviendo perfectamente como documentos formales de inicio de reclamo administrativo."
      }
    ],
    tools: [
      {
        title: "Formatos de Oficios y Descargos de Ley",
        description: "Accede a la pestaña superior 'Formatos y Oficios' para utilizar de inmediato nuestro asistente de redacción inteligente.",
        type: "oficio",
        actionLabel: "Ir al Generador",
        query: "Hola, por favor muéstrame todos los formatos de oficios disponibles para generar de inmediato."
      }
    ],
    news: [
      {
        title: "Nueva inteligencia artificial incorporada a la generación de reclamos del IESS",
        date: "14 de Febrero de 2026",
        summary: "Optimizamos el motor de asistencia jurídica con la normativa laboral más reciente para redactar descargos de mayor contundencia legal."
      }
    ],
    commonErrors: [
      "Ingresar datos incorrectos o falsos en los campos del oficio (como número de cédula o dirección), anulando la validez del escrito ante el registrador.",
      "Omitir adjuntar los justificativos físicos o copias digitales complementarias detalladas al momento de presentar la carta formal en ventanilla.",
      "Presentar impugnaciones fuera de los plazos legales previstos por la ley de seguridad social ecuatoriana."
    ],
    relatedPostsSlugs: ["prestamo-quirografario-biess-requisitos-montos-2026"]
  },
  {
    id: "faq",
    title: "Preguntas Frecuentes",
    slug: "faq",
    description: "Resolución de dudas comunes sobre aportes, retiros, montepío, jubilaciones y préstamos BIESS.",
    metaTitle: "Preguntas Frecuentes del IESS - Respuestas de Seguridad Social 2026",
    metaDescription: "Encuentra respuestas rápidas y certeras a tus dudas sobre deudas, aportaciones voluntarias, desbloqueo de claves y retiros de cesantía en el IESS.",
    pilarText: `## Banco de Conocimiento y Preguntas Frecuentes del IESS

Este portal centraliza las **Preguntas Frecuentes (FAQs)** más habituales que realizan los afiliados activos, voluntarios, cesantes, pensionistas y empleadores del IESS en el Ecuador. 

Buscamos simplificar el complejo lenguaje de las resoluciones del consejo directivo, decretos ejecutivos y leyes de seguridad social, ofreciendo respuestas claras, directas y con base legal actualizada al año 2026.

---

## Resuelve Tus Dudas de Forma Inmediata

Explora nuestras secciones divididas por categorías temáticas para obtener orientación inmediata, o bien utiliza la asistencia de nuestro chatbot interactivo entrenado especialmente para guiarte en el marco legal ecuatoriano.`,
    subcategories: [
      {
        id: "faq-afiliacion",
        title: "FAQs sobre Afiliación",
        slug: "afiliacion",
        description: "Preguntas sobre costos, aportaciones voluntarias e ingresos mínimos declarables."
      },
      {
        id: "faq-prestamos",
        title: "FAQs sobre Créditos",
        slug: "prestamos",
        description: "Interrogantes comunes de préstamos quirografarios, plazos, garantías y tasas de interés."
      }
    ],
    faqs: [
      {
        q: "¿Cómo sé si estoy al día en mis obligaciones con el IESS?",
        a: "Debes ingresar con tu cédula y clave al portal web de afiliados y verificar si posees alguna planilla generada en mora en la pestaña de 'Aportes'. También puedes descargar el certificado de no adeudar para comprobar tu estado patronal."
      },
      {
        q: "¿Se pueden perder mis aportaciones si dejo de pagar un tiempo?",
        a: "No, las aportaciones acumuladas a lo largo de tu vida laboral nunca caducan ni se pierden, permanecen vigentes y se sumarán de forma acumulativa cuando retomes la actividad laboral activa."
      }
    ],
    tools: [
      {
        title: "Consulta Interactiva con Asistente de IA",
        description: "Haz clic en el globo flotante azul de chat abajo a la derecha para consultar cualquier duda específica y recibir soporte legal inmediato.",
        type: "oficio",
        actionLabel: "Iniciar Consulta",
        query: "Hola, soy afiliado y deseo resolver mis dudas sobre el IESS."
      }
    ],
    news: [
      {
        title: "IESS actualiza su catálogo de resolución de quejas para usuarios",
        date: "11 de Marzo de 2026",
        summary: "La institución consolida un compendio de preguntas frecuentes dinámicas con resoluciones simplificadas aplicables para ventanilla única."
      }
    ],
    commonErrors: [
      "Guiarse por rumores o páginas web desactualizadas que manejan salarios básicos de años anteriores para calcular los montos mínimos de aportes.",
      "Acudir presencialmente a consultar dudas básicas que se resuelven en 10 segundos en el portal en línea de manera gratuita.",
      "Ignorar las notificaciones virtuales que envía el IESS a tu buzón oficial de afiliado, donde suelen alertar sobre deudas."
    ],
    relatedPostsSlugs: ["afiliacion-voluntaria-iess-requisitos-beneficios-2026"]
  },
  {
    id: "noticias",
    title: "Noticias y Novedades",
    slug: "noticias",
    description: "Actualidad sobre reformas legales, resoluciones del consejo directivo y horarios de atención del IESS.",
    metaTitle: "Noticias del IESS - Actualizaciones y Reformas a la Seguridad Social 2026",
    metaDescription: "Mantente informado sobre los cambios legislativos del IESS, resoluciones del Consejo Directivo, comunicados de prensa de contingencia y horarios en Ecuador.",
    pilarText: `## Canal de Noticias y Comunicados Oficiales del IESS

Bienvenidos a nuestro portal de **Noticias y Novedades** del sistema de seguridad social. En esta sección nos encargamos de dar cobertura de prensa a las decisiones operativas, reformas y decretos que inciden de forma directa en el bolsillo y la salud de los ecuatorianos.

El Consejo Directivo del IESS y el Directorio del BIESS emiten resoluciones dinámicas para actualizar coeficientes de aportaciones, plazos de refinanciamiento, amnistías y ampliación de servicios de salud.

---

## Información de Actualidad al Instante

Nuestra redacción monitorea permanentemente el Registro Oficial del Ecuador y las ruedas de prensa ministeriales para sintetizar la información de manera sencilla y clara, permitiendo a los afiliados tomar decisiones financieras inteligentes y a tiempo.`,
    subcategories: [
      {
        id: "noticias-reformas",
        title: "Reformas Legales",
        slug: "reformas-legales",
        description: "Cobertura de decretos legislativos y cambios a la Ley de Seguridad Social y Jubilaciones."
      },
      {
        id: "comunicados-atencion",
        title: "Horarios y Emergencias",
        slug: "canales-atencion",
        description: "Alertas de mantenimiento de sistemas web, cierres de oficinas por feriados nacionales y contingencias de salud."
      }
    ],
    faqs: [
      {
        q: "¿Dónde se publican los comunicados de prensa oficiales urgentes del IESS?",
        a: "Los canales oficiales de difusión de comunicados de prensa urgentes y de contingencia del IESS son su sitio web institucional (iess.gob.ec) y sus cuentas verificadas de redes sociales (@IESSec en X y Facebook)."
      }
    ],
    tools: [
      {
        title: "Buscador de Comunicados y Resoluciones",
        description: "Escribe tu inquietud de actualidad en nuestro chatbot de asistencia para comprobar si existe alguna resolución reciente sobre tu tema.",
        type: "oficio",
        actionLabel: "Consultar Cambios de Ley",
        query: "Hola, ¿cuáles son las últimas novedades de ley o reformas aprobadas este mes para el IESS?"
      }
    ],
    news: [
      {
        title: "IESS amplía la cobertura de derivaciones médicas por alta demanda",
        date: "04 de Julio de 2026",
        summary: "Se formalizó un convenio de derivación directa de emergencia con 12 clínicas en Quito y Guayaquil para acortar tiempos de espera quirúrgica."
      },
      {
        title: "Mantenimiento programado de la plataforma del BIESS este fin de semana",
        date: "02 de Julio de 2026",
        summary: "El sistema de quirografarios e hipotecarios se suspenderá temporalmente desde el sábado a las 22:00 hasta el domingo a las 06:00 por actualización de bases de datos."
      }
    ],
    commonErrors: [
      "Guiarse por noticias falsas o compartidas en grupos de mensajería informal (WhatsApp o Telegram) sin confirmar con las fuentes oficiales verificadas del IESS.",
      "Asumir que los cambios legislativos de jubilación son retroactivos; la ley protege el derecho adquirido de los actuales jubilados activos.",
      "No consultar periódicamente las alertas de mantenimiento del sistema web antes de programar trámites importantes de última hora."
    ],
    relatedPostsSlugs: ["jubilacion-por-vejez-requisitos-2026"]
  },
  {
    id: "blog",
    title: "Blog Informativo",
    slug: "blog",
    description: "Artículos educativos detallados y guías paso a paso sobre el funcionamiento de las jubilaciones, préstamos y aportes en Ecuador.",
    metaTitle: "Blog Oficial de Guías del IESS - Trámites de Seguridad Social Explicados",
    metaDescription: "Encuentra tutoriales de alta calidad, desgloses legislativos y guías paso a paso para afiliados, jubilados y ecuatorianos en el extranjero.",
    pilarText: `## Espacio de Formación y Educación Financiera IESS

El **Blog Informativo de Seguridad Social** es una iniciativa de divulgación ciudadana que busca explicar de manera amigable, mediante guías ilustradas de alto impacto, el complejo ecosistema de trámites del IESS y del BIESS.

Creemos que un ciudadano bien informado tiene las herramientas suficientes para proteger su bienestar, fiscalizar sus semanas de cotización laboral y maximizar los beneficios de su jubilación o préstamos.

---

## Guías Educativas Destacadas

Nuestros redactores preparan artículos minuciosos con base en la normativa legal del Ecuador, incorporando consejos prácticos y respuestas detalladas a los vacíos informativos más habituales de la población.`,
    subcategories: [
      {
        id: "blog-jubilados",
        title: "Guías para Jubilados",
        slug: "jubilados",
        description: "Todo sobre el cálculo de pensiones, décimos de ley, montepío e inclusión digital."
      },
      {
        id: "blog-afiliados",
        title: "Guías para Afiliados",
        slug: "afiliados",
        description: "Pasos detallados para solicitudes de fondos, cesantías, afiliación voluntaria y créditos de consumo."
      }
    ],
    faqs: [
      {
        q: "¿Con qué frecuencia se publican nuevas guías en el blog?",
        a: "Publicamos guías actualizadas todas las semanas, incorporando las últimas circulares de recaudación patronal y los temas que más nos consultan a través de nuestro chatbot automatizado."
      }
    ],
    tools: [
      {
        title: "Explorar Todo el Catálogo de Guías",
        description: "Utiliza el menú de pestañas superiores para ingresar de inmediato al Blog Oficial de Guías e inspeccionar los artículos completos.",
        type: "oficio",
        actionLabel: "Ir al Catálogo",
        query: "Hola, deseo ver los últimos artículos e investigaciones de seguridad social que hay en el blog."
      }
    ],
    news: [
      {
        title: "Inauguramos la sección de videoguías cortas para trámites patronales",
        date: "01 de Julio de 2026",
        summary: "Ampliamos nuestra oferta educativa con tutoriales interactivos paso a paso para simplificar los trámites de planillas a pequeños emprendedores."
      }
    ],
    commonErrors: [
      "Ignorar las guías educativas de auto-trámite y optar por pagar comisiones de hasta $50 a tramitadores informales de cyber cafés por procesos que son 100% gratuitos y digitales.",
      "No validar la fecha de redacción de los artículos del blog; asegúrate de consultar guías correspondientes al marco legal y salario básico vigente del año en curso.",
      "Omitir la lectura de las secciones de Errores Frecuentes, donde suele indicarse detalladamente por qué suelen bloquearse las solicitudes en línea."
    ],
    relatedPostsSlugs: ["jubilacion-por-vejez-requisitos-2026", "prestamo-quirografario-biess-requisitos-montos-2026", "afiliacion-voluntaria-iess-requisitos-beneficios-2026", "subsidio-maternidad-iess-requisitos-calculo-2026"]
  },
  {
    id: "tramites",
    title: "Directorio de Trámites",
    slug: "tramites",
    description: "Directorio completo de trámites del IESS y BIESS. Encuentra requisitos mínimos, guías paso a paso e inicio rápido de trámites virtuales.",
    metaTitle: "Trámites IESS - Directorio Completo de Requisitos y Guías Virtuales",
    metaDescription: "Consulta de trámites oficiales del IESS y BIESS en Ecuador. Directorio clasificado de requisitos mínimos, paso a paso y asistencia legal automatizada.",
    pilarText: `## Directorio Central de Trámites del Seguro Social

El **Directorio de Trámites del IESS y BIESS** ha sido estructurado con un enfoque intuitivo para que el usuario localice en menos de tres clics los requisitos exigidos por el marco normativo ecuatoriano.

A través de esta sección consolidamos las diferentes guías interactivas, los formatos de oficios de descargo y las respuestas directas de nuestro chatbot para simplificar las diligencias patronales y personales.

---

## Encuentra tu Trámite por Categoría

Aportes patronales, créditos inmediatos, jubilaciones vitalicias o solicitudes de reembolso de cesantía. Navega a través de nuestras categorías de enlazado interno para capacitarte antes de presentar tu solicitud oficial en el portal de iess.gob.ec.`,
    subcategories: [
      {
        id: "directorio-digital",
        title: "Trámites Virtuales en Línea",
        slug: "virtuales",
        description: "Diligencias que pueden realizarse en línea con firma electrónica o clave de afiliado sin acudir a ventanillas."
      },
      {
        id: "directorio-presencial",
        title: "Trámites Presenciales",
        slug: "presenciales",
        description: "Diligencias de alta complejidad que exigen agendamiento de turnos previos para entrega física de carpetas y cédula."
      }
    ],
    faqs: [
      {
        q: "¿Cuáles son los trámites más solicitados en línea por los ecuatorianos?",
        a: "Los trámites digitales de mayor volumen son la descarga del mecanizado de aportes (Historia Laboral), la solicitud de préstamos quirografarios del BIESS y la generación de planillas de afiliación voluntaria."
      }
    ],
    tools: [
      {
        title: "Consultar Directorio de Oficios",
        description: "Para descargar oficios listos para entregar, dirígete a la pestaña superior 'Formatos y Oficios' o pídelos directamente en el chat.",
        type: "oficio",
        actionLabel: "Ver Todos los Oficios",
        query: "Hola, muéstrame los oficios y solicitudes más populares que puedo generar de forma automatizada para mis trámites."
      }
    ],
    news: [
      {
        title: "IESS amplía a 28 las opciones de trámites totalmente en línea con firma electrónica",
        date: "22 de Junio de 2026",
        summary: "El Consejo Directivo aprobó la simplificación administrativa eliminando la necesidad de validar de forma física la cuenta bancaria para préstamos rápidos."
      }
    ],
    commonErrors: [
      "Suponer que todos los trámites se realizan en línea de forma total; algunos como la Cesantía por Mortuoria o la Jubilación por Invalidez exigen exámenes presenciales.",
      "Iniciar trámites virtuales teniendo deudas de aportaciones activas, lo que provoca el bloqueo instantáneo del flujo informático en el sistema.",
      "Utilizar navegadores desactualizados o sin permisos de popups activados, lo que impide descargar los PDFs resultantes al finalizar el trámite."
    ],
    relatedPostsSlugs: ["jubilacion-por-vejez-requisitos-2026", "prestamo-quirografario-biess-requisitos-montos-2026"]
  }
];
