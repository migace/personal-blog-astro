import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tiptopdesign.pl",
  // All internal links and canonicals use trailing slashes; make the host
  // redirect the slashless variants so one URL serves one document.
  trailingSlash: "always",
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          pl: "pl",
        },
      },
    }),
  ],
  // Static by default: a new page cannot silently become SSR by forgetting
  // `export const prerender = true`. The API endpoints opt out individually
  // with `prerender = false`; the Vercel adapter serves them on demand.
  output: "static",
  adapter: vercel(),
  vite: {
    // Force hoisted/island scripts to be emitted as external /_astro/*.js files
    // instead of being inlined into the HTML. Inline <script> would otherwise
    // need a per-build hash in the CSP; external same-origin scripts are covered
    // by `script-src 'self'` (see vercel.json), leaving only the one static
    // inline theme script to hash.
    build: { assetsInlineLimit: 0 },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
  },
});
