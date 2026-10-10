export interface BlogPostSource {
  label: string;
  url: string;
  accessedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  author: string; // references key in AUTHORS
  publishDate: string;
  readTime: number;
  image: string;
  category: string;
  dateModified: string;
  sources: BlogPostSource[];
  faqs?: { q: string; a: string }[];
  readingTime?: number;
  reviewer?: string;
  relatedSlugs?: string[];
  imageAlt?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'jubilacion-2026',
    slug: 'jubilacion-por-vejez-requisitos-2026',
    title: 'Jubilación por Vejez IESS 2026: Guía de Requisitos y Pasos',
    metaDescription: 'Todo lo que necesitas saber sobre jubilación por vejez en IESS Ecuador 2026. Requisitos actualizados, pasos, montos y combinaciones de edad y aportes.',
    keywords: ['jubilación IESS', 'jubilación por vejez Ecuador', 'requisitos jubilación IESS', 'cómo jubilarme IESS'],
    content: `
# Jubilación por Vejez IESS 2026: Guía Completa y Actualizada

¿Estás planificando tu retiro en el Ecuador? La **[Jubilación por Vejez del IESS](/procedimiento/jubilacion-vejez)** es uno de los derechos más importantes para los trabajadores ecuatorianos y extranjeros residentes en el país. En esta guía completa, te explicamos al detalle los requisitos oficiales, las tablas de aportes vigentes y cómo realizar tu solicitud 100% en línea de manera rápida.

---

## ¿Cuáles son los requisitos de Edad y Aportes en 2026?

Para calificar a la jubilación ordinaria por vejez, el Instituto Ecuatoriano de Seguridad Social (IESS) exige una relación proporcional entre tu edad cronológica y el número de aportes (llamadas "imposiciones"). 

La tabla oficial vigente es la siguiente:

| Edad Requerida | Imposiciones Mínimas | Años de Aportación Equivalentes |
| :--- | :--- | :--- |
| **Cualquier edad** | 480 imposiciones o más | 40 años de aportes |
| **60 años de edad** | 360 imposiciones o más | 30 años de aportes |
| **65 años de edad** | 180 imposiciones o más | 15 años de aportes |
| **70 años de edad** o más | 120 imposiciones o más | 10 años de aportes |

> ⚠️ **Importante**: Las imposiciones no se pierden aunque hayas dejado de aportar temporalmente. Se acumulan a lo largo de tu vida laboral.

---

## Requisitos Generales Adicionales

Además de cumplir con la tabla de edad y aportes, el solicitante debe:

1. **Estar cesante**: Debes haber finalizado tu relación de dependencia laboral. Tu empleador debe haber subido el **Aviso de Salida** al sistema.
2. **No tener deudas en mora**: No puedes tener obligaciones patronales ni [préstamos quirografarios](/procedimiento/prestamo-quirografario) o [hipotecarios](/procedimiento/prestamo-hipotecario) vencidos en el BIESS o en el IESS.
3. **Cuenta Bancaria autorizada**: Tu cuenta bancaria personal debe estar previamente validada y registrada en el sistema de la institución.
4. **Clave de Afiliado activa**: Necesitarás tu credencial virtual para ingresar al portal web.

---

## Paso a Paso para Solicitar la Jubilación en Línea

El trámite es completamente gratuito y no requiere de tramitadores intermediarios. Sigue estos pasos para realizarlo tú mismo:

### Paso 1: Registro del Cese Laboral
Tu empleador tiene hasta 15 días posteriores a tu salida de la empresa para registrar el Aviso de Salida en el sistema de empleadores. Verifica que este paso esté completado antes de iniciar tu solicitud.

### Paso 2: Validación de Cuenta Bancaria
Si nunca has cobrado fondos de reserva o cesantía, asegúrate de validar tu cuenta en el IESS. Puedes hacerlo a través de la web o entregando el certificado de cuenta en los Centros de Atención Universal.

### Paso 3: Ingreso al Sistema de Jubilación
1. Ingresa a la web oficial [iess.gob.ec](https://www.iess.gob.ec).
2. Haz clic en **"Servicios en línea"** y luego en la opción **"Asegurados"** -> **"Pensionistas"** -> **"Jubilación"**.
3. Digita tu número de cédula y tu clave de seguridad.

### Paso 4: Envío de la Solicitud
1. El sistema calculará automáticamente tu historial y te mostrará un mensaje confirmando si cumples con las condiciones.
2. Verifica y acepta el desglose de aportaciones precalculado.
3. Selecciona tu cuenta bancaria registrada para el depósito de la pensión.
4. Confirma el envío. Tu aprobación tardará de 15 a 30 días calendario.

---

## ¿Cómo se calcula el monto de la pensión?

La pensión mensual de jubilación se calcula con base en el promedio de los **cinco (5) años de mejor sueldo** o remuneraciones sobre las cuales aportaste. Este valor promedio se multiplica por un coeficiente de liquidación fijado por la ley, el cual depende directamente de los años completos de aportación (mientras más años tengas aportados, mayor será el porcentaje de tu promedio que recibirás, empezando desde el 50% hasta alcanzar un tope del 100%).

Si quieres calcular de manera personalizada o necesitas ayuda redactando oficios de reclamo de aportes faltantes, utiliza nuestras [herramientas y formatos de oficios de ley](/oficios) del portal.

---

*Nota legal: Este artículo es una guía interpretativa simplificada independiente basada en la Ley de Seguridad Social de Ecuador y resoluciones vigentes del Consejo Directivo del IESS. Te sugerimos siempre validar tu estado de aportes de forma directa en el portal oficial.*
`,
    author: 'fernando-torres',
    publishDate: '2026-01-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    category: 'Jubilación',
    dateModified: '2026-10-01',
    sources: [
      { label: "Ley de Seguridad Social de Ecuador", url: "https://www.iess.gob.ec/documents/10162/13686/Ley_de_Seguridad_Social", accessedAt: "2026-10-01" },
      { label: "IESS - Portal Informativo de Jubilación", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'prestamo-biess-2026',
    slug: 'prestamo-quirografario-biess-requisitos-montos-2026',
    title: 'Préstamo Quirografario BIESS 2026: Requisitos y Cómo Solicitarlo',
    metaDescription: 'Guía actualizada 2026 sobre préstamo quirografario BIESS. Requisitos para afiliados activos y jubilados, montos máximos, pasos y plazos de desembolso.',
    keywords: ['préstamo BIESS', 'préstamo quirografario Ecuador', 'crédito BIESS', 'BIESS requisitos'],
    content: `
# Préstamo Quirografario BIESS 2026: Guía Completa de Solicitud

El **[Préstamo Quirografario](/procedimiento/prestamo-quirografario)** del Banco del Instituto de Seguridad Social (BIESS) es uno de los productos de financiamiento de consumo más demandados y con la tasa de interés más baja del mercado financiero ecuatoriano. 

Si necesitas liquidez inmediata para salud, educación, viajes o pago de deudas, en esta guía te contamos cómo calificar y recibir tu dinero en un plazo récord de **24 a 72 horas hábiles**.

---

## ¿Quiénes pueden solicitar un préstamo quirografario?

El BIESS otorga este crédito a tres grupos principales de asegurados:
* **Afiliados activos** bajo relación de dependencia.
* **[Afiliados voluntarios](/procedimiento/afiliacion-voluntaria)** que realicen aportaciones de forma independiente.
* **Jubilados** por vejez, [invalidez](/procedimiento/jubilacion-invalidez) o discapacidad, así como beneficiarios de pensión de [montepío](/procedimiento/montepio).

---

## Requisitos Oficiales para Afiliados Activos (Vigente 2026)

Para que el sistema apruebe tu solicitud de préstamo quirografario, debes cumplir con las siguientes condiciones mínimas:

1. **Aportaciones acumuladas**: Poseer un mínimo de **36 aportaciones mensuales** en total (pueden ser de distintos empleadores).
2. **Consecutividad**: Las últimas **12 aportaciones** deben ser consecutivas e inmediatamente anteriores a la fecha de la solicitud.
3. **Relación de dependencia**: Ser un afiliado activo y que tu empleador no se encuentre en mora patronal con el IESS.
4. **Garantía suficiente**: Contar con fondos suficientes acumulados en tus cuentas de **Fondos de Reserva** y/o **Cesantía**. El préstamo se concede hasta por el 95% del valor que tengas acumulado como garantía.
5. **Capacidad de endeudamiento**: La cuota mensual del préstamo no puede superar el 30% de tus ingresos promedio declarados en las aportaciones.
6. **No tener obligaciones vencidas**: No registrar deudas en mora con el IESS o el BIESS, ni ser garante de un préstamo en mora.
7. **Cédula de ciudadanía**: Documento vigente y no encontrarse en listas de control financiero.

---

## Paso a Paso para Realizar la Solicitud

El proceso es 100% virtual a través del portal transaccional del BIESS. Sigue estas indicaciones para evitar rechazos en el sistema:

### Paso 1: Acceso al Sistema del BIESS
1. Entra a [biess.fin.ec](https://www.biess.fin.ec).
2. Selecciona la opción **"Préstamos Quirografarios"** y haz clic en **"Solicitar Préstamo"**.
3. Inicia sesión con tu cédula y clave de afiliado del IESS (la misma que usas en el portal general del IESS).

### Paso 2: Rol del Asegurado
Selecciona tu perfil de acuerdo a tu estado actual: **Afiliado** o **Jubilado**. El sistema procesará un análisis instantáneo de tus requisitos.

### Paso 3: Simulación y Configuración del Crédito
Si calificas, la pantalla te mostrará el **monto máximo preaprobado** calculado según tus fondos de garantía.
1. Selecciona el **monto deseado** (puede ser menor al tope máximo).
2. Define el **plazo de pago** (hasta 48 meses en afiliados activos y hasta 60 meses en jubilados).
3. Selecciona la tabla de amortización que prefieras: **Cuotas Alemanas** (decrecientes) o **Cuotas Francesas** (fijas).

### Paso 4: Confirmación y Desembolso
1. Lee detenidamente el contrato de mutuo electrónico.
2. Logea e ingresa el código de seguridad que el BIESS te enviará por correo electrónico o SMS para firmar electrónicamente.
3. ¡Listo! El desembolso se realizará automáticamente a tu cuenta bancaria registrada en un lapso de **24 a 72 horas hábiles**.

---

## Tasa de Interés y Plazos
La tasa de interés para los préstamos quirografarios es variable y se reajusta trimestralmente. El rango general fluctúa entre el **11% y el 14% anual**, dependiendo del plazo seleccionado por el usuario. Cuanto menor sea el plazo que escojas, menor será la tasa de interés final aplicada a tu deuda.

Si tienes problemas con retenciones de tu sueldo o necesitas justificar un reclamo formal por un descuento indebido del BIESS, te recomendamos revisar nuestra sección de [formatos de oficios de ley](/oficios) donde podrás generar cartas de impugnación de forma 100% gratuita.
`,
    author: 'fernando-torres',
    publishDate: '2026-01-10',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    category: 'Préstamos',
    dateModified: '2026-10-01',
    sources: [
      { label: "Banco del IESS - Crédito Quirografario", url: "https://www.biess.fin.ec/quirografarios", accessedAt: "2026-10-01" },
      { label: "Manuales de Calificación de Créditos de Consumo BIESS", url: "https://www.biess.fin.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'afiliacion-voluntaria-2026',
    slug: 'afiliacion-voluntaria-iess-requisitos-beneficios-2026',
    title: 'Afiliación voluntaria IESS 2026: cuánto se paga al mes',
    metaDescription: 'Cuánto se paga por la afiliación voluntaria al IESS en 2026. Aporte mensual según sueldo, requisitos, cobertura médica, préstamos BIESS y trámite paso a paso.',
    keywords: [
      'afiliación voluntaria IESS',
      'seguro voluntario iess valor a pagar 2026',
      'cuánto cuesta el seguro voluntario',
      'valor aporte voluntario iess 2026',
      'cuánto se paga al iess por afiliación voluntaria'
    ],
    author: 'eliana-suarez',
    reviewer: 'fernando-torres',
    publishDate: '2026-01-05',
    dateModified: '2026-10-10',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Cuánto se paga por la afiliación voluntaria al IESS en 2026 según el salario declarado en Ecuador',
    category: 'Trámites',
    relatedSlugs: [
      'como-obtener-clave-iess-primera-vez',
      'como-consultar-aportes-iess-historial-laboral',
      'prestamo-quirografario-biess-requisitos-montos-2026',
      'pension-montepio-iess-requisitos-sobrevivientes-2026'
    ],
    sources: [
      { label: "IESS - Resolución C.D. 625 (Reglamento de Aseguramiento)", url: "https://www.iess.gob.ec", accessedAt: "2026-10-10" },
      { label: "Ministerio del Trabajo de Ecuador - Salario Básico Unificado", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-10" },
      { label: "Banco del Instituto Ecuatoriano de Seguridad Social (BIESS)", url: "https://www.biess.fin.ec", accessedAt: "2026-10-10" }
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta el seguro voluntario del IESS al mes en 2026?',
        a: 'El costo mínimo del seguro voluntario en 2026 es de exactamente $84,83 dólares al mes. Esta tarifa corresponde a la tasa legal del 17,60 % calculada sobre el Salario Básico Unificado vigente ($482). Si declaras un ingreso mensual mayor a este piso, tu valor a pagar aumentará de forma directamente proporcional al monto que decidas cotizar.'
      },
      {
        q: '¿Cuánto se paga al IESS por afiliación voluntaria si gano más del básico?',
        a: 'Si decides registrar ingresos superiores al básico, pagas siempre el 17,60 % de la cifra declarada. Por ejemplo, sobre un ingreso de $600 mensuales la cuota es de $105,60; para $800 asciende a $140,80; y si declaras $1.000 tu pago será de $176,00 al mes. Cotizar con valores más altos incrementa el cálculo de tu pensión de jubilación.'
      },
      {
        q: '¿Qué cubre exactamente la cuota mensual de afiliación voluntaria?',
        a: 'El aporte voluntario mensual te otorga cobertura médica integral en hospitales del IESS, cobertura de salud sin costo adicional para tus hijos menores de 18 años, pensión vitalicia por vejez o invalidez, auxilio de funerales y pensión de montepío para sobrevivientes. A partir de los seis meses de aportes continuos, también puedes solicitar préstamos quirografarios en el BIESS.'
      },
      {
        q: '¿Hasta qué día del mes se puede pagar la planilla voluntaria sin recargos?',
        a: 'La planilla mensual del seguro voluntario se debe pagar hasta el día 15 del mes siguiente al periodo de cobertura. Por ejemplo, el aporte de enero se cancela hasta el 15 de febrero. Si no pagas en ese plazo, el sistema genera intereses de mora inmediatos y, tras acumular dos meses impagos, se suspende la atención médica.'
      },
      {
        q: '¿Puedo afiliarme voluntariamente si vivo en el extranjero?',
        a: 'Sí, los ecuatorianos que residen en el exterior pueden registrarse en el régimen voluntario ecuatoriano sin importar el país donde vivan. Cotizan sobre el salario básico ecuatoriano o sobre sus ingresos declarados, y acumulan años de servicio para su jubilación en Ecuador, manteniendo además la protección médica para sus dependientes que residan en territorio nacional.'
      },
      {
        q: '¿Cuánto tiempo debo esperar para atenderme en el médico tras afiliarme?',
        a: 'Para recibir atención médica general y programada en el IESS, los afiliados voluntarios deben cumplir un periodo de carencia de seis (6) imposiciones mensuales consecutivas pagadas a tiempo. No obstante, las atenciones de emergencia con riesgo vital se atienden inmediatamente en cualquier centro hospitalario de la red pública integral de salud.'
      },
      {
        q: '¿Qué pasa si dejo de pagar el seguro voluntario del IESS?',
        a: 'Si dejas de pagar por más de 60 días continuos, el IESS da de baja automáticamente tu afiliación voluntaria para evitar que sigas acumulando deudas indefinidas. Las imposiciones que ya pagaste no se pierden en ningún caso: quedan registradas en tu historial laboral para sumarse a futuros empleos o a tu jubilación.'
      }
    ],
    content: `
# Afiliación voluntaria IESS 2026: cuánto se paga al mes

Para afiliarte de forma voluntaria al IESS en 2026 debes pagar mensualmente el 17,60 % de tus ingresos declarados, con un valor mínimo obligatorio de **$84,83 al mes** calculado sobre el Salario Básico Unificado vigente de $482. Si declaras ingresos superiores, la cuota aumenta proporcionalmente garantizando cobertura de salud, pensión y préstamos.

---

## En resumen: Datos clave sobre el valor a pagar y cobertura
* **Valor mínimo mensual en 2026**: **$84,83 dólares**, calculado sobre el Salario Básico Unificado (SBU de $482) // VERIFICAR: valor del SBU 2026 según Acuerdo Ministerial.
* **Porcentaje de cotización legal**: **17,60 %** sobre el total de ingresos declarados // VERIFICAR: tasa según Resolución C.D. 625 del IESS.
* **Quiénes califican**: Profesionales independientes, trabajadores por cuenta propia, ecuatorianos residentes en el exterior y personas sin relación de dependencia activa.
* **Fecha máxima de pago**: Hasta el día 15 del mes calendario siguiente para no incurrir en mora patronal involuntaria ni corte de coberturas.
* **Prestaciones incluidas**: Salud completa para el titular e hijos menores de 18 años, jubilación por vejez e invalidez, montepío, auxilio de funerales y préstamos en el BIESS.

---

## ¿Cuánto se paga al IESS por afiliación voluntaria en 2026? Tabla de aportes

El monto de la cuota mensual del seguro voluntario depende del ingreso que decidas manifestar ante el Instituto Ecuatoriano de Seguridad Social. La legislación prohíbe declarar un valor inferior al Salario Básico Unificado legalmente establecido en el Ecuador ($482 para el año 2026). Sin embargo, cualquier persona puede fijar un sueldo superior según sus posibilidades económicas para obtener una jubilación más representativa.

A continuación, presentamos la tabla comparativa con el valor de la aportación según el salario mensual declarado y el alcance de las coberturas asignadas:

| Salario Declarado Mensual (USD) | Porcentaje de Aporte (%) | Valor Mensual a Pagar (USD) | Cobertura Médica y Prestacional |
| :--- | :--- | :--- | :--- |
| **$482,00 (Salario Básico Mínimo)** | **17,60 %** // VERIFICAR | **$84,83** | Salud titular + hijos menores de 18 años, jubilación base, montepío, préstamos BIESS |
| **$600,00** | **17,60 %** | **$105,60** | Salud integral, historial de aportes para jubilación media, auxilio de funerales |
| **$800,00** | **17,60 %** | **$140,80** | Cobertura médica especializada, mayor promedio salarial para el cálculo de pensión |
| **$1.000,00** | **17,60 %** | **$176,00** | Salud completa, acceso a mayor cupo de crédito quirografario y montepío superior |
| **$1.500,00** | **17,60 %** | **$264,00** | Plan de jubilación de alto rendimiento, créditos quirografarios e hipotecarios ampliados |
| **$2.000,00** | **17,60 %** | **$352,00** | Cobertura hospitalaria completa en toda la red nacional del IESS y prestadores externos |

> 📊 **Simula tu cuota exacta en línea**: Puedes proyectar tu pago mensual personalizado con diferentes rangos salariales usando nuestra [calculadora de aportaciones voluntarias del IESS](/herramientas/calculadora-aporte-afiliacion-voluntaria).

---

## Consultas frecuentes sobre el valor y costo del seguro voluntario

Al momento de planificar el presupuesto personal para la seguridad social, los ciudadanos suelen formular las siguientes dudas respecto a los valores vigentes:

### Seguro voluntario IESS valor a pagar 2026
Para quienes desean empezar a cotizar por su cuenta este año, el **seguro voluntario iess valor a pagar 2026** tiene como piso $84,83 mensuales. Este valor cubre todas las contingencias médicas y la acumulación de años de jubilación sin necesidad de un contrato patronal.

### Cuánto cuesta el seguro voluntario
Cuando la gente se pregunta **cuánto cuesta el seguro voluntario**, debe considerar que no es una tarifa plana arbitraria, sino un porcentaje fijo del 17,60 % aplicado a los ingresos que uno mismo reporta. La ventaja de este esquema es que el asegurado tiene la libertad de incrementar su base imponible en cualquier momento desde el portal web.

### Valor aporte voluntario IESS 2026
El **valor aporte voluntario iess 2026** se calcula con la fórmula matemática:
$$\\text{Aporte} = \\text{Salario Declarado} \\times 0,1760$$
Si mantienes tu aporte durante 12 meses sobre la base mínima de $482, la inversión anual totaliza $1.017,96, lo que te garantiza un año completo de imposiciones registradas para tu historial de retiro.

### Cuánto se paga al IESS por afiliación voluntaria
Al evaluar **cuánto se paga al iess por afiliación voluntaria** frente a un seguro médico privado, el sistema público ecuatoriano ofrece una ventaja competitiva determinante: por la misma cuota de $84,83 no solo recibes atención hospitalaria y medicinas gratuitas para ti y tus hijos menores de edad, sino que además estás construyendo un fondo de jubilación vitalicia y adquiriendo el derecho a créditos hipotecarios del BIESS.

---

## ¿Quiénes pueden afiliarse voluntariamente al IESS en Ecuador?

El régimen voluntario sin relación de dependencia está abierto a una amplia variedad de perfiles ciudadanos que buscan protegerse frente a enfermedades, accidentes y vejez:

1. **Profesionales independientes y autónomos**: Médicos, abogados, diseñadores, consultores, ingenieros o contadores que ejercen libremente su profesión mediante facturación electrónica.
2. **Emprendedores y comerciantes**: Propietarios de locales comerciales, talleres artesanales o negocios familiares que no perciben un sueldo bajo nómina laboral.
3. **Ecuatorianos residentes en el exterior**: Migrantes en Estados Unidos, España, Italia o cualquier otro país que deseen seguir acumulando semanas de cotización en Ecuador para jubilarse en su patria o proteger médicamente a sus familiares directos en territorio nacional.
4. **Amas de casa y personas dedicadas al cuidado del hogar**: Personas que realizan tareas no remuneradas y desean acceder al régimen general de salud y pensiones completas.
5. **Estudiantes mayores de edad**: Jóvenes mayores de 18 años que desean iniciar su récord de imposiciones desde temprana edad para alcanzar los 40 años de aportes antes de cumplir los 60 años.

---

## Beneficios y prestaciones que cubre el aporte voluntario del 17,60 %

Aportar voluntariamente te confiere prácticamente las mismas garantías que a un trabajador asalariado, con ligeras diferencias en las prestaciones estrictamente vinculadas a despidos patronales.

### 1. Atención médica integral y gratuita
* Consultas en medicina general, especialidades y subespecialidades en dispensarios y hospitales del IESS.
* Hospitalización, cirugías programadas y de emergencia, cuidados intensivos e intervenciones de alta complejidad.
* Entrega gratuita de medicamentos recetados por la farmacia institucional.
* Tratamientos de rehabilitación física y atención odontológica preventiva.

### 2. Cobertura automática para hijos menores de 18 años
Tus hijos legalmente reconocidos menores de edad tienen derecho a consultas pediátricas, odontológicas, vacunas y hospitalización dentro de la red del IESS sin que tengas que pagar ninguna mensualidad adicional por cada hijo.

### 3. Pensión vitalicia de jubilación por vejez e invalidez
Cada cuota mensual pagada suma una imposición formal a tu cuenta individual. Al cumplir las combinaciones de edad y años de aportación exigidas por la ley (por ejemplo, 60 años de edad con 30 años de aportes, o cualquier edad con 40 años de cotización), recibirás una pensión mensual vitalicia ajustada a la inflación. Puedes revisar todos los detalles en la guía de [Jubilación por Vejez IESS](/procedimiento/jubilacion-vejez).

### 4. Pensión de viudez y orfandad (Montepío) y auxilio de funerales
En caso de fallecimiento del titular, el cónyuge o conviviente en unión de hecho y los hijos menores de 18 años (o hasta 21 si estudian) reciben una renta mensual sustitutiva de montepío. Además, el IESS reembolsa los gastos funerarios a través de la prestación de auxilio de funerales.

### 5. Acceso a Préstamos Quirografarios e Hipotecarios en el BIESS
* **Préstamo Quirografario**: Puedes acceder a créditos de consumo a tasas preferenciales a partir del **sexto mes de aportación continua** como afiliado voluntario. Conoce los montos y plazos en el procedimiento de [Préstamo Quirografario BIESS](/procedimiento/prestamo-quirografario).
* **Préstamo Hipotecario**: Cumpliendo con 36 aportaciones mensuales acumuladas (las últimas 12 consecutivas), puedes calificar a préstamos para comprar vivienda propia con financiamiento de hasta 25 años plazo.

> ⚠️ **Prestaciones que NO incluye el seguro voluntario**: Al no existir un empleador ni un despido patronal, la afiliación voluntaria **no incluye** seguro de desempleo, fondo de cesantía con retiro en efectivo, ni fondos de reserva mensuales. Toda la cotización del 17,60 % se destina exclusivamente a sostener los fondos de salud, invalidez, vejez y muerte.

---

## Requisitos indispensables para afiliarse por cuenta propia

Para tramitar la afiliación voluntaria no necesitas acudir a ninguna agencia física; el trámite es 100 % virtual y requiere cumplir con las siguientes condiciones:

* **Cédula de identidad**: Poseer cédula de ciudadanía ecuatoriana o cédula de identidad para extranjeros residentes en Ecuador. Si resides en el exterior, puedes tramitarlo con tu cédula o pasaporte ecuatoriano.
* **Mayoría de edad**: Tener 18 años cumplidos a la fecha de la solicitud.
* **No registrar afiliación bajo relación de dependencia**: No puedes tener un contrato activo en nómina de ninguna empresa. Si dejaste un trabajo dependiente, tu empleador anterior debe haber registrado previamente tu aviso de salida en el sistema del IESS.
* **No registrar deudas en mora con el IESS**: Si estuviste afiliado antes y tienes planillas pendientes o glosas patronales, deberás cancelarlas o suscribir un acuerdo de pago antes de iniciar el trámite.
* **Cuenta bancaria para débito automático**: Contar con una cuenta de ahorros o corriente en una entidad financiera del Ecuador para autorizar el cobro recurrente mensual de las planillas.

---

## Paso a paso para tramitar la afiliación voluntaria por internet

El proceso de registro toma menos de 10 minutos si sigues estas indicaciones:

### Paso 1: Ingreso al Portal Oficial del IESS
Abre tu navegador e ingresa a la dirección oficial [iess.gob.ec](https://www.iess.gob.ec). En el menú de servicios al ciudadano, busca la sección **"Trámites Virtuales"**, haz clic en **"Asegurados"** y selecciona la opción **"Afiliación Voluntaria"**.

### Paso 2: Selección de la modalidad de residencia
El sistema te presentará tres modalidades de aseguramiento:
1. **Independiente**: Para quienes ejercen actividades económicas por cuenta propia dentro de Ecuador.
2. **Sin relación de dependencia**: Para quienes no perciben ingresos laborales pero desean cotizar de forma privada.
3. **Residente en el Exterior**: Para ecuatorianos que viven fuera de las fronteras nacionales.

### Paso 3: Validación de identidad
Digita tu número de cédula de ciudadanía de 10 dígitos y tu fecha de nacimiento. El portal cruzará la información en tiempo real con el Registro Civil de Ecuador para verificar tus nombres completos y estado civil.

### Paso 4: Declaración de ingresos y contacto
* **Ingresos mensuales**: Ingresa el monto en dólares sobre el cual deseas calcular tu aporte. El sistema validará automáticamente que la cifra sea igual o superior al Salario Básico Unificado vigente ($482).
* **Datos de contacto**: Escribe tu dirección domiciliaria exacta, número de teléfono móvil y correo electrónico activo (donde recibirás tus planillas de pago mensuales).

### Paso 5: Aprobación y registro de débito automático
Revisa el resumen de tu solicitud y el desglose de la cuota mensual a pagar. Acepta las condiciones del reglamento y autoriza el débito en tu cuenta bancaria para evitar olvidos. Al confirmar, el sistema emitirá el **Comprobante de Aceptación de Afiliación Voluntaria** en formato PDF con tu código de asegurado.

---

## Documentos y validaciones para mantener la afiliación activa

Una vez generado el registro, debes mantener en orden los siguientes respaldos:

* **Comprobante de Afiliación impreso o digital**: Guarda el PDF generado para respaldar la fecha exacta de inicio de tu aseguramiento.
* **Comprobantes de pago bancario**: Si pagas en ventanillas bancarias o mediante banca web, descarga siempre el comprobante de transferencia con el número de planilla.
* **Clave de Afiliado activa**: Necesitarás tu contraseña para consultar aportes y pedir citas médicas. Si no la tienes, revisa nuestra guía para [Obtener la clave del IESS por primera vez](/blog/como-obtener-clave-iess-primera-vez).

---

## Errores frecuentes al contratar y pagar la afiliación voluntaria

* **Declarar ingresos por debajo del salario básico**: Intentar cotizar sobre $200 o $300 dólares. El sistema rechaza automáticamente cualquier solicitud que no alcance el salario básico legal vigente ($482 en 2026).
* **Olvidar la fecha límite de pago (día 15)**: Muchas personas pagan el día 20 o a fin de mes. El IESS genera planillas del 1 al 15; pagar con retraso acarrea intereses de mora y suspende temporalmente la agenda de citas médicas.
* **No registrar débito bancario automático**: Pagar manualmente todos los meses aumenta el riesgo de olvido. Configurar el débito bancario garantiza que tus aportes permanezcan al día sin preocupaciones.
* **Buscar atención médica inmediata**: Creer que al pagar el primer aporte ya puedes agendar consultas de especialidad. Debes esperar los seis meses de carencia reglamentarios, salvo para emergencias médicas vitales.
* **Dejar de pagar sin solicitar la desafiliación**: Si dejas de pagar, el sistema acumula dos planillas con recargos antes de darte de baja. Lo correcto es ingresar a tu portal de asegurado y tramitar la terminación del seguro voluntario formalmente cuando decidas no continuar.

---

## Ejemplo práctico y numérico de cálculo de aportes en 2026

Para comprender con total transparencia cómo se calcula la cuota, analicemos el caso de Juan, un diseñador gráfico independiente en Quito que decide asegurarse voluntariamente en el año **2026**:

* **Situación laboral**: Trabaja como freelance y percibe ingresos variables promedio de $900 mensuales.
* **Decisión de aporte**: Juan decide cotizar sobre una base imponible de **$800,00 dólares** para asegurar una mejor pensión a futuro.
* **Fórmula aplicada**:
  $$\\text{Cuota mensual} = \$800,00 \\times 17,60 \\% = \$140,80 \\text{ dólares}$$
* **Desglose financiero anual**:
  * Aporte mensual: $140,80
  * Aporte anual (12 meses): $1.689,60
  * Imposiciones acumuladas: 12 imposiciones completas registradas en su historial laboral.
* **Resultado del aseguramiento**: Juan y su hija de 6 años cuentan con cobertura médica completa, y a partir del mes 7 Juan podrá solicitar un crédito quirografario en el BIESS para adquirir equipos informáticos.

---

## Preguntas Frecuentes sobre la afiliación voluntaria del IESS

### ¿Cuánto cuesta el seguro voluntario del IESS al mes en 2026?
El costo mínimo del seguro voluntario en 2026 es de exactamente **$84,83 dólares al mes**. Esta tarifa corresponde a la tasa legal del 17,60 % calculada sobre el Salario Básico Unificado vigente ($482). Si declaras un ingreso mensual mayor a este piso, tu valor a pagar aumentará de forma directamente proporcional al monto que decidas cotizar.

### ¿Cuánto se paga al IESS por afiliación voluntaria si gano más del básico?
Si decides registrar ingresos superiores al básico, pagas siempre el 17,60 % de la cifra declarada. Por ejemplo, sobre un ingreso de $600 mensuales la cuota es de $105,60; para $800 asciende a $140,80; y si declaras $1.000 tu pago será de $176,00 al mes. Cotizar con valores más altos incrementa el cálculo de tu pensión de jubilación.

### ¿Qué cubre exactamente la cuota mensual de afiliación voluntaria?
El aporte voluntario mensual te otorga cobertura médica integral en hospitales del IESS, cobertura de salud sin costo adicional para tus hijos menores de 18 años, pensión vitalicia por vejez o invalidez, auxilio de funerales y pensión de montepío para sobrevivientes. A partir de los seis meses de aportes continuos, también puedes solicitar préstamos quirografarios en el BIESS.

### ¿Hasta qué día del mes se puede pagar la planilla voluntaria sin recargos?
La planilla mensual del seguro voluntario se debe pagar hasta el **día 15 del mes siguiente** al periodo de cobertura. Por ejemplo, el aporte de enero se cancela hasta el 15 de febrero. Si no pagas en ese plazo, el sistema genera intereses de mora inmediatos y, tras acumular dos meses impagos, se suspende la atención médica.

### ¿Puedo afiliarme voluntariamente si vivo en el extranjero?
Sí, los ecuatorianos que residen en el exterior pueden registrarse en el régimen voluntario ecuatoriano sin importar el país donde vivan. Cotizan sobre el salario básico ecuatoriano o sobre sus ingresos declarados, y acumulan años de servicio para su jubilación en Ecuador, manteniendo además la protección médica para sus dependientes que residan en territorio nacional.

### ¿Cuánto tiempo debo esperar para atenderme en el médico tras afiliarme?
Para recibir atención médica general y programada en el IESS, los afiliados voluntarios deben cumplir un periodo de carencia de **seis (6) imposiciones mensuales consecutivas** pagadas a tiempo. No obstante, las atenciones de emergencia con riesgo vital se atienden inmediatamente en cualquier centro hospitalario de la red pública integral de salud.

### ¿Qué pasa si dejo de pagar el seguro voluntario del IESS?
Si dejas de pagar por más de 60 días continuos, el IESS da de baja automáticamente tu afiliación voluntaria para evitar que sigas acumulando deudas indefinidas. Las imposiciones que ya pagaste no se pierden en ningún caso: quedan registradas en tu historial laboral para sumarse a futuros empleos o a tu jubilación.

---

## Enlaces y guías recomendadas para tu trámite
* Conoce los pasos para realizar el trámite institucional en el portal oficial en el procedimiento de [Afiliación Voluntaria](/procedimiento/afiliacion-voluntaria).
* Planifica tu futuro revisando los requisitos completos de edad y aportaciones en la guía de [Jubilación por Vejez IESS](/procedimiento/jubilacion-vejez).
* Una vez afiliado, revisa cómo [Consultar aportes e historial laboral](/blog/como-consultar-aportes-iess-historial-laboral) para monitorear tus pagos mensuales.
* Si necesitas financiar proyectos personales, descubre las ventajas del [Préstamo Quirografario BIESS](/procedimiento/prestamo-quirografario).
`
  },
  {
    id: 'subsidio-maternidad-2026',
    slug: 'subsidio-maternidad-iess-requisitos-calculo-2026',
    title: 'Subsidio de maternidad IESS 2026: requisitos y cuánto pagan',
    metaDescription: 'Guía oficial 2026 del subsidio de maternidad IESS: requisitos de 12 aportes, cálculo de los 84 días al 100%, certificado médico, trámites y fechas de acreditación.',
    keywords: [
      'subsidio de maternidad',
      'cuánto es el subsidio por maternidad',
      'certificado de maternidad iess',
      'bono por maternidad 2026',
      'iess maternidad subsidio',
      'www iess gob ec subsidio de maternidad',
      'licencia maternidad 84 dias ecuador'
    ],
    author: 'eliana-suarez',
    reviewer: 'carlos-mendoza',
    publishDate: '2026-01-08',
    dateModified: '2026-10-10',
    readTime: 9,
    readingTime: 9,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Madre trabajadora asegurada revisando los requisitos y liquidación del subsidio de maternidad en el portal del IESS Ecuador',
    category: 'Salud',
    relatedSlugs: [
      'afiliacion-voluntaria-iess-requisitos-beneficios-2026',
      'pension-montepio-iess-requisitos-sobrevivientes-2026',
      'como-consultar-aportes-iess-historial-laboral'
    ],
    content: `
# Subsidio de Maternidad IESS 2026: Requisitos y Cuánto Pagan

El subsidio de maternidad del IESS exige doce imposiciones continuas dentro de los quince meses de referencia previos al parto para otorgar una cobertura económica del 100% de la remuneración promediada durante los 84 días de descanso obligatorio, financiada en un 75% por el seguro social y un 25% por el empleador.

---

## En resumen: Claves del subsidio de maternidad del IESS en 2026

* **Tiempo de reposo remunerado**: 84 días calendario reglamentarios (12 semanas continuas), ampliables 10 días adicionales por parto múltiple.
* **Porcentaje total percibido**: 100% de la remuneración promedio declarada (el IESS cancela el 75% y el empleador asume el 25% restante). // VERIFICAR: En afiliadas voluntarias e independientes revisar si el seguro liquida directamente la cuota del 75% reglamentaria.
* **Aportaciones mínimas exigidas**: 12 imposiciones mensuales consecutivas previas al parto dentro de los 15 meses anteriores a la fecha probable o real.
* **Canal oficial de solicitud**: Módulo informático en [iess.gob.ec](https://www.iess.gob.ec) bajo la sección de Subsidios Monetarios.
* **Requisito no negociable de cobro**: Cuenta bancaria personal registrada y validada en el portal del IESS y certificado médico validado antes de los plazos reglamentarios.

---

> ℹ️ **Canal Institucional Oficial:** Recuerda que este portal es una guía informativa ciudadana independiente. El trámite oficial y la acreditación económica se gestionan exclusivamente en el sitio web institucional del Instituto Ecuatoriano de Seguridad Social: [www.iess.gob.ec subsidio de maternidad](https://www.iess.gob.ec). Ningún intermediario ni gestor externo tiene autorización para cobrar por la aprobación de tu descanso prenatal o postnatal.

---

## ¿Cuánto es el subsidio por maternidad y cómo se calcula en 2026?

Una de las dudas más frecuentes entre las aseguradas es cómo determinar el valor en dólares que transferirá el IESS a su cuenta bancaria personal. De acuerdo con el Código del Trabajo ecuatoriano (Art. 152) y la Ley de Seguridad Social, la madre no debe experimentar ninguna merma en su nivel de ingresos habituales durante las 12 semanas que dedica al cuidado de su hijo recién nacido.

La compensación se divide en dos pagos complementarios:
1. **Aporte del IESS (75%)**: El seguro social liquida el 75% del sueldo promedio cotizado durante los doce meses anteriores al alumbramiento, calculado sobre los 84 días calendario de reposo.
2. **Aporte patronal obligatorio (25%)**: La empresa o institución empleadora cubre el 25% remanente directamente a través del rol de pagos mensual regular, manteniendo activas las aportaciones patronales de dicho mes.

La siguiente tabla resume la estructura comparativa de cobertura, duración y porcentajes del subsidio frente a otros descansos por contingencias de salud:

| Prestación Económica | Cobertura Total | Parte Asumida por el IESS | Parte Asumida por Empleador | Duración Máxima Legal | Requisito de Aportes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Subsidio de Maternidad Ordinario** | 100% del sueldo promediado | 75% del promedio diario x 84 días | 25% mensual en rol de pagos | 84 días calendario (12 semanas) | 12 aportes continuos en 15 meses |
| **Parto Múltiple (Gemelar o más)** | 100% del sueldo promediado | 75% del promedio diario x 94 días | 25% mensual en rol de pagos | 94 días calendario (10 días extra) | 12 aportes continuos en 15 meses |
| **Subsidio por Enfermedad General** | 75% (días 4 al 90) / 66% (días 91 al 180) | 100% del porcentaje subsidiado | 0% (primeros 3 días asume patrono) | Hasta 180 días de reposo | Aportes continuos al día |
| **Licencia de Paternidad (Padre)** | 100% del sueldo del trabajador | 0% (no es subsidio del IESS) | 100% asumido por el patrono | 10 a 15 días según tipo de parto | No aplica cómputo del IESS |

---

## Ejemplo práctico de liquidación del subsidio de maternidad

Para comprender con exactitud la liquidación bancaria, analicemos el caso real de una trabajadora afiliada con un salario mensual estable:

### Datos del caso:
* **Remuneración mensual imponible reportada**: USD 800.00 constantes durante los últimos 12 meses previos al descanso prenatal.
* **Período de licencia**: 84 días calendario reglamentarios.

### Procedimiento de cálculo numérico:
1. **Determinación de la base de remuneración diaria**:
   $$\\text{Sueldo diario} = \\frac{\\text{USD } 800.00}{30 \\text{ días}} = \\text{USD } 26.67 \\text{ por día}$$
2. **Cálculo del 75% a cargo del IESS**:
   $$\\text{Base diaria del IESS} = \\text{USD } 26.67 \\times 75\\% = \\text{USD } 20.00 \\text{ diarios}$$
   $$\\text{Monto total girado por el IESS} = \\text{USD } 20.00 \\times 84 \\text{ días} = \\text{USD } 1,680.00$$
3. **Cálculo del 25% a cargo del patrono**:
   $$\\text{Base diaria patronal} = \\text{USD } 26.67 \\times 25\\% = \\text{USD } 6.67 \\text{ diarios}$$
   $$\\text{Monto total asumido por el empleador} = \\text{USD } 6.67 \\times 84 \\text{ días} = \\text{USD } 560.00$$
4. **Ingreso global consolidado de la madre**:
   $$\\text{Ingreso total durante las 12 semanas} = \\text{USD } 1,680.00 + \\text{USD } 560.00 = \\text{USD } 2,240.00$$
   *(Equivalente exacto a USD 800.00 mensuales multiplicados por los 2.8 meses que abarcan las 12 semanas).*

El valor de USD 1,680.00 se transfiere de forma íntegra a la cuenta bancaria personal de la asegurada mediante acreditación directa del Banco Central / IESS, exento de descuentos patronales, mientras que los USD 560.00 los abona la empresa en sus fechas habituales de nómina.

---

## Requisitos indispensables para acceder al beneficio en 2026

Para que la Subdirección de Prestaciones de Salud del IESS apruebe el desembolso sin glosas ni negativas automáticas, la trabajadora y la empresa deben reunir los siguientes requisitos indispensables:

1. **Récord continuo de aportaciones**: Acreditar al menos **12 aportaciones mensuales continuas** dentro de los 15 meses anteriores a la fecha del alumbramiento. Si la afiliada cambió de empresa pero mantuvo continuidad de cotización sin meses en blanco, se computa la sumatoria total de manera ininterrumpida.
2. **Condición de afiliada activa**: Mantener activa la relación de trabajo o voluntariado. El patrono no debe registrar mora patronal en los periodos de aportación que sirven de sustento a la liquidación.
3. **Certificado médico de maternidad validado**: Contar con el certificado prenatal o de nacimiento expedido por un ginecólogo de la red institucional del IESS, o haber completado la validación en línea del certificado otorgado por médico o clínica particular.
4. **Cuenta bancaria aprobada en el IESS**: Disponer de una cuenta de ahorros o corriente a nombre exclusivo de la madre, previamente registrada y validada en el sistema web de asegurados. No se admiten cuentas de terceros, parejas ni cuentas conjuntas no autorizadas.
5. **Aviso de reposo patronal registrado**: El empleador debe validar el descanso por maternidad dentro de su sistema de nómina patronal institucional.

---

## Documentos obligatorios para armar el expediente de maternidad

Antes de ingresar al módulo informático del seguro social, asegúrate de tener escaneados en formato PDF legible (peso menor a 2 MB por archivo) los siguientes documentos:

* **Cédula de ciudadanía o identidad** de la asegurada madre y del recién nacido (o partida de nacimiento íntegra).
* **Certificado médico original de reposo por maternidad**: Debe consignar con claridad los nombres completos de la paciente, diagnóstico clínico, semanas de gestación, fecha probable o efectiva de parto, número de días de reposo (84 días) y firma y sello con código de registro del médico tratante en el Ministerio de Salud Pública.
* **Epicrisis o resumen de historia clínica** (únicamente si el parto ocurrió en clínicas, sanatorios u hospitales privados).
* **Certificado bancario emitido por la institución financiera** que demuestre la titularidad activa de la cuenta.

---

## Paso a paso: Cómo solicitar el subsidio de maternidad en línea

El trámite en el portal [iess.gob.ec](https://www.iess.gob.ec) está completamente automatizado y se realiza sin necesidad de hacer filas presenciales en ventanillas:

### Paso 1: Validación del certificado médico particular (si no diste a luz en hospital del IESS)
Si el alumbramiento o control prenatal se efectuó en una clínica privada, el certificado médico de maternidad del IESS debe ser homologado dentro del plazo de ley:
1. Accede a [iess.gob.ec](https://www.iess.gob.ec) y dirígete a **"Trámites Virtuales"** -> **"Asegurados"** -> **"Afiliados"**.
2. Ingresa a la opción **"Validación de Certificados Médicos"** digitando tu número de cédula y clave patronal/personal.
3. Ingresa los datos del médico particular (número de cédula o código profesional) y la fecha de inicio del reposo.
4. Adjunta el archivo PDF del certificado médico y la epicrisis del hospital.
5. El sistema emitirá un comprobante de radicación y, tras la revisión del médico auditor institucional, emitirá el código de reposo validado.

### Paso 2: Verificación de la cuenta bancaria personal
1. Dentro de los servicios en línea de **"Afiliados"**, ingresa a la pestaña **"Registro y Actualización de Cuenta Bancaria"**.
2. Verifica que la cuenta bancaria figure en estado **"Validada"** con visto bueno verde. Si no lo está, regístrala cargando el certificado bancario para evitar que el pago quede retenido.

### Paso 3: Ingreso de la solicitud de subsidio monetario
1. En el portal de afiliados, haz clic en **"Subsidios Monetarios"**.
2. Selecciona **"Registro de Solicitud de Maternidad"**.
3. El aplicativo verificará en tiempo real tu historial de doce aportaciones en los quince meses previos.
4. Selecciona el certificado médico institucional o validado que ampara tus 84 días de licencia.
5. Confirma los datos de tu cuenta bancaria y haz clic en **"Guardar y Enviar Solicitud"**.
6. Descarga y conserva el comprobante digital en formato PDF con el número de trámite para dar seguimiento.

---

## Errores frecuentes que demoran o anulan el pago del subsidio

Evita estos errores comunes que suelen bloquear las solicitudes de miles de madres ecuatorianas cada mes:

* **Dejar vencer el plazo para validar certificados de clínicas particulares**: El certificado privado debe presentarse dentro del plazo máximo reglamentario para no perder el derecho al reconocimiento económico del seguro.
* **No verificar que la cuenta bancaria esté a nombre de la titular**: El IESS rechaza de inmediato transferencias dirigidas a cuentas bancarias del cónyuge, padres o terceros, aun cuando medie poder notariado.
* **Mora patronal en las planillas del año previo**: Si el empleador no pagó las planillas mensuales en las fechas reglamentarias, el sistema considerará que no existen 12 cotizaciones continuas válidas hasta que la deuda sea cancelada con los respectivos intereses de mora.
* **Confundir la licencia de maternidad con la licencia de paternidad**: Los 10 a 15 días concedidos al padre son una obligación económica exclusiva del patrono privado o estatal; el IESS no tramita ningún subsidio monetario a nombre del cónyuge.
* **Creer que el bono o subsidio de maternidad es un trámite presencial obligatorio**: No es necesario contratar tramitadores externos. El registro se realiza de manera 100% gratuita a través de [iess.gob.ec](https://www.iess.gob.ec).

---

## Diferencias clave: Subsidio de maternidad vs. bono del MIES y licencias especiales

Es vital no confundir el **subsidio de maternidad del IESS** con programas de asistencia social estatal o descansos no remunerados:

1. **Subsidio de Maternidad del IESS (Seguro Contributivo)**: Es una prestación contributiva financiada con las aportaciones de la trabajadora y del patrono. Su cobro exige récord laboral y reemplaza el salario de la madre al 100%.
2. **Bono de Apoyo Social (MIES)**: Corresponde a transferencias condicionadas no contributivas orientadas a madres en situación de extrema pobreza o vulnerabilidad que no forman parte del sistema de seguridad social.
3. **Licencia opcional complementaria sin sueldo**: El Código del Trabajo permite a la madre solicitar hasta 9 meses adicionales de permiso no remunerado tras los 84 días para dedicarse a la crianza; durante ese lapso no opera subsidio del IESS, aunque se mantiene el acceso a prestaciones médicas mediante aportación voluntaria.
4. **Permiso de lactancia materna**: Una vez reincorporada al trabajo, la madre goza de una jornada reducida de 6 horas diarias durante 12 meses posteriores al parto, remunerada en su totalidad por el empleador sin intervención del seguro social.

---

## Preguntas Frecuentes sobre el Subsidio de Maternidad IESS

### ¿Cuánto tiempo tengo para cobrar el subsidio de maternidad si no lo solicité a tiempo?
El derecho a reclamar los valores económicos del subsidio por maternidad prescribe a los doce meses contados a partir de la fecha de culminación de la licencia médica por alumbramiento. Si no tramitas la homologación y solicitud dentro de este plazo legal, los valores prescriben a favor del fondo de salud del IESS.

### ¿Qué pasa con el subsidio de maternidad si mi empleador está en mora patronal?
Si tu empresa adeuda planillas de aportaciones, el IESS no te pagará el subsidio monetario hasta que la mora sea saldada en su totalidad. No obstante, por mandato del Código del Trabajo, el empleador moroso queda obligado a asumir de su propio presupuesto el 100% de la remuneración que te correspondía percibir durante las 12 semanas de descanso.

### ¿El subsidio de maternidad cubre también los gastos del parto y cesárea?
Sí, las afiliadas que cumplen los requisitos de cotización tienen cobertura médica y obstétrica total gratuita en los hospitales del IESS y prestadores privados acreditados, incluyendo atención médica prenatal, parto normal, cesárea programada o de emergencia, anestesia, medicamentos y neonatología sin costo adicional.

### ¿Cuánto paga el IESS a las afiliadas voluntarias o sin relación de dependencia por maternidad?
Las afiliadas independientes y voluntarias que registran 12 imposiciones continuas reciben el pago directo del subsidio de salud correspondiente a la base calculada de su aporte mensual declarado. Al no contar con un patrono que cubra el 25% remanente en rol de pagos, perciben la cuota pecuniaria estipulada en el reglamento de salud del IESS. // VERIFICAR: Comprobar liquidaciones sectoriales especiales para trabajadoras del hogar.

### ¿Se descuentan aportes al IESS sobre el dinero depositado por subsidio de maternidad?
No. El depósito que realiza el IESS por concepto de subsidio pecuniario de maternidad ingresa a tu cuenta bancaria de manera íntegra, sin retención de aporte personal del 9.45% ni deducciones de impuestos, ya que constituye un beneficio de reposición salarial de la seguridad social.

### ¿Cómo consultar el estado de depósito del dinero en www iess gob ec subsidio de maternidad?
Ingresa a [iess.gob.ec](https://www.iess.gob.ec), accede a "Asegurados" -> "Afiliados" -> "Subsidios Monetarios" y presiona la opción "Consulta de Solicitud de Subsidios". El aplicativo indicará si tu trámite se encuentra en estado "Generado", "Aprobado por Auditoría Médica", "Enviado al Banco Central" o "Acreditado en Cuenta".

### ¿Qué sucede si el recién nacido fallece durante o poco después del parto?
En el lamentable evento de parto prematuro con feto viable o fallecimiento neonatal, la madre mantiene intacto su derecho a disfrutar de los 84 días de licencia de maternidad remunerada y a cobrar el 100% del subsidio pecuniario, ya que el reposo médico busca garantizar su recuperación física y psicológica integral.

---

## Fuentes oficiales y normativa de consulta
* **Código del Trabajo de la República del Ecuador (Art. 152 y siguientes)** - Normativa de descanso obligatorio y protección a la maternidad.
* **Ley de Seguridad Social (Registro Oficial Suplemento 465)** - Régimen del Seguro General de Salud Individual y Familiar.
* **Reglamento General de Prestaciones de Salud y Subsidios Pecuniarios del IESS** - Resoluciones del Consejo Directivo.
* **Portal Oficial del Instituto Ecuatoriano de Seguridad Social**: [iess.gob.ec](https://www.iess.gob.ec).

---

## Enlaces internos y guías complementarias
* Si eres trabajadora independiente, revisa los costos en nuestra guía sobre [Afiliación voluntaria IESS 2026: cuánto se paga al mes](/blog/afiliacion-voluntaria-iess-requisitos-beneficios-2026).
* Consulta el procedimiento institucional paso a paso en la sección de [Subsidio por Maternidad](/procedimiento/subsidio-maternidad).
* Conoce los derechos familiares y de montepío en nuestra guía de [Pensión de viudez y orfandad IESS: requisitos y trámite](/blog/pension-montepio-iess-requisitos-sobrevivientes-2026).
* Revisa tu récord laboral de cotizaciones en la guía para [Consultar aportes e historial laboral en el IESS](/blog/como-consultar-aportes-iess-historial-laboral).
`,
    sources: [
      {
        label: "Código del Trabajo de Ecuador (Art. 152)",
        url: "https://www.trabajo.gob.ec",
        accessedAt: "2026-10-10"
      },
      {
        label: "IESS - Subsidios Pecuniarios y Prestaciones de Maternidad",
        url: "https://www.iess.gob.ec",
        accessedAt: "2026-10-10"
      },
      {
        label: "Ley de Seguridad Social del Ecuador",
        url: "https://www.iess.gob.ec",
        accessedAt: "2026-10-10"
      }
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo tengo para cobrar el subsidio de maternidad si no lo solicité a tiempo?',
        a: 'El derecho a reclamar los valores del subsidio por maternidad prescribe a los doce meses contados a partir de la finalización del reposo médico reglamentario de 84 días.'
      },
      {
        q: '¿Qué pasa con el subsidio de maternidad si mi empleador está en mora patronal?',
        a: 'El IESS retiene la liquidación del subsidio hasta que el patrono pague la mora, pero por ley la empresa queda obligada a cancelar directamente el 100% del sueldo de la madre durante su descanso.'
      },
      {
        q: '¿El subsidio de maternidad cubre también los gastos del parto y cesárea?',
        a: 'Sí, las aseguradas que cumplen con las 12 imposiciones continuas acceden a atención médica gratuita completa de controles prenatales, parto normal o cesárea y cuidados para el recién nacido en la red del IESS.'
      },
      {
        q: '¿Cuánto paga el IESS a las afiliadas voluntarias por subsidio de maternidad?',
        a: 'Perciben el subsidio pecuniario equivalente a su porcentaje de cotización sobre el salario declarado en sus aportes continuos directamente del seguro social.'
      },
      {
        q: '¿Se descuentan aportes al IESS sobre el dinero depositado por subsidio de maternidad?',
        a: 'No, el depósito correspondiente a la cuota del subsidio del IESS se entrega libre de deducciones del aporte personal del 9.45% e impuestos.'
      },
      {
        q: '¿Cómo consultar el estado de depósito del dinero en www iess gob ec subsidio de maternidad?',
        a: 'Ingresando a iess.gob.ec en "Afiliados" -> "Subsidios Monetarios" -> "Consulta de Solicitud de Subsidios" para ver la fecha de acreditación en cuenta bancaria.'
      },
      {
        q: '¿Qué sucede si el recién nacido fallece durante o poco después del parto?',
        a: 'La madre conserva íntegramente su derecho a los 84 días de reposo remunerado y a percibir el 100% de la compensación económica para su recuperación.'
      }
    ]
  },
  {
    id: 'prestamo-hipotecario-2026',
    slug: 'prestamo-hipotecario-biess-requisitos-tasas-2026',
    title: 'Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés',
    metaDescription: 'Guía detallada para solicitar un préstamo hipotecario BIESS en 2026. Conoce las tasas de interés preferenciales desde el 5.0%, plazos de hasta 25 años y montos.',
    keywords: ['préstamo hipotecario BIESS', 'casa propia BIESS', 'crédito vivienda ecuador', 'tasa interés BIESS', 'requisitos hipotecario BIESS'],
    content: `
# Préstamo Hipotecario BIESS 2026: Requisitos y Tasas de Interés

¿Quiere adquirir su vivienda propia en Ecuador con las mejores condiciones financieras del mercado? El Préstamo Hipotecario del BIESS para el año 2026 ofrece tasas de interés preferenciales desde el 5.0% nominal anual y plazos de pago de hasta 25 años, financiando hasta el 100% del avalúo de su primera casa de interés público. Esta es la alternativa de financiamiento a largo plazo más robusta en el mercado inmobiliario ecuatoriano, diseñada para afiliados dependientes, voluntarios y jubilados de la seguridad social.

## En resumen: Datos clave sobre el Crédito Hipotecario BIESS
* **Tasa de interés mínima**: Desde el 5.0% nominal anual para viviendas de interés público (VIP/VIS).
* **Plazo máximo de pago**: Hasta 25 años (300 meses de plazo para amortización).
* **Monto máximo de financiamiento**: Hasta $300,000 dólares americanos según capacidad de pago.
* **Cobertura total**: Financiamiento del 100% en viviendas de hasta $100,000 dólares.
* **Aportaciones obligatorias**: Mínimo 36 de aportaciones acumuladas totales en el IESS.

---

## ¿Cuáles son las condiciones de financiamiento y tasas de interés en 2026?

El Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) maneja tasas de interés altamente competitivas, subsidiadas por el Estado para promover el acceso a la vivienda propia. A diferencia de la banca privada convencional, la tasa nominal se ajusta según el valor comercial de la vivienda y el plazo de amortización solicitado.

La siguiente tabla detalla la estructura vigente de financiamiento y tasas nominales anuales:

| Tipo de Vivienda | Valor Comercial Máximo | Porcentaje de Financiamiento | Tasa de Interés Nominal | Plazo Máximo Permitido |
| :--- | :--- | :--- | :--- | :--- |
| **Interés Social (VIS)** | Hasta $45,000 | 100% del avalúo comercial | 4.99% a 5.50% anual | Hasta 25 años |
| **Interés Público (VIP)** | Desde $45,001 hasta $100,000 | 100% del avalúo comercial | 5.51% a 6.50% anual | Hasta 25 años |
| **Vivienda Habitual (General)** | Desde $100,001 hasta $200,000 | Hasta el 90% del avalúo comercial | 6.75% a 7.90% anual | Hasta 25 años |
| **Vivienda de Gama Alta** | Desde $200,001 hasta $300,000 | Hasta el 80% del avalúo comercial | 7.91% a 8.50% anual | Hasta 20 años |
| **Terrenos o Oficinas** | Según avalúo | Hasta el 80% del avalúo comercial | 8.00% a 9.50% anual | Hasta 10 años |

---

## ¿Quiénes pueden solicitar un Préstamo Hipotecario en el BIESS?

Esta prestación está disponible para todos los asegurados al sistema de seguridad social en el Ecuador que cumplan con criterios mínimos de estabilidad laboral y financiera. Esto incluye a:
* **Afiliados bajo relación de dependencia** (sector público o privado) con relación activa de trabajo.
* **Afiliados voluntarios e independientes** dentro del territorio nacional que paguen sus aportaciones a tiempo.
* **Jubilados por vejez, invalidez** o discapacidad física calificada de forma oficial por la Comecap del IESS.

---

## Requisitos obligatorios para precalificar al crédito

Para que la plataforma informática del BIESS apruebe su solicitud de precalificación inmobiliaria, debe cumplir rigurosamente con los siguientes requisitos del sistema:

1. **Récord de aportaciones**: Acreditar un mínimo de **36 aportaciones mensuales acumuladas** en su cuenta individual del IESS (no simultáneas).
2. **Consecutividad**: Las últimas **12 aportaciones** deben ser consecutivas e inmediatamente anteriores a la fecha de inicio del trámite.
3. **Estabilidad laboral**: El afiliado dependiente debe demostrar un mínimo de 12 meses de estabilidad en su empleo actual.
4. **Capacidad de endeudamiento**: La cuota mensual estimada del dividendo hipotecario no puede superar el 40% de sus ingresos netos declarados en el IESS.
5. **Edad límite del solicitante**: La edad del afiliado al momento de solicitar el préstamo, sumada al plazo total del crédito, no puede superar los 75 años de edad.
6. **Historial crediticio óptimo**: Contar con una calificación de riesgo tipo "A" o "B" en el Buró de Crédito nacional, sin deudas vencidas ni demandas de cobro.
7. **No tener obligaciones patronales o préstamos en mora**: El empleador actual no debe registrar mora patronal, y el afiliado no debe tener préstamos quirografarios en mora ni glosas patronales.

---

## Paso a paso para realizar el trámite de solicitud

El proceso de solicitud del Préstamo Hipotecario es mixto: inicia con una precalificación 100% en línea y continúa con un expediente físico entregado a los asesores del banco. Siga estos pasos sistemáticos para asegurar su aprobación:

### Paso 1: Ingreso al Portal Transaccional del BIESS
Acceda al sitio web oficial del banco [biess.fin.ec](https://www.biess.fin.ec). En el menú principal, seleccione la opción "Préstamos Hipotecarios" y haga clic en el botón de acceso al sistema. Inicie sesión digitando su número de cédula y su clave única de afiliado.

### Paso 2: Selección del Tipo de Producto Inmobiliario
Una vez dentro de su portal de asegurado, elija el destino del crédito. Las opciones disponibles son: Compra de Vivienda Terminada, Construcción de Vivienda, Adquisición de Terreno, Sustitución de Hipoteca o Remodelación/Ampliación de vivienda principal.

### Paso 3: Simulación de Capacidad de Pago y Precalificación
El sistema procesará automáticamente su historial de cotizaciones y su capacidad de pago precalculada. Introduzca el valor comercial estimado de la propiedad y el plazo de años deseado. La plataforma arrojará de forma inmediata el monto preaprobado, la tasa de interés sugerida y la tabla de amortización (cuotas fijas o decrecientes). Si está de acuerdo, presione el botón de "Precalificar".

### Paso 4: Carga y Entrega de Documentación Física
Si obtiene la precalificación favorable en la web, el sistema generará una lista de documentos de soporte. Deberá recopilarlos, imprimir la solicitud firmada y agendar una cita presencial en las oficinas del BIESS o cargar los documentos digitales en la ventanilla virtual habilitada para procesar el expediente.

### Paso 5: Avalúo de la Propiedad e Instrumentación Legal
Un perito calificado por el BIESS acudirá a inspeccionar físicamente el inmueble para determinar su valor real. Tras el avalúo favorable, se elaborará la minuta, se elevará a escritura pública en una notaría y se inscribirá la hipoteca en el Registro de la Propiedad correspondiente para proceder al desembolso al vendedor.

---

## Documentos indispensables para armar su expediente hipotecario

Una vez precalificado en línea, debe presentar los siguientes documentos en perfectas condiciones:

* **Formulario de solicitud de crédito** impreso y firmado por el solicitante y su cónyuge (si aplica) desde el portal web.
* **Copias de cédula de ciudadanía** y papeleta de votación vigentes de los intervinientes.
* **Certificado de ingresos y roles de pago** de los últimos 3 meses, firmados por el representante de talento humano de su empresa.
* **Estados de cuenta bancarios** de los últimos 3 meses que demuestren el flujo de ingresos declarados.
* **Copia de la escritura pública de la propiedad** que se desea adquirir, debidamente inscrita.
* **Certificado de Gravámenes actualizado** emitido por el Registro de la Propiedad (validez no mayor a 30 días calendario).
* **Impuesto Predial pagado** del año fiscal corriente del inmueble objeto del crédito.

---

## Errores frecuentes al solicitar el hipotecario y cómo prevenirlos

* **Mantener deudas pequeñas en mora**: Tener un saldo vencido en una tarjeta de crédito o telefonía, aunque sea de pocos dólares, bloquea instantáneamente la precalificación. Revise su buró crediticio previamente para certificar su calificación de riesgo favorable.
* **Inconsistencias en los datos del empleador**: Si su empresa registra retrasos leves en el pago de planillas patronales del IESS, la plataforma impedirá el trámite por mora patronal involuntaria. Verifique que su empleador esté al día.
* **Falta de actualización de datos bancarios**: Si su cuenta personal de ahorros o corriente no está validada mediante el Centro de Atención Universal del IESS, no se podrá programar el cobro automático de dividendos ni los reembolsos.
* **Exceder la edad máxima de desgravamen**: Intentar solicitar un crédito a 25 años de plazo teniendo 55 años de edad. En este escenario, el plazo se reducirá automáticamente a un máximo de 20 años para cumplir con el límite de 75 años de edad combinada.

---

## Ejemplo práctico de financiamiento en 2026

Tomemos como ejemplo la adquisición de una primera vivienda catalogada como Vivienda de Interés Público (VIP), con un valor comercial total de **$90,000 dólares**.

* **Valor de la propiedad**: $90,000 (Vivienda VIP).
* **Porcentaje de financiamiento**: 100% del valor comercial ($90,000), debido a que no excede el límite de cobertura de $100,000 dólares.
* **Tasa de interés estimada**: 5.99% nominal anual fija.
* **Plazo de amortización**: 25 años (300 dividendos mensuales).
* **Cuota mensual estimada**: Aproximadamente $579 dólares americanos (sistema de cuotas fijas/francesas).
* **Ingreso familiar mínimo requerido**: Un promedio de $1,450 dólares netos demostrables para cumplir con la regla del 40% de capacidad de pago familiar.

---

## Preguntas Frecuentes sobre el Crédito Hipotecario BIESS

### ¿Cuánto tiempo de mora patronal se necesita para que se bloquee el trámite?
Cualquier retraso por parte de su empleador en el pago de las planillas mensuales del IESS (incluso de un solo día después de la fecha máxima de pago el 15 de cada mes) suspende inmediatamente el proceso de precalificación o detiene el desembolso en curso. Es requisito que el empleador esté completamente al día antes de procesar cualquier fase de la solicitud inmobiliaria.

### ¿Se puede realizar abonos al capital o precancelar el Préstamo Hipotecario sin penalización?
Sí, el BIESS permite a todos los clientes realizar abonos parciales directos al capital o precancelar el saldo total de la deuda hipotecaria en cualquier momento de la vigencia del crédito, sin cobro de multas ni penalizaciones financieras de ningún tipo. Los abonos parciales le permitirán reestructurar su deuda eligiendo entre dos opciones: disminuir el monto de la cuota mensual manteniendo el plazo inicial, o recortar el número de años del crédito manteniendo el valor de la cuota mensual.

### ¿Qué sucede con mi Préstamo Hipotecario si me quedo desempleado?
En caso de perder su empleo en relación de dependencia laboral, se activa automáticamente el **Seguro de Desgravamen y Cesantía** incorporado en su dividendo. Además, podrá acogerse a los periodos de gracia y reestructuraciones de deuda que ofrece el BIESS. Le recomendamos acudir de inmediato a las oficinas de coactivas del banco para reportar su situación, evitando que el dividendo acumule intereses de mora o caiga en estado de ejecución judicial.

### ¿Puedo comprar un terreno para construcción con el Préstamo Hipotecario BIESS?
Efectivamente, el BIESS cuenta con un producto financiero específico para la adquisición de terrenos destinados exclusivamente a la construcción de vivienda unifamiliar. Para este fin, el banco financia hasta un **80% del valor del avalúo comercial** del predio, con un plazo máximo de pago de hasta 10 años y tasas de interés competitivas. El terreno debe contar obligatoriamente con escrituras públicas en regla, delimitaciones físicas claras y servicios básicos mínimos instalados.

### ¿Qué es la sustitución de hipoteca en el BIESS?
La sustitución de hipoteca es un mecanismo financiero mediante el cual el BIESS compra la cartera de crédito hipotecario que usted mantenga vigente con cualquier institución financiera privada o cooperativa del Ecuador. Al transferir su hipoteca al BIESS, se cancela la deuda con su banco inicial y se constituye un nuevo crédito con las tasas de interés preferenciales y plazos del seguro social (hasta 25 años), reduciendo significativamente su dividendo mensual.

---

## Enlaces de interés interno para su trámite
* Realice solicitudes inmediatas de fondos de consumo mediante la guía de [Préstamo Quirografario](/procedimiento/prestamo-quirografario) del portal.
* Si trabaja por cuenta propia, revise los beneficios del programa de [Afiliación Voluntaria](/procedimiento/afiliacion-voluntaria) de forma independiente.
* Mantenga al día sus finanzas revisando cómo consultar y gestionar sus acumulados de [Fondos de Reserva](/blog/fondos-de-reserva-iess-consulta-acumulacion-retiro-2026) en línea.
`,
    author: 'fernando-torres',
    publishDate: '2026-01-20',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Vivienda y llaves de casa financiada con préstamo hipotecario del BIESS en Ecuador',
    category: 'Préstamos',
    dateModified: '2026-10-01',
    sources: [
      { label: "Banco del IESS - Crédito Inmobiliario", url: "https://www.biess.fin.ec/hipotecarios", accessedAt: "2026-10-01" },
      { label: "Superintendencia de Bancos del Ecuador - Tasas de Referencia", url: "https://www.superbancos.gob.ec", accessedAt: "2026-10-01" }
    ],
    reviewer: 'eliana-suarez',
    relatedSlugs: [
      'prestamo-quirografario-biess-requisitos-montos-2026',
      'fondos-de-reserva-iess-consulta-acumulacion-retiro-2026',
      'afiliacion-voluntaria-iess-requisitos-beneficios-2026'
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo de mora patronal se necesita para que se bloquee el trámite?',
        a: 'Cualquier retraso por parte de su empleador en el pago de las planillas mensuales del IESS suspende inmediatamente el proceso de precalificación o detiene el desembolso en curso.'
      },
      {
        q: '¿Se puede realizar abonos al capital o precancelar el Préstamo Hipotecario sin penalización?',
        a: 'Sí, el BIESS permite realizar abonos parciales directos al capital o precancelar el saldo total de la deuda hipotecaria en cualquier momento de la vigencia del crédito sin cobro de multas ni penalizaciones.'
      },
      {
        q: '¿Qué sucede con mi Préstamo Hipotecario si me quedo desempleado?',
        a: 'Se activa automáticamente el Seguro de Desgravamen y Cesantía incorporado en su dividendo. Además, podrá acogerse a los periodos de gracia y reestructuraciones de deuda que ofrece el BIESS.'
      },
      {
        q: '¿Puedo comprar un terreno para construcción con el Préstamo Hipotecario BIESS?',
        a: 'Efectivamente, el BIESS cuenta con un producto financiero específico para terrenos que financia hasta un 80% del valor del avalúo comercial, con plazo máximo de pago de hasta 10 años.'
      },
      {
        q: '¿Qué es la sustitución de hipoteca en el BIESS?',
        a: 'La sustitución de hipoteca es un mecanismo mediante el cual el BIESS compra la cartera de crédito hipotecario de otra institución financiera del Ecuador con mejores tasas de interés.'
      }
    ]
  },
  {
    id: 'cesantia-desempleo-2026',
    slug: 'cesantia-seguro-desempleo-iess-como-retirar-2026',
    title: 'Cesantía y Seguro de Desempleo IESS 2026: Cómo Retirar Fondos',
    metaDescription: 'Aprende a retirar tus fondos de cesantía acumulados y a solicitar el seguro de desempleo del IESS en 2026. Plazos de 60 días, requisitos del C.D. 515 y montos.',
    keywords: ['cesantía IESS', 'seguro de desempleo Ecuador', 'retiro cesantía en línea', 'fondos cesantía IESS'],
    content: `
# Cesantía y Seguro de Desempleo IESS: Guía de Retiro en Caso de Cese Laboral

Cuando una persona pierde su empleo en relación de dependencia en Ecuador, el IESS ofrece dos mecanismos de protección económica inmediata: el **Fondo de Cesantía** y el **Seguro de Desempleo**.

---

## 1. Fondo de Cesantía
Es un fondo de ahorro individual obligatorio conformado por el 2% o 3% del salario mensual de aportación del trabajador.

### Requisitos para el Retiro:
* Estar cesante al menos **60 días consecutivos**.
* Contar con al menos **24 aportaciones mensuales no simultáneas**.
* Registro del aviso de salida patronal en el sistema.
* No tener préstamos quirografarios garantizados por la cesantía en estado de impago.

---

## 2. Seguro de Desempleo (Prestación Temporal)
Si el despido fue intempestivo o involuntario, el asegurado puede optar por el seguro de desempleo, que entrega hasta **5 pagos mensuales equivalentes al 70% del salario básico unificado**.
`,
    author: 'fernando-torres',
    publishDate: '2026-01-25',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites',
    dateModified: '2026-10-01',
    sources: [
      { label: "IESS - Reglamento de Cesantía y Desempleo (Res. C.D. 515)", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ministerio del Trabajo - Portal Único de Trámites", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'fondos-reserva-2026',
    slug: 'fondos-de-reserva-iess-consulta-acumulacion-retiro-2026',
    title: 'Fondos de Reserva IESS 2026: Consulta, Retiro y Acumulación',
    metaDescription: 'Descubre cómo consultar y retirar tus Fondos de Reserva en el IESS en 2026. Reglas de 36 aportes, pago mensualizado vs acumulado y solicitud bancaria.',
    keywords: ['fondos de reserva IESS', 'consultar fondos reserva', 'retirar fondos de reserva', 'acumulación fondos reserva'],
    content: `
# Fondos de Reserva IESS 2026: Todo lo que debes saber

El **Fondo de Reserva** es un beneficio de ley equivalente a un mes de sueldo por cada año completo trabajado para el mismo empleador (o el 8.33% de la remuneración mensual).

---

## ¿Mensualizar o Acumular en el IESS?
* **Pago Mensualizado**: El empleador deposita el 8.33% directamente en tu rol de pagos mensual.
* **Acumulación en el IESS**: Si presentas la solicitud de acumulación en el portal web, el empleador transfiere el dinero al IESS para que gane intereses y sirva como garantía crediticia.

---

## ¿Cuándo puedo retirar mis fondos acumulados?
1. **Afiliados activos**: Tras cumplir al menos 36 aportaciones mensuales acumuladas (pueden ser continuas o discontinuas).
2. **Jubilados o mayores de 60 años**: Pueden retirar el saldo total disponible en cualquier momento sin esperar las 36 aportaciones.
3. **Cesantes**: Tras haber transcurrido al menos dos meses de cesantía legal certificada.
`,
    author: 'fernando-torres',
    publishDate: '2026-02-02',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites',
    dateModified: '2026-10-01',
    sources: [
      { label: "Normativa sobre Fondos de Reserva del IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'montepio-pension-2026',
    slug: 'pension-montepio-iess-requisitos-sobrevivientes-2026',
    title: 'Pensión de viudez y orfandad IESS: requisitos y trámite',
    metaDescription: 'Guía completa sobre la pensión de viudez y orfandad (montepío) del IESS en 2026. Requisitos de aportes del fallecido, documentos, pasos y porcentajes.',
    keywords: [
      'viudez y orfandad',
      'orfandad y viudez',
      'viudez',
      'trámite de montepío iess',
      'pensión montepío IESS',
      'muerte de afiliado IESS'
    ],
    content: `
# Pensión de viudez y orfandad IESS: requisitos, porcentaje y trámite de montepío

La **pensión de viudez y orfandad** del IESS (también denominada legalmente montepío) es una prestación económica mensual vitalicia o temporal que protege a los derechohabientes del afiliado o jubilado fallecido que acreditó al menos 60 meses de aportes totales o 6 aportaciones en sus últimos 12 meses laborales.

---

## En resumen: Claves de la pensión de viudez y orfandad

* **Derechohabientes amparados**: Cónyuge o conviviente en unión de hecho legalmente reconocida (viudez), hijos menores de 18 años o hasta 21 años que certifiquen estudios regulares (orfandad), e hijos de cualquier edad con discapacidad total.
* **Aportes indispensables del fallecido**: Acreditar un mínimo de 6 imposiciones mensuales dentro de los últimos 12 meses previos al deceso, o al menos 36 imposiciones totales a lo largo de su historial laboral (o hallarse en goce de jubilación por vejez o invalidez).
* **Distribución de la pensión**: Cuando concurren cónyuge e hijos huérfanos, la viuda o viudo percibe hasta el 40 % de la pensión base y los hijos se reparten el 40 % restante en partes iguales; de no existir hijos, la pensión de viudez alcanza hasta el 60 % // VERIFICAR: confirmar porcentajes exactos con la Dirección de Pensiones del IESS.
* **Cobertura de ascendientes (padres)**: Solo a falta absoluta de cónyuge e hijos con derecho, los padres del causante pueden solicitar montepío si demuestran haber dependido económicamente de él de manera directa y exclusiva.
* **Modalidad del trámite**: El ingreso de la solicitud se realiza de manera 100 % virtual a través del portal oficial iess.gob.ec, con registro de cuenta bancaria personal para transferencias mensuales.

---

## Tabla de beneficiarios, condiciones de acceso y porcentajes de montepío

En el siguiente cuadro se sintetizan las condiciones reglamentarias para cada categoría de derechohabiente según la Ley de Seguridad Social y la normativa interna del IESS:

| Tipo de Beneficiario | Condición Legal y Límite de Edad | Requisitos Probatorios | Porcentaje Estimado de Pensión // VERIFICAR: |
| :--- | :--- | :--- | :--- |
| **Cónyuge sobreviviente (Viudez)** | Matrimonio civil inscrito ante el Registro Civil | Partida de matrimonio y cédula de identidad vigente | 60 % (sin hijos concurrentes) o 40 % (con hijos) |
| **Conviviente en unión de hecho** | Unión de hecho estable y monogámica legalmente registrada | Acta notarial o sentencia judicial inscrita en el Registro Civil | 60 % (sin hijos concurrentes) o 40 % (con hijos) |
| **Hijos menores de edad (Orfandad)** | Menores de 18 años cumplidos | Partida de nacimiento íntegra | 40 % a repartir en cuotas iguales entre los huérfanos |
| **Hijos estudiantes (18 a 21 años)** | Entre 18 y 21 años con matrícula académica activa | Certificado de asistencia regular a universidad o instituto superior | Concurre en la cuota de orfandad (40 % compartido) |
| **Hijos con discapacidad** | Cualquier edad (beneficio vitalicio) | Carné del Conadis/MSP o dictamen pericial de la Comecap | Concurre en la cuota de orfandad permanente |
| **Madre o padre sobreviviente (Ascendientes)** | Sin cónyuge ni hijos concurrentes | Demostración formal de dependencia económica y desamparo | Porción residual reglamentaria fijada por el IESS |

---

## ¿Quién puede cobrar la pensión de viudez y orfandad?

El régimen de seguridad social ecuatoriano establece con rigurosidad las prelaciones y calidades de las personas con derecho a beneficiarse de la prestación económica mensual tras el fallecimiento del afiliado o pensionista.

### 1. Viudez: Cónyuge o conviviente en unión de hecho
Tiene derecho preferente el cónyuge sobreviviente. En el caso de parejas que compartieron una vida en común bajo unión de hecho, esta debe haber sido inscrita solemnemente ante un notario o legalizada en el Registro Civil del Ecuador con anterioridad al fallecimiento. La ley no discrimina por razón de género: ampara tanto a la viuda como al viudo supérstite.

### 2. Orfandad: Hijos biológicos o adoptivos del afiliado fallecido
La pensión de orfandad se distribuye entre los hijos que reúnan cualquiera de las siguientes circunstancias:
* **Menores de 18 años**: El derecho se adquiere de forma inmediata con la sola presentación de la partida de nacimiento que justifique la filiación.
* **Hijos entre 18 y 21 años**: El beneficio se extiende siempre que cursen estudios presenciales o virtuales regulares en entidades educativas reconocidas por el Senescyt o el Ministerio de Educación. La interrupción o abandono de los estudios extingue automáticamente la mensualidad.
* **Hijos con discapacidad física o mental calificada**: Reciben la pensión de orfandad con carácter vitalicio, independientemente de su edad cronológica, tras la respectiva evaluación del Ministerio de Salud Pública o la Comisión Médica Calificadora de Incapacidades (Comecap) del IESS.

### 3. Ascendientes: Pensión para padres desamparados
Si el afiliado o jubilado fallece sin dejar cónyuge, conviviente reconocido ni descendientes directos menores de 21 años o con discapacidad, la madre o el padre pueden solicitar la pensión de montepío. Para ello, deben demostrar de forma pericial que carecen de ingresos propios suficientes y que dependían económicamente de las aportaciones del afiliado causante.

---

## Requisitos de aportes del afiliado fallecido para causar montepío

Para que los familiares sobrevivientes adquieran el derecho a percibir la pensión mensual de viudez y orfandad, el asegurado difunto debía reunir condiciones mínimas en su historial de cotizaciones:

1. **Afiliado activo en relación de dependencia o voluntario**:
   * Registrar al menos **6 imposiciones mensuales continuas o discontinuas dentro de los últimos 12 meses anteriores a la fecha de la defunción**, o
   * Acumular un mínimo histórico de **36 imposiciones mensuales** (3 años de cotizaciones) a lo largo de toda su vida laboral en el IESS.
2. **Afiliado en goce de jubilación (Pensionista de Vejez o Invalidez)**:
   * Genera derecho automático e inmediato de montepío a favor de sus causahabientes desde el mes siguiente a su muerte, sin exigir cotizaciones adicionales en el año corriente.
3. **Muerte por accidente de trabajo o enfermedad profesional**:
   * Si el deceso ocurrió a causa de un siniestro laboral o patología derivada de su actividad productiva, no se exige un tiempo mínimo de aportación previa, siempre que se encuentre cubierto por el Seguro General de Riesgos del Trabajo del IESS.

---

## Documentos obligatorios para tramitar la pensión de viudez y orfandad

Antes de iniciar el registro digital en la plataforma del IESS, los beneficiarios deben digitalizar en formato PDF los siguientes documentos legibles:

* **Partida o certificado de defunción del causante**, debidamente emitida por la Dirección General de Registro Civil, Identificación y Cedulación del Ecuador.
* **Cédula de ciudadanía o identidad** de la viuda, viudo o conviviente supérstite y de todos los hijos solicitantes.
* **Partida de matrimonio íntegra** actualizada o certificado de inscripción de la **unión de hecho** en el Registro Civil.
* **Partidas de nacimiento** de cada uno de los hijos menores de edad o estudiantes.
* **Certificado de estudios vigente** emitido por la universidad, colegio o instituto superior registrado para los hijos de 18 a 21 años.
* **Certificado de cuenta bancaria activa** a nombre personal de cada beneficiario mayor de edad (o del tutor o representante legal de los menores), debidamente validada en el sistema del IESS.
* En caso de discapacidad: **Carné o certificado de discapacidad emitido por el Ministerio de Salud Pública (MSP)** o resolución médica emitida por la Comecap.

---

## Paso a paso: Cómo realizar el trámite de montepío en el IESS

El trámite de viudez y orfandad se procesa principalmente en línea a través de la infraestructura transaccional del seguro social ecuatoriano:

### Paso 1: Certificar el fallecimiento en el Registro Civil
Asegúrate de que la defunción del afiliado esté inscrita y validada en la base de datos nacional del Registro Civil. El sistema informático del IESS cruza los datos en tiempo real antes de permitir la apertura de cualquier solicitud póstuma.

### Paso 2: Acceso al portal institucional del IESS
Ingresa a la página oficial [iess.gob.ec](https://www.iess.gob.ec). En el menú de navegación selecciona la categoría **Servicios en Línea**, ingresa a la pestaña **Asegurados**, luego haz clic en **Pensionistas** y presiona la opción **Montepío**.

### Paso 3: Identificación del derechohabiente
Digita el número de cédula del causahabiente solicitante (viuda, viudo o representante de los hijos huérfanos) y su clave personal de afiliado o pensionista. Si el deudo no cuenta con clave de acceso previa, puede solicitarla siguiendo los pasos de [Cómo obtener la clave del IESS por primera vez](/blog/como-obtener-clave-iess-primera-vez).

### Paso 4: Ingreso de la solicitud de viudez y orfandad
Selecciona la opción "Registro de Solicitud de Montepío". El sistema solicitará la cédula del afiliado fallecido y cargará su historial de imposiciones. Selecciona el tipo de vínculo jurídico (cónyuge, hijo menor de 18 años, hijo estudiante hasta 21 años, o padre dependiente).

### Paso 5: Carga de expedientes y cuenta bancaria
Adjunta los documentos probatorios requeridos en formato digital. Confirma la cuenta de ahorros o corriente bancaria donde se efectuarán las transferencias del dividendo mensual de la pensión.

### Paso 6: Verificación y resolución administrativa
El IESS genera un número de trámite para seguimiento. La Dirección de Pensiones audita el expediente en un plazo regular de 15 a 30 días laborables. Una vez calificada la prestación, se emitirá la resolución que aprueba el pago mensual retroactivo a la fecha de la defunción del causante.

---

## Errores frecuentes al gestionar el montepío y cómo prevenirlos

* **Uniones de hecho no protocolizadas**: Intentar tramitar la pensión de viudez presentando únicamente declaraciones juramentadas notariales realizadas tras la muerte del afiliado. El IESS exige que la unión de hecho se encuentre inscrita formalmente en el Registro Civil con antelación.
* **No actualizar los certificados de estudio anualmente**: En el caso de hijos huérfanos entre 18 y 21 años, no subir la matrícula o certificado de asistencia semestral ocasiona la suspensión inmediata del giro de la pensión mensual de orfandad.
* **Cuentas bancarias de terceros o bloqueadas**: Tratar de registrar la cuenta de un pariente o una cuenta mancomunada. Cada beneficiario mayor de edad debe contar con una cuenta bancaria unipersonal activa y validada.
* **Desconocimiento del derecho de ascendientes**: Asumir que la pensión caduca si el afiliado soltero no tuvo hijos. Si los progenitores dependían económicamente de su salario, tienen derecho a pedir el auxilio póstumo.
* **Aportes insuficientes en el último año**: Presentar la solicitud cuando el afiliado cesante no alcanzó las 6 imposiciones en los 12 meses previos a su muerte ni completó las 36 aportaciones globales. En estos casos, se debe consultar si califica para la devolución de fondos de cesantía o reserva acumulados.

---

## Ejemplo práctico: Cálculo y distribución de una pensión de montepío

Para comprender cómo opera el reparto económico entre viudez y orfandad, analicemos el siguiente caso hipotético:

* **Causante**: Afiliado en relación de dependencia fallecido que devengaba un salario formal promedio de $750 dólares durante sus mejores 5 años de aportación, generando una pensión teórica de vejez estimada en **$600 dólares mensuales**.
* **Sobrevivientes**: Cónyuge supérstite y 2 hijos menores de edad (10 y 14 años).
* **Distribución de la pensión familiar** // VERIFICAR: porcentajes referenciales de distribución:
  * **Porción de Viudez (Cónyuge)**: Al concurrir con hijos menores, recibe el **40 %** de la cuantía base: \`$600 * 40 % = $240 dólares mensuales\`.
  * **Porción de Orfandad (2 Hijos)**: Los descendientes se reparten el **40 %** de la cuantía base en partes iguales: \`$600 * 40 % = $240 dólares\`, correspondiendo a cada hijo un monto de **$120 dólares mensuales**.
  * **Monto total desembolsado por el IESS**: $480 dólares mensuales a la familia sobreviviente, con derecho a transferencias puntuales durante los primeros días de cada mes.

Si los hijos cumplen los 18 años y no continúan estudios superiores, su cuota de orfandad se extingue, y la porción de viudez puede ser recalculada conforme a la reglamentación aplicable de la Dirección de Pensiones.

---

## Preguntas frecuentes sobre viudez y orfandad IESS

### ¿Qué es la pensión de montepío del IESS y quién la recibe?
La pensión de montepío es la renta mensual que otorga el IESS a los deudos de un afiliado o jubilado fallecido. La reciben el cónyuge o conviviente sobreviviente (pensión de viudez), los hijos menores de edad o hasta los 21 años que estudian (pensión de orfandad), los hijos de cualquier edad con discapacidad, y subsidiariamente los padres desamparados económicamente.

### ¿Hasta qué edad pueden cobrar los hijos la pensión de orfandad?
Los hijos cobran la pensión de orfandad automáticamente hasta los 18 años. Si acreditan encontrarse matriculados y asistiendo a clases regulares en colegios, institutos técnicos o universidades, la pensión se extiende hasta los 21 años de edad cumplidos. En el caso de hijos con discapacidad física o intelectual total calificada, la prestación tiene carácter vitalicio.

### ¿Qué pasa con la pensión de viudez si la persona viuda vuelve a casarse?
De acuerdo con la Ley de Seguridad Social ecuatoriana, si el cónyuge o conviviente beneficiario de una pensión de viudez contrae nuevo matrimonio civil o registra una nueva unión de hecho ante las autoridades competentes, pierde de forma automática e irrevocable el derecho a seguir percibiendo la mensualidad de viudez.

### ¿Cuántos aportes debía tener el afiliado fallecido para que sus familiares cobren montepío?
El afiliado causante debía tener al menos 6 imposiciones registradas en los 12 meses previos a su muerte, o un total acumulado mínimo de 36 imposiciones durante su vida laboral. Si la persona ya era jubilada por vejez o invalidez al instante de su muerte, los familiares tienen derecho directo sin requerir aportes recientes.

### ¿Pueden cobrar montepío la viuda y la conviviente al mismo tiempo?
No. El ordenamiento legal ecuatoriano prohíbe la doble asignación marital. Tiene derecho preferente quien justifique el matrimonio subsistente legal, salvo que judicialmente se haya disuelto la sociedad conyugal y se certifique una unión de hecho posterior válidamente inscrita en el Registro Civil con convivencia continuada hasta el momento del fallecimiento.

### ¿Cómo se tramita la pensión de viudez y orfandad si vivo en el extranjero?
Los ecuatorianos migrantes o derechohabientes radicados fuera del país pueden ingresar la solicitud en línea a través de iess.gob.ec con su clave de usuario. Para la documentación emitida en el exterior (certificados de defunción o matrimonios internacionales), estos deben estar debidamente apostillados conforme al Convenio de La Haya o legalizados consularmente.

### ¿Qué trámite deben realizar los hijos estudiantes para no perder la pensión al cumplir 18 años?
Al cumplir los 18 años, el beneficiario de orfandad debe ingresar periódicamente a los servicios en línea del IESS y adjuntar el certificado de matrícula y asistencia vigente extendido por el centro de educación superior avalado. Si no se entrega esta certificación al inicio de cada ciclo académico, el sistema detiene temporalmente la acreditación bancaria de la pensión.

---

## Fuentes oficiales y normativa legal consultada

* **Ley de Seguridad Social del Ecuador (Registro Oficial Suplemento 465)**: Marco general de las prestaciones de viudez, orfandad y auxilios póstumos del Seguro General Obligatorio.
* **Resolución C.D. 554 del Consejo Directivo del IESS**: Normas reguladoras del Seguro de Invalidez, Vejez y Muerte, administración de cuotas y prelación de derechohabientes.
* **Dirección General de Registro Civil, Identificación y Cedulación del Ecuador**: Requisitos para la validación de actas de defunción, uniones de hecho y parentesco filial.

---

## Enlaces internos de interés

* Conoce los requisitos y plazos de la [Jubilación por Vejez](/procedimiento/jubilacion-vejez) para trabajadores con historial completo.
* Si el asegurado cesante requiere proteger sus ingresos, revisa cómo funciona la [Cesantía y Seguro de Desempleo](/blog/cesantia-seguro-desempleo-iess-como-retirar-2026).
* Aprende a verificar tus cotizaciones históricas en la guía de [Consulta de aportes e historial laboral del IESS](/blog/como-consultar-aportes-iess-historial-laboral).
* Revisa cómo gestionar la [Afiliación Voluntaria del IESS](/blog/afiliacion-voluntaria-iess-requisitos-beneficios-2026) para mantener cobertura médica y de jubilación.
`,
    author: 'eliana-suarez',
    publishDate: '2026-02-10',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Trámite de pensión de viudez y orfandad del IESS para cónyuge e hijos sobrevivientes',
    category: 'Jubilación',
    dateModified: '2026-10-09',
    sources: [
      { label: "IESS - Reglamento de Viudez y Orfandad (Montepío)", url: "https://www.iess.gob.ec", accessedAt: "2026-10-09" },
      { label: "Ley de Seguridad Social - Prestaciones por Muerte", url: "https://www.iess.gob.ec/documents/10162/13686/Ley_de_Seguridad_Social", accessedAt: "2026-10-09" },
      { label: "Registro Civil del Ecuador - Certificaciones de Defunción y Parentesco", url: "https://www.registrocivil.gob.ec", accessedAt: "2026-10-09" }
    ],
    reviewer: 'fernando-torres',
    relatedSlugs: [
      'jubilacion-vejez-iess-requisitos-calculo-pension-2026',
      'jubilacion-invalidez-iess-requisitos-comecap-2026',
      'cesantia-seguro-desempleo-iess-como-retirar-2026'
    ],
    faqs: [
      {
        q: '¿Qué es la pensión de montepío del IESS y quién la recibe?',
        a: 'La pensión de montepío es la renta mensual que otorga el IESS a los deudos de un afiliado o jubilado fallecido: cónyuge o conviviente (viudez), hijos menores de edad o hasta 21 años estudiantes (orfandad), e hijos con discapacidad.'
      },
      {
        q: '¿Hasta qué edad pueden cobrar los hijos la pensión de orfandad?',
        a: 'Los hijos cobran automáticamente hasta los 18 años. Si acreditan encontrarse matriculados y asistiendo a estudios regulares en instituciones reconocidas, la pensión se extiende hasta los 21 años. Con discapacidad calificada es vitalicia.'
      },
      {
        q: '¿Qué pasa con la pensión de viudez si la persona viuda vuelve a casarse?',
        a: 'Si el cónyuge o conviviente beneficiario de una pensión de viudez contrae nuevo matrimonio civil o registra una nueva unión de hecho, pierde de forma automática e irrevocable el derecho a percibir la pensión.'
      },
      {
        q: '¿Cuántos aportes debía tener el afiliado fallecido para que sus familiares cobren montepío?',
        a: 'El afiliado causante debía tener al menos 6 imposiciones registradas en los 12 meses previos a su muerte, o un total acumulado mínimo de 36 imposiciones laborales históricas. Los jubilados generan derecho automático.'
      },
      {
        q: '¿Pueden cobrar montepío la viuda y la conviviente al mismo tiempo?',
        a: 'No. El ordenamiento legal ecuatoriano prohíbe la doble asignación marital. Tiene derecho quien justifique el matrimonio formal o la unión de hecho debidamente inscrita en el Registro Civil con convivencia comprobada.'
      },
      {
        q: '¿Cómo se tramita la pensión de viudez y orfandad si vivo en el extranjero?',
        a: 'Se puede ingresar la solicitud en línea a través de iess.gob.ec con clave de usuario. La documentación de defunción o matrimonio generada en el extranjero debe estar debidamente apostillada o legalizada consularmente.'
      },
      {
        q: '¿Qué trámite deben realizar los hijos estudiantes para no perder la pensión al cumplir 18 años?',
        a: 'Deben ingresar a los servicios en línea del IESS y subir el certificado de matrícula y asistencia académica vigente al inicio de cada ciclo escolar o universitario para mantener activa la acreditación mensual.'
      }
    ]
  },
  {
    id: 'jubilacion-invalidez-2026',
    slug: 'jubilacion-invalidez-iess-requisitos-comecap-2026',
    title: 'Jubilación por Invalidez IESS 2026: Requisitos y Evaluación Comecap',
    metaDescription: 'Cómo tramitar la jubilación por invalidez del IESS en 2026. Evaluación de la Comisión Médica (Comecap), grados de incapacidad laboral y aportaciones mínimas.',
    keywords: ['jubilación por invalidez IESS', 'comecap iess', 'enfermedad catastrófica iess jubilación', 'incapacidad permanente iess'],
    content: `
# Jubilación por Invalidez en el IESS: Proceso y Dictamen Médico

La **Jubilación por Invalidez** protege a los trabajadores que, a causa de un accidente común o enfermedad no laboral, sufren una alteración física o psíquica que les incapacita de forma permanente para continuar ejerciendo su profesión.

---

## Requisitos para Calificar ante la Comecap
1. **Aportaciones previas**: Acreditar al menos **60 imposiciones mensuales** (5 años de aportes), de las cuales al menos 6 deben ser continuas e inmediatamente anteriores a la incapacidad.
2. **Dictamen de Incapacidad**: La Comisión de Valuación de Incapacidades (Comecap) debe emitir un informe que certifique un porcentaje de pérdida de capacidad laboral igual o superior al **65%**.
3. **Enfermedades Catastróficas**: Los afiliados diagnosticados con enfermedades oncológicas o insuficiencia renal crónica reciben atención prioritaria y reducción en los plazos reglamentarios de calificación.
`,
    author: 'eliana-suarez',
    publishDate: '2026-02-18',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    category: 'Salud',
    dateModified: '2026-10-01',
    sources: [
      { label: "Normas de Calificación de Discapacidades de Ecuador", url: "https://www.salud.gob.ec", accessedAt: "2026-10-01" },
      { label: "IESS Comisión Médica Comecap", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'glosas-patronales-2026',
    slug: 'impugnacion-glosas-mora-patronal-iess-convenio-pago-2026',
    title: 'Impugnación de Glosas Patronales IESS 2026: Plazos y Descargos',
    metaDescription: 'Guía legal para empleadores y afiliados sobre glosas patronales del IESS en 2026. Plazo de 20 días de impugnación, acuerdos de purga de mora y Resolución C.D. 677.',
    keywords: ['glosas patronales IESS', 'mora patronal ecuador', 'impugnar glosa IESS', 'convenio de pago IESS'],
    content: `
# Impugnación de Glosas y Resolución de Mora Patronal ante el IESS

Las **Glosas Patronales** son determinaciones de deuda económica emitidas por el IESS contra empleadores por presuntas faltas en aportaciones, diferencias salariales o falta de afiliación oportuna.

---

## Plazo Fatal para Impugnar: 20 Días
De acuerdo con el Código Tributario y el Reglamento de Coactivas del IESS:
* El empleador notificado tiene exactamente **20 días hábiles** para presentar su escrito de impugnación formal adjuntando roles de pago firmados, comprobantes bancarios y descargos.
* Si no se impugna en este lapso, la glosa adquiere fuerza coactiva y puede derivar en bloqueos de cuentas bancarias y prohibición de enajenar bienes.

---

## Convenios de Pago y Exoneraciones
Los empleadores que mantengan moras pueden acogerse a los **Convenios de Purga de Mora** hasta a 36 meses plazo, levantando de inmediato los bloqueos crediticios para sus colaboradores.
`,
    author: 'fernando-torres',
    publishDate: '2026-02-24',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites',
    dateModified: '2026-10-01',
    sources: [
      { label: "Código Orgánico General de Procesos - COGEP", url: "https://www.funcionjudicial.gob.ec", accessedAt: "2026-10-01" },
      { label: "IESS - Instructivo para Impugnación de Glosas", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'aviso-entrada-salida-2026',
    slug: 'aviso-entrada-salida-iess-plazos-multas-empleadores-2026',
    title: 'Avisos de Entrada y Salida IESS 2026: Plazos y Sanciones',
    metaDescription: 'Conoce los plazos legales para registrar el aviso de entrada (primer día) y aviso de salida (15 días) en el IESS para 2026. Evita multas y responsabilidad patronal.',
    keywords: ['aviso de entrada IESS', 'aviso de salida IESS', 'afiliación de trabajadores ecuador', 'multas IESS empleador'],
    content: `
# Avisos de Entrada y Salida en el IESS: Marco Legal para Empleadores y Trabajadores

El registro correcto del inicio y fin de la relación laboral es una de las obligaciones patronales más estrictas de la Ley de Seguridad Social.

---

## Plazos Reglamentarios
* **Aviso de Entrada**: Debe registrarse desde el **primer día de labores** del trabajador (hasta un máximo de 15 días posteriores sin recargo retroactivo).
* **Aviso de Salida**: Debe ingresarse dentro de los **15 días hábiles posteriores al cese de la relación laboral**.

---

## Peligros de la Falta de Registro
* Si no se registra la salida, la plataforma continúa facturando planillas mensuales al empleador con intereses de mora acumulados.
* La falta de aviso de salida bloquea al extrabajador para solicitar su jubilación, cesantía o fondo de reserva.
`,
    author: 'fernando-torres',
    publishDate: '2026-03-01',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites',
    dateModified: '2026-10-01',
    sources: [
      { label: "Ley de Seguridad Social, Art. 73", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Reglamento General de Colecturía IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'actualizacion-datos-cau-2026',
    slug: 'actualizacion-datos-cuenta-bancaria-cau-iess-2026',
    title: 'Actualización de Datos IESS 2026: Trámite Virtual de Cuenta Bancaria',
    metaDescription: 'Cómo actualizar tu correo, teléfono y validar tu cuenta bancaria en el IESS en 2026 sin acudir a ventanillas. Requisitos de la Resolución C.D. 625.',
    keywords: ['actualizar datos IESS', 'registrar cuenta bancaria IESS', 'clave IESS desbloqueo', 'CAU iess turnos'],
    content: `
# Actualización de Datos Personales y Registro de Cuenta Bancaria en el IESS

Mantener actualizados tus datos de contacto y tu cuenta bancaria es indispensable para recibir a tiempo los desembolsos de quirografarios, fondos de reserva y subsidios de maternidad o enfermedad.

---

## Pasos para Registrar o Cambiar tu Cuenta Bancaria en Línea:
1. Accede a [iess.gob.ec](https://www.iess.gob.ec) -> **"Servicios en Línea"** -> **"Asegurados"** -> **"Afiliados"** -> **"Actualización de Datos de Afiliado"**.
2. Ingresa tu cédula y clave de usuario.
3. Dirígete a la sección de **"Cuenta Bancaria"** e introduce el banco, tipo de cuenta (ahorros/corriente) y número completo.
4. El sistema cruzará información con el Banco Central del Ecuador (BCE) para validar que la cuenta esté activa y a nombre exclusivo del titular.
`,
    author: 'eliana-suarez',
    publishDate: '2026-03-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites',
    dateModified: '2026-10-01',
    sources: [
      { label: "Banco Central del Ecuador - Validación de Cuentas", url: "https://www.bce.fin.ec", accessedAt: "2026-10-01" },
      { label: "Resolución C.D. 625 - Reglamento de Atención Universal IESS", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ]
  },
  {
    id: 'como-obtener-clave-iess-primera-vez',
    slug: 'como-obtener-clave-iess-primera-vez',
    title: 'Cómo obtener la clave del IESS por primera vez y recuperarla',
    metaDescription: 'Guía paso a paso para obtener tu clave de afiliado del IESS por primera vez en 2026. Proceso virtual, desbloqueo y recuperación rápida.',
    keywords: ['clave del iess por primera vez', 'recuperar clave iess', 'desbloquear clave iess', 'solicitar clave iess'],
    category: 'Trámites',
    publishDate: '2026-03-10',
    dateModified: '2026-10-01',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Proceso virtual para obtener o desbloquear la clave del IESS por primera vez en Ecuador',
    author: 'eliana-suarez',
    reviewer: 'fernando-torres',
    relatedSlugs: [
      'actualizacion-datos-cuenta-bancaria-cau-iess-2026',
      'como-consultar-aportes-iess-historial-laboral',
      'afiliacion-voluntaria-iess-requisitos-beneficios-2026'
    ],
    sources: [
      { label: "IESS - Solicitud de Clave de Afiliado", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Resolución C.D. 625 - Reglamento de Atención Universal", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ],
    faqs: [
      {
        q: '¿Qué se necesita para sacar la clave del IESS por primera vez?',
        a: 'Para obtener la clave del IESS por primera vez necesita ser afiliado activo o cesante, tener su cédula de identidad a la mano, responder preguntas de validación de identidad en el portal y poseer un correo registrado.'
      },
      {
        q: '¿Cuánto tiempo tarda en activarse la clave del IESS luego del desbloqueo virtual?',
        a: 'El proceso de desbloqueo virtual o generación por primera vez es de carácter inmediato. Una vez que apruebe las preguntas de seguridad y confirme el enlace enviado a su correo, la clave se activa en segundos.'
      },
      {
        q: '¿Qué pasa si mi correo electrónico registrado en el IESS ya no está activo?',
        a: 'Si ya no tiene acceso al correo electrónico registrado en el IESS, no podrá completar la validación virtual. En este escenario, deberá acudir de forma presencial a un Centro de Atención Universal (CAU).'
      },
      {
        q: '¿Por qué se bloquea la clave del IESS frecuentemente?',
        a: 'La clave se bloquea de forma automática tras registrar tres intentos fallidos consecutivos en el inicio de sesión. Esto ocurre como una medida estricta de seguridad digital para proteger sus datos personales.'
      },
      {
        q: '¿Puedo solicitar la clave del IESS si soy extranjero sin cédula ecuatoriana?',
        a: 'Sí, los ciudadanos extranjeros con código provisional de afiliación o pasaporte de identificación pueden solicitarla acudiendo presencialmente a ventanillas del IESS con su documento original.'
      }
    ],
    content: `
# Cómo obtener la clave del IESS por primera vez y recuperarla

Para acceder a cualquier trámite o consulta en la plataforma informática de la seguridad social de Ecuador, contar con una clave patronal o personal de asegurado activa es indispensable. Si desea generar su contraseña por primera vez o ha perdido sus credenciales, en este artículo detallamos el proceso digital completo y seguro para restablecer el acceso a su portal transaccional en 2026. Conozca las directrices oficiales para la obtención y desbloqueo de forma autónoma.

## En resumen: Datos clave sobre la obtención de la clave IESS
* **Costo del trámite**: El proceso es 100% gratuito y se realiza directamente en línea sin intermediarios.
* **Requisito fundamental**: Estar previamente registrado en la base de datos del IESS (como afiliado o jubilado).
* **Canal preferente**: Generación virtual a través de la página web oficial iess.gob.ec.
* **Acción presencial**: Obligatoria únicamente si no aprueba las preguntas de validación o su correo está desactualizado.
* **Bloqueo de seguridad**: Tres intentos erróneos bloquean automáticamente el acceso a su cuenta personal.

---

## ¿Cuáles son los requisitos obligatorios para solicitar la clave?

La plataforma del IESS exige que el solicitante apruebe un estricto protocolo de seguridad digital para evitar el robo de identidad y el fraude electrónico. Las condiciones generales obligatorias para generar o cambiar su credencial son las siguientes:

| Tipo de Asegurado | Documento Requerido | Requisito Digital | Canal de Atención |
| :--- | :--- | :--- | :--- |
| **Afiliado Activo** | Cédula de identidad vigente | Correo activo registrado en el IESS | 100% Virtual o presencial |
| **Afiliado Voluntario** | Cédula o pasaporte | Correo y cuenta bancaria validada | 100% Virtual o presencial |
| **Jubilado / Pensionista** | Cédula de ciudadanía | Historial laboral visible | Presencial (Ventanilla CAU) |
| **Extranjero con código** | Pasaporte o credencial de refugiado | Datos de contacto ingresados | Exclusivamente presencial |

---

## Paso a paso para obtener su clave del IESS por primera vez

El trámite de solicitud inicial es completamente digital y puede realizarlo desde cualquier dispositivo con acceso a internet. Siga con precisión estas instrucciones para evitar inconvenientes en la validación:

### Paso 1: Ingreso al Portal de Generación de Claves
Acceda al sitio web oficial [iess.gob.ec](https://www.iess.gob.ec). En la página de inicio, busque y haga clic en la opción **"Trámites Virtuales"**, luego seleccione el portal de **"Asegurados"** y escoja la opción **"Afiliados"**. Finalmente, busque el servicio de **"Generar / Recuperar Clave"**.

### Paso 2: Validación de Identidad y Cédula
El sistema le solicitará ingresar su número de cédula de ciudadanía. Escríbalo de forma continua sin guiones ni espacios. El sistema cruzará información inmediata con la base de datos del Registro Civil de Ecuador para validar que la identidad ingresada corresponda a un asegurado activo o cesante.

### Paso 3: Responder Preguntas Desafío de Seguridad
Para cerciorarse de que usted es el titular legítimo del trámite, la plataforma arrojará una serie de preguntas de opción múltiple referentes a su vida laboral o financiera (por ejemplo: nombres de empleadores anteriores, bancos donde posee cuentas, o meses con aportaciones registradas). Debe responderlas de forma exacta; si falla en tres intentos, el proceso virtual se inhabilitará.

### Paso 4: Confirmación mediante Enlace de Correo
Si supera el cuestionario de preguntas, el sistema le enviará un enlace de verificación de un solo uso al correo electrónico que tiene registrado en la base de datos institucional. Dispone de un plazo máximo de **15 minutos** para abrir el correo, hacer clic en el enlace y definir su nueva clave de acceso de 8 caracteres alfanuméricos.

---

## Cómo recuperar o desbloquear su clave del IESS en línea

Si su clave fue bloqueada debido a intentos incorrectos o no recuerda los caracteres, el portal web del IESS dispone de un canal de recuperación expedito para afiliados activos y cesantes.

1. **Acceder a la opción de recuperación**: Ingrese al portal de ingreso del afiliado en iess.gob.ec y haga clic en el botón de **"¿Olvidó su clave?"**.
2. **Ingreso de datos**: Introduzca su número de cédula y complete el captcha de validación de seguridad visual.
3. **Respuesta a preguntas de control**: Responda las tres preguntas de validación personal que generó al momento de registrar su cuenta por primera vez.
4. **Envío de enlace de desbloqueo**: Si las respuestas son correctas, el portal enviará el enlace de reinicio a su dirección de correo electrónico registrada. Siga las instrucciones del enlace para establecer su contraseña nueva.

---

## Documentos necesarios para el trámite en ventanilla (CAU)

Si no logra superar el cuestionario virtual de seguridad debido a datos obsoletos, o si su correo electrónico registrado ya no existe, debe realizar la actualización biométrica presencial. Los documentos indispensables son:

* **Original de su cédula de identidad** en perfectas condiciones y vigente.
* **Copia de la papeleta de votación** del último proceso electoral obligatorio en Ecuador.
* **Formulario físico de desbloqueo de clave** firmado por el titular del derecho.
* **Certificado de cuenta bancaria** activo y emitido por su entidad financiera nacional (si desea validar cuenta a la par).

---

## Errores frecuentes al gestionar su clave de seguridad y cómo prevenirlos

* **Equivocarse en las preguntas de control financiero**: Muchas personas olvidan el nombre legal exacto de sus empleadores históricos y fallan las preguntas. Le sugerimos revisar previamente su historial laboral o roles de pago viejos para refrescar la memoria.
* **Retraso en abrir el enlace de correo**: El correo de confirmación de clave suele tardar de 1 a 2 minutos. Si no hace clic en el enlace dentro de los 15 minutos reglamentarios, el token de seguridad caducará y tendrá que reiniciar todo el trámite.
* **Usar claves genéricas o fáciles de adivinar**: El sistema rechaza claves simples como fechas de nacimiento, secuencias consecutivas (12345678) o nombres propios. Utilice una combinación de letras mayúsculas, minúsculas y números para salvaguardar sus datos.

---

## Ejemplo práctico de restablecimiento de accesos en 2026

Supongamos que un afiliado independiente desea recuperar su contraseña bloqueada en el mes de marzo del año **2026**.

* **Estado inicial**: Clave bloqueada por 3 intentos fallidos consecutivos tras confundir su contraseña con la de su banca en línea.
* **Acción virtual**: Ingresa a iess.gob.ec, presiona "Desbloquear clave", introduce cédula y aprueba las preguntas desafío referentes a su SBU estimado en la aportación.
* **Aprobación de token**: Recibe en su buzón de correo personal el token biométrico digital de confirmación.
* **Resultado**: Al hacer clic en el enlace, el afiliado ingresa una nueva contraseña robusta y retoma de inmediato el control de su cuenta para consultar aportaciones o solicitar créditos en el BIESS.

---

## Preguntas Frecuentes sobre la clave de afiliado del IESS

### ¿Qué puedo hacer si se inhabilita el proceso digital por responder mal las preguntas de control?
Si falla las preguntas de validación personal de forma repetida, el sistema bloqueará temporalmente la opción digital por seguridad. En este caso, la única alternativa legal para salvaguardar la integridad de su información es acudir de forma presencial a un Centro de Atención Universal del IESS con su cédula de identidad para que un analista verifique su identidad en ventanilla y proceda a resetear su cuenta.

### ¿Se puede solicitar el desbloqueo de clave mediante un tercero o con una carta de autorización?
No, el trámite de desbloqueo de clave del IESS o la entrega de contraseñas es un procedimiento estrictas y estrictamente **personal e intransferible** por motivos de confidencialidad de datos. No se acepta delegar el trámite mediante cartas de autorización simples. Únicamente se procesará a través de un tercero en caso de poseer un poder notarial amplio y específico que faculte la gestión ante el IESS.

### ¿Qué características de seguridad debe cumplir mi nueva clave del IESS?
La contraseña del portal de asegurados debe cumplir obligatoriamente con una serie de criterios de complejidad para ser aceptada por los servidores de la institución: debe tener una extensión exacta de entre 8 y 15 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número del 0 al 9, y no poseer caracteres especiales como asteriscos, guiones o barras.

### ¿Tiene algún costo o vigencia la clave que genero por internet?
La generación de su clave por primera vez y su posterior utilización en línea es un servicio de carácter **gratuito e indefinido**. No tiene fecha de caducidad obligatoria, sin embargo, los protocolos de seguridad digital de la institución sugieren realizar un cambio voluntario de la contraseña al menos una vez al año para mitigar riesgos de vulnerabilidades cibernéticas.

### ¿Puedo utilizar la misma clave de afiliado para el portal transaccional del BIESS?
Efectivamente, la clave personal que asigne a su cuenta de asegurado en el portal general del IESS es la misma credencial de validación de identidad que utilizará para ingresar al sistema de préstamos quirografarios o hipotecarios del portal del BIESS. No requiere generar contraseñas diferenciadas para ambas plataformas.

---

## Enlaces de interés interno para su trámite
* Tras obtener su clave de seguridad, aprenda a [Consultar aportaciones e historial laboral](/blog/como-consultar-aportes-iess-historial-laboral) en línea.
* Gestione sus finanzas solicitando de manera ágil un [Préstamo Quirografario BIESS](/procedimiento/prestamo-quirografario) con su nueva credencial.
* Explore los requisitos necesarios para afiliarse por su cuenta mediante la guía de [Afiliación Voluntaria](/procedimiento/afiliacion-voluntaria) del portal.
`
  },
  {
    id: 'como-consultar-aportes-iess-historial-laboral',
    slug: 'como-consultar-aportes-iess-historial-laboral',
    title: 'Cómo consultar aportes del IESS e historial laboral en línea',
    metaDescription: 'Guía completa para consultar tus aportaciones del IESS y descargar tu historial laboral en 2026. Requisitos, cálculo de aportes y pasos digitales.',
    keywords: ['consultar aportes iess', 'historial laboral iess', 'aportaciones iess', 'iess historial de aportes'],
    category: 'Trámites',
    publishDate: '2026-03-12',
    dateModified: '2026-10-01',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Visualización digital del historial laboral y aportaciones acumuladas en la plataforma del IESS de Ecuador',
    author: 'fernando-torres',
    reviewer: 'eliana-suarez',
    relatedSlugs: [
      'como-obtener-clave-iess-primera-vez',
      'fondos-de-reserva-iess-consulta-acumulacion-retiro-2026',
      'jubilacion-por-vejez-requisitos-2026'
    ],
    sources: [
      { label: "IESS - Consulta de Aportes en Línea", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ley de Seguridad Social de Ecuador - Artículos de Recaudación", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ],
    faqs: [
      {
        q: '¿Cómo puedo saber cuántas aportaciones tengo acumuladas en el IESS?',
        a: 'Para consultar el número total de aportaciones, ingrese a iess.gob.ec -> Asegurados -> Afiliados -> Historial Laboral. Coloque su cédula y clave. En la sección "Aportes" podrá visualizar el desglose consolidado de sus imposiciones.'
      },
      {
        q: '¿Por qué no se reflejan mis aportes del mes actual en el historial laboral?',
        a: 'Los empleadores tienen plazo legal de pago de planillas hasta el día 15 del mes siguiente al laborado. Por consiguiente, el aporte del mes en curso se verá reflejado en su historial laboral después del pago patronal.'
      },
      {
        q: '¿Se puede descargar el historial de aportes en formato PDF oficial?',
        a: 'Sí, la plataforma del IESS permite generar y descargar un documento consolidado de su historial de aportes en formato PDF, el cual cuenta con un código QR y firma digital para validez legal de trámites.'
      },
      {
        q: '¿Qué hacer si detecto que un empleador no pagó mis aportes al IESS?',
        a: 'Si constata la falta de aportes de un empleador, puede entablar una queja formal digital o reclamo por falta de afiliación en iess.gob.ec. El IESS iniciará una inspección patronal y emitirá glosas con intereses.'
      },
      {
        q: '¿Las aportaciones acumuladas con distintos empleadores se suman para la jubilación?',
        a: 'Efectivamente, todas las cotizaciones y aportes mensuales registrados legítimamente a lo largo de su trayectoria profesional se suman y consolidan de forma automática en su historial laboral unificado.'
      }
    ],
    content: `
# Cómo consultar aportes del IESS e historial laboral en línea

El historial laboral unificado es el documento digital más relevante para los asegurados en Ecuador, ya que detalla con exactitud las imposiciones mensuales acumuladas a lo largo de su vida laboral activa. Si necesita verificar si su empleador se encuentra al día con los pagos patronales, calcular su proyección para jubilación, o certificar su tiempo de servicio para créditos del BIESS, en esta guía detallamos cómo consultar y descargar sus aportes en 2026.

## En resumen: Datos clave sobre el historial de aportes IESS
* **Gratuidad del servicio**: La consulta y descarga de aportes no tiene costo alguno en el portal.
* **Tiempo de actualización**: Los aportes se registran hasta el 15 del mes siguiente al laborado.
* **Uso primordial**: Indispensable para calificar a préstamos quirografarios o iniciar trámites de pensión.
* **Validación de autenticidad**: El historial en PDF cuenta con un código de validación seguro.
* **Resolución de inconsistencias**: Permite identificar mora patronal de empleadores a tiempo para evitar multas.

---

## Estructura de aportación ordinaria en Ecuador (Tasa de cotización)

El monto aportado mensualmente a su cuenta individual del IESS depende directamente de su salario declarado en nómina. El aporte es compartido entre el trabajador y el empleador.

La estructura oficial de aportaciones se define de la siguiente manera:

| Tipo de Afiliado | Aporte Personal (% de sueldo) | Aporte Patronal (% de sueldo) | Cotización Total Acumulada |
| :--- | :--- | :--- | :--- |
| **Bajo relación de dependencia** | 9.45% (descuento al trabajador) | 11.15% (pago del empleador) | 20.60% del salario neto |
| **Afiliado Voluntario** | 17.60% (asumido por el titular) | 0.00% (sin empleador) | 17.60% del salario neto |
| **Servidor Público ordinario** | 11.45% (descuento en rol) | 9.15% (asumido por el Estado) | 20.60% del salario neto |
| **Trabajador Independiente** | 17.60% (asumido por el titular) | 0.00% (sin empleador) | 17.60% del salario neto |

---

## Paso a paso para consultar su historial de aportes por internet

Siga estas indicaciones técnicas para ingresar al módulo de consulta laboral del IESS y visualizar su historial consolidado:

### Paso 1: Acceso al Sistema de Afiliados
Ingrese a la dirección web oficial [iess.gob.ec](https://www.iess.gob.ec). En la barra superior de servicios interactivos, seleccione **"Servicios en Línea"**, haga clic en **"Asegurados"** y escoja la opción de **"Afiliados"**. En el catálogo digital, busque el servicio denominado **"Historial Laboral"**.

### Paso 2: Validación con Credenciales de Acceso
Digite su número de cédula de ciudadanía de 10 dígitos y su clave de seguridad personal unificada. Resuelva las comprobaciones de captcha si la plataforma se las solicita por seguridad del servidor.

### Paso 3: Visualización de Imposiciones Consolidadas
Una vez dentro del portal personal del afiliado, diríjase al menú lateral izquierdo y seleccione la opción **"Consultas"**, luego haga clic en **"Aportes"**. El sistema le mostrará una tabla interactiva detallada con todos los meses cotizados, salarios declarados, nombres de empleadores de nómina y el estado del pago del aporte (si consta cancelado, en planilla o en mora).

### Paso 4: Generación y Descarga del Historial Laboral consolidado
Para certificar su tiempo de aportaciones ante entidades externas o bancarias:
1. En el menú de consultas, seleccione **"Historial Laboral"** o **"Resumen de Aportes"**.
2. El portal web compilará toda su información de trayectoria y generará un archivo consolidado en formato PDF.
3. Descargue el archivo en su ordenador. Verifique que cuente con el sello digital, código QR de validación y firma de control oficial del IESS para su plena validez en trámites.

---

## Documentos necesarios para reclamos de aportaciones omitidas

Si al consultar su historial constata que faltan meses aportados o que un empleador nunca reportó su afiliación debidamente:

* **Roles de pago originales** firmados por el representante legal o sellados por el departamento contable de la empresa.
* **Contrato de trabajo legalizado** debidamente ingresado ante el Ministerio del Trabajo de Ecuador.
* **Copia de los estados de cuenta bancarios** de nómina que demuestren el depósito regular de su sueldo mensual.
* **Acta de finiquito o liquidación** de ser el caso en que se haya finalizado la relación laboral del reclamante.

---

## Errores comunes al revisar sus imposiciones acumuladas

* **Creer que el aporte del mes actual se refleja inmediatamente**: Muchos afiliados revisan el sistema el día 5 de cada mes y creen que hay mora. Los empleadores disponen legalmente hasta el día 15 de cada mes para cancelar las planillas de cotización del mes anterior.
* **Confundir aportes simultáneos como imposiciones dobles**: Si trabaja para dos empleadores al mismo tiempo en el mismo mes, acumula aportación doble en dinero, pero para el cómputo de la jubilación solo se contabiliza como **una sola imposición de tiempo mensual** ordinaria.
* **No actualizar su cuenta bancaria para subsidios asociados**: Si el historial de aportes está completo pero no tiene la cuenta registrada en el CAU, los subsidios derivados de esas aportaciones (por enfermedad o maternidad) no se acreditarán.

---

## Ejemplo práctico del cálculo de aportaciones en 2026

Veamos cómo se realiza el cálculo mensual de cotización para un afiliado dependiente en el año **2026** que percibe un sueldo mensual básico de **$1,000 dólares**.

* **Sueldo bruto nominal**: $1,000.
* **Aporte personal (9.45%)**: Se descuenta $94.50 dólares directamente de su rol de pagos mensual.
* **Aporte patronal (11.15%)**: El empleador asume el pago de $111.50 dólares por su cuenta (este valor no se descuenta de su salario).
* **Ingreso total en las arcas del IESS**: $206.00 dólares destinados a financiar sus fondos individuales y de salud general.
* **Resultado en el Historial**: Tras realizarse el depósito patronal, el historial laboral unificado sumará automáticamente una (1) imposición consolidada para el récord de su jubilación.

---

## Preguntas Frecuentes sobre el Historial Laboral del IESS

### ¿Qué significa el estado "En Planilla" en mi historial de aportaciones?
El estado "En Planilla" indica que su empleador ya ha generado la planilla mensual de pago en el módulo del IESS y el valor está precalculado, pero todavía no se ha efectivizado el depósito de dinero correspondiente. Este estado suele aparecer entre el 1 y el 14 de cada mes y es una situación ordinaria previa al cobro definitivo de aportes.

### ¿Se pueden recuperar aportaciones omitidas por una empresa que ya cerró o quebró?
Sí, es factible reclamar aportaciones de empresas disueltas o liquidadas. Debe ingresar una denuncia formal ante la Dirección de Inspección y Control de Recaudación del IESS adjuntando todos sus justificativos documentales de relación laboral histórica. El IESS establecerá una glosa de cobro coactivo con intereses y multas acumulados en contra de los antiguos accionistas y representantes legales.

### ¿Cuántos aportes necesito para solicitar mi préstamo quirografario del BIESS?
Para calificar a un crédito quirografario del BIESS en 2026, el sistema exige un mínimo de **36 aportaciones mensuales totales acumuladas** a lo largo de su vida laboral activa. Adicionalmente, las últimas **12 aportaciones** deben ser consecutivas e inmediatamente anteriores a la fecha en que ingresa su simulación crediticia.

### ¿Qué validez legal tiene el historial laboral en PDF que descargo de internet?
El historial de aportaciones unificado descargado de la plataforma del IESS cuenta con plena validez jurídica para cualquier trámite legal, administrativo o consular dentro y fuera del país. Esto se debe a que incorpora un certificado de firma electrónica del IESS y un código QR único que permite a los funcionarios verificar su autenticidad en tiempo real.

### ¿Puedo unificar las aportaciones si he cotizado como voluntario y bajo dependencia laboral?
Sí, las aportaciones realizadas de forma independiente como afiliado voluntario y las acumuladas como trabajador en relación de dependencia laboral se consolidan y unifican de forma **automática** bajo su número único de cédula en su historial laboral general. No requiere realizar trámites de homologación o unificación presenciales.

---

## Enlaces de interés interno para su trámite
* Tras certificar sus aportaciones, consulte las condiciones para acceder a la [Jubilación por Vejez IESS](/procedimiento/jubilacion-vejez) del portal.
* Gestione sus finanzas personales solicitando un [Préstamo Quirografario BIESS](/procedimiento/prestamo-quirografario) de manera virtual.
* Si le falta la clave para ingresar al portal de consultas, revise cómo [Obtener y Desbloquear su clave del IESS](/blog/como-obtener-clave-iess-primera-vez) en minutos.
`
  },
  {
    id: 'como-saber-si-estoy-afiliado-al-iess',
    slug: 'como-saber-si-estoy-afiliado-al-iess',
    title: 'Cómo saber si estoy afiliado al IESS: Consulta de estado',
    metaDescription: 'Guía oficial paso a paso para consultar si estás afiliado al IESS en 2026. Descarga tu certificado de afiliación y verifica tu estado laboral actual.',
    keywords: ['cómo saber si estoy afiliado al IESS', 'consultar afiliación IESS', 'certificado de afiliación IESS', 'verificar afiliación IESS'],
    category: 'Trámites',
    publishDate: '2026-03-15',
    dateModified: '2026-10-01',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Formulario digital para verificar el estado de afiliación activa o cesante en el IESS',
    author: 'eliana-suarez',
    reviewer: 'fernando-torres',
    relatedSlugs: [
      'como-obtener-clave-iess-primera-vez',
      'como-consultar-aportes-iess-historial-laboral',
      'certificado-de-afiliacion-iess-descargar'
    ],
    sources: [
      { label: "IESS - Consulta de Afiliación", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ley de Seguridad Social de Ecuador - Derechos del Afiliado", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" }
    ],
    faqs: [
      {
        q: '¿Cómo puedo verificar si estoy afiliado al IESS solo con mi número de cédula?',
        a: 'Para consultar si se encuentra afiliado, ingrese al portal oficial del IESS (iess.gob.ec), diríjase a la sección "Servicios en Línea", seleccione "Asegurados" -> "Ciudadanos" y elija la opción "Certificado de Afiliación". Digite su número de cédula de ciudadanía de diez dígitos y su fecha de nacimiento; el sistema generará de forma inmediata su estado de afiliación actual sin necesidad de clave.'
      },
      {
        q: '¿Qué significa el estado "Cesante" en mi consulta de afiliación del IESS?',
        a: 'El estado de "Cesante" significa que actualmente no registra aportaciones activas al sistema de seguridad social. Esto sucede comúnmente cuando un afiliado bajo relación de dependencia ha sido desvinculado de su puesto de trabajo y su antiguo empleador ya registró el aviso de salida obligatorio en la plataforma transaccional.'
      },
      {
        q: '¿Cuánto tiempo tiene un empleador para registrar mi afiliación al IESS?',
        a: 'De acuerdo con el artículo 73 de la Ley de Seguridad Social, el empleador tiene la obligación legal de registrar el aviso de entrada desde el primer día de labores del trabajador. El registro extemporáneo genera sanciones de mora patronal, intereses y responsabilidad patronal en caso de siniestros o atenciones médicas.'
      },
      {
        q: '¿Puedo recibir atención médica si mi empleador está en mora con el IESS?',
        a: 'Sí, los afiliados bajo relación de dependencia tienen derecho a recibir atención médica de emergencia y maternidad aun cuando su empleador se encuentre en mora. No obstante, el IESS cobrará posteriormente al empleador moroso todos los costos de la atención brindada mediante glosas de responsabilidad patronal.'
      },
      {
        q: '¿Qué validez legal tiene el certificado de afiliación que descargo por internet?',
        a: 'El certificado de afiliación descargado del portal del IESS en formato PDF tiene plena validez legal en Ecuador para cualquier trámite institucional, académico, laboral o consular. El documento cuenta con una firma digital institucional y un código QR de validación que permite verificar su autenticidad en tiempo real.'
      },
      {
        q: '¿Cómo puedo afiliarme de forma independiente si mi consulta dice que estoy cesante?',
        a: 'Si se encuentra cesante y trabaja de forma autónoma o independiente, puede solicitar la afiliación voluntaria en línea. Debe ingresar a la opción de "Afiliación Voluntaria" en el portal web, colocar su número de cédula y declarar un ingreso mensual no menor al Salario Básico Unificado vigente ($482 para el año 2026) para cotizar con la tasa de aportación del 17.60%.'
      }
    ],
    content: `
# Cómo saber si estoy afiliado al IESS: Guía de Consulta de Estado

Para verificar si te encuentras registrado activamente en el sistema de seguridad social de Ecuador, puedes realizar una consulta rápida en línea utilizando tu número de cédula. Este servicio virtual te permite conocer de forma inmediata si estás afiliado al IESS, si tu empleador ha registrado tu aviso de entrada de manera oportuna, o si te encuentras en estado cesante. Conocer tu estado de aportación es fundamental para acceder a servicios de salud, solicitar préstamos quirografarios o planificar tu jubilación en el año 2026.

---

## En resumen: Datos clave sobre la verificación de afiliación al IESS
* **Costo del trámite**: El proceso de consulta y descarga del certificado de afiliación es 100% gratuito.
* **Requisito de acceso**: Únicamente se requiere el número de cédula de ciudadanía o el código provisional para extranjeros. No se requiere clave de usuario.
* **Tipos de estado**: El sistema mostrará tres estados posibles: Activo, Cesante o No Registrado.
* **Actualización del sistema**: Los avisos de entrada o de salida se reflejan de forma inmediata una vez procesados por el empleador.
* **Validez legal**: El certificado en formato PDF descargado tiene vigencia de 30 días y cuenta con validación por código QR.

---

## ¿Cuáles son los estados de afiliación en el IESS y qué significan?

Cuando realizas la consulta en la plataforma oficial del IESS, el sistema cruzará tu información de identidad y aportes para emitir un diagnóstico de tu situación de aseguramiento. Es indispensable comprender qué implica cada uno de los estados reportados para evitar sorpresas al momento de requerir servicios médicos o prestaciones económicas:

| Estado Reportado | Significado Legal | Cobertura de Salud Activa | Acceso a Créditos BIESS |
| :--- | :--- | :--- | :--- |
| **Activo** | Registras aportaciones vigentes bajo relación de dependencia, voluntaria o independiente. | Sí, de forma ilimitada (tras cumplir meses de carencia). | Sí, sujeto a requisitos de aportación acumulada. |
| **Cesante** | Has dejado de cotizar. El empleador registró tu aviso de salida o suspendiste el pago voluntario. | Sí, hasta 60 días de protección de salud posterior al cese. | No, no se puede calificar a nuevos préstamos estando cesante. |
| **No Registrado / Sin historial** | Tu número de cédula no se encuentra ingresado en la base de datos de asegurados del IESS. | No, sin acceso a prestaciones médicas ni de jubilación. | No, requiere historial previo de cotizaciones. |

---

## Paso a paso para consultar si estás afiliado al IESS en línea

El Instituto Ecuatoriano de Seguridad Social ha simplificado este proceso para que cualquier ciudadano pueda verificar su estado laboral sin necesidad de ingresar con una contraseña. Siga estas instrucciones detalladas para realizar la consulta de manera rápida y segura:

### Paso 1: Navegar a la sección de Certificados en Línea
Abre tu navegador de internet favorito y dirígete al portal web oficial del IESS: [iess.gob.ec](https://www.iess.gob.ec). En el menú principal de la página, busca la pestaña **"Servicios en Línea"**, desliza el cursor y haz clic en **"Asegurados"**. A continuación, selecciona la opción **"Ciudadanos"** y pulsa sobre el enlace interactivo denominado **"Certificado de Afiliación"**.

### Paso 2: Ingresar los datos de identidad
Una vez redirigido a la aplicación web de certificados de afiliación, el sistema te solicitará ingresar los datos del consultante. Introduce tu número de cédula de ciudadanía de 10 dígitos de forma continua (sin utilizar guiones o espacios). En el siguiente campo, digita tu fecha de nacimiento seleccionando el día, mes y año en el calendario interactivo que aparece en pantalla.

### Paso 3: Responder la verificación de seguridad
Por motivos de protección contra sistemas automatizados y seguridad de datos personales, el portal web del IESS te pedirá que completes un captcha sencillo o ingreses caracteres de validación visual. Digita los caracteres tal como aparecen en la imagen y haz clic en el botón de **"Consultar"**.

### Paso 4: Visualizar el estado y descargar el Certificado en PDF
La plataforma procesará la solicitud en fracciones de segundo. Si te encuentras afiliado de forma activa, la pantalla mostrará un botón interactivo para **"Descargar Certificado de Afiliación"**. Al hacer clic en este botón, se generará y guardará de forma automática un archivo en formato PDF en tu dispositivo. Este documento certifica oficialmente tus derechos vigentes y detalla si te encuentras cotizando como afiliado activo.

---

## Documentos necesarios para regularizar tu estado de afiliación

En situaciones donde la consulta digital arroje un estado erróneo, o si trabajas en una empresa y tu estado sigue apareciendo como "Cesante" debido a una omisión patronal, deberás recopilar documentación probatoria para interponer un reclamo formal ante el IESS:

* **Original de la cédula de ciudadanía** del asegurado afectado.
* **Copia del contrato de trabajo** debidamente registrado y legalizado ante el Ministerio del Trabajo de Ecuador.
* **Roles de pago mensuales** debidamente firmados y sellados que evidencien el descuento del aporte personal del 9.45%.
* **Certificado de cuenta bancaria** validado por el IESS para descartar problemas de cobros anteriores.
* **Historial de transacciones de aportes** (para cotejar si existen meses de mora que impidan la emisión regular de tus certificados de derechos).

---

## Errores frecuentes al consultar el estado de afiliación y cómo evitarlos

* **Ingresar el número de cédula con guión o espacios**: La plataforma informática del IESS es sensible a los caracteres especiales. Si ingresas el guión intermedio de tu cédula, el sistema arrojará un error de formato. Escribe los 10 dígitos numéricos de forma completamente unida.
* **Confundir la vigencia del certificado**: El certificado de afiliación descargado tiene una vigencia de validez de exactamente **30 días de calendario** a partir de la fecha de su emisión. Si presentas un documento impreso con una antigüedad mayor para un trámite público o privado, será rechazado y deberás descargarlo nuevamente en línea.
* **Suponer que el aviso de entrada es inmediato para la cobertura de salud**: Aunque el aviso de entrada te califica como activo en pocas horas, para gozar de atención médica de especialidad (no emergencias), el IESS exige un período mínimo de cotización continua (generalmente 3 meses consecutivos de aportes para afiliados dependientes y 6 meses para voluntarios).

---

## Ejemplo práctico de verificación de afiliación en 2026

Supongamos la situación de un trabajador que inicia sus labores en una empresa privada en la ciudad de Quito en el mes de marzo de **2026**.

* **Día de inicio laboral**: 2 de marzo de 2026.
* **Salario acordado**: $500.00 mensuales (superior al Salario Básico Unificado de $482 proyectado para 2026).
* **Acción del empleador**: Registra el aviso de entrada el mismo 2 de marzo de 2026 para cumplir con el artículo 73 de la Ley de Seguridad Social.
* **Verificación del trabajador**: El 3 de marzo de 2026, el trabajador ingresa a iess.gob.ec, digita su cédula y descarga su certificado de afiliación.
* **Resultado de la consulta**: El estado reportado es **"Activo"**, confirmando que ya se encuentra protegido por el seguro general obligatorio y acumulando imposiciones para su historial.

---

## Preguntas Frecuentes sobre la verificación de afiliación al IESS

### ¿Por qué mi consulta de afiliación dice "No registra aportaciones" si estoy trabajando actualmente?
Este problema suele originarse por dos causas comunes: la primera es que tu empleador aún no ha registrado tu aviso de entrada en el sistema transaccional del IESS, lo cual constituye una infracción legal sujeta a multas. La segunda causa es que la empresa se encuentra en mora patronal severa y las planillas mensuales de aportes no han sido canceladas. En ambos escenarios, debes solicitar de inmediato al departamento de recursos humanos la regularización de tu situación o ingresar una queja laboral en línea.

### ¿Puedo descargar mi certificado de afiliación si soy extranjero con código provisional?
Sí, los ciudadanos extranjeros que se encuentran afiliados al IESS bajo un código provisional de afiliación o que cotizan mediante su número de pasaporte pueden consultar su estado y descargar su certificado de afiliación oficial. El proceso es idéntico: deben ingresar al portal de consulta de certificados y digitar su código de afiliación asignado de forma manual en lugar del número de cédula tradicional.

### ¿Se puede consultar el estado de afiliación de una persona fallecida?
No de forma directa a través del módulo simplificado para ciudadanos. Por motivos de privacidad de datos, el sistema de consulta en línea bloquea la generación de certificados de afiliación activos para personas cuyo estado civil consta como fallecido en la base de datos unificada del Registro Civil de Ecuador. Los familiares que requieran certificar el historial laboral de un afiliado fallecido para trámites de pensión de montepío o auxilio de funerales deben realizar la solicitud presencialmente en ventanillas del IESS.

### ¿La consulta de afiliación sirve para verificar si estoy afiliado al Seguro Social Campesino?
Efectivamente, la base de datos general del IESS consolida la información de todos los regímenes prestacionales del país. Al realizar la consulta en línea, si te encuentras registrado bajo el régimen especial del Seguro Social Campesino (SSC), el certificado de afiliación emitido detallará expresamente tu condición de beneficiario activo de este seguro, indicando la provincia y el dispensario médico campesino al cual te encuentras adscrito.

### ¿Por cuánto tiempo se mantiene mi cobertura médica en el IESS si me quedo desempleado?
El Reglamento de Salud del IESS contempla un periodo de gracia denominado **"Periodo de Protección"** para todos los afiliados bajo relación de dependencia que han quedado cesantes. Durante un lapso máximo de **60 días consecutivos (2 meses)** posteriores a la fecha de registro del aviso de salida laboral, el asegurado y sus dependientes calificados mantienen plenamente el derecho a recibir atención médica general, ginecológica, odontológica y de maternidad en los centros de salud de la red institucional.

---

## Enlaces de interés interno para su trámite
* Aprende a descargar el documento en la guía paso a paso de [Descarga de Certificado de Afiliación](/blog/certificado-de-afiliacion-iess-descargar).
* Si te encuentras cesante, revisa cómo reactivar tus derechos mediante la [Afiliación Voluntaria en Ecuador](/procedimiento/afiliacion-voluntaria).
* Una vez confirmado tu estado activo, puedes proceder a [Consultar tus aportes e historial laboral](/blog/como-consultar-aportes-iess-historial-laboral) acumulados en línea.
`
  },
  {
    id: 'afiliacion-trabajo-hogar-iess-requisitos',
    slug: 'afiliacion-trabajo-hogar-iess-requisitos',
    title: 'Afiliación trabajo hogar IESS requisitos y costo 2026',
    metaDescription: 'Requisitos, costo mensual y beneficios de la afiliación para trabajadoras del hogar y amas de casa en el IESS para 2026. Guía de registro paso a paso.',
    keywords: ['afiliación trabajo hogar IESS requisitos', 'afiliar trabajadora del hogar IESS', 'seguro de amas de casa IESS', 'costo afiliación doméstica'],
    category: 'Trámites',
    publishDate: '2026-03-18',
    dateModified: '2026-10-01',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Afiliación a la seguridad social para personas trabajadoras del hogar y amas de casa en Ecuador',
    author: 'fernando-torres',
    reviewer: 'eliana-suarez',
    relatedSlugs: [
      'como-obtener-clave-iess-primera-vez',
      'como-consultar-aportes-iess-historial-laboral',
      'afiliacion-voluntaria-iess-requisitos-beneficios-2026'
    ],
    sources: [
      { label: "Ley de Seguridad Social de Ecuador - Régimen Especial de Trabajo del Hogar", url: "https://www.iess.gob.ec", accessedAt: "2026-10-01" },
      { label: "Ministerio del Trabajo de Ecuador - Tablas de Salarios Mínimos Domestic", url: "https://www.trabajo.gob.ec", accessedAt: "2026-10-01" }
    ],
    faqs: [
      {
        q: '¿Qué es la afiliación para el trabajo del hogar no remunerado en Ecuador?',
        a: 'Es un régimen de protección especial de la seguridad social destinado a personas dedicadas de forma exclusiva a las tareas domésticas y de cuidado en su propio hogar (como amas de casa), sin recibir un sueldo. El costo de la aportación mensual se calcula según el nivel de ingresos del núcleo familiar y cuenta con un subsidio parcial financiado por el Estado.'
      },
      {
        q: '¿Cuál es la diferencia entre una trabajadora del hogar remunerada y el seguro de amas de casa?',
        a: 'La trabajadora del hogar remunerada (empleada doméstica) tiene una relación laboral de dependencia, recibe un sueldo de un empleador y cotiza bajo el régimen general obligatorio (tasa del 20.60%). Por otro lado, la persona dedicada al trabajo del hogar no remunerado (ama de casa) no tiene un empleador, no recibe remuneración y cotiza en el seguro especial con aportes subsidiados basados en el nivel de ingresos de su hogar.'
      },
      {
        q: '¿Cuáles son los requisitos de afiliación para el trabajo del hogar en 2026?',
        a: 'Los requisitos para trabajadoras del hogar remuneradas incluyen cédula del empleador y de la trabajadora, y registro del contrato de trabajo en el Ministerio del Trabajo. Para el seguro de trabajo del hogar no remunerado (amas de casa), se requiere cédula de identidad, tener entre 15 y 65 años de edad, y registrar los datos de ingresos socioeconómicos del núcleo familiar en la base de datos del Ministerio de Inclusión Económica y Social (MIES).'
      },
      {
        q: '¿Cuánto se paga mensualmente por afiliar a una trabajadora del hogar en 2026?',
        a: 'El costo mensual de afiliación para una trabajadora del hogar bajo relación de dependencia se calcula aplicando la tasa del 20.60% sobre el sueldo declarado (que no puede ser menor al Salario Básico Unificado de $482 proyectado para 2026). Esto equivale a un aporte mensual de $99.29 dólares, dividido en un 9.45% de aporte personal ($45.55) y un 11.15% de aporte patronal ($53.74).'
      },
      {
        q: '¿Qué prestaciones y beneficios incluye el seguro para el trabajo del hogar no remunerado?',
        a: 'Este seguro especial brinda cobertura para jubilación por vejez (tras cumplir las imposiciones requeridas), pensión de invalidez por enfermedades catastróficas o accidentes, pensión de montepío para sobrevivientes y auxilio de funerales. Es fundamental recalcar que este seguro subsidiado para amas de casa **no incluye** atención de salud general en hospitales del IESS ni cobertura para préstamos del BIESS.'
      },
      {
        q: '¿Cómo se registra el contrato de una empleada doméstica en el Ministerio del Trabajo?',
        a: 'El empleador debe ingresar al portal oficial SUT (Sistema Único de Trabajo) del Ministerio del Trabajo, registrar sus datos patronales y completar el formulario del contrato de trabajo del sector doméstico, especificando la jornada de labores (completa o parcial) y el sueldo. Posteriormente, el contrato se descarga, se firma por ambas partes y se sube escaneado al sistema en un plazo máximo de 15 días.'
      }
    ],
    content: `
# Afiliación Trabajo Hogar IESS: Requisitos, Costos y Beneficios en 2026

La afiliación de personas trabajadoras del hogar y personas dedicadas al trabajo del hogar no remunerado en Ecuador es un derecho fundamental respaldado por la Ley de Seguridad Social y la Constitución. Este mecanismo de protección permite acceder a prestaciones médicas, jubilación, auxilio de funerales y seguro de cesantía mediante aportaciones calculadas de manera equitativa. En esta guía detallamos los requisitos obligatorios, los costos mensuales para el año 2026 y el proceso paso a paso para afiliar correctamente a una trabajadora del hogar o registrarse en el seguro especial para amas de casa.

---

## En resumen: Datos clave sobre la afiliación del trabajo del hogar
* **Modalidades de afiliación**: Existen dos regímenes diferenciados: Trabajo del Hogar Remunerado (relación de dependencia) y Trabajo del Hogar No Remunerado (seguro de amas de casa).
* **Base de cálculo salarial**: Para trabajadoras remuneradas, el aporte mínimo se calcula sobre el Salario Básico Unificado vigente ($482 para el año 2026).
* **Tasa de cotización**: El régimen remunerado aporta el 20.60% del salario; el régimen no remunerado aporta tarifas subsidiadas progresivas según ingresos del núcleo familiar.
* **Cobertura de salud general**: Únicamente disponible para trabajadoras remuneradas bajo relación de dependencia. El seguro de amas de casa no posee atención médica general ordinaria en centros del IESS.
* **Jubilación**: Ambos regímenes acumulan años de servicio y aportaciones válidas para solicitar la pensión de jubilación por vejez del IESS.

---

## Comparativa de Modalidades: Trabajo del Hogar Remunerado vs. No Remunerado

Es fundamental que los ciudadanos distingan con precisión las dos modalidades existentes de aseguramiento para el sector doméstico y del hogar en Ecuador, ya que sus aportaciones, requisitos y coberturas prestacionales difieren significativamente:

| Característica / Régimen | Trabajo del Hogar Remunerado (Empleadas Domésticas) | Trabajo del Hogar No Remunerado (Amas de Casa) |
| :--- | :--- | :--- |
| **Relación de Trabajo** | Dependiente (Existe un empleador y pago de sueldo). | Autónoma / Familiar (Labores propias del hogar sin remuneración). |
| **Tasa de Aportación** | **20.60% del salario** (9.45% personal + 11.15% patronal). | Escala subsidiada por el Estado (según ingresos familiares). |
| **Base Imponible Mínima** | Salario Básico Unificado ($482 en el año 2026). | Salario del núcleo familiar cruzado con base de datos del MIES. |
| **Atención Médica IESS** | Sí, cobertura ilimitada en consulta externa, cirugía y medicinas. | No. La cobertura médica básica se canaliza vía Salud Pública (MSP). |
| **Acceso a Préstamos BIESS** | Sí, califica a préstamos quirografarios e hipotecarios. | No, este seguro especial no califica para productos de crédito. |
| **Prestaciones de Jubilación** | Sí, jubilación por vejez, invalidez y montepío ordinaria. | Sí, pensión de jubilación reducida, invalidez y montepío especial. |

---

## Requisitos obligatorios para la afiliación en 2026

Para proceder con la inscripción formal en cualquiera de los dos regímenes, se deben cumplir condiciones documentales y biográficas específicas determinadas por el IESS y el Ministerio del Trabajo de Ecuador:

### Para Trabajadoras del Hogar Remuneradas (Relación de Dependencia)
1. **Cédula de ciudadanía o identidad** vigente de la trabajadora del hogar.
2. **Cédula de identidad y papeleta de votación** del empleador doméstico.
3. **Contrato de trabajo escrito** de jornada laboral (completa, parcial o por horas) registrado y validado en el Sistema Único de Trabajo (SUT) del Ministerio del Trabajo.
4. **Dirección exacta de la vivienda** del empleador y planilla de un servicio básico (agua, luz o teléfono) que valide el domicilio de labores.
5. **Cuenta bancaria de la trabajadora** debidamente registrada y autorizada en el portal del IESS.

### Para el Trabajo del Hogar No Remunerado (Amas de Casa - Seguro Especial)
1. **Cédula de identidad ecuatoriana** vigente del solicitante.
2. **Rango de edad**: Tener entre 15 y 65 años de edad cumplidos a la fecha de la solicitud de afiliación.
3. **Registro Social del MIES**: Encontrarse registrado en la base de datos de información socioeconómica del Ministerio de Inclusión Económica y Social (MIES) para determinar el nivel de ingresos de su núcleo familiar.
4. **No registrar afiliación activa** en ningún otro régimen de la seguridad social del IESS, ISSFA, o ISSPOL al momento de realizar la inscripción.

---

## Proceso de registro paso a paso para la afiliación

A continuación, se describen los pasos estructurados que deben realizar los empleadores domésticos y las personas interesadas en afiliarse al seguro especial de amas de casa:

### Paso 1: Registro del Empleador Doméstico en el IESS
El empleador que contrata una trabajadora remunerada del hogar debe obtener un número de registro patronal. Para esto, ingrese a [iess.gob.ec](https://www.iess.gob.ec), diríjase a **"Empleadores"** -> **"Registro de Empleador"** -> **"Trabajo Doméstico"**. Ingrese su cédula de identidad y complete el formulario digital para generar su código patronal.

### Paso 2: Registro del Aviso de Entrada de la Trabajadora
Con su clave patronal generada, acceda al portal de empleadores en línea. Diríjase a la sección de **"Avisos de Entrada y Salida"** e ingrese el número de cédula de su trabajadora del hogar. Escriba la fecha de inicio de labores, el sueldo pactado (respetando los mínimos legales de cotización) y el tipo de jornada. Confirme el envío del aviso de entrada. El sistema generará el comprobante digital de afiliación de forma inmediata.

### Paso 3: Inscripción en el Seguro No Remunerado (Amas de Casa)
Si lo que desea es afiliarse de forma individual al seguro de trabajo del hogar no remunerado:
1. Ingrese a [iess.gob.ec](https://www.iess.gob.ec) -> **"Asegurados"** -> **"Afiliados"** -> **"Trabajo del Hogar No Remunerado"**.
2. Digite su número de cédula de ciudadanía de 10 dígitos y su fecha de nacimiento completa.
3. El sistema cruzará información con el Registro Social del MIES para validar su nivel socioeconómico familiar.
4. Defina el aporte mensual según la tabla de rangos que despliegue el portal e ingrese su correo electrónico de contacto.
5. Genere y guarde su comprobante digital de aceptación de afiliación especial.

---

## Costo mensual y cálculo de la aportación en 2026

### 1. Trabajadoras del Hogar Remuneradas (Bajo relación de dependencia)
Para el año **2026**, se proyecta un Salario Básico Unificado (SBU) de **$482 dólares**. Por consiguiente, la aportación mensual obligatoria mínima para una empleada del sector doméstico contratada a jornada completa se desglosa matemáticamente de la siguiente manera:

* **Sueldo base mínimo cotizable**: $482.00.
* **Aporte Patronal (11.15%)**: $53.74 dólares asumidos por el empleador por concepto de cotización patronal obligatoria.
* **Aporte Personal (9.45%)**: $45.55 dólares descontados de la remuneración mensual de la trabajadora.
* **Monto total consolidado de la planilla mensual**: $99.29 dólares pagados de forma íntegra a través del portal de recaudación del IESS.

### 2. Trabajo del Hogar No Remunerado (Amas de Casa - Seguro Especial)
El aporte para las personas dedicadas al trabajo doméstico no remunerado no se calcula sobre el salario personal (pues no existe remuneración), sino que se aplica una escala subsidiada en función de los ingresos del núcleo familiar:

| Nivel de Ingresos de la Familia | Aporte Mensual del Asegurado ($) | Subsidio Financiado por el Estado ($) | Cotización Total Destinada a la Jubilación |
| :--- | :--- | :--- | :--- |
| **Bajo la línea de pobreza** | $2.00 dólares mensuales | Financiado por el Estado | Seguro Especial de Invalidez y Vejez |
| **Ingresos Familiares hasta el 50% de 1 SBU** | $9.64 dólares mensuales | Financiado por el Estado | Seguro Especial de Invalidez y Vejez |
| **Ingresos Familiares entre el 50% y 1 SBU** | $19.28 dólares mensuales | Financiado por el Estado | Seguro Especial de Invalidez y Vejez |
| **Ingresos Familiares superiores a 1 SBU** | Proporcional de la escala | Sin subsidio fiscal directo | Seguro Especial de Invalidez y Vejez |

---

## Errores frecuentes al afiliar al sector del hogar y cómo prevenirlos

* **Creer que el aporte patronal del 11.15% se le puede descontar a la trabajadora**: Esto constituye una infracción a las leyes laborales del Ecuador. El aporte patronal debe ser asumido de forma exclusiva por el empleador doméstico, mientras que el descuento permitido en el rol de pagos es únicamente el del 9.45% del aporte personal de la empleada.
* **No registrar el aviso de salida al finalizar la relación de servicio**: Si la trabajadora del hogar doméstica renuncia o es desvinculada, y el empleador olvida ingresar el aviso de salida en el portal del IESS dentro del plazo máximo de **15 días hábiles**, el sistema continuará generando planillas mensuales de cobro con acumulación de intereses de mora que deberán cancelarse obligatoriamente.
* **Suponer que el seguro de amas de casa cubre emergencias médicas en hospitales del IESS**: Es sumamente común afiliarse al seguro de trabajo del hogar no remunerado pensando que se obtendrán turnos médicos o cirugías en el IESS. Este seguro especial subsidiado por ley cubre únicamente prestaciones de jubilación por vejez, pensiones por invalidez y muerte (montepío) y auxilios de funerales. La atención de salud de las amas de casa se brinda en la red del Ministerio de Salud Pública (MSP) de forma gratuita.

---

## Ejemplo práctico del costo de afiliación doméstica por jornada parcial en 2026

Imaginemos el caso de una trabajadora del hogar que labora para un empleador doméstico de forma parcial, cubriendo exactamente **medio tiempo (4 horas diarias)** de lunes a viernes en el año **2026**.

* **Salario proporcional declarado (Medio tiempo)**: $241.00 dólares mensuales (equivalente al 50% del SBU de $482 proyectado).
* **Aporte personal (9.45%)**: Se le descuenta de su sueldo la suma de $22.77 dólares.
* **Aporte patronal (11.15%)**: El empleador asume el pago de $26.87 dólares por concepto de su obligación.
* **Costo de planilla consolidado**: El empleador cancela de forma mensual la suma de $49.64 dólares en los canales autorizados de recaudación del IESS.
* **Beneficio acumulado**: La trabajadora acumula imposiciones mensuales válidas para su récord de jubilación futura y cuenta con seguro médico y de cesantía completo en el IESS.

---

## Preguntas Frecuentes sobre la afiliación del trabajo del hogar

### ¿Qué pasa si una empleada doméstica trabaja por horas o días para distintos empleadores?
El Reglamento del IESS contempla el esquema de **"Afiliación por Días o Tiempo Parcial"**. En este escenario, cada uno de los empleadores domésticos para los cuales presta servicios la trabajadora del hogar debe registrar de forma individual un número patronal y registrar un aviso de entrada, declarando de forma proporcional el número de días que labora al mes y el sueldo percibido. Las aportaciones y salarios de todos los empleadores domésticos se consolidan unificadamente a favor de la trabajadora en su historial laboral del IESS.

### ¿Se tiene derecho al pago de fondos de reserva y décimos en el trabajo doméstico remunerado?
Efectivamente. Las trabajadoras del hogar remuneradas gozan exactamente de los mismos derechos laborales y de seguridad social que cualquier otro trabajador del régimen general obligatorio de Ecuador. Esto implica el derecho a percibir el décimo tercer sueldo (Bono Navideño), décimo cuarto sueldo (Bono Escolar) y la acumulación o pago mensual de sus fondos de reserva una vez que la trabajadora haya cumplido su primer año completo de labores con el mismo empleador doméstico.

### ¿Se puede afiliar al seguro especial de amas de casa si ya se recibe una pensión de montepío?
Sí, la ley permite la afiliación en el régimen de trabajo del hogar no remunerado para personas que ya perciben una pensión por viudez u orfandad (montepío), siempre y cuando el solicitante se dedique de forma exclusiva a las tareas del hogar no remuneradas en su propio domicilio, cumpla con el rango de edad (entre 15 y 65 años) y no registre una afiliación activa de aportes en relación de dependencia o voluntaria de forma simultánea.

### ¿Qué sanciones existen para un empleador que no afilia a su trabajadora del hogar?
No afiliar a los trabajadores de la construcción, trabajadores agrícolas o trabajadoras del hogar desde el primer día de labores constituye una infracción legal muy grave en el Código del Trabajo y en la Ley de Seguridad Social de Ecuador. Además de la acumulación de glosas por mora e intereses, la Fiscalía del Estado puede iniciar procesos penales por el delito de "Falta de Afiliación del Trabajador a la Seguridad Social", sancionado con penas privativas de libertad de tres a siete días de acuerdo con las reformas vigentes en la legislación penal de Ecuador.

### ¿Se puede retirar el fondo de cesantía en el seguro especial de amas de casa?
No. El seguro de afiliación para el trabajo del hogar no remunerado (amas de casa) se enfoca exclusivamente en la acumulación de aportes para solventar las contingencias de vejez (jubilación), invalidez y muerte. Como consecuencia de su estructura subsidiada por el Estado, este régimen no incluye aportaciones para el fondo de cesantía ni fondos de reserva. Por consiguiente, las amas de casa afiliadas en este seguro especial no cuentan con saldos de cesantía acumulados para retirar del IESS.

---

## Enlaces de interés interno para su trámite
* Antes de afiliar a su trabajadora del hogar, aprenda cómo [Obtener la clave del IESS por primera vez](/blog/como-obtener-clave-iess-primera-vez) para gestionar el módulo patronal en línea.
* Si desea afiliarse sin empleador, conozca las ventajas y condiciones del régimen de [Afiliación Voluntaria en Ecuador](/procedimiento/afiliacion-voluntaria) del portal.
* Una vez afiliada la trabajadora del hogar, aprenda a [Consultar aportes e historial laboral](/blog/como-consultar-aportes-iess-historial-laboral) de manera mensual para verificar el pago correcto de sus planillas.
`
  }
];

