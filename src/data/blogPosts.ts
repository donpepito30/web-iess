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
* **Aporte mensual mínimo**: Con un SBU de $460, el aporte mensual mínimo de un afiliado voluntario es de **$80.96**.
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
  }
];
