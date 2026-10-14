import fs from "fs";
import path from "path";
import { FACTS, Fact } from "../src/data/facts";
import { CITIES_DATA } from "../src/data/cities";
import { BLOG_POSTS } from "../src/data/blogPosts";
import { PROCEDURES_DATA } from "../src/data/procedures";

function findLineNumbersInFile(filePath: string, matcher: (line: string, index: number) => boolean): number[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const matches: number[] = [];
  lines.forEach((line, index) => {
    if (matcher(line, index)) {
      matches.push(index + 1); // 1-indexed
    }
  });
  return matches;
}

export function generateVerificationReport(): string {
  const factsFilePath = path.resolve(process.cwd(), "src/data/facts.ts");
  const citiesFilePath = path.resolve(process.cwd(), "src/data/cities.ts");
  const blogPostsFilePath = path.resolve(process.cwd(), "src/data/blogPosts.ts");
  const proceduresFilePath = path.resolve(process.cwd(), "src/data/procedures.ts");

  const factsContent = fs.readFileSync(factsFilePath, "utf-8").split("\n");
  const citiesContent = fs.readFileSync(citiesFilePath, "utf-8").split("\n");

  // 1. Gather unverified facts
  const unverifiedFacts: Array<{
    fact: Fact;
    line: number;
    usage: string[];
  }> = [];

  for (const [key, fact] of Object.entries(FACTS)) {
    if (!fact.verified) {
      // Find line in facts.ts
      let lineNum = 1;
      for (let i = 0; i < factsContent.length; i++) {
        if (factsContent[i].includes(`${key}: {`) || factsContent[i].includes(`id: "${key}"`)) {
          lineNum = i + 1;
          break;
        }
      }

      // Find usage in blog posts and procedures
      const usage: string[] = [];
      BLOG_POSTS.forEach(post => {
        if (post.content.includes(key)) {
          usage.push(`Artículo: "${post.title}" (/blog/${post.slug})`);
        }
      });
      PROCEDURES_DATA.forEach(proc => {
        const inRequirements = proc.requirements.some(r => r.includes(key));
        const inSteps = proc.steps.some(s => s.includes(key));
        const inFactIds = proc.factIds?.includes(key);
        const inNeedsMoreHelp = proc.needsMoreHelp?.includes(key);
        if (inRequirements || inSteps || inFactIds || inNeedsMoreHelp) {
          usage.push(`Trámite: "${proc.title}" (/procedimiento/${proc.id})`);
        }
      });

      unverifiedFacts.push({ fact, line: lineNum, usage });
    }
  }

  // 2. Gather unverified city dependencies (verifiedAt === null)
  const unverifiedDeps: Array<{
    citySlug: string;
    cityName: string;
    province: string;
    depName: string;
    depType: string;
    address: string | null;
    phone: string | null;
    hours: string | null;
    line: number;
  }> = [];

  for (const [slug, city] of Object.entries(CITIES_DATA)) {
    city.dependencies.forEach(dep => {
      if (dep.verifiedAt === null) {
        // Find line in cities.ts
        let lineNum = 1;
        for (let i = 0; i < citiesContent.length; i++) {
          if (citiesContent[i].includes(`"${dep.name}"`)) {
            lineNum = i + 1;
            break;
          }
        }

        unverifiedDeps.push({
          citySlug: slug,
          cityName: city.name,
          province: city.province,
          depName: dep.name,
          depType: dep.type,
          address: dep.address,
          phone: dep.phone,
          hours: dep.hours,
          line: lineNum
        });
      }
    });
  }

  // Build markdown document
  const md = `# Reporte Automatizado de Datos Pendientes de Verificación (YMYL)

> **Documento generado automáticamente por \`npm run data:report\` (\`scripts/verify-report.ts\`).**
> Fecha de generación: ${new Date().toISOString().split("T")[0]}
>
> Este reporte consolida rigurosamente todas las cifras salariales, porcentajes de aportación y dependencias físicas locales que se encuentran marcadas con \`verified: false\` o \`verifiedAt: null\`. Ningún dato aquí listado se presenta al usuario como definitivo ni verificado hasta ser contrastado documentalmente con resoluciones oficiales del IESS o del Ministerio del Trabajo.

---

## 📊 1. Cifras y Datos Clave Pendientes de Verificación (\`src/data/facts.ts\`)

Total de variables no verificadas: **${unverifiedFacts.length}**

| Identificador (ID) | Valor | Archivo y Línea | Fuente referencial | Artículos y Trámites que lo utilizan |
| :--- | :--- | :--- | :--- | :--- |
${unverifiedFacts.map(({ fact, line, usage }) => {
  const usageStr = usage.length > 0 ? usage.join("<br/>") : "*Sin uso directo en plantillas*";
  return `| \`${fact.id}\` | **${fact.value}** | \`src/data/facts.ts:${line}\` | ${fact.source} | ${usageStr} |`;
}).join("\n")}

