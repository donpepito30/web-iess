import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";
import { PROCEDURES_DATA } from "./src/data/procedures";
import { BLOG_POSTS } from "./src/data/blogPosts";

dotenv.config();

const app = express();
const PORT = 3000;

// Compress all text responses
app.use(compression());

app.use(express.json());

// Caching headers middleware
app.use((req, res, next) => {
  if (req.method === 'GET') {
    // Assets estáticos (1 año)
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|br)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // HTML y páginas SEO (24 horas)
    else if (
      req.path.endsWith('.html') || 
      req.path === '/' || 
      req.path.startsWith('/iess/') || 
      req.path.startsWith('/procedimiento/') || 
      req.path.startsWith('/blog/') || 
      req.path === '/faq'
    ) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    // API GET responses (5 minutos)
    else if (req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
  }
  next();
});

// Sitemap dinámico
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app';
  
  // URLs principales
  const urls = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/faq', changefreq: 'weekly', priority: '0.9' },
    { url: '/blog', changefreq: 'daily', priority: '0.8' },
  ];
  
  // URLs por cada trámite (generadas desde PROCEDURES_DATA)
  const procedures = [
    'jubilacion-vejez',
    'prestamo-quirografario',
    'prestamo-hipotecario',
    'afiliacion-voluntaria',
    'subsidio-maternidad',
    'cesantia-desempleo',
    'aviso-entrada-salida',
    'actualizacion-datos'
  ];
  
  procedures.forEach(proc => {
    urls.push({
      url: `/procedimiento/${proc}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // URLs por cada artículo del Blog (slugs reales de BLOG_POSTS)
  const blogSlugs = [
    'jubilacion-por-vejez-requisitos-2025',
    'prestamo-quirografario-biess-requisitos-montos-2025',
    'afiliacion-voluntaria-iess-requisitos-beneficios-2025',
    'subsidio-maternidad-iess-requisitos-calculo-2025'
  ];

  blogSlugs.forEach(slug => {
    urls.push({
      url: `/blog/${slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // URLs por cada Ciudad para SEO local
  const cities = ['quito', 'guayaquil', 'cuenca', 'ambato', 'machala'];
  cities.forEach(city => {
    urls.push({
      url: `/iess/${city}`,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });
  
  // Generar XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(item => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${item.url}</loc>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += '</urlset>';
  
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /private

Sitemap: https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/sitemap.xml

# Google-specific directives
User-agent: Googlebot
Allow: /

# Bing-specific directives
User-agent: Bingbot
Allow: /

# Crawl delay (para no sobrecargar servidor)
Request-rate: 30/60
  `.trim();
  
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY && GEMINI_API_KEY !== "MY_GEMINI_API_KEY" && GEMINI_API_KEY.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
  }
} else {
  console.log("No GEMINI_API_KEY detected in env variables. Running in local assistant simulation mode.");
}

const SYSTEM_INSTRUCTION = `
Eres "IESS Asistente", un experto en seguridad social ecuatoriana al servicio de los ciudadanos. Tu misión es orientar a afiliados, jubilados, empleadores y ciudadanos en general sobre trámites, requisitos, normativa vigente y derechos dentro del Instituto Ecuatoriano de Seguridad Social (IESS) y el Banco del IESS (BIESS).

Hablas siempre en español, en tono cálido, empático y claro. Tratas al usuario de "tú". Nunca usas jerga legal sin explicarla de inmediato. Cuando el usuario está frustrado o tiene un problema, primero validas su situación de forma empática antes de dar información (ej. "Entiendo tu frustración, esta situación es muy común y tiene solución...").

ESTRUCTURA DE TUS RESPUESTAS PARA CONSULTAS DE TRÁMITES:
Usa SIEMPRE este formato exacto:

✅ **¿Quién puede hacer este trámite?**
[explicación breve]

📋 **Requisitos**
- [requisito 1]
- [requisito 2]

🔢 **Pasos para tramitarlo**
1. [paso 1]
2. [paso 2]

🔗 **Dónde tramitarlo**
[URL o lugar físico]

⚠️ **Errores frecuentes a evitar**
- [error 1]
- [error 2]

📞 **¿Necesitas más ayuda?**
[canal o pregunta proactiva]

PAUTAS CRÍTICAS DE COMPORTAMIENTO:
1. SIEMPRE responde en español de manera cálida y cercana.
2. NUNCA inventes montos, fechas, resoluciones ni requisitos. Si no tienes certeza de un dato, di de forma amigable: "Para confirmar este dato te recomiendo verificar en iess.gob.ec o llamar al 1800-4377".
3. Si el usuario menciona frustración, quejas o un inconveniente con el IESS, valida primero: "Entiendo tu frustración, esta situación es muy común y tiene solución..." o similar.
4. Si el usuario escribe palabras clave como "queja", "reclamo", "denuncia", "problema", "mal servicio", "cancelaron" o selecciona problemas de citas médicas, muestra SIEMPRE los canales confidenciales de denuncia habilitados desde septiembre 2025:
   - Web oficial: denuncias.iess.gob.ec
   - WhatsApp Bot 24/7: 0962532338
   - Teléfono: 1800-IESS (1800-4377)
5. Al finalizar CADA respuesta sobre un trámite, pregunta: "¿Hay algo más sobre este trámite que quieras saber, o tienes alguna otra consulta?"
6. Si preguntan sobre jubilaciones, pregunta de inmediato: "¿Cuántos años de aportes tienes registrados aproximadamente para ver qué combinación aplica mejor a tu caso?"
7. Si el usuario es empleador, adecúa tu lenguaje y habla de obligaciones patronales, de los avisos de entrada y salida, planillas mensuales y mora.
8. No des asesoría legal personalizada compleja, sino orientación general canalizando a vías oficiales.
9. Responde honestamente si preguntan por tu naturaleza: "Soy un asistente virtual con inteligencia artificial, entrenado con la normativa del IESS para orientarte. Para casos muy específicos, te recomiendo consultar directamente con el IESS."

BASE DE CONOCIMIENTOS DE LOS 13 TRÁMITES DE REFERENCIA:
- Jubilación por vejez: 480 imposiciones (sin límite edad); 60 años + 360 imposiciones; 65 años + 180 imposiciones; 70 años + 120 imposiciones. Cese registrado, no préstamos vencidos en BIESS, etc.
- Jubilación por invalidez: Dictamen de Comisión Médica (Comecap), pérdida >= 67% (absoluta, sin mínimo aportes) o entre 50-66% (parcial, mín 60 aportes).
- Montepío: Sobrevivientes cónyuge/conviviente, hijos menores 18 (o 21 si estudian). Afiliado fallido con mín 6 aportes en últimos 12 meses o 36 en la vida.
- Préstamo Quirografario (BIESS): Afiliados activos, jubilados y montepío. Activos: 36 aportaciones, 12 consecutivas, fondos disponibles como garantía, patrono al día. Discapacitados: 18 aportaciones. Novación si pagaste 25% total.
- Préstamo Hipotecario (BIESS): Activos, jubilados y migrantes voluntarios. 36 aportaciones vigentes, calificar crediticio, no hipotecario pendiente en BIESS. Tasas 5% a 8% hasta 25 años. Hasta USD 100.000 cubre el 100%. Max USD 300.000.
- Afiliación voluntaria: Independientes, sin relación de dependencia activa, residente exterior o amas de casa. Cotización mínima sobre el SBU (USD 482 en 2026), aportación es 17,60% del salario declarado. Cobertura completa de salud, quirografarios (6 meses), hipotecario (36 meses) y montepío.
- Subsidio por enfermedad: Con reposo médico del IESS o validado en 72 horas para clínicas privadas. Más de 3 días de baja (paga IESS desde el día cuarto). Montos: día 4 al 90 (75% sueldo), día 91 al 180 (66% sueldo).
- Subsidio por maternidad: 12 imposiciones continuas en los últimos 15 meses antes del parto. Licencia de 84 días (12 semanas) al 100% de remuneración promediada.
- Cesantía y Seguro Desempleo: Cesantía requiere estar cesante mín 60 días calendario. Seguro desempleo exige mín 24 aportes totales (6 continuos previos), desempleo INVOLUNTARIO. Seguro cubre hasta el 70% promedio últimos 6 salarios por 5 meses.
- Responsabilidad patronal: Sanción económica al patrono si un empleado no afiliado o con mora se accidenta o requiere atención médica catastrófica. Reforma Resolución C.D. 677 de Noviembre 2024.
- Aviso de entrada y salida: Entrada es obligatorio el primer día de trabajo. Salida es obligatorio al finalizar el vínculo laboral para no interferir en la jubilación del afiliado. Un empleador en mora patronal bloquea quirografarios de todos sus colaboradores.
- Actualización de datos: Resolución C.D. 625 (Arts 3 y 34), C.D. 535. En línea o presencial con cédula de lunes a viernes de 08:00 a 17:00 en Centros de Atención Universal (CAU).
- Quejas y denuncias oficiales (Septiembre 2025): denuncias.iess.gob.ec y WhatsApp 0962532338. Para denunciar maltrato, hospitales descuidados, baches de citas, falta de medicamentos, corrupción.
`;

// Schema.org Structured Data Generator
interface SchemaConfig {
  type: 'HowTo' | 'FAQPage' | 'Article' | 'BreadcrumbList';
  data: any;
}

function generateSchema(config: SchemaConfig): string {
  const schemas = {
    HowTo: (steps: string[]) => ({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "step": steps.map((step, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "text": step
      }))
    }),
    
    FAQPage: (faqs: Array<{q: string, a: string}>) => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }),
    
    BreadcrumbList: (items: Array<{name: string, url: string}>) => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "item": item.url
      }))
    }),
    
    Article: (data: any) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      ...data
    })
  };
  
  return `<script type="application/ld+json">${JSON.stringify(schemas[config.type](config.data))}</script>`;
}

function detectAndGenerateSchema(message: string, text: string): string {
  let schema = '';
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('cómo') || lowerMsg.includes('pasos') || lowerMsg.includes('como') || lowerMsg.includes('paso')) {
    const steps = text.split('\n')
      .map(line => line.trim())
      .filter(line => /^\d+[\.\-)]\s+/.test(line))
      .map(line => line.replace(/^\d+[\.\-)]\s+/, ''));
    if (steps.length > 0) {
      schema = generateSchema({
        type: 'HowTo',
        data: steps
      });
    }
  }
  
  if (!schema && (lowerMsg.includes('¿') || lowerMsg.includes('requisitos') || lowerMsg.includes('requisito'))) {
    schema = generateSchema({
      type: 'FAQPage',
      data: [{
        q: message,
        a: text.replace(/<[^>]*>/g, '') // remove HTML/Markdown/any tag-like string for clean schema text
      }]
    });
  }
  
  return schema;
}

// API routes first
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    api_configured: !!ai
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "El mensaje es obligatorio." });
    return;
  }

  // 1. If Gemini client is ready, call it!
  if (ai) {
    try {
      // Map history to Google GenAI format if provided
      // history syntax: [{ role: 'user' | 'model', content: string }]
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }]
      }));

      // We append the new message to contents or use chats.create
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "Disculpas, no he podido procesar una respuesta de momento.";
      const schema = detectAndGenerateSchema(message, responseText);
      res.json({ response: responseText, schema, simulator: false });
      return;
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      // Let it fall back gracefully to the offline simulation below if API has transient errors
    }
  }

  // 2. Mock / Simulator Engine in case Gemini API key is missing or errored
  // It analyzes keywords to provide high-fidelity tailored responses matching safety and persona rules.
  const lowerMsg = message.toLowerCase();
  let responseText = "";

  // Check for frustration and validate
  let prefix = "";
  if (
    lowerMsg.includes("mal") || 
    lowerMsg.includes("enojado") || 
    lowerMsg.includes("problema") || 
    lowerMsg.includes("frustrad") || 
    lowerMsg.includes("pobre") || 
    lowerMsg.includes("retraso") ||
    lowerMsg.includes("demora") ||
    lowerMsg.includes("cancel") ||
    lowerMsg.includes("falla") ||
    lowerMsg.includes("queja") ||
    lowerMsg.includes("denuncia") ||
    lowerMsg.includes("robo") ||
    lowerMsg.includes("corrup")
  ) {
    prefix = "Entiendo perfectamente tu frustración, esta clase de inconvenientes con el IESS son muy comunes pero afortunadamente tienen una vía de solución y reporte.\n\n";
  }

  if (lowerMsg.includes("hola") || lowerMsg.includes("buenos dias") || lowerMsg.includes("buenas tardes")) {
    responseText = "¡Hola! Soy tu asistente para trámites del IESS. Puedo orientarte sobre jubilación, préstamos, afiliación, subsidios, quejas y mucho más. ¿En qué te puedo ayudar hoy?";
  } else if (lowerMsg.includes("quien eres") || lowerMsg.includes("eres un robot") || lowerMsg.includes("eres humano") || lowerMsg.includes("eres ia")) {
    responseText = "Soy un asistente virtual con inteligencia artificial, entrenado específicamente con la normativa y trámites del IESS y el BIESS para guiarte en tus gestiones de manera clara y empática. Para casos muy específicos y oficiales, te recomiendo consultar directamente con el IESS.";
  } else if (lowerMsg.includes("jubila") && (lowerMsg.includes("vejez") || lowerMsg.includes("años") || lowerMsg.includes("tiempo") || lowerMsg.includes("edad"))) {
    responseText = prefix + `Para tramitar la **Jubilación por Vejez**, se requiere cumplir con ciertas combinaciones entre tu edad y el número de aportes (imposiciones).

✅ **¿Quién puede hacer este trámite?**
El afiliado que cumpla con alguna de las siguientes combinaciones:
- Sin límite de edad: 480 imposiciones (40 años de aportes).
- 60 años de edad o más: 360 imposiciones (30 años de aportes).
- 65 años de edad o más: 180 imposiciones (15 años de aportes).
- 70 años de edad o más: 120 imposiciones (10 años de aportes).

📋 **Requisitos**
- Estar en situación de cese laboral (no tener relación de dependencia activa).
- Haber registrado la salida laboral (aviso de salida) en el sistema del IESS.
- Cuenta bancaria personal registrada y autorizada en el IESS.
- Correo electrónico activo registrado en el portal.
- No tener deudas vencidas con el IESS ni con el BIESS (como préstamos quirografarios en mora).
- Sin obligaciones patronales pendientes de pago.

🔢 **Pasos para tramitarlo**
1. Verifica tu historial de aportaciones acumuladas ingresando en iess.gob.ec en Servicios en Línea.
2. Solicita el registro del Aviso de Salida laboral por parte de tu empleador.
3. Ingresa a iess.gob.ec -> sección 'Trámites Virtuales' -> 'Asegurados' -> 'Pensionistas' -> 'Jubilación'.
4. Inicia sesión con tu cédula y clave de afiliado.
5. Completa el formulario de solicitud.
6. Confirma o registra la cuenta bancaria donde deseas recibir tu pensión vitalicia mensual.
7. Envía la solicitud (es aconsejable hacerlo antes del día 25 de cada mes).

🔗 **Dónde tramitarlo**
Se realiza totalmente en línea a través del portal oficial [iess.gob.ec](https://www.iess.gob.ec).

⚠️ **Errores frecuentes a evitar**
- Intentar solicitar la jubilación manteniendo préstamos quirografarios o deudas activas en mora con el BIESS o IESS (el trámite se bloquea).
- No verificar que el empleador haya cargado efectivamente el Aviso de Salida en la plataforma.
- Cargar la solicitud después del día 25 (el pago de la primera pensión pasa al mes siguiente).

📞 **¿Necesitas más ayuda?**
Por cierto, **¿cuántos años de aportes tienes registrados aproximadamente para ver qué combinación aplica mejor a tu caso?** ¿Hay algo más sobre este trámite que quieras saber, o tienes alguna otra consulta?`;
  } else if (lowerMsg.includes("quirografario") || lowerMsg.includes("prestamo") && (lowerMsg.includes("corto") || lowerMsg.includes("rapido") || lowerMsg.includes("quiro"))) {
    responseText = prefix + `El **Préstamo Quirografario** del BIESS es un crédito de consumo respaldado por tus fondos disponibles de Cesantía y Reserva.

✅ **¿Quién puede hacer este trámite?**
Afiliados en relación de dependencia laboral activa, jubilados y pensionistas de montepío que dispongan de garantías suficientes.

📋 **Requisitos**
- Acreditar un mínimo de 36 aportaciones mensuales totales, de las cuales al menos las últimas 12 deben ser consecutivas e inmediatas.
- No tener obligaciones en mora o vencidas vigentes con el IESS o el BIESS.
- Mantener valores acumulados en Fondos de Reserva y/o Cesantía que cubran el 100% del monto que deseas solicitar.
- Su empleador actual no debe tener ninguna mora patronal registrada.
- Cuenta de ahorros o corriente registrada y pre-aprobada en la plataforma de servicios del BIESS.
- Para personas con discapacidad legal, el requisito se reduce a solo 18 aportaciones totales.

🔢 **Pasos para tramitarlo**
1. Ingresa a la página oficial de préstamos: [biess.fin.ec](https://www.biess.fin.ec).
2. Selecciona 'Quirografarios' en el menú.
3. Haz clic en 'Solicitar Préstamo' y entra con número de cédula y clave.
4. El sistema precalificará automáticamente tus fondos de reserva y cesantía.
5. Elige el monto (máximo el 95% del total de tus fondos acumulados) y el plazo.
6. Acepta las condiciones del crédito y envía tu solicitud. El dinero se deposita en 24 a 72 horas hábiles.

🔗 **Dónde tramitarlo**
En línea en el portal financiero [biess.fin.ec](https://www.biess.fin.ec).

⚠️ **Errores frecuentes a evitar**
- No registrar o verificar por separado la cuenta de banco en el portal del BIESS (es un registro independiente al sistema del IESS).
- Tener deudas vigentes como garante de préstamos hipotecarios de terceros.
- Intentar sacar el crédito justo cuando el empleador se encuentra atrasado en el pago de planillas (aunque sea por unos días, el sistema inhabilita la precalificación).

📞 **¿Necesitas más ayuda?**
Recuerda que una vez que hayas cancelado al menos el 25% del préstamo actual, tienes derecho a realizar una 'Novación de Crédito' para reestructurarlo. ¿Hay algo más sobre este trámite que quieras saber o tienes otra consulta?`;
  } else if (lowerMsg.includes("hipotecario") || lowerMsg.includes("casa") || lowerMsg.includes("terreno") || lowerMsg.includes("vivienda")) {
    responseText = prefix + `El **Préstamo Hipotecario** del BIESS te permite adquirir bienes inmuebles en las mejores condiciones de financiamiento de Ecuador.

✅ **¿Quién puede hacer este trámite?**
Afiliados activos (incluidos voluntarios en el exterior) y jubilados que califiquen crediticiamente.

📋 **Requisitos**
- Tener al menos 36 aportaciones mensuales vigentes en el seguro general.
- Aprobar la precalificación de riesgo crediticio realizada en línea por el BIESS.
- No registrar un préstamo hipotecario activo o en trámite vigente con el IESS/BIESS.
- No poseer deudas directas vencidas con el BIESS, ni deudas de trámites de avalúos anulados anteriormente.
- No estar reportado con patologías graves o catastróficas en el expediente clínico del seguro social.

🔢 **Pasos para tramitarlo**
1. Accede a [biess.fin.ec](https://www.biess.fin.ec) -> selecciona 'Préstamos Hipotecarios'.
2. Elige el tipo de bien (vivienda terminada, terreno, remodelación, construcción).
3. Realiza la precalificación ingresando tu clave.
4. Si la apruebas, carga los documentos digitales de la propiedad (planos, escrituras, avalúo catastral).
5. Un asesor legal y técnico instrumentará la hipoteca.
6. Se aprueba la transferencia tras la firma y registro de escrituras.

🔗 **Dónde tramitarlo**
Inicialmente en línea a través de [biess.fin.ec](https://www.biess.fin.ec), complementado de forma presencial para entrega de carpetas físicas e instrumentación.

⚠️ **Errores frecuentes a evitar**
- Separar una vivienda sin revisar que el avalúo catastral oficial coincida con el valor solicitado.
- Tener atrasos y reportes negativos en el historial de crédito general de burós bancarios externos.

📞 **¿Necesitas más ayuda?**
El BIESS financia el 100% de viviendas con avalúos de hasta USD 100.000, y el 80% sobre excedentes, con plazos de hasta 25 años y tasas preferenciales del 5% al 8% anual. ¿Deseas planificar un crédito para vivienda nueva?`;
  } else if (lowerMsg.includes("voluntaria") || lowerMsg.includes("afilia") && (lowerMsg.includes("libre") || lowerMsg.includes("independiente") || lowerMsg.includes("cuenta propia"))) {
    responseText = prefix + `La **Afiliación Voluntaria** te permite gozar de todos los derechos de la seguridad social de forma individual y autónoma.

✅ **¿Quién puede hacer este trámite?**
Profesionales por cuenta propia, trabajadores independientes, estudiantes, amas de casa, ecuatorianos en el extranjero y extranjeros residentes que NO tengan un contrato laboral activo en relación de dependencia.

📋 **Requisitos**
- Cédula de ciudadanía o carné de residente/refugiado válido.
- No contar con relación de dependencia activa en el portal del IESS.
- Declarar un ingreso de referencia igual o superior al Salario Básico Unificado (en 2026 el mínimo es de USD 482).
- Tener cuenta bancaria autorizada para realizar los débitos mensuales de aportación.

🔢 **Pasos para tramitarlo**
1. Ingresa a iess.gob.ec -> en el menú busca 'Afiliación Voluntaria'.
2. Coloca tu número de cédula y fecha de nacimiento.
3. Elige y declara tu ingreso mensual sobre el que deseas aportar (mínimo USD 482).
4. El sistema calculará automáticamente la tasa de pago del 17,60% sobre el ingreso declarado (ej. para USD 482, el pago mensual será aproximado de USD 84.83).
5. Programa el débito bancario automático y realiza el pago de la primera planilla en menos de 30 días.

🔗 **Dónde tramitarlo**
Completamente virtual en [iess.gob.ec](https://www.iess.gob.ec).

⚠️ **Errores frecuentes a evitar**
- Dejar pasar la primera planilla sin pagar en los primeros 30 días, lo que cancela la preafiliación de forma permanente.
- Declarar salarios menores al SBU del año vigente, bloqueado por el sistema.

📞 **¿Necesitas más ayuda?**
Este tipo de afiliación cubre atención de salud inmediata en hospitales del IESS, derecho a jubilación de vejez, préstamos quirografarios (desde el sexto mes) e hipotecarios (desde el mes 36). ¿Te gustaría proceder con tu afiliación autónoma?`;
  } else if (
    lowerMsg.includes("denuncia") || 
    lowerMsg.includes("queja") || 
    lowerMsg.includes("reclamo") || 
    lowerMsg.includes("maltrato") || 
    lowerMsg.includes("falla") || 
    lowerMsg.includes("medicamento") || 
    lowerMsg.includes("cita") || 
    lowerMsg.includes("cancela") ||
    lowerMsg.includes("reportar") ||
    lowerMsg.includes("mal servicio")
  ) {
    responseText = prefix + `Si has experimentado demoras excesivas, falta de medicamentos en farmacias del seguro, cancelación de citas programadas, maltrato por parte de funcionarios o alguna irregularidad, te recordamos que **el IESS ha dispuesto canales oficiales y confidenciales de atención 24/7 desde septiembre de 2025** para recibir reclamos y denuncias ciudadanas.

📋 **¿Qué puedes reportar en estos canales?**
- **Demoras excesivas** en agendamiento o tiempos de sala de espera médica.
- **Falta de medicamentos** o insumos médicos en hospitales del IESS.
- **Citas canceladas de forma imprevista** o sin notificación razonable.
- **Prestadoras externas** de salud que salgan de la red sin aviso previo.
- **Trámites estancados** en el portal digital sin respuestas administrativas.
- **Fallos en la plataforma digital** de afiliación o créditos.
- **Presuntos actos de corrupción** o cobros indebidos.

🔢 **Canales para ingresar tu reporte de forma segura e inmediata**
1. **Canal Web Oficial (Confidencial):** Puedes ingresar al sistema interactivo en línea las 24 horas en [denuncias.iess.gob.ec](https://denuncias.iess.gob.ec).
2. **Chatbot Oficial de WhatsApp:** Envía un mensaje en cualquier momento al número autorizado **0962532338** para ser guiado paso a paso de forma digital.
3. **Centro de Atención Presencial:** Acude a los Centros de Atención Universal (CAU) del IESS a nivel nacional en horario de lunes a viernes, de 08:00 a 17:00.
4. **Línea Telefónica Nacional:** Llama de forma gratuita al **1800-IESS (1800-4377)**.

⚠️ **Dato Importante**
Cualquier denuncia realizada es confidencial para proteger la integridad del afiliado. No requiere firmas de patrocinio legal ni costo alguno.

📞 **¿Necesitas ayuda para iniciar tu proceso de queja o requieres algún otro trámite técnico?**`;
  } else {
    // Elegant generic response with compliance
    responseText = prefix + `Con mucho gusto te oriento. Al ser tu asistente virtual experto en la seguridad social ecuatoriana, tengo información actualizada sobre los siguientes trámites clave:

1. **Jubilación por Vejez** (requisitos de edad y aportaciones)
2. **Jubilación por Invalidez** (calificación de la Comisión Médica)
3. **Pensión de Montepío** (para viudos u huérfanos del afiliado)
4. **Préstamo Quirografario del BIESS** (garantía de tus fondos de cesantía)
5. **Préstamo Hipotecario del BIESS** (financiación de viviendas, terrenos o construcción)
6. **Afiliación Voluntaria** (independiente sobre base de aportación del 17.6%)
7. **Subsidios Médicos** (por enfermedad o maternidad temporal)
8. **Seguro de Desempleo e indemnización**
9. **Derechos y responsabilidad patronal frente al IESS** (Normativa C.D. 677)

Cuéntame más sobre qué trámite te interesa consultar o qué problema de afiliación estás experimentando para brindarte los requisitos y el paso a paso detallado. 

Recuerda que si deseas registrar un reclamo, los canales oficiales 24/7 son **denuncias.iess.gob.ec** y el WhatsApp **0962532338**. Para confirmar montos o fechas sumamente específicos de tu historial particular, puedes verificar en iess.gob.ec o llamar gratuitamente al 1800-4377.

¿Hay algo más en lo que te pueda colaborar en este momento?`;
  }

  const schema = detectAndGenerateSchema(message, responseText);
  res.json({ response: responseText, schema, simulator: true });
});

// Helper function to render HTML dynamically with server-side meta tags & structured data
function renderHtml(meta: {
  title: string;
  description: string;
  url: string;
  jsonLd?: any;
  dataAttr?: string;
  dataVal?: string;
  geoTags?: { position: string; placename: string; region: string };
}) {
  const isProd = process.env.NODE_ENV === "production";
  const htmlPath = isProd
    ? path.join(process.cwd(), "dist", "index.html")
    : path.join(process.cwd(), "index.html");

  let html = "";
  try {
    html = fs.readFileSync(htmlPath, "utf-8");
  } catch (err) {
    // Basic fallback HTML in case file reading fails
    html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>${meta.title}</title><meta name="description" content="${meta.description}"></head><body><div id="root"></div></body></html>`;
  }

  // 1. Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

  // 2. Replace meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${meta.description}">`);
  } else {
    html = html.replace('</head>', `<meta name="description" content="${meta.description}">\n</head>`);
  }

  // 3. Replace Canonical link
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${meta.url}">`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${meta.url}">\n</head>`);
  }

  // 4. Update / Inject Open Graph tags
  const ogTitle = `<meta property="og:title" content="${meta.title}">`;
  const ogDesc = `<meta property="og:description" content="${meta.description}">`;
  const ogUrl = `<meta property="og:url" content="${meta.url}">`;
  
  html = html.replace('</head>', `${ogTitle}\n${ogDesc}\n${ogUrl}\n</head>`);

  // 5. Inject JSON-LD structured schema
  if (meta.jsonLd) {
    const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(meta.jsonLd, null, 2)}\n</script>`;
    html = html.replace('</head>', `${jsonLdScript}\n</head>`);
  }

  // 6. Inject Geo-meta tags for local searches
  if (meta.geoTags) {
    const geoPos = `<meta name="geo.position" content="${meta.geoTags.position}">`;
    const geoPlace = `<meta name="geo.placename" content="${meta.geoTags.placename}">`;
    const geoRegion = `<meta name="geo.region" content="${meta.geoTags.region}">`;
    html = html.replace('</head>', `${geoPos}\n${geoPlace}\n${geoRegion}\n</head>`);
  }

  // 7. Hydrate initial state by putting a data-attribute on #root
  if (meta.dataAttr && meta.dataVal) {
    html = html.replace('<div id="root"></div>', `<div id="root" ${meta.dataAttr}="${meta.dataVal}"></div>`);
  }

  return html;
}

const ECUADOR_LOCATIONS: Record<string, { lat: number; lng: number; region: string; fullName: string }> = {
  'quito': { lat: -0.2298, lng: -78.5249, region: 'Pichincha', fullName: 'Quito' },
  'guayaquil': { lat: -2.1962, lng: -79.8758, region: 'Guayas', fullName: 'Guayaquil' },
  'cuenca': { lat: -2.9021, lng: -79.0049, region: 'Azuay', fullName: 'Cuenca' },
  'ambato': { lat: -1.2241, lng: -78.6294, region: 'Tungurahua', fullName: 'Ambato' },
  'machala': { lat: -3.2581, lng: -79.9439, region: 'El Oro', fullName: 'Machala' }
};

// Endpoint para páginas locales de ciudades principales de Ecuador
app.get('/iess/:ciudad', (req, res) => {
  const ciudad = req.params.ciudad.toLowerCase();
  const locationData = ECUADOR_LOCATIONS[ciudad];
  
  if (!locationData) {
    return res.redirect('/');
  }
  
  const cityNameCap = locationData.fullName;
  const url = `https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/iess/${ciudad}`;
  
  const html = renderHtml({
    title: `IESS ${cityNameCap} - Trámites, Requisitos y Oficios | IESSAsistente`,
    description: `Asesoría oficial IESS en ${cityNameCap} (Provincia de ${locationData.region}). Requisitos de jubilación por vejez, préstamos BIESS, subsidio de maternidad, afiliación voluntaria y oficios automatizados.`,
    url,
    geoTags: {
      position: `${locationData.lat};${locationData.lng}`,
      placename: cityNameCap,
      region: `EC-${locationData.region}`
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `IESS Asistente - ${cityNameCap}`,
      "description": `Asistente virtual y generador de oficios para trámites IESS en ${cityNameCap}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityNameCap,
        "addressRegion": locationData.region,
        "addressCountry": "EC"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": String(locationData.lat),
        "longitude": String(locationData.lng)
      }
    },
    dataAttr: "data-location",
    dataVal: ciudad
  });
  
  res.header('Content-Type', 'text/html');
  res.send(html);
});

// SSR Routing for Procedures (for SEO indexability)
app.get("/procedimiento/:slug", (req, res) => {
  const slug = req.params.slug;
  // Look up procedure where slug-ified ID matches the requested slug
  const proc = PROCEDURES_DATA.find(p => p.id.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase());

  if (proc) {
    const url = `https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/procedimiento/${slug}`;
    const html = renderHtml({
      title: `${proc.title} - Requisitos y Pasos Oficiales | IESSAsistente`,
      description: `Guía detallada paso a paso sobre ${proc.title} en Ecuador. Conoce los requisitos mínimos de aportes, documentos de respaldo, pasos de trámite en línea y errores comunes a evitar.`,
      url,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": proc.title,
        "description": `Guía para tramitar ${proc.title} en el IESS de Ecuador.`,
        "step": proc.steps.map((step, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "name": `Paso ${idx + 1}`,
          "text": step
        }))
      },
      dataAttr: "data-procedure",
      dataVal: proc.id
    });
    res.header('Content-Type', 'text/html');
    res.send(html);
  } else {
    res.redirect("/");
  }
});

// SSR Routing for Blog Articles (for SEO indexability)
app.get("/blog/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);

  if (post) {
    const url = `https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/blog/${slug}`;
    const html = renderHtml({
      title: `${post.title} | Blog IESSAsistente`,
      description: post.metaDescription,
      url,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription,
        "image": post.image,
        "datePublished": post.publishDate,
        "author": {
          "@type": "Organization",
          "name": post.author
        }
      },
      dataAttr: "data-blog-slug",
      dataVal: post.slug
    });
    res.header('Content-Type', 'text/html');
    res.send(html);
  } else {
    res.redirect("/blog");
  }
});

// SSR Routing for Blog Section List
app.get("/blog", (req, res) => {
  const url = `https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/blog`;
  const html = renderHtml({
    title: "Blog Oficial IESS Ecuador - Guías de Seguridad Social y Trámites",
    description: "Encuentra explicaciones sencillas, normativas legales vigentes y guías detalladas para jubilaciones, préstamos BIESS, subsidio de maternidad y aportación independiente.",
    url,
    dataAttr: "data-tab",
    dataVal: "blog"
  });
  res.header('Content-Type', 'text/html');
  res.send(html);
});

// SSR Routing for FAQ / Consultas Section
app.get("/faq", (req, res) => {
  const url = `https://ais-pre-lcespzc3y2p5yn5ey2rbly-34447954721.us-west2.run.app/faq`;
  const html = renderHtml({
    title: "Preguntas Frecuentes IESS - Respuestas Rápidas de Seguridad Social",
    description: "Resuelve de forma inmediata tus dudas de trámites, requisitos de afiliación voluntaria, cobro de fondos de reserva, cesantías y cálculo de pensiones.",
    url,
    dataAttr: "data-tab",
    dataVal: "consultas"
  });
  res.header('Content-Type', 'text/html');
  res.send(html);
});

// Serve frontend assets using Vite middleware or Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, mount Vite middleware to serve resources dynamically
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // In production mode, serve compiled build assets inside dist/ folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server routing online on port ${PORT}`);
  });
}

startServer();
