import app from "../server";
import { Server } from "http";
import { FACTS } from "../src/data/facts";

const PORT = 3008;

interface CategorizedErrors {
  http: string[];
  titles: string[];
  descriptions: string[];
  h1s: string[];
  canonicals: string[];
  jsonLd: string[];
  ogDuplicates: string[];
  ogImages: string[];
  brokenLinks: string[];
  forbiddenOfficiality: string[];
  placeholders: string[];
  ymylFacts: string[];
  cityIndexing: string[];
}

async function runFullSeoCheck() {
  console.log("================================================================================");
  console.log("  Auditoría Completa de SEO Técnico y Calidad Web - IESS Asistente 2026");
  console.log("================================================================================");

  const errors: CategorizedErrors = {
    http: [],
    titles: [],
    descriptions: [],
    h1s: [],
    canonicals: [],
    jsonLd: [],
    ogDuplicates: [],
    ogImages: [],
    brokenLinks: [],
    forbiddenOfficiality: [],
    placeholders: [],
    ymylFacts: [],
    cityIndexing: []
  };

  const titleMap = new Map<string, string[]>();
  const resourceCache = new Map<string, { status: number; ok: boolean }>();

  const server: Server = app.listen(PORT, "127.0.0.1", async () => {
    console.log(`[Servidor de Pruebas] Escuchando en http://127.0.0.1:${PORT}`);

    try {
      // 1. Fetch Sitemap XML
      console.log("[Sitemap] Obteniendo sitemap.xml...");
      const sitemapRes = await fetch(`http://127.0.0.1:${PORT}/sitemap.xml`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }
      });

      if (!sitemapRes.ok) {
        errors.http.push(`/sitemap.xml devolvió status ${sitemapRes.status}`);
        throw new Error(`Error fatal al cargar sitemap.xml: status ${sitemapRes.status}`);
      }

      const sitemapXml = await sitemapRes.text();
      const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

      console.log(`[Sitemap] ${sitemapUrls.length} URLs encontradas en sitemap.xml para auditar.\n`);

      if (sitemapUrls.length === 0) {
        errors.http.push("El sitemap no contiene URLs válidas (<loc>).");
      }

      // Helper for testing local links and resources
      async function testResource(path: string): Promise<{ status: number; ok: boolean }> {
        if (resourceCache.has(path)) {
          return resourceCache.get(path)!;
        }
        try {
          const res = await fetch(`http://127.0.0.1:${PORT}${path}`, {
            method: "HEAD",
            headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" }
          });
          const result = { status: res.status, ok: res.status >= 200 && res.status < 400 };
          resourceCache.set(path, result);
          return result;
        } catch {
          const result = { status: 500, ok: false };
          resourceCache.set(path, result);
          return result;
        }
      }

      let auditedCount = 0;

      // 2. Crawl and audit each URL in the sitemap
      for (const rawUrl of sitemapUrls) {
        auditedCount++;
        let pathname = rawUrl;
        let expectedCanonical = rawUrl;
        try {
          const parsed = new URL(rawUrl);
          pathname = parsed.pathname;
        } catch {
          // already relative or formatted
        }

        const res = await fetch(`http://127.0.0.1:${PORT}${pathname}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
          }
        });

        // 2a. HTTP Status Check
        if (res.status !== 200) {
          errors.http.push(`${pathname}: HTTP status devuelto ${res.status} (se esperaba 200)`);
          continue;
        }

        const html = await res.text();

        // 2b. Title Check (30-60 chars, unique)
        const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
        if (!titleMatch) {
          errors.titles.push(`${pathname}: Falta etiqueta <title>`);
        } else {
          const title = titleMatch[1].trim();
          if (title.length < 30 || title.length > 60) {
            errors.titles.push(`${pathname}: Título de ${title.length} caracteres fuera del rango [30-60] ("${title}")`);
          }
          if (!titleMap.has(title)) {
            titleMap.set(title, []);
          }
          titleMap.get(title)!.push(pathname);
        }

        // 2c. Meta Description Check (120-160 chars)
        const descMatch =
          html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
          html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
        if (!descMatch) {
          errors.descriptions.push(`${pathname}: Falta etiqueta <meta name="description">`);
        } else {
          const desc = descMatch[1].trim();
          if (desc.length < 120 || desc.length > 160) {
            errors.descriptions.push(
              `${pathname}: Descripción de ${desc.length} caracteres fuera de la norma Google [120-160] ("${desc}")`
            );
          }
        }

        // 2d. H1 Tag Check (Exactly 1 H1)
        const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
        if (h1Matches.length === 0) {
          errors.h1s.push(`${pathname}: Falta etiqueta <h1> descriptiva`);
        } else if (h1Matches.length > 1) {
          errors.h1s.push(`${pathname}: Se encontraron ${h1Matches.length} etiquetas <h1> (debe haber exactamente 1)`);
        }

        // 2e. Canonical Tag Check (Must match own URL)
        const canMatch =
          html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
          html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
        if (!canMatch) {
          errors.canonicals.push(`${pathname}: Falta etiqueta <link rel="canonical">`);
        } else {
          const canonicalHref = canMatch[1].trim();
          let canonicalPath = canonicalHref;
          try {
            canonicalPath = new URL(canonicalHref).pathname;
          } catch {
            // relative
          }
          const normalizedTestPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
          const normalizedCanPath = canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, "");

          if (normalizedCanPath !== normalizedTestPath && canonicalHref !== expectedCanonical) {
            errors.canonicals.push(
              `${pathname}: Canonical incorrecto. Encontrado: "${canonicalHref}", Esperado: "${expectedCanonical}"`
            );
          }
        }

        // 2f. JSON-LD Check (Valid and parseable)
        const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
        let jsonMatch;
        let jsonLdCount = 0;
        while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
          jsonLdCount++;
          const jsonContent = jsonMatch[1].trim();
          try {
            JSON.parse(jsonContent);
          } catch (jsonErr: any) {
            errors.jsonLd.push(`${pathname}: Bloque JSON-LD #${jsonLdCount} con sintaxis inválida: ${jsonErr.message}`);
          }
        }
        if (jsonLdCount === 0) {
          errors.jsonLd.push(`${pathname}: No se encontró bloque de datos estructurados JSON-LD`);
        }

        // 2g. OpenGraph Duplicates Check
        const ogTags = html.match(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi) || [];
        const seenOgProps = new Set<string>();
        for (const tag of ogTags) {
          const propMatch = tag.match(/property=["']og:([^"']*)["']/i);
          if (propMatch) {
            const prop = propMatch[1].toLowerCase();
            if (seenOgProps.has(prop)) {
              errors.ogDuplicates.push(`${pathname}: Etiqueta OpenGraph og:${prop} duplicada`);
            }
            seenOgProps.add(prop);
          }
        }

        // 2h. OpenGraph Image Check (No external domains, no 404s)
        const ogImgMatch =
          html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) ||
          html.match(/<meta\s+content=["']([^"']*)["']\s+property=["']og:image["']/i);
        if (ogImgMatch) {
          const ogImg = ogImgMatch[1].trim();
          if (ogImg.startsWith("http://") || (ogImg.startsWith("https://") && !ogImg.includes("ieesciudadano.vercel.app"))) {
            errors.ogImages.push(`${pathname}: og:image apunta a un dominio externo prohibido: "${ogImg}"`);
          } else {
            let imgPath = ogImg;
            if (imgPath.startsWith("http")) {
              try {
                imgPath = new URL(imgPath).pathname;
              } catch {}
            }
            const imgCheck = await testResource(imgPath);
            if (!imgCheck.ok) {
              errors.ogImages.push(`${pathname}: og:image "${ogImg}" responde con código ${imgCheck.status}`);
            }
          }
        }

        // 2i. Internal Links & Local Resources Check (href, src, link rel)
        const resourceRegex = /(?:href|src)=["'](\/[^"'#\s?]+)["']/gi;
        let match;
        while ((match = resourceRegex.exec(html)) !== null) {
          const resPath = match[1];
          if (resPath.startsWith("//") || resPath.startsWith("/api/")) continue;
          const check = await testResource(resPath);
          if (!check.ok) {
            errors.brokenLinks.push(`${pathname}: Enlace o recurso local roto: "${resPath}" devolvió HTTP ${check.status}`);
          }
        }

        // 2j. Forbidden Officiality Texts
        if (/blog oficial/i.test(html)) {
          errors.forbiddenOfficiality.push(`${pathname}: Se encontró la frase prohibida "Blog Oficial"`);
        }
        if (/gu[ií]a oficial/i.test(html)) {
          errors.forbiddenOfficiality.push(`${pathname}: Se encontró la frase prohibida "Guía Oficial"`);
        }

        // 2k. Unreplaced Template Placeholders
        if (html.includes("%SITE_URL%")) {
          errors.placeholders.push(`${pathname}: Contiene el marcador sin reemplazar %SITE_URL%`);
        }
        if (html.includes("[COMPLETAR") || html.includes("[completar")) {
          errors.placeholders.push(`${pathname}: Contiene el marcador sin reemplazar [COMPLETAR`);
        }

        // 2l. YMYL Fact Verification Warning
        const requiredWarning = "Confirma este valor en iess.gob.ec antes de realizar tu trámite";
        for (const [id, fact] of Object.entries(FACTS)) {
          if (!fact.verified && html.includes(`Dato referencial: ${fact.value}`) && html.includes(fact.source)) {
            if (!html.includes(requiredWarning)) {
              errors.ymylFacts.push(
                `${pathname}: Dato no verificado "${id}" (${fact.value}) no incluye el aviso obligatorio`
              );
            }
          }
        }

        // 2m. City Page Checks (noindex and disclaimer)
        if (pathname.startsWith("/iess/")) {
          const robotsMatch =
            html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i) ||
            html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']robots["']/i);
          if (!robotsMatch || !robotsMatch[1].includes("noindex")) {
            errors.cityIndexing.push(
              `${pathname}: Página de ciudad requiere meta robots "noindex", pero tiene: "${robotsMatch ? robotsMatch[1] : "ninguna"}"`
            );
          }
          const cityDisclaimer =
            "Datos pendientes de verificación. Confirma dirección, teléfono y horarios en iess.gob.ec antes de acudir";
          if (!html.includes(cityDisclaimer)) {
            errors.cityIndexing.push(`${pathname}: Falta aviso obligatorio de ciudad pendiente de verificación`);
          }
        }

        process.stdout.write(`\r[Progreso] Auditadas ${auditedCount}/${sitemapUrls.length} páginas...`);
      }

      console.log("\n");

      // Check for duplicate titles across different URLs
      for (const [title, urls] of titleMap.entries()) {
        if (urls.length > 1) {
          errors.titles.push(`Título duplicado en ${urls.length} páginas: "${title}" -> [${urls.join(", ")}]`);
        }
      }

      // 3. Print Grouped Summary
      const totalErrors =
        errors.http.length +
        errors.titles.length +
        errors.descriptions.length +
        errors.h1s.length +
        errors.canonicals.length +
        errors.jsonLd.length +
        errors.ogDuplicates.length +
        errors.ogImages.length +
        errors.brokenLinks.length +
        errors.forbiddenOfficiality.length +
        errors.placeholders.length +
        errors.ymylFacts.length +
        errors.cityIndexing.length;

      console.log("================================================================================");
      console.log("  RESUMEN DE RESULTADOS DE LA AUDITORÍA SEO");
      console.log("================================================================================");
      console.log(`Total URLs auditadas: ${auditedCount}`);
      console.log(`Recursos y enlaces internos cacheados/verificados: ${resourceCache.size}`);
      console.log(`Total de discrepancias encontradas: ${totalErrors}`);
      console.log("--------------------------------------------------------------------------------");

      function printErrorCategory(name: string, list: string[]) {
        if (list.length > 0) {
          console.error(`\n❌ [${name}] (${list.length} errores):`);
          list.forEach(err => console.error(`   - ${err}`));
        } else {
          console.log(`✅ [${name}]: 0 errores`);
        }
      }

      printErrorCategory("HTTP_STATUS_ERRORS", errors.http);
      printErrorCategory("TITLE_ERRORS (30-60 chars, unique)", errors.titles);
      printErrorCategory("DESCRIPTION_ERRORS (120-160 chars)", errors.descriptions);
      printErrorCategory("H1_ERRORS (exactamente 1)", errors.h1s);
      printErrorCategory("CANONICAL_ERRORS (coincide con propia URL)", errors.canonicals);
      printErrorCategory("JSON_LD_ERRORS (sintaxis válida)", errors.jsonLd);
      printErrorCategory("OG_DUPLICATE_ERRORS", errors.ogDuplicates);
      printErrorCategory("OG_IMAGE_ERRORS (dominio propio, 200 OK)", errors.ogImages);
      printErrorCategory("BROKEN_LINK_ERRORS (recursos y enlaces internos)", errors.brokenLinks);
      printErrorCategory("OFFICIALITY_CLAIM_ERRORS (no auto-afirmación oficial)", errors.forbiddenOfficiality);
      printErrorCategory("UNREPLACED_PLACEHOLDER_ERRORS (%SITE_URL%, [COMPLETAR)", errors.placeholders);
      printErrorCategory("YMYL_FACT_ERRORS (aviso obligatorio)", errors.ymylFacts);
      printErrorCategory("CITY_INDEXING_ERRORS (noindex y disclaimer)", errors.cityIndexing);

      console.log("================================================================================\n");

      server.close(() => {
        if (totalErrors > 0) {
          console.error(`🚨 Fallo en la auditoría: se encontraron ${totalErrors} errores de SEO técnico.`);
          process.exit(1);
        } else {
          console.log("🎉 ¡Éxito rotundo! Todas las páginas del portal cumplen al 100% las normativas técnicas de SEO.");
          process.exit(0);
        }
      });
    } catch (err: any) {
      server.close();
      console.error("\n❌ Error inesperado durante la ejecución del validador:", err.message);
      process.exit(1);
    }
  });
}

runFullSeoCheck();
