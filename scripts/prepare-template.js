import fs from "fs";
import path from "path";

const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const templatePath = path.join(distDir, "template.html");
const indexBrPath = path.join(distDir, "index.html.br");

// 1. Rename dist/index.html -> dist/template.html
if (fs.existsSync(indexPath)) {
  fs.renameSync(indexPath, templatePath);
  console.log("✅ dist/index.html renombrado a dist/template.html");
} else if (fs.existsSync(templatePath)) {
  console.log("ℹ️ dist/template.html ya existe.");
} else {
  console.warn("⚠️ No se encontró dist/index.html ni dist/template.html.");
}

// 2. Remove dist/index.html.br if it exists to avoid Vercel serving compressed static index.html
if (fs.existsSync(indexBrPath)) {
  fs.unlinkSync(indexBrPath);
  console.log("✅ dist/index.html.br eliminado para evitar servicio estático por Vercel CDN.");
}
