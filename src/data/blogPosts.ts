export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  image: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'jubilacion-2026',
    slug: 'jubilacion-por-vejez-requisitos-2026',
    title: 'Jubilación por Vejez IESS 2026: Guía Completa de Requisitos y Pasos',
    metaDescription: 'Todo lo que necesitas saber sobre jubilación por vejez en IESS Ecuador 2026. Requisitos actualizados, pasos, montos y combinaciones de edad y aportes.',
    keywords: ['jubilación IESS', 'jubilación por vejez Ecuador', 'requisitos jubilación IESS', 'cómo jubilarme IESS'],
    content: `
# Jubilación por Vejez IESS 2026: Guía Completa y Actualizada

¿Estás planificando tu retiro en el Ecuador? La **Jubilación por Vejez del IESS** es uno de los derechos más importantes para los trabajadores ecuatorianos y extranjeros residentes en el país. En esta guía completa, te explicamos al detalle los requisitos oficiales, las tablas de aportes vigentes y cómo realizar tu solicitud 100% en línea de manera rápida.

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
2. **No tener deudas en mora**: No puedes tener obligaciones patronales ni préstamos quirografarios o hipotecarios vencidos en el BIESS o en el IESS.
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

Si quieres calcular de manera personalizada o necesitas ayuda redactando oficios de reclamo de aportes faltantes, utiliza nuestras herramientas interactivas del portal.

---

*Nota legal: Este artículo es una guía interpretativa simplificada basada en la Ley de Seguridad Social de Ecuador y resoluciones vigentes del Consejo Directivo del IESS. Te sugerimos siempre validar tu estado de aportes de forma oficial.*
`,
    author: 'IESS Asistente',
    publishDate: '2026-01-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    category: 'Jubilación'
  },
  {
    id: 'prestamo-biess-2026',
    slug: 'prestamo-quirografario-biess-requisitos-montos-2026',
    title: 'Préstamo Quirografario BIESS 2026: Requisitos, Montos y Cómo Solicitarlo',
    metaDescription: 'Guía actualizada 2026 sobre préstamo quirografario BIESS. Requisitos para afiliados activos y jubilados, montos máximos, pasos y plazos de desembolso.',
    keywords: ['préstamo BIESS', 'préstamo quirografario Ecuador', 'crédito BIESS', 'BIESS requisitos'],
    content: `
# Préstamo Quirografario BIESS 2026: Guía Completa de Solicitud

El **Préstamo Quirografario** del Banco del Instituto Ecuatoriano de Seguridad Social (BIESS) es uno de los productos de financiamiento de consumo más demandados y con la tasa de interés más baja del mercado financiero ecuatoriano. 

Si necesitas liquidez inmediata para salud, educación, viajes o pago de deudas, en esta guía te contamos cómo calificar y recibir tu dinero en un plazo récord de **24 a 72 horas hábiles**.

---

## ¿Quiénes pueden solicitar un préstamo quirografario?

El BIESS otorga este crédito a tres grupos principales de asegurados:
* **Afiliados activos** bajo relación de dependencia.
* **Afiliados voluntarios** que realicen aportaciones de forma independiente.
* **Jubilados** por vejez, invalidez o discapacidad, así como beneficiarios de pensión de montepío.

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

Si tienes problemas con retenciones de tu sueldo o necesitas justificar un reclamo formal por un descuento indebido del BIESS, te recomendamos revisar nuestra sección de formatos de oficios de ley donde podrás generar cartas de impugnación de forma 100% gratuita.
`,
    author: 'IESS Asistente',
    publishDate: '2026-01-10',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    category: 'Préstamos'
  },
  {
    id: 'afiliacion-voluntaria-2026',
    slug: 'afiliacion-voluntaria-iess-requisitos-beneficios-2026',
    title: 'Afiliación Voluntaria IESS 2026: Costos, Requisitos y Beneficios de Aportar por tu Cuenta',
    metaDescription: 'Guía de afiliación voluntaria IESS Ecuador 2026. Descubre cuánto se paga mensualmente, requisitos para independientes, amas de casa y residentes en el exterior, y beneficios.',
    keywords: ['afiliación voluntaria IESS', 'iess independiente ecuador', 'cuánto se paga iess voluntario', 'seguro voluntario ecuador'],
    content: `
# Afiliación Voluntaria IESS 2026: Guía Completa de Costos y Beneficios

¿Eres profesional independiente, tienes un emprendimiento propio o resides fuera del Ecuador? La **Afiliación Voluntaria** del IESS es una alternativa ideal para contar con servicios de salud de calidad, cobertura ante accidentes, protección de jubilación y acceso a créditos del BIESS aportando por tu cuenta sin depender de un empleador.

En este artículo, desglosamos los costos actualizados para 2026, el porcentaje de aportación y las ventajas de pertenecer al seguro social voluntario.

---

## ¿Cuánto se paga por la Afiliación Voluntaria en 2026?

El valor mensual de la aportación voluntaria se calcula aplicando un porcentaje fijo sobre el salario o los ingresos mensuales que declares recibir. El ingreso mínimo declarado no puede ser inferior al **Salario Básico Unificado (SBU)** legal vigente en el Ecuador.

Para el año 2026, considerando el Salario Básico Unificado, el cálculo se estructura así:

* **Tasa General de Aportación**: **17.60%** del valor de tus ingresos declarados.
* **Aporte mensual mínimo**: Con un SBU de $482, el aporte mensual mínimo de un afiliado voluntario es de **$84.83**.
* Si declaras un ingreso mayor (por ejemplo, $1,000 mensuales), el aporte mensual correspondiente será de **$176.00**.

> 💡 **Nota para Trabajadores del Hogar / Amas de Casa**: El IESS mantiene convenios específicos de subsidio estatal con tasas menores para la afiliación de personas dedicadas exclusivamente al trabajo del hogar no remunerado, calculadas proporcionalmente a los ingresos de la unidad familiar.

---

## Beneficios Clave del Seguro Voluntario

Aportar voluntariamente al IESS te otorga prácticamente los mismos derechos que a un afiliado en relación de dependencia laboral, a excepción de los fondos de reserva e indemnizaciones por despido o cesantía clásica.

Entre los principales beneficios se incluyen:

1. **Atención Médica Integral**: Acceso a consultas externas, emergencias, cirugías, tratamientos oncológicos, odontología y medicamentos gratuitos en los hospitales del IESS y centros médicos asociados en todo el país.
2. **Cobertura para Hijos Menores**: Tus hijos menores de 18 años reciben atención médica gratuita sin costo de aportación adicional.
3. **Pensión por Jubilación**: Sumas imposiciones mensuales para calificar en el futuro a una pensión vitalicia de jubilación por vejez o invalidez.
4. **Protección de Auxilio de Funerales**: Cobertura de gastos exequiales en caso de deceso del asegurado principal.
5. **Acceso a Préstamos**: Cumpliendo con los tiempos mínimos exigidos por la ley, podrás calificar a préstamos quirografarios e hipotecarios con tasas preferenciales a través del BIESS.

---

## Requisitos Oficiales para Registrarse

* Ser ciudadano ecuatoriano o extranjero con cédula de identidad vigente emitida en el país.
* No registrar mora o deudas pendientes con el IESS en caso de haber aportado en el pasado.
* Tener al menos 18 años cumplidos.
* No encontrarse afiliado de forma activa bajo relación de dependencia laboral con ningún empleador.

---

## Paso a Paso para Afiliarse Voluntariamente

El registro se efectúa de manera digital en menos de 10 minutos desde el portal web:

1. Ingresar a [iess.gob.ec](https://www.iess.gob.ec).
2. Dirígete a la sección **"Trámites Virtuales"** -> **"Solicitar Afiliación Voluntaria"**.
3. Selecciona tu tipo de perfil (Residente en Ecuador, Residente en el Exterior o Independiente).
4. Introduce tu número de cédula y fecha de nacimiento.
5. Ingresa tus ingresos mensuales declarados (recuerda que el valor debe ser igual o superior al salario básico unificado vigente).
6. Registra tus datos de contacto: teléfono celular, correo electrónico y dirección domiciliaria.
7. Confirma el registro. El sistema emitirá tu solicitud aprobada.

### Forma de Pago de las Cuotas Mensuales
Debes realizar el pago de tu aporte mensual **hasta el día 15 del mes siguiente** al que corresponde la cobertura. Por ejemplo, el aporte de enero se cancela máximo hasta el 15 de febrero. Puedes registrar débito automático en tu cuenta bancaria de ahorros o corriente para evitar retrasos y mora patronal involuntaria.

Si en algún momento requieres solicitar la terminación o cese temporal de tu seguro voluntario para evitar acumular deudas, te invitamos a visitar nuestra herramienta de oficios legales donde podrás generar el documento de solicitud de cese de manera gratuita.
`,
    author: 'IESS Asistente',
    publishDate: '2026-01-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  },
  {
    id: 'subsidio-maternidad-2026',
    slug: 'subsidio-maternidad-iess-requisitos-calculo-2026',
    title: 'Subsidio de Maternidad IESS 2026: Requisitos, Tiempos de Pago y Cómo Solicitarlo',
    metaDescription: 'Toda la información sobre el subsidio de maternidad del IESS en Ecuador para el año 2026. Requisitos de aportación para afiliadas, cómo se calcula el pago de las 12 semanas y trámite en línea.',
    keywords: ['subsidio maternidad IESS', 'licencia maternidad ecuador', 'cuánto paga el iess por maternidad', 'reposo prenatal iess'],
    content: `
# Subsidio de Maternidad IESS 2026: Guía para Afiliadas

El **Subsidio de Maternidad** es un beneficio económico que concede el Instituto Ecuatoriano de Seguridad Social (IESS) a las afiliadas cotizantes que se encuentran bajo licencia de maternidad. Este subsidio cubre el salario de la madre durante su reposo por dar a luz, permitiéndole dedicarse enteramente al cuidado del recién nacido sin perder estabilidad financiera.

En esta guía te explicamos cómo calcular el subsidio, cuántos aportes previos requieres y el paso a paso detallado para solicitar el pago en el portal de la institución.

---

## ¿En qué consiste el beneficio económico?

La licencia de maternidad obligatoria por ley en el Ecuador tiene una duración total de **12 semanas (84 días calendario)** de reposo remunerado, las cuales se pueden distribuir en periodos prenatales y postnatales.

Durante este lapso, el salario de la trabajadora se cubre de forma compartida entre el empleador y el IESS:
* **El Empleador**: Cancela el **25%** de la remuneración mensual de la trabajadora.
* **El IESS**: Financia y cancela el **75%** restante del salario de la trabajadora a través del subsidio de maternidad.

> 👶 **Caso de partos múltiples**: Si el parto es múltiple, la licencia de maternidad remunerada se extiende por **10 días adicionales**, cubiertos bajo el mismo esquema de porcentajes de pago.

---

## Requisitos de Aportaciones para Calificar en 2026

Para acceder al subsidio económico por maternidad, el IESS exige un récord mínimo de cotización antes del parto:

1. **Aportes previos**: Registrar al menos **12 meses de aportaciones continuas** inmediatamente anteriores a la fecha del parto.
2. **Afiliación activa**: Mantenerse afiliada activa y que el empleador no registre mora patronal al momento del trámite.
3. **Validación médica**: Contar con el certificado de reposo emitido por un ginecólogo del IESS o certificado de médico particular debidamente validado ("homologado") en el sistema de salud de la institución.

---

## Guía de Trámite Paso a Paso

### Paso 1: Validación del Certificado Médico (Si es de clínica privada)
Si tu parto o reposo prenatal fue atendido en clínicas u hospitales particulares, debes validar el certificado dentro de los **8 días hábiles posteriores al nacimiento**:
1. Registrate e ingresa a [iess.gob.ec](https://www.iess.gob.ec).
2. Selecciona **"Trámites Virtuales"** -> **"Asegurados"** -> **"Afiliados"** -> **"Validación de Certificados Médicos"**.
3. Registra los datos del médico tratante, sube el PDF del certificado y el historial clínico.

### Paso 2: Registro de Cuenta Bancaria
Es imperativo que tengas ingresada y validada tu cuenta de banco personal para la transferencia directa de los fondos.

### Paso 3: Envío de la Solicitud del Subsidio
1. Entra a [iess.gob.ec](https://www.iess.gob.ec) -> **"Servicios en Línea"** -> **"Asegurados"** -> **"Afiliados"** -> **"Subsidios Monetarios"**.
2. Digita tu cédula y clave.
3. Haz clic en **"Registro de Solicitud de Maternidad"**.
4. El sistema verificará tu récord de cotizaciones de forma automática.
5. Selecciona el certificado médico validado y presiona **"Guardar"**.
6. El dinero correspondiente al 75% de las 12 semanas se acreditará en tu cuenta de banco una vez procesado por la Dirección de Salud.

---

## ¿Cómo se calcula el monto del subsidio?

El IESS toma como referencia el promedio de los sueldos percibidos durante los **12 meses anteriores al parto** para calcular tu remuneración promedio diaria. El subsidio equivale al 75% de esa base diaria multiplicado por los 84 días que dura la licencia reglamentaria de maternidad.

Si tu empleador o el sistema presenta retrasos injustificados y necesitas emitir un oficio formal de reclamo para exigir la liquidación del subsidio por maternidad, puedes utilizar nuestro generador de formatos oficiales gratuito disponible en la pestaña principal del portal.
`,
    author: 'IESS Asistente',
    publishDate: '2026-01-08',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop',
    category: 'Salud'
  },
  {
    id: 'prestamo-hipotecario-2026',
    slug: 'prestamo-hipotecario-biess-requisitos-tasas-2026',
    title: 'Préstamo Hipotecario BIESS 2026: Requisitos, Tasas de Interés y Montos de Vivienda',
    metaDescription: 'Guía detallada para solicitar un préstamo hipotecario BIESS en 2026. Conoce las tasas de interés preferenciales desde el 5.99%, plazos de hasta 25 años y montos de financiamiento.',
    keywords: ['préstamo hipotecario BIESS', 'casa propia BIESS', 'crédito vivienda ecuador', 'tasa interés BIESS'],
    content: `
# Préstamo Hipotecario BIESS 2026: Tu Casa Propia con Tasa Preferencial

El **Préstamo Hipotecario del BIESS** financia la compra de viviendas terminadas, construcción en terreno propio, adquisición de terrenos o sustitución de hipotecas en otras entidades bancarias.

Con plazos de hasta **25 años** y tasas subsidiadas para vivienda de interés social (VIS y VIP), se mantiene como la opción más accesible de crédito inmobiliario en Ecuador.

---

## Requisitos Esenciales 2026

1. **Aportaciones**: Mínimo 36 aportaciones en total, de las cuales las últimas 12 deben ser consecutivas.
2. **Capacidad de Pago**: Tu cuota mensual no puede superar el 40% de tus ingresos netos familiares demostrables.
3. **Edad Máxima**: La suma de la edad del afiliado más el plazo del crédito no puede exceder los 75 años al momento de finalizar el préstamo.
4. **No tener créditos en mora**: Sin obligaciones pendientes en IESS o BIESS.
5. **Historial crediticio**: Calificación "A" o "B" en el buró de crédito nacional.

---

## Montos y Cobertura
* **Vivienda de Interés Público (hasta $90,000)**: Financiamiento del 100% del avalúo con tasas desde el 5.99% anual.
* **Vivienda General (hasta $200,000)**: Financiamiento de hasta el 90% con tasas competitivas del 7.9% al 8.5%.
* **Terrenos o Construcción**: Financiamiento de hasta el 80% del valor comercial.
`,
    author: 'IESS Asistente',
    publishDate: '2026-01-20',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    category: 'Préstamos'
  },
  {
    id: 'cesantia-desempleo-2026',
    slug: 'cesantia-seguro-desempleo-iess-como-retirar-2026',
    title: 'Cesantía y Seguro de Desempleo IESS 2026: Cómo Retirar Fondos y Cobrar la Prestación',
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
    author: 'IESS Asistente',
    publishDate: '2026-01-25',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  },
  {
    id: 'fondos-reserva-2026',
    slug: 'fondos-de-reserva-iess-consulta-acumulacion-retiro-2026',
    title: 'Fondos de Reserva IESS 2026: Consulta de Saldos, Retiro en Línea y Acumulación',
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
    author: 'IESS Asistente',
    publishDate: '2026-02-02',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  },
  {
    id: 'montepio-pension-2026',
    slug: 'pension-montepio-iess-requisitos-sobrevivientes-2026',
    title: 'Pensión de Montepío IESS 2026: Beneficios para Viudez, Orfandad y Trámite Legal',
    metaDescription: 'Requisitos y pasos para solicitar la pensión de montepío por viudez u orfandad ante el IESS en 2026. Porcentajes de pensión y documentos necesarios.',
    keywords: ['pensión montepío IESS', 'viudez IESS', 'orfandad IESS', 'muerte de afiliado IESS'],
    content: `
# Pensión de Montepío IESS: Cobertura Integral para Viudas, Viudos e Hijos

El **Montepío** es la prestación económica mensual que entrega el IESS a los derechohabientes (cónyuge, conviviente en unión de hecho e hijos) tras el fallecimiento de un afiliado activo o jubilado.

---

## ¿Quiénes tienen derecho al Montepío?
1. **Cónyuge o Conviviente**: Debe acreditar matrimonio o unión de hecho legalmente inscrita.
2. **Hijos menores de 18 años**: Tienen derecho automático a la cuota de orfandad.
3. **Hijos de hasta 21 años**: Si demuestran que se encuentran cursando estudios regulares en universidades o institutos superiores.
4. **Hijos con discapacidad total**: Tienen derecho a la pensión de forma vitalicia sin importar su edad.

---

## Porcentajes de Distribución de la Pensión
* La viuda o conviviente recibe hasta el **60%** de la pensión calculada si no hay hijos concurrentes (o el 40% si concurren con hijos).
* Los hijos con derecho a orfandad se distribuyen el **40% restante** en partes iguales.
`,
    author: 'IESS Asistente',
    publishDate: '2026-02-10',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    category: 'Jubilación'
  },
  {
    id: 'jubilacion-invalidez-2026',
    slug: 'jubilacion-invalidez-iess-requisitos-comecap-2026',
    title: 'Jubilación por Invalidez y Enfermedad Catastrófica IESS 2026: Evaluación Comecap',
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
    author: 'IESS Asistente',
    publishDate: '2026-02-18',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    category: 'Salud'
  },
  {
    id: 'glosas-patronales-2026',
    slug: 'impugnacion-glosas-mora-patronal-iess-convenio-pago-2026',
    title: 'Impugnación de Glosas y Mora Patronal IESS 2026: Plazos y Convenios de Pago',
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
    author: 'IESS Asistente',
    publishDate: '2026-02-24',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  },
  {
    id: 'aviso-entrada-salida-2026',
    slug: 'aviso-entrada-salida-iess-plazos-multas-empleadores-2026',
    title: 'Avisos de Entrada y Salida IESS 2026: Plazos Obligatorios y Sanciones Patronales',
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
    author: 'IESS Asistente',
    publishDate: '2026-03-01',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  },
  {
    id: 'actualizacion-datos-cau-2026',
    slug: 'actualizacion-datos-cuenta-bancaria-cau-iess-2026',
    title: 'Actualización de Datos y Registro de Cuenta Bancaria IESS 2026: Trámite Virtual',
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
    author: 'IESS Asistente',
    publishDate: '2026-03-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    category: 'Trámites'
  }
];
