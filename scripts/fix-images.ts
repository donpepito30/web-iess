import fs from "fs";
import { BLOG_POSTS } from "../src/data/blogPosts";

const filePath = "./src/data/blogPosts.ts";
let content = fs.readFileSync(filePath, "utf8");

for (const post of BLOG_POSTS) {
  // Fix the broken image line
  const brokenRegex = new RegExp(`image: '/og/\\\${slug}\\.jpg-[a-zA-Z0-9\\-\\?\\=\\&]*'`, 'g');
  content = content.replace(brokenRegex, `image: '/og/${post.slug}.jpg'`);
}

fs.writeFileSync(filePath, content);
console.log("✅ Imágenes reparadas y migradas en blogPosts.ts");
