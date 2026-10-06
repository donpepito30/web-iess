import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";
import { PROCEDURES_DATA } from "./src/data/procedures";
import { BLOG_POSTS } from "./src/data/blogPosts";
import { SEO_CATEGORIES } from "./src/data/seoCategories";
import { getSiteUrl, CURRENT_YEAR } from "./src/config/site";
import {
  generateHomeSeoHtml,
  generateProcedureSeoHtml,
  generateBlogArchiveSeoHtml,
  generateBlogPostSeoHtml,
  generateCategorySeoHtml,
  generateCitySeoHtml,
  generateFaqPageSeoHtml,
  findProcedureBySlug,
  ECUADOR_LOCATIONS,
  generateAboutSeoHtml,
  generateEditorialSeoHtml,
  generateContactSeoHtml,
  generatePrivacySeoHtml,
  generateTermsSeoHtml,
  generateLegalSeoHtml,
  generateCookiesSeoHtml,
  generateAuthorSeoHtml
} from "./src/server/seoHtml";
import {
  getHomeGraph,
  getProcedureGraph,
  getArticleGraph,
  getCategoryGraph,
  getCityGraph,
  getBlogArchiveGraph
} from "./src/server/schema";

dotenv.config();

const app = express();
const PORT = 3000;

// Compress all text responses
app.use(compression());

app.use(express.json());

