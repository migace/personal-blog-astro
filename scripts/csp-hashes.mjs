// Extracts the SHA-256 hashes of every executable inline <script> in the built
// site, so the `script-src` allowlist in vercel.json can be kept in sync.
//
// Why this exists: the site ships a strict, hash-based Content-Security-Policy
// (no `unsafe-inline` in script-src) delivered as an HTTP header from
// vercel.json. External bundled scripts live under /_astro/*.js and are covered
// by `'self'`; only a handful of genuinely inline scripts need hashes:
//   1. the theme anti-flash script in src/components/BaseHead.astro
//   2. Astro's island runtime (the astro-island element + the client:visible
//      hydration bootstrap) - only on pages that use a React island.
// Data blocks (<script type="application/ld+json"> and the id="*-i18n" JSON
// blocks) are NOT executable and are not governed by script-src, so they are
// intentionally ignored here.
//
// Regenerate after: editing the theme script, upgrading Astro, or adding a new
// inline script. Run `pnpm build` first, then `pnpm csp:hashes`, and paste the
// printed `'sha256-...'` values into the script-src directive in vercel.json.
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist/client");

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

// Matches <script ...>body</script>; we keep only executable inline scripts:
// no `src=`, and not a data block (module / ld+json / json).
const SCRIPT_RE = /<script([^>]*)>([\s\S]*?)<\/script>/g;
const DATA_TYPE_RE = /type\s*=\s*"(module|application\/(ld\+json|json))"/;

const hashes = new Map(); // hash -> { pages, sample }

for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, "utf-8");
  for (const [, attrs, body] of html.matchAll(SCRIPT_RE)) {
    if (attrs.includes("src=") || DATA_TYPE_RE.test(attrs)) continue;
    const hash = createHash("sha256").update(body, "utf-8").digest("base64");
    const existing = hashes.get(hash);
    if (existing) existing.pages += 1;
    else
      hashes.set(hash, {
        pages: 1,
        sample: body.replace(/\s+/g, " ").trim().slice(0, 60),
      });
  }
}

const sorted = [...hashes.entries()].sort((a, b) => b[1].pages - a[1].pages);
console.log(`Found ${sorted.length} unique executable inline script(s):\n`);
for (const [hash, { pages, sample }] of sorted) {
  console.log(`  'sha256-${hash}'  (${pages} page${pages === 1 ? "" : "s"})`);
  console.log(`      ${sample}…\n`);
}
console.log("script-src value:");
console.log(`  'self' ${sorted.map(([h]) => `'sha256-${h}'`).join(" ")}`);
