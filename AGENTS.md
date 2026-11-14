# AGENTS.md

Guide for AI coding agents (Claude Code, Codex, Gemini CLI, Cursor, …) working in this repository. Humans: the same rules apply, this is just the short version.

## What this is

Personal blog and consulting site at https://www.tiptopdesign.pl by Michał Gacek. Technical posts about AI engineering, TypeScript, architecture, and developer tooling, with interactive demos inside posts.

- **Astro 6**, `output: "static"`, deployed on Vercel. The only server routes are the two API endpoints in `src/pages/api/` (`prerender = false`).
- **React 19** is used only for interactive islands inside posts, hydrated with `client:visible` from a small `*Island.astro` wrapper.
- **Content:** MDX in `src/content/blog/` (English) and `src/content/blog/pl/` (Polish, same filename = translation pair). Schema in `src/content.config.ts`.
- **Styling:** design tokens in `src/styles/tokens.css` (light + dark via `data-theme`), article styles in `src/styles/article.css`, scroll-reveal in `src/styles/reveal.css`.
- **Package manager:** pnpm.

## Commands

```sh
pnpm install          # deps
pnpm dev              # dev server on http://localhost:4321
pnpm test             # vitest
pnpm build            # astro check (types) + astro build; this is what CI runs
pnpm format           # prettier (src/)
pnpm csp:hashes       # after pnpm build: print inline-script hashes for vercel.json
pnpm og               # regenerate OG images
```

CI (`.github/workflows/ci.yml`) runs `pnpm test` and `pnpm build`. Both must pass.

## Rules that are easy to break

1. **Strict CSP** (`vercel.json`): `script-src 'self'` plus a handful of hashes. Astro `<script>` blocks in components are bundled to external files and are fine. **Never add `<script is:inline>`** or any third-party script/CDN/external fetch without regenerating hashes and discussing it first.
2. **Static by default.** Do not add `prerender = false` to a page unless it genuinely needs a server.
3. **Theme-aware colours.** Use `--color-*` / `--rgb-*` tokens; canvas code reads them at runtime (see `src/components/HeroPipeline.astro`). No hardcoded hex except on intentionally dark surfaces.
4. **Reduced motion and off-screen pausing** are mandatory for anything that moves.
5. **i18n pairing by filename.** A new post needs an `.mdx` in both `src/content/blog/` and `src/content/blog/pl/` (Polish versions are AI-assisted and carry the beta notice automatically). Polish files need one extra `../` in relative imports and `heroImage`.
6. **Post frontmatter** follows `docs/blog-post-metadata.md` (title, description, pubDate, heroImage, heroAlt, 1–3 tags).

## Interactive demos and animations

This blog's differentiator is that readers can *steer* the mechanism a post explains. Treat demos as part of writing, not as an afterthought.

- **When you outline, draft, review, or translate a post, always include a `Demo proposal` section** (1–3 ranked ideas, recommended one marked) in the exact format defined in `docs/interactive-demos.md` §5. Do this unprompted. Propose; do not build until the author picks one.
- Pick the lowest tier that works: A = CSS-only motion (`reveal.css`), B = canvas animation in a plain `.astro` component (`HeroPipeline.astro`, `Confetti.astro`), C = React island (`CacheAsidePlayground/`, `EavExplorer/`). Most teaching demos are tier B.
- Follow the conventions and the merge checklist in `docs/interactive-demos.md` (file layout, CSP, tokens, lifecycle, accessibility, tests).
- Reuse before writing: check the idea catalogue in `docs/interactive-demos.md` §6 and the existing components first. Shared canvas helpers belong in `src/lib/demo/` once a second canvas demo exists.

## Docs index

- `docs/blog-post-metadata.md` — frontmatter and tag rules for posts
- `docs/interactive-demos.md` — demos and animations: when, which tier, conventions, proposal format, idea catalogue, checklist