### Detalle de Notas y Advertencias por Fact:
${unverifiedFacts.map(({ fact, line }) => `
- **\`${fact.id}\`** (Línea ${line}):
  - **Valor**: \`${fact.value}\`
  - **Fuente reportada**: ${fact.source}
  - **Notas editoriales**: ${fact.notes || "Pendiente de confirmación"}
  - **Aviso obligatorio en UI/SSR**: *"Dato referencial: ${fact.value} · Fuente: ${fact.source} · Consultado: ${fact.verifiedAt} · Confirma este valor en iess.gob.ec antes de realizar tu trámite"*
`).join("")}

---

## 🏢 2. Dependencias Locales y Puntos de Atención Pendientes de Verificación (\`src/data/cities.ts\`)

Total de dependencias con \`verifiedAt: null\`: **${unverifiedDeps.length}**

Todas las páginas de ciudades permanecen con directiva **\`noindex, follow\`** y excluidas del sitemap XML hasta que al menos 2 dependencias por ciudad cuenten con verificación humana presencial documentada (\`verifiedAt !== null\`).

| Ciudad / Provincia | Tipo | Nombre de la Dependencia | Archivo y Línea | Dirección Referencial | Teléfono | Horario |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${unverifiedDeps.map(d => `| **${d.cityName}** (${d.province}) | ${d.depType} | ${d.depName} | \`src/data/cities.ts:${d.line}\` | ${d.address || "Pendiente"} | ${d.phone || "1800-4377"} | ${d.hours || "Pendiente"} |`).join("\n")}

---

## 📋 3. Reglas de Publicación y Criterios de Aprobación

1. **Datos Financieros y Porcentajes**:
   - Todo dato con \`verified: false\` debe ir acompañado en UI y SSR de la advertencia:
     > *"Confirma este valor en iess.gob.ec antes de realizar tu trámite"*
   - Ningún dato pasa a \`verified: true\` sin comprobación con el Acuerdo Ministerial o Resolución del Consejo Directivo.

2. **Indexación de Ciudades**:
   - Para que una ciudad sea indexable (\`index, follow\`) y se incluya en el sitemap:
     - Debe superar 600 palabras de contenido original y riguroso.
     - Debe contar con un mínimo de **2 dependencias físicas verificadas** con \`verifiedAt !== null\` y \`source !== null\`.
   - Mientras tanto, todas las URLs locales responden \`noindex, follow\` para proteger el SEO y evitar falsedad de información presencial.
`;

  return md;
}

// Run script if executed directly
if (process.argv[1]?.endsWith("verify-report.ts")) {
  const report = generateVerificationReport();
  const outputPath = path.resolve(process.cwd(), "docs/DATOS_A_VERIFICAR.md");
  fs.writeFileSync(outputPath, report, "utf-8");
  console.log(`✅ Reporte generado exitosamente en: ${outputPath}`);
}
