import fs from "fs";
import { BLOG_POSTS } from "../src/data/blogPosts";

const filePath = "./src/data/blogPosts.ts";
let content = fs.readFileSync(filePath, "utf8");

for (const post of BLOG_POSTS) {
  // Use a regex to find the image line for this specific post
  // This is tricky if images are not unique, but let's assume the unsplash URL is unique to the post
  const unsplashRegex = /image:\s*'https:\/\/images\.unsplash\.com\/[a-zA-Z0-9\-\?=&]*'/;
  content = content.replace(unsplashRegex, `image: '/og/${post.slug}.jpg'`);
}

fs.writeFileSync(filePath, content);
console.log("✅ Imágenes migradas en blogPosts.ts");
