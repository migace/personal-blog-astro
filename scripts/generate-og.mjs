// Generates Open Graph images:
//  - public/og-default.png  from src/assets/og-default.svg
//  - public/og/<slug>.jpg   (1200x630 JPEG) from each post's hero image
//
// LinkedIn does not reliably render WebP og:image, so social previews use
// PNG/JPEG copies instead of the WebP heroes served on the site itself.
// Run after adding a post or changing a hero: `pnpm og`.
import { readdir, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS_DIR = path.join(ROOT, "src/content/blog");
const HEROES_DIR = path.join(ROOT, "src/assets/heroes");
const OUT_DIR = path.join(ROOT, "public/og");

await mkdir(OUT_DIR, { recursive: true });

await sharp(path.join(ROOT, "src/assets/og-default.svg"), { density: 96 })
  .resize(1200, 630)
  .png()
  .toFile(path.join(ROOT, "public/og-default.png"));
console.log("og-default.png");

// English posts only: translations share the slug and the hero image.
const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));
for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const source = await readFile(path.join(POSTS_DIR, file), "utf8");
  const match = source.match(/^heroImage:\s*"[^"]*\/([^/"]+\.(?:webp|png|jpg|jpeg))"/m);
  if (!match) {
    console.log(`skip ${slug} (no heroImage)`);
    continue;
  }
  await sharp(path.join(HEROES_DIR, match[1]))
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 84 })
    .toFile(path.join(OUT_DIR, `${slug}.jpg`));
  console.log(`og/${slug}.jpg`);
}
