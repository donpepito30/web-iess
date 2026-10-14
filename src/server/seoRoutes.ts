import { Request, Response } from "express";
import { BLOG_POSTS } from "../data/blogPosts";
import { PROCEDURES_DATA } from "../data/procedures";
import { SEO_CATEGORIES } from "../data/seoCategories";
import { getSiteUrlServer } from "../config/site";

export function handleSitemap(req: Request, res: Response) {
  const baseUrl = getSiteUrlServer();
  const urls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/preguntas-frecuentes`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/guias-y-articulos`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/oficios`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/herramientas`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/iess`, lastmod: new Date().toISOString() },
  ];

  // Procedures
  PROCEDURES_DATA.forEach(p => {
    urls.push({ loc: `${baseUrl}/procedimiento/${p.id}`, lastmod: new Date().toISOString() });
  });

  // Articles
  BLOG_POSTS.forEach(p => {
    urls.push({ loc: `${baseUrl}/blog/${p.slug}`, lastmod: p.dateModified });
  });

  // Categories
  SEO_CATEGORIES.forEach(c => {
    urls.push({ loc: `${baseUrl}/${c.slug}`, lastmod: new Date().toISOString() });
    c.subcategories.forEach(s => {
      urls.push({ loc: `${baseUrl}/${c.slug}/${s.slug}`, lastmod: new Date().toISOString() });
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join('')}
</urlset>`;

  res.header("Content-Type", "application/xml").send(xml);
}

export function handleRobots(req: Request, res: Response) {
  const baseUrl = getSiteUrlServer();
  const robots = `User-agent: *
Allow: /
Disallow: /api/

# Allowed bots
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

# Other bots
User-agent: CCBot
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml`;
  res.header("Content-Type", "text/plain").send(robots);
}

export function handleLlms(req: Request, res: Response) {
  const baseUrl = getSiteUrlServer();
  const llms = `# IESS Asistente
Plataforma independiente de guías, trámites y normativa sobre seguridad social en Ecuador. Sitio no afiliado al IESS.

## Trámites Principales
${PROCEDURES_DATA.map(p => `[${p.title}](${baseUrl}/procedimiento/${p.id}): Guía sobre ${p.title}.`).join('\n')}

## Categorías Pilar
${SEO_CATEGORIES.map(c => `[${c.title}](${baseUrl}/${c.slug}): ${c.description}`).join('\n')}`;
  res.header("Content-Type", "text/plain; charset=utf-8").send(llms);
}

export function handleAds(req: Request, res: Response) {
  if (!process.env.ADS_TXT) {
    return res.status(404).send("Not Found");
  }
  res.header("Content-Type", "text/plain").send(process.env.ADS_TXT);
}

export function handleIndexNowKey(req: Request, res: Response) {
  if (!process.env.INDEXNOW_KEY) {
    return res.status(404).send("Not Found");
  }
  res.header("Content-Type", "text/plain").send(process.env.INDEXNOW_KEY);
}

export async function handleIndexNowPost(req: Request, res: Response) {
  const key = req.header("x-admin-key");
  if (!process.env.INDEXNOW_KEY || key !== process.env.INDEXNOW_KEY) {
    return res.status(403).send("Forbidden");
  }
  
  const { urlList } = req.body;
  // Forward to indexnow.org
  // ...
  res.status(200).send("OK");
}
