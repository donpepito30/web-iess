import { getSiteUrlServer } from "../src/config/site";
import fetch from "node-fetch";
import { BLOG_POSTS } from "../src/data/blogPosts";
import { PROCEDURES_DATA } from "../src/data/procedures";
import { SEO_CATEGORIES } from "../src/data/seoCategories";

async function run() {
  const baseUrl = getSiteUrlServer();
  const indexNowKey = process.env.INDEXNOW_KEY;

  if (!indexNowKey) {
    console.error("❌ INDEXNOW_KEY not set");
    process.exit(1);
  }

  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/preguntas-frecuentes`,
    `${baseUrl}/guias-y-articulos`,
    ...PROCEDURES_DATA.map(p => `${baseUrl}/procedimiento/${p.id}`),
    ...BLOG_POSTS.map(p => `${baseUrl}/blog/${p.slug}`),
    ...SEO_CATEGORIES.flatMap(c => [`${baseUrl}/${c.slug}`, ...c.subcategories.map(s => `${baseUrl}/${c.slug}/${s.slug}`)])
  ];

  console.log(`🚀 Notificando IndexNow para ${urls.length} URLs...`);
  
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: new URL(baseUrl).hostname,
      key: indexNowKey,
      urlList: urls
    })
  });

  if (response.ok) {
    console.log("✅ IndexNow notificado exitosamente.");
  } else {
    console.error("❌ Error notificando IndexNow:", await response.text());
  }
}

run().catch(console.error);
