import fs from "fs";
import path from "path";
import sharp from "sharp";
import { BLOG_POSTS } from "../src/data/blogPosts";
import { PROCEDURES_DATA } from "../src/data/procedures";

const publicDir = path.resolve(process.cwd(), "public");
const imgBlogDir = path.resolve(publicDir, "img", "blog");
const ogDir = path.resolve(publicDir, "og");

if (!fs.existsSync(imgBlogDir)) fs.mkdirSync(imgBlogDir, { recursive: true });
if (!fs.existsSync(ogDir)) fs.mkdirSync(ogDir, { recursive: true });

async function createBaseSVG(title: string, subtitle: string, width: number, height: number) {
  // Simple text wrapping (just truncating for now to keep it simple)
  const safeTitle = title.length > 50 ? title.substring(0, 47) + "..." : title;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0a1f42" />
      <text x="50%" y="30%" font-family="Arial" font-size="50" fill="#ffffff" text-anchor="middle" font-weight="bold">${safeTitle}</text>
      <text x="50%" y="50%" font-family="Arial" font-size="40" fill="#c9a84c" text-anchor="middle">${subtitle}</text>
      <text x="50%" y="80%" font-family="Arial" font-size="30" fill="#ffffff" text-anchor="middle">IESS Asistente</text>
    </svg>
  `;
  return Buffer.from(svg);
}

async function run() {
  console.log("🚀 Generando assets...");

  // Favicons/Icons
  const logoBuffer = await createBaseSVG("IA", "", 512, 512);
  await sharp(logoBuffer).resize(32, 32).toFile(path.join(publicDir, "favicon-32.png"));
  await sharp(logoBuffer).resize(32, 32).toFile(path.join(publicDir, "favicon.ico"));
  await sharp(logoBuffer).resize(192, 192).toFile(path.join(publicDir, "logo-192.png"));
  await sharp(logoBuffer).resize(512, 512).toFile(path.join(publicDir, "logo-512.png"));
  await sharp(logoBuffer).resize(180, 180).toFile(path.join(publicDir, "apple-touch-icon.png"));
  
  // Favicon SVG (simplified)
  const faviconSvg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#0a1f42" /><text x="50%" y="70%" font-family="Arial" font-size="20" fill="#c9a84c" text-anchor="middle">IA</text></svg>`;
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg);

  // OG Default
  const ogDefaultBuffer = await createBaseSVG("IESS Asistente", "Guía de Trámites 2026", 1200, 630);
  await sharp(ogDefaultBuffer).toFile(path.join(publicDir, "og-default.jpg"));

  // Blog Posts
  for (const post of BLOG_POSTS) {
    const buffer = await createBaseSVG(post.title, post.category, 1200, 630);
    await sharp(buffer).toFile(path.join(imgBlogDir, `${post.slug}.webp`));
    await sharp(buffer).toFile(path.join(ogDir, `${post.slug}.jpg`));
  }

  // Procedures
  for (const proc of PROCEDURES_DATA) {
    const buffer = await createBaseSVG(proc.title, "Trámite IESS", 1200, 630);
    // Procedures don't have slugs, use IDs
    await sharp(buffer).toFile(path.join(imgBlogDir, `${proc.id}.webp`));
    await sharp(buffer).toFile(path.join(ogDir, `${proc.id}.jpg`));
  }

  console.log("✅ Assets generados.");
}

run().catch(console.error);
