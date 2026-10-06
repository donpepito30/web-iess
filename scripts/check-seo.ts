import app from "../server";
import { Server } from "http";

const PORT = 3006;

async function runSeoCheck() {
  console.log("==================================================");
  console.log("Iniciando Verificación Automatizada de SEO Técnico...");
  console.log("==================================================");

  // Start the server locally on port 3006
  const server = app.listen(PORT, "127.0.0.1", async () => {
    console.log(`[Server] Servidor temporal corriendo en http://127.0.0.1:${PORT}`);
    
    try {
      // The 6 representative URLs to check as per instructions
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
          name: "Artículo de Blog",
          path: "/blog/jubilacion-por-vejez-requisitos-2026",
          expectedCanonical: "https://ieesciudadano.vercel.app/blog/jubilacion-por-vejez-requisitos-2026"
        },
        {
          name: "Categoría de Contenido (Afiliación)",
          path: "/afiliacion",
          expectedCanonical: "https://ieesciudadano.vercel.app/afiliacion"
        },
        {
          name: "Página de Ciudad / SEO Local (Quito)",
          path: "/iess/quito",
          expectedCanonical: "https://ieesciudadano.vercel.app/iess/quito"
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
        const ogTags = html.match(/<meta\s+property="og:[^>]*>/gi) || [];
        const seenOgProps = new Set<string>();
        ogTags.forEach(tag => {
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
          console.log("\n🎉 ¡Éxito! Todas las páginas representativas cumplen al 100% las normativas SEO.");
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