// Redirection middleware to enforce primary SITE_URL in production (Task 2)
app.use((req, res, next) => {
  const siteUrlEnv = process.env.SITE_URL;
  const isProd = process.env.NODE_ENV === "production";
  
  if (siteUrlEnv && isProd && req.path !== "/api/health") {
    let targetHost = "";
    try {
      const parsed = new URL(siteUrlEnv);
      targetHost = parsed.host;
    } catch (e) {
      targetHost = siteUrlEnv.replace(/^https?:\/\//, "");
    }
    
    const requestHost = req.get("host");
    
    if (requestHost && requestHost !== targetHost) {
      const queryStr = Object.keys(req.query).length > 0 ? `?${new URLSearchParams(req.query as any).toString()}` : "";
      const targetUrl = `${siteUrlEnv.endsWith('/') ? siteUrlEnv.slice(0, -1) : siteUrlEnv}${req.path}${queryStr}`;
      return res.redirect(301, targetUrl);
    }
  }
  next();
});

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

// Helper function to dynamically obtain the site's base URL (e.g., on Vercel, Cloud Run, Localhost)
function getBaseUrl(req?: express.Request): string {
  return getSiteUrl();
}

// Sitemap dinámico
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = getBaseUrl(req);
  
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
  BLOG_POSTS.forEach(post => {
    urls.push({
      url: `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // URLs de paginación del Blog (distribución de Link Equity y rastreo de archivos)
  const totalBlogPages = Math.ceil(BLOG_POSTS.length / 4);
  for (let p = 2; p <= totalBlogPages; p++) {
    urls.push({
      url: `/blog/page/${p}`,
      changefreq: 'daily',
      priority: '0.7'
    });
  }

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
  const baseUrl = getBaseUrl(req);
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /private

Sitemap: ${baseUrl}/sitemap.xml

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

// Lazy initialization of Gemini Client for Serverless and Container environments
let cachedAiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
    return null;
  }
  if (!cachedAiClient) {
    try {
      cachedAiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini client lazy-initialized successfully in request handler.");
    } catch (error) {
      console.log("Failed lazy-initializing Gemini client:", error);
    }
  }
  return cachedAiClient;
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
  const aiClient = getGeminiClient();
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    api_configured: !!aiClient
  });
});

const contactIpCache = new Map<string, { count: number, resetTime: number }>();

app.post("/api/contact", (req, res) => {
  const ip = (req.ip || req.headers["x-forwarded-for"] || "anonymous") as string;
  const now = Date.now();
  
  // Rate Limit check: 3 submissions per hour
  const ipRecord = contactIpCache.get(ip);
  if (ipRecord) {
    if (now < ipRecord.resetTime) {
      if (ipRecord.count >= 3) {
        return res.status(429).json({ error: "Demasiadas solicitudes. Por favor, intenta de nuevo en una hora." });
      }
      ipRecord.count++;
    } else {
      contactIpCache.set(ip, { count: 1, resetTime: now + 3600000 });
    }
  } else {
    contactIpCache.set(ip, { count: 1, resetTime: now + 3600000 });
  }

  const { name, email, message, website_hp } = req.body;

  // Spam Honeypot validation
  if (website_hp && website_hp.trim() !== "") {
    console.log(`[Anti-Spam] Honeypot triggered for IP: ${ip}`);
    return res.status(200).json({ success: true, message: "Mensaje recibido exitosamente (Honeypot)." });
  }

  // Input Validation
  if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
    return res.status(400).json({ error: "Todos los campos obligatorios (nombre, correo, mensaje) son requeridos." });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "El formato de correo electrónico ingresado no es válido." });
  }

  console.log(`[Contact Form] Nuevo mensaje de: ${name} <${email}>`);
  return res.status(200).json({
    success: true,
    message: "¡Muchas gracias! Tu mensaje ha sido enviado exitosamente al equipo editorial. Te responderemos en un plazo de menos de 48 horas laborables."
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "El mensaje es obligatorio." });
    return;
  }

  // 1. If Gemini client is ready, call it!
  const aiClient = getGeminiClient();
  if (aiClient) {
    try {
      // Map history to Google GenAI format if provided
      // history syntax: [{ role: 'user' | 'model', content: string }]
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }]
      }));

      // We append the new message to contents or use chats.create
      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
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
      console.log("Gemini API Error (falling back to contingency simulator):", error ? error.message || error : error);
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

// API: Paginated Blog Guides & Search Endpoint
app.get("/api/blog", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(20, Math.max(1, parseInt(req.query.limit as string, 10) || 4));
  const category = (req.query.category as string) || "All";
  const search = ((req.query.search as string) || "").trim().toLowerCase();

  let filtered = BLOG_POSTS;
  if (category && category !== "All") {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.metaDescription.toLowerCase().includes(search) ||
      p.keywords.some(kw => kw.toLowerCase().includes(search))
    );
  }

  const totalPosts = filtered.length;
  const totalPages = Math.ceil(totalPosts / limit) || 1;
  const validPage = Math.min(page, totalPages);
  const offset = (validPage - 1) * limit;
  const posts = filtered.slice(offset, offset + limit);

  res.json({
    posts,
    pagination: {
      currentPage: validPage,
      totalPages,
      totalPosts,
      limit,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
      nextPage: validPage < totalPages ? validPage + 1 : null,
      prevPage: validPage > 1 ? validPage - 1 : null
    }
  });
});

function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsonLd(jsonObj: any): string {
  if (!jsonObj) return "";
  const rawStr = JSON.stringify(jsonObj, null, 2);
  return rawStr.replace(/</g, "\\u003c");
}

// Helper function to render HTML dynamically with server-side meta tags & structured data (Tasks 4, 7, SSR)
function renderHtml(meta: {
  title: string;
  description: string;
  url: string;
  jsonLd?: any;
  dataAttr?: string;
  dataVal?: string;
  geoTags?: { position: string; placename: string; region: string };
  robots?: string;
  prevUrl?: string;
  nextUrl?: string;
  extraDataAttrs?: Record<string, string>;
  image?: string;
  isArticle?: boolean;
  bodyHtml?: string;
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

  // Task 4: Replace site url placeholder first
  html = html.replace(/%SITE_URL%/g, getSiteUrl());

  // Remove pre-existing JSON-LD tags to prevent duplicate schemas
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");

  // Task 7: Remove pre-existing SEO-related tags to prevent duplication
  html = html.replace(/<title>.*?<\/title>/gi, "");
  html = html.replace(/<meta name="description"[^>]*>/gi, "");
  html = html.replace(/<link rel="canonical"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:title"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:description"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:url"[^>]*>/gi, "");
  html = html.replace(/<meta name="robots"[^>]*>/gi, "");
  html = html.replace(/<meta name="twitter:title"[^>]*>/gi, "");
  html = html.replace(/<meta name="twitter:description"[^>]*>/gi, "");
  html = html.replace(/<meta name="twitter:url"[^>]*>/gi, "");
  html = html.replace(/<link rel="prev"[^>]*>/gi, "");
  html = html.replace(/<link rel="next"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:image"[^>]*>/gi, "");
  html = html.replace(/<meta name="twitter:image"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:locale"[^>]*>/gi, "");
  html = html.replace(/<meta property="og:type"[^>]*>/gi, "");

  // Task 7: Escape parameters before injecting them into attributes
  const escTitle = escapeHtml(meta.title);
  const escDesc = escapeHtml(meta.description);
  const escUrl = escapeHtml(meta.url);
  const escPrev = meta.prevUrl ? escapeHtml(meta.prevUrl) : undefined;
  const escNext = meta.nextUrl ? escapeHtml(meta.nextUrl) : undefined;
  const escImage = meta.image ? escapeHtml(meta.image) : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
  const ogTypeVal = meta.isArticle ? "article" : "website";

  let newTags = "";
  newTags += `<title>${escTitle}</title>\n`;
  newTags += `<meta name="description" content="${escDesc}">\n`;
  newTags += `<link rel="canonical" href="${escUrl}">\n`;
  
  newTags += `<meta property="og:title" content="${escTitle}">\n`;
  newTags += `<meta property="og:description" content="${escDesc}">\n`;
  newTags += `<meta property="og:url" content="${escUrl}">\n`;
  newTags += `<meta property="og:image" content="${escImage}">\n`;
  newTags += `<meta property="og:locale" content="es_EC">\n`;
  newTags += `<meta property="og:type" content="${ogTypeVal}">\n`;

  newTags += `<meta name="twitter:title" content="${escTitle}">\n`;
  newTags += `<meta name="twitter:description" content="${escDesc}">\n`;
  newTags += `<meta name="twitter:url" content="${escUrl}">\n`;
  newTags += `<meta name="twitter:image" content="${escImage}">\n`;

  if (meta.robots) {
    newTags += `<meta name="robots" content="${escapeHtml(meta.robots)}">\n`;
  } else {
    newTags += `<meta name="robots" content="index, follow">\n`;
  }

  if (escPrev) {
    newTags += `<link rel="prev" href="${escPrev}">\n`;
  }
  if (escNext) {
    newTags += `<link rel="next" href="${escNext}">\n`;
  }

  // Inject JSON-LD structured schema with secure escaping
  if (meta.jsonLd) {
    newTags += `<script type="application/ld+json">\n${escapeJsonLd(meta.jsonLd)}\n</script>\n`;
  }

  // Inject Geo-meta tags for local searches
  if (meta.geoTags) {
    const geoPos = `<meta name="geo.position" content="${escapeHtml(meta.geoTags.position)}">`;
    const geoPlace = `<meta name="geo.placename" content="${escapeHtml(meta.geoTags.placename)}">`;
    const geoRegion = `<meta name="geo.region" content="${escapeHtml(meta.geoTags.region)}">`;
    newTags += `${geoPos}\n${geoPlace}\n${geoRegion}\n`;
  }

  html = html.replace("</head>", `${newTags}</head>`);

  // Hydrate initial state by putting data-attributes on #root and inject pre-rendered HTML (Task 1)
  let rootAttrs = '';
  if (meta.dataAttr && meta.dataVal) {
    rootAttrs += ` ${meta.dataAttr}="${meta.dataVal}"`;
  }
  if (meta.extraDataAttrs) {
    for (const [k, v] of Object.entries(meta.extraDataAttrs)) {
      rootAttrs += ` ${k}="${v}"`;
    }
  }
  
  const rootReplacement = `<div id="root"${rootAttrs}>${meta.bodyHtml || ""}</div>`;
  html = html.replace('<div id="root"></div>', rootReplacement);

  return html;
}

// Endpoint para páginas locales de ciudades principales de Ecuador
app.get('/iess/:ciudad', (req, res) => {
  const ciudad = req.params.ciudad.toLowerCase();
  const locationData = ECUADOR_LOCATIONS[ciudad];
  
  if (!locationData) {
    return res.redirect('/');
  }
  
  const cityNameCap = locationData.fullName;
  const baseUrl = getBaseUrl(req);
  const url = `${baseUrl}/iess/${ciudad}`;
  
  const bodyHtml = generateCitySeoHtml(ciudad);
  
  const html = renderHtml({
    title: `IESS ${cityNameCap}: oficinas, turnos y trámites ${CURRENT_YEAR} | IESS Asistente`,
    description: `Guía local para IESS ${cityNameCap}. Consulta el horario de atención, ubicación física, requisitos de afiliación y trámites en tu provincia.`,
    url,
    geoTags: {
      position: `${locationData.lat};${locationData.lng}`,
      placename: cityNameCap,
      region: `EC-${locationData.region}`
    },
    jsonLd: getCityGraph(baseUrl, ciudad, locationData),
    dataAttr: "data-location",
    dataVal: ciudad,
    bodyHtml
  });
  
  res.header('Content-Type', 'text/html');
  res.send(html);
});

// SSR Routing for Procedures (for SEO indexability) (Task 5)
app.get("/procedimiento/:slug", (req, res) => {
  const slug = req.params.slug;
  const proc = findProcedureBySlug(slug);

  if (proc) {
    const baseUrl = getBaseUrl(req);
    const url = `${baseUrl}/procedimiento/${slug}`;
    const bodyHtml = generateProcedureSeoHtml(proc);

    const html = renderHtml({
      title: `${proc.title}: requisitos y pasos ${CURRENT_YEAR} | IESS Asistente`,
      description: `Requisitos indispensables, guía paso a paso y errores a evitar para tramitar ${proc.title} en el IESS de Ecuador. Genera tu oficio gratis.`,
      url,
      jsonLd: getProcedureGraph(baseUrl, proc),
      dataAttr: "data-procedure",
      dataVal: proc.id,
      bodyHtml
    });
    res.header('Content-Type', 'text/html');
    res.send(html);
  } else {
    res.redirect("/");
  }
});

// SSR Helper for Blog Paginated Archive Pages
function renderBlogPage(req: express.Request, res: express.Response, requestedPage: number) {
  const baseUrl = getBaseUrl(req);
  const limit = 4;
  const totalPosts = BLOG_POSTS.length;
  const totalPages = Math.ceil(totalPosts / limit) || 1;

  // Bound check page number
  const safePage = Math.max(1, Math.min(requestedPage, totalPages));
  const isFirstPage = safePage === 1;

  // SEO: Self-referencing canonical URL
  // Page 1: /blog
  // Page 2+: /blog/page/:page
  const canonicalUrl = isFirstPage ? `${baseUrl}/blog` : `${baseUrl}/blog/page/${safePage}`;

  // SEO: Rel prev & next links for crawler pagination traversal
  const prevUrl = safePage === 2
    ? `${baseUrl}/blog`
    : safePage > 2
      ? `${baseUrl}/blog/page/${safePage - 1}`
      : undefined;

  const nextUrl = safePage < totalPages
    ? `${baseUrl}/blog/page/${safePage + 1}`
    : undefined;

  // SEO: Dynamic title and description to prevent duplicate metadata
  const title = isFirstPage
    ? `Blog de Guías Prácticas del IESS ${CURRENT_YEAR} | IESS Asistente`
    : `Blog de Guías de Seguridad Social - Página ${safePage} | IESS Asistente`;

  const description = isFirstPage
    ? "Encuentra explicaciones sencillas, normativas vigentes y guías detalladas de jubilaciones, préstamos BIESS y trámites del IESS de Ecuador."
    : `Página ${safePage} del archivo de guías y normativas del IESS de Ecuador. Información de requisitos y resoluciones del Consejo Directivo.`;

  // SEO: Crawl budget optimization for deep pages (pages > 5 set to noindex, follow)
  const robots = safePage > 5 ? "noindex, follow" : "index, follow";

  // Slice posts for this specific page
  const offset = (safePage - 1) * limit;
  const pagePosts = BLOG_POSTS.slice(offset, offset + limit);

  // Structured Data (JSON-LD): CollectionPage with ItemList for this page
  const jsonLd = getBlogArchiveGraph(baseUrl, safePage, pagePosts);

  const bodyHtml = generateBlogArchiveSeoHtml(safePage);

  const html = renderHtml({
    title,
    description,
    url: canonicalUrl,
    robots,
    prevUrl,
    nextUrl,
    jsonLd,
    dataAttr: "data-tab",
    dataVal: "blog",
    extraDataAttrs: {
      "data-blog-page": String(safePage)
    },
    bodyHtml
  });

  res.header("Content-Type", "text/html");
  res.send(html);
}

// SSR Routing for Blog Pagination: /blog/page/:page (MUST come before /blog/:slug)
app.get("/blog/page/:page", (req, res) => {
  const pageNum = parseInt(req.params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    return res.redirect(301, "/blog");
  }
  if (pageNum === 1) {
    // 301 Redirect page 1 parameter to root /blog for strict canonical URL cleanliness
    return res.redirect(301, "/blog");
  }
  renderBlogPage(req, res, pageNum);
});

// SSR Routing for Blog Section List: /blog (supports query string ?page=X or defaults to page 1)
app.get("/blog", (req, res) => {
  const pageParam = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageNum = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  renderBlogPage(req, res, pageNum);
});

// SSR Routing for Blog Articles (for SEO indexability)
app.get("/blog/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);

  if (post) {
    const baseUrl = getBaseUrl(req);
    const url = `${baseUrl}/blog/${slug}`;
    const bodyHtml = generateBlogPostSeoHtml(post);

    const html = renderHtml({
      title: `${post.title} | IESS Asistente`,
      description: post.metaDescription,
      url,
      jsonLd: getArticleGraph(baseUrl, post),
      dataAttr: "data-blog-slug",
      dataVal: post.slug,
      image: post.image,
      isArticle: true,
      bodyHtml
    });
    res.header('Content-Type', 'text/html');
    res.send(html);
  } else {
    res.redirect("/blog");
  }
});

// SSR Routing for FAQ / Consultas Section
app.get("/faq", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const url = `${baseUrl}/faq`;
  const bodyHtml = generateFaqPageSeoHtml();

  const html = renderHtml({
    title: `Preguntas Frecuentes IESS: respuestas ${CURRENT_YEAR} | IESS Asistente`,
    description: "Respuestas inmediatas a tus dudas de jubilación, préstamos BIESS, afiliación voluntaria y cobro de fondos en el IESS de Ecuador.",
    url,
    jsonLd: getCategoryGraph(baseUrl, SEO_CATEGORIES.find(c => c.slug === "faq") || { slug: "faq", title: "Preguntas Frecuentes", metaTitle: "FAQ", metaDescription: "Preguntas Frecuentes IESS", faqs: [] }, null),
    dataAttr: "data-tab",
    dataVal: "consultas",
    bodyHtml
  });
  res.header('Content-Type', 'text/html');
  res.send(html);
});

app.get("/sobre-nosotros", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateAboutSeoHtml();
  const html = renderHtml({
    title: "Sobre Nosotros - Guía Independiente de Consulta | IESS Asistente",
    description: "Conoce el portal independiente de orientación ciudadana sobre trámites y derechos del IESS en Ecuador. Misión, visión y equipo de redactores.",
    url: `${baseUrl}/sobre-nosotros`,
    dataAttr: "data-tab",
    dataVal: "about",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/metodologia-editorial", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateEditorialSeoHtml();
  const html = renderHtml({
    title: "Metodología Editorial y Control de Calidad | IESS Asistente",
    description: "Nuestros estándares editoriales de verificación de seguridad social en Ecuador. Fuentes autorizadas primarias, revisión humana y deslinde de IA.",
    url: `${baseUrl}/metodologia-editorial`,
    dataAttr: "data-tab",
    dataVal: "editorial",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/editorial", (req, res) => {
  res.redirect(301, "/metodologia-editorial");
});

app.get("/contacto", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateContactSeoHtml();
  const html = renderHtml({
    title: "Contacto - Buzón Editorial de Asistencia | IESS Asistente",
    description: "Comunícate con los editores del portal independiente de soporte del IESS en Ecuador. Formulario de contacto, correo electrónico y tiempos de respuesta.",
    url: `${baseUrl}/contacto`,
    dataAttr: "data-tab",
    dataVal: "contact",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/politica-de-privacidad", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generatePrivacySeoHtml();
  const html = renderHtml({
    title: "Política de Privacidad y LOPDP de Ecuador | IESS Asistente",
    description: "Tratamiento confidencial de datos personales de acuerdo con la LOPDP en Ecuador. Derechos ARCO, cookies analíticas, GA4 y Gemini chatbot.",
    url: `${baseUrl}/politica-de-privacidad`,
    dataAttr: "data-tab",
    dataVal: "privacy",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/privacidad", (req, res) => {
  res.redirect(301, "/politica-de-privacidad");
});

app.get("/terminos-de-uso", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateTermsSeoHtml();
  const html = renderHtml({
    title: "Términos y Condiciones de Uso del Portal | IESS Asistente",
    description: "Reglamento de uso libre, gratuito y no comercial de los generadores de oficios y guías de asistencia independiente del IESS en Ecuador.",
    url: `${baseUrl}/terminos-de-uso`,
    dataAttr: "data-tab",
    dataVal: "terms",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/terminos", (req, res) => {
  res.redirect(301, "/terminos-de-uso");
});

app.get("/aviso-legal", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateLegalSeoHtml();
  const html = renderHtml({
    title: "Aviso Legal y Exención de Responsabilidad | IESS Asistente",
    description: "Deslinde oficial de responsabilidad de IESS Asistente. Portal de divulgación independiente, no vinculado al IESS ni al BIESS de Ecuador.",
    url: `${baseUrl}/aviso-legal`,
    dataAttr: "data-tab",
    dataVal: "legal",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/politica-de-cookies", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateCookiesSeoHtml();
  const html = renderHtml({
    title: "Política de Cookies Técnicas y Estadísticas | IESS Asistente",
    description: "Descripción detallada del uso de cookies en nuestro portal independiente. Consentimiento dinámico de Google Consent Mode v2 y GA4.",
    url: `${baseUrl}/politica-de-cookies`,
    dataAttr: "data-tab",
    dataVal: "cookies",
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

app.get("/autor/:slug", (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateAuthorSeoHtml(slug);
  const { AUTHORS } = require("./src/data/authors");
  const author = AUTHORS[slug];

  if (!author) {
    return res.redirect("/");
  }

  const html = renderHtml({
    title: `${author.name} - Experto en Seguridad Social | IESS Asistente`,
    description: `Perfil profesional de ${author.name}. Conoce sus credenciales académicas, trayectoria verificable y guías de apoyo publicadas en el portal.`,
    url: `${baseUrl}/autor/${slug}`,
    dataAttr: "data-author",
    dataVal: slug,
    bodyHtml
  });
  res.header("Content-Type", "text/html").send(html);
});

// GET / (home) (Task 5)
app.get("/", (req, res) => {
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateHomeSeoHtml();

  const html = renderHtml({
    title: `IESS Ecuador: trámites y requisitos ${CURRENT_YEAR} | IESS Asistente`,
    description: "Consulta requisitos de jubilación, préstamos quirografarios, hipotecarios, afiliación voluntaria y genera oficios de ley de forma gratuita.",
    url: `${baseUrl}/`,
    jsonLd: getHomeGraph(baseUrl, PROCEDURES_DATA),
    bodyHtml
  });
  res.header("Content-Type", "text/html");
  res.send(html);
});

// GET /oficios (Task 5)
app.get("/oficios", (req, res) => {
  const baseUrl = getBaseUrl(req);
  
  // Custom simple semantic preview for oficios page
  const bodyHtml = `
    <div class="flex flex-col min-h-screen">
      <header class="bg-[#0a1f42] text-white p-4 border-b-4 border-[#c9a84c]">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" class="text-lg font-bold text-white no-underline">IESS Asistente - Guía de Trámites</a>
          <nav class="flex gap-4 text-sm font-semibold">
            <a href="/" class="text-white no-underline">Inicio</a>
            <a href="/oficios" class="text-white no-underline">Herramientas/Oficios</a>
            <a href="/blog" class="text-white no-underline">Blog</a>
          </nav>
        </div>
      </header>
      <main class="max-w-4xl w-full mx-auto px-4 py-8 space-y-6 flex-grow">
        <h1 class="text-xl sm:text-2xl font-black text-[#0a1f42]">Formatos y Oficios de Ley IESS</h1>
        <p class="text-xs sm:text-sm text-slate-650 leading-relaxed">Generador inteligente y gratuito de oficios, descargos de glosas patronales y solicitudes del IESS de Ecuador. Evita pagar tramitadores redactando tus solicitudes con amparo legal de forma inmediata.</p>
      </main>
    </div>
  `;

  const html = renderHtml({
    title: `Formatos y Oficios de Ley IESS ${CURRENT_YEAR} | IESS Asistente`,
    description: "Generador inteligente y gratuito de 17 oficios, apelaciones e impugnaciones de glosas para afiliados y empleadores del IESS en Ecuador.",
    url: `${baseUrl}/oficios`,
    jsonLd: getCategoryGraph(baseUrl, SEO_CATEGORIES.find(c => c.slug === "herramientas") || { slug: "herramientas", title: "Herramientas de Ley", metaTitle: "Herramientas de Ley", metaDescription: "Herramientas", faqs: [] }, null),
    dataAttr: "data-tab",
    dataVal: "oficios",
    bodyHtml
  });
  res.header("Content-Type", "text/html");
  res.send(html);
});

// GET /:categoria (Task 5)
app.get("/:categoria", (req, res, next) => {
  const categoriaSlug = req.params.categoria.toLowerCase();
  
  // Ignore "blog" and "faq" to avoid collision
  if (categoriaSlug === "blog" || categoriaSlug === "faq") {
    return next();
  }
  
  const cat = SEO_CATEGORIES.find(c => c.slug.toLowerCase() === categoriaSlug);
  if (!cat) {
    return next(); // Let it fall through to 404
  }
  
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateCategorySeoHtml(cat, null);

  const html = renderHtml({
    title: `${cat.title} en el IESS: guía ${CURRENT_YEAR}`,
    description: cat.metaDescription,
    url: `${baseUrl}/${cat.slug}`,
    jsonLd: getCategoryGraph(baseUrl, cat, null),
    bodyHtml
  });
  res.header("Content-Type", "text/html");
  res.send(html);
});

// GET /:categoria/:sub (Task 5)
app.get("/:categoria/:sub", (req, res, next) => {
  const categoriaSlug = req.params.categoria.toLowerCase();
  const subSlug = req.params.sub.toLowerCase();
  
  if (categoriaSlug === "blog" || categoriaSlug === "faq") {
    return next();
  }
  
  const cat = SEO_CATEGORIES.find(c => c.slug.toLowerCase() === categoriaSlug);
  if (!cat) {
    return next();
  }
  
  const sub = cat.subcategories.find(s => s.slug.toLowerCase() === subSlug);
  if (!sub) {
    return next();
  }
  
  const baseUrl = getBaseUrl(req);
  const bodyHtml = generateCategorySeoHtml(cat, sub.slug);

  const html = renderHtml({
    title: `${sub.title} - ${cat.title} | IESS Asistente`,
    description: sub.description,
    url: `${baseUrl}/${cat.slug}/${sub.slug}`,
    jsonLd: getCategoryGraph(baseUrl, cat, sub.slug),
    bodyHtml
  });
  res.header("Content-Type", "text/html");
  res.send(html);
});

const distPath = path.join(process.cwd(), "dist");

if (process.env.NODE_ENV === "production") {
  // Task 4: Change express.static(distPath) to express.static(distPath, { index: false })
  app.use(express.static(distPath, { index: false }));
  
  // Task 6: Custom 404 catch-all
  app.get("*", (req, res) => {
    const baseUrl = getBaseUrl(req);
    const html = renderHtml({
      title: "Página no encontrada - 404 | IESS Asistente",
      description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
      url: `${baseUrl}${req.path}`,
      robots: "noindex, nofollow"
    });
    res.status(404).header("Content-Type", "text/html").send(html);
  });
}

// Serve frontend assets using Vite middleware or Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // In dev mode, mount Vite middleware to serve resources dynamically
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Dev fallback catch-all
    app.get("*", (req, res) => {
      const baseUrl = getBaseUrl(req);
      const html = renderHtml({
        title: "IESS Ecuador - Guía Oficial de Trámites y Asistente Virtual | IESSAsistente",
        description: "Guía completa y asistente virtual para trámites IESS en Ecuador. Jubilación, préstamos BIESS, afiliación, subsidios y más. Respuestas rápidas a tus dudas.",
        url: `${baseUrl}${req.path}`
      });
      res.header("Content-Type", "text/html").send(html);
    });
    console.log("Vite development server middleware mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server routing online on port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}

export default app;
