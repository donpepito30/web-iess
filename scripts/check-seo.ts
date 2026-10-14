import app from "../server";
import { Server } from "http";
import { FACTS } from "../src/data/facts";

const PORT = 3006;

async function runSeoCheck() {
  console.log("==================================================");
  console.log("Iniciando Verificación Automatizada de SEO Técnico...");
  console.log("==================================================");

  // Start the server locally on port 3006
  const server = app.listen(PORT, "127.0.0.1", async () => {
    console.log(`[Server] Servidor temporal corriendo en http://127.0.0.1:${PORT}`);
    
    try {
      const testCases = [
        {
          name: "Home Page",
          path: "/",
          expectedCanonical: "https://ieesciudadano.vercel.app/"
        },
        {
          name: "Trámite (Jubilación por Vejez)",
          path: "/procedimiento/jubilacion-vejez",
          expectedCanonical: "https://ieesciudadano.vercel.app/procedimiento/jubilacion-vejez"
        },
        {
          name: "Trámite (Afiliación Voluntaria - Con FactNote)",
          path: "/procedimiento/afiliacion-voluntaria",
          expectedCanonical: "https://ieesciudadano.vercel.app/procedimiento/afiliacion-voluntaria",
          requiresUnverifiedWarning: true
        },
        {
          name: "Trámite (Préstamo Quirografario - Con FactNote)",
          path: "/procedimiento/prestamo-quirografario",
          expectedCanonical: "https://ieesciudadano.vercel.app/procedimiento/prestamo-quirografario",
          requiresUnverifiedWarning: true
        },
        {
          name: "Trámite (Pensión de Montepío - Con FactNote)",
          path: "/procedimiento/montepio",
          expectedCanonical: "https://ieesciudadano.vercel.app/procedimiento/montepio",
          requiresUnverifiedWarning: true
        },
        {
          name: "Trámite (Subsidio de Maternidad - Con FactNote)",
          path: "/procedimiento/subsidio-maternidad",
          expectedCanonical: "https://ieesciudadano.vercel.app/procedimiento/subsidio-maternidad",
          requiresUnverifiedWarning: true
        },
        {
          name: "Artículo de Blog (Jubilación por Vejez)",
          path: "/blog/jubilacion-por-vejez-requisitos-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/jubilacion-por-vejez-requisitos-2026"
        },
        {
          name: "Artículo de Blog (Afiliación Voluntaria - Con FactNote)",
          path: "/blog/afiliacion-voluntaria-iess-requisitos-beneficios-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/afiliacion-voluntaria-iess-requisitos-beneficios-2026",
          requiresUnverifiedWarning: true
        },
        {
          name: "Artículo de Blog (Subsidio de Maternidad - Con FactNote)",
          path: "/blog/subsidio-maternidad-iess-requisitos-calculo-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/subsidio-maternidad-iess-requisitos-calculo-2026",
          requiresUnverifiedWarning: true
        },
        {
          name: "Artículo de Blog (Pensión de Montepío - Con FactNote)",
          path: "/blog/pension-montepio-iess-requisitos-sobrevivientes-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/pension-montepio-iess-requisitos-sobrevivientes-2026",
          requiresUnverifiedWarning: true
        },
        {
          name: "Artículo de Blog (Préstamo Hipotecario - Con FactNote)",
          path: "/blog/prestamo-hipotecario-biess-requisitos-tasas-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/prestamo-hipotecario-biess-requisitos-tasas-2026",
          requiresUnverifiedWarning: true
        },
        {
          name: "Categoría de Contenido (Afiliación)",
          path: "/afiliacion",
          expectedCanonical: "https://ieesciudadano.vercel.app/afiliacion"
        },
        {
          name: "Página de Ciudad / SEO Local (Quito - noindex)",
          path: "/iess/quito",
          expectedCanonical: "https://ieesciudadano.vercel.app/iess/quito",
          mustBeNoindex: true
        },
        {
          name: "Paginación de Blog (Página 2)",
          path: "/blog/page/2",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/page/2"
        }
      ];

      let globalErrorCount = 0;

      for (const testCase of testCases) {
        console.log(`\n--------------------------------------------------`);
        console.log(`[Test] Validando: ${testCase.name} (${testCase.path})`);
        console.log(`--------------------------------------------------`);

        const res = await fetch(`http://127.0.0.1:${PORT}${testCase.path}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
          }
        });

        if (!res.ok) {
          console.error(`❌ Error HTTP: Status devuelto ${res.status}`);
          globalErrorCount++;
          continue;
        }

        const html = await res.text();
        const pageErrors: string[] = [];

        // 1. Check for single H1 tag (SEO best practice)
        const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
        if (h1Matches.length === 0) {
          pageErrors.push("Falta etiqueta <h1> descriptiva de la página.");
        } else if (h1Matches.length > 1) {
          pageErrors.push(`Se detectaron múltiples etiquetas <h1> (${h1Matches.length} encontradas).`);
        } else {
          console.log(`   [H1] Encontrado: ${h1Matches[0].replace(/<[^>]*>/g, '').trim()}`);
        }

        // 2. Check for Title tag presence & length (30-90 characters to cover articles)
        const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
        if (!titleMatch) {
          pageErrors.push("Falta la etiqueta <title>.");
        } else {
          const titleText = titleMatch[1].trim();
          console.log(`   [Title] Encontrado: "${titleText}" (${titleText.length} caracteres)`);
          if (titleText.length < 30 || titleText.length > 90) {
            pageErrors.push(`La longitud del título (${titleText.length} caracteres) está fuera del rango [30-90].`);
          }
        }

        // 3. Check for Meta Description presence & strict length (120-160 characters)
        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || 
                          html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
        if (!descMatch) {
          pageErrors.push("Falta la etiqueta <meta name=\"description\">.");
        } else {
          const descText = descMatch[1].trim();
          console.log(`   [Description] Encontrada: "${descText}" (${descText.length} caracteres)`);
          if (descText.length < 120 || descText.length > 160) {
            pageErrors.push(`La longitud de la descripción (${descText.length} caracteres) está fuera de la norma Google [120-160].`);
          }
        }

        // 4. Check for self-referencing canonical URL
        const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || 
                               html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i);
        if (!canonicalMatch) {
          pageErrors.push("Falta la etiqueta <link rel=\"canonical\">.");
        } else {
          const canonicalHref = canonicalMatch[1].trim();
          console.log(`   [Canonical] Encontrado: "${canonicalHref}"`);
          if (canonicalHref !== testCase.expectedCanonical) {
            pageErrors.push(`Canonical URL incorrecta. Esperada: "${testCase.expectedCanonical}", Encontrada: "${canonicalHref}"`);
          }
        }

        // 5. Check JSON-LD structured data presence & valid JSON syntax
        const jsonLdRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
        let jsonMatch;
        let jsonLdCount = 0;
        while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
          jsonLdCount++;
          const jsonText = jsonMatch[1].trim();
          try {
            const parsed = JSON.parse(jsonText);
            console.log(`   [JSON-LD #${jsonLdCount}] Parseado exitosamente. Tipo: ${parsed["@type"] || "Graph (@graph)"}`);
          } catch (jsonErr: any) {
            pageErrors.push(`Bloque JSON-LD #${jsonLdCount} contiene sintaxis inválida: ${jsonErr.message}`);
          }
        }
        if (jsonLdCount === 0) {
          pageErrors.push("No se encontró ningún bloque de datos estructurados <script type=\"application/ld+json\">.");
        }

        // 6. Check for duplicate OpenGraph tags
        const ogTags: string[] = html.match(/<meta\s+property="og:[^>]*>/gi) || [];
        const seenOgProps = new Set<string>();
        ogTags.forEach((tag: string) => {
          const propMatch = tag.match(/property="og:([^"]*)"/i) || tag.match(/property='og:([^']*)'/i);
          if (propMatch) {
            const prop = propMatch[1].toLowerCase();
            if (seenOgProps.has(prop)) {
              pageErrors.push(`Etiqueta Meta og:${prop} duplicada.`);
            }
            seenOgProps.add(prop);
          }
        });
        if (seenOgProps.size > 0) {
          console.log(`   [OpenGraph] Detectadas propiedades: ${Array.from(seenOgProps).map(p => `og:${p}`).join(", ")}`);
        }

        // 7. Check for unverified facts warning (Task 6)
        // Regla: Añade en seo:check un fallo si algún dato con verified:false aparece en una página SIN el aviso del punto 2
        const requiredWarning = "Confirma este valor en iess.gob.ec antes de realizar tu trámite";
        const hasWarning = html.includes(requiredWarning);

        // Detect unverified facts rendered on this page
        const unverifiedFactsFound: string[] = [];
        for (const [id, fact] of Object.entries(FACTS)) {
          if (!fact.verified) {
            // Check if this fact note was rendered
            if (html.includes(`Dato referencial: ${fact.value}`) && html.includes(fact.source)) {
              unverifiedFactsFound.push(`${id} (${fact.value})`);
            }
          }
        }

        if (unverifiedFactsFound.length > 0) {
          if (!hasWarning) {
            pageErrors.push(
              `Dato con verified:false encontrado (${unverifiedFactsFound.join(", ")}) SIN el aviso obligatorio: "${requiredWarning}"`
            );
          } else {
            console.log(`   [YMYL FactCheck] ✅ Datos no verificados [${unverifiedFactsFound.length}] acompañados del aviso obligatorio.`);
          }
        }

        if (testCase.requiresUnverifiedWarning && !hasWarning) {
          pageErrors.push(`Página con datos normativos clave requiere el aviso obligatorio: "${requiredWarning}"`);
        }

        // 8. Check for city noindex requirement (Task 4)
        if (testCase.mustBeNoindex) {
          const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) ||
                              html.match(/<meta\s+content="([^"]*)"\s+name="robots"/i);
          if (!robotsMatch || !robotsMatch[1].includes("noindex")) {
            pageErrors.push(`La página de ciudad debe tener directiva noindex, pero tiene: "${robotsMatch ? robotsMatch[1] : 'ninguna'}"`);
          } else {
            console.log(`   [Robots City] ✅ Correctamente marcada con noindex: "${robotsMatch[1]}"`);
          }

          const cityDisclaimer = "Datos pendientes de verificación. Confirma dirección, teléfono y horarios en iess.gob.ec antes de acudir";
          if (!html.includes(cityDisclaimer)) {
            pageErrors.push(`Falta el aviso obligatorio de ciudad pendiente de verificación.`);
          }
        }

        // Report page errors if any
        if (pageErrors.length > 0) {
          console.error(`❌ Errores de validación en ${testCase.path}:`);
          pageErrors.forEach(err => console.error(`   - [FAIL] ${err}`));
          globalErrorCount += pageErrors.length;
        } else {
          console.log(`✅ ${testCase.name} cumple perfectamente todos los criterios SEO.`);
        }
      }

      // Stop server and determine exit status
      server.close(() => {
        console.log("\n[Server] Servidor temporal apagado.");
        if (globalErrorCount > 0) {
          console.error(`\n❌ La validación ha terminado con ${globalErrorCount} errores totales de SEO.`);
          process.exit(1);
        } else {
          console.log("\n🎉 ¡Éxito! Todas las páginas representativas cumplen al 100% las normativas SEO y YMYL.");
          process.exit(0);
        }
      });

    } catch (err: any) {
      server.close();
      console.error("\n❌ Error grave inesperado en el validador:", err.message);
      process.exit(1);
    }
  });
}

runSeoCheck();
