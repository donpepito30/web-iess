import fs from "fs";
import path from "path";

interface ChatQueryRecord {
  query: string;
  answered: boolean;
  category: string;
  count: number;
  lastSeen: string;
}

const CHAT_LOG_FILE = path.join(process.cwd(), "data", "chat-queries.json");

function analyzeChatTopics() {
  console.log("==================================================================");
  console.log("📊 ANÁLISIS DE INTENCIÓN DE BÚSQUEDA Y PREGUNTAS DEL CHATBOT IESS");
  console.log("==================================================================\n");

  if (!fs.existsSync(CHAT_LOG_FILE)) {
    console.log("ℹ️  No hay consultas previas registradas aún en data/chat-queries.json.");
    console.log("    A medida que los usuarios interactúen con el chatbot, las preguntas");
    console.log("    se clasificarán automáticamente para sugerir nuevas guías SEO.\n");
    return;
  }

  try {
    const raw = fs.readFileSync(CHAT_LOG_FILE, "utf-8");
    const queries: ChatQueryRecord[] = JSON.parse(raw);

    if (queries.length === 0) {
      console.log("ℹ️  El registro de consultas está vacío actualmente.");
      return;
    }

    // 1. Filter queries that currently do NOT have full coverage on the site (answered === false)
    const unanswered = queries
      .filter((q) => !q.answered)
      .sort((a, b) => (b.count || 1) - (a.count || 1))
      .slice(0, 50);

    console.log(`📌 Top ${unanswered.length} Preguntas Más Frecuentes SIN Cobertura Actual (Oportunidades de Nuevos Artículos):\n`);

    if (unanswered.length === 0) {
      console.log("   🎉 Todas las consultas registradas hasta el momento ya cuentan con cobertura en el portal.");
    } else {
      unanswered.forEach((item, index) => {
        console.log(
          `   ${(index + 1).toString().padStart(2, " ")}. [Frecuencia: ${item.count} | Categoría: ${item.category}]`
        );
        console.log(`       Pregunta: "${item.query}"`);
        console.log(`       Acción recomendada: Redactar nuevo artículo o añadir sección FAQ.`);
        console.log("");
      });
    }

    // 2. Summary by category
    const categoryCounts: Record<string, number> = {};
    queries.forEach((q) => {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + (q.count || 1);
    });

    console.log("📈 Distribución de Interés por Tema General:");
    Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count} consultas`);
      });

    console.log("\n==================================================================");
  } catch (err: any) {
    console.error("❌ Error analizando archivo de consultas:", err.message);
  }
}

analyzeChatTopics();
