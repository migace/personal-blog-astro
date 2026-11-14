# Interactive Demos and Animations

How this blog adds interactive demos and animations to posts, and how an AI agent (Claude Code, Codex, or any other) should **propose** them for new posts.

The goal of a demo is understanding, not decoration. Every demo must pass one test: _"move X and watch Y change"_ can be written as a single sentence. If it cannot, it is not a demo yet.

The approach is modelled on [Watch a Brain Learn](https://aatishb.com/myriad/how-brains-learn/) (Aatish Bhatia, _Myriad_): 20 small, controllable canvas simulations embedded in prose, each answering one question from the paragraph above it. That site is Astro + Svelte; this blog is Astro + plain scripts + React islands, so the patterns carry over almost 1:1. A longer design write-up with code skeletons lives in the private doc [Interaktywne demo na blogu – fundament techniczny](https://claude.ai/artifact/QLHuzWF3cuBBzsTN5pt8SC); this file is the repo-facing summary and the only one agents need.

---

## 1. When a post should get a demo

Propose a demo whenever a post explains a **mechanism**: something with inputs, state, and a result the reader can predict wrongly. Skip it for opinion pieces, tooling comparisons, and changelogs.

| The post explains… | Demo shape | Example on this blog |
| --- | --- | --- |
| A protocol or request flow (cache, retry, queue) | Packets moving between nodes; reader triggers requests, tunes one parameter | `CacheAsidePlayground` in the Redis post |
| A data model trade-off | Same task run against two models side by side; reader switches | `EavExplorer` in the CPQ/EAV post |
| An algorithm with a curve (training, scoring, convergence) | Precomputed run replayed over time with a step counter | — (see §4, precomputed data) |
| Simple rules producing complex behaviour (agents, swarms, schedulers) | Many small agents on a canvas, one rule, pointer as the environment | — (Braitenberg pattern, §4) |
| A pipeline or architecture | Ambient diagram with live traffic | `HeroPipeline` on the home page |
| A moment of success or completion | One-shot reward effect | `Confetti` (`confetti:fire` event) |

One idea per demo. If the explanation needs three sliders, that is three demos, or one demo with the other two values fixed.

---

## 2. Three tiers, from cheapest to richest

| Tier | Use when | Reference implementation | Runtime cost |
| --- | --- | --- | --- |
| **A. CSS-only motion** | Entrance, emphasis, scroll-linked parallax. No logic. | `src/styles/reveal.css` (`[data-reveal]`, observer in `BaseHead.astro`), hero parallax in `src/layouts/BlogPost.astro` (`animation-timeline: view()`) | 0 JS |
| **B. Canvas animation in an `.astro` component** | Self-running or pointer-driven simulation. No form controls beyond a reset button. | `src/components/HeroPipeline.astro`, `src/components/Confetti.astro` | One bundled external script, no framework |
| **C. React island** | Controls, sliders, logs, multi-step state, anything that is really a small app. | `src/components/CacheAsidePlayground/`, `src/components/EavExplorer/` | React (~45 KB gzip), hydrated only on `client:visible` |

Default to the lowest tier that works. Most "watch a mechanism" demos are tier B. Reach for tier C when the reader needs to type, choose, or read a log.

Not in scope unless a post genuinely needs it: WebGL shaders (per-pixel effects such as heatmaps) and three.js (true 3D data). Both must be bundled through pnpm, never loaded from a CDN (CSP, see §3), and loaded lazily with `client:visible` or a dynamic `import()` after the demo enters the viewport.

---

## 3. Repo conventions a demo must follow

These are the constraints that are easy to get wrong. Most are already encoded in `HeroPipeline.astro`; read it before writing a new canvas demo.

### Files and placement

- **Tier C (island):** `src/components/<Name>/` with
  `<Name>.tsx` (view), `<Name>.css`, `use<Name>.ts` (simulation logic as a hook or pure functions), `<Name>Island.astro` (wrapper: `<div class="interactive-lab-slot"><Name client:visible /></div>`), `index.ts`.
- **Tier B (canvas):** a single `src/components/<Name>.astro` with markup, `<style>`, and one `<script>` block, like `HeroPipeline.astro`. When a second canvas demo appears, extract the shared pieces into `src/lib/demo/` (`loop.ts`, `inview.ts`, `theme.ts`, `tween.ts`) and have both components import them.
- **In the post:** import the island/component at the top of the `.mdx`, right after the frontmatter. Place it directly after the paragraph that poses the question it answers. Polish posts live one folder deeper (`src/content/blog/pl/`), so imports and `heroImage` need one extra `../`.
- The hydration directive (`client:visible`) lives in the `*Island.astro` wrapper, never in the MDX file.

### Content Security Policy (strict, hash-based; see `vercel.json`)

- `script-src 'self'` plus a few hashes. An Astro `<script>` inside a component is bundled to an external `/_astro/*.js` file (forced by `vite.build.assetsInlineLimit: 0`) and is therefore allowed. **Do not add `<script is:inline>`** to a demo: it would need a new hash in `vercel.json` (`pnpm build && pnpm csp:hashes`).
- No third-party scripts, fonts, or images: no CDN imports, no `fetch` to external APIs from a demo. Simulate latency with `setTimeout` (as `CacheAsidePlayground` does) and keep data in the repo.
- `style-src` allows inline styles, so `style={{ width: … }}` and `<style>` blocks are fine.

### Theme and colour

- Read colours at runtime from the CSS tokens in `src/styles/tokens.css` (`--color-ink`, `--color-muted`, `--color-line`, `--color-paper`, `--color-accent`, `--color-teal`, `--color-amber`, `--color-lime`, `--color-blue`, plus `--rgb-*` for alpha blends) via `getComputedStyle(document.documentElement)`. Re-read on `data-theme` changes (`MutationObserver`) and on `prefers-color-scheme` changes. `HeroPipeline.readPalette()` is the reference.
- Never hardcode hex colours, except on surfaces that are deliberately dark in both themes (the code card).
- `--color-teal` and `--color-lime` are decorative only; for text use `--color-teal-text`, `--color-ink`, `--color-muted`.
- One palette per post, assigned to concepts, not to graphics: the same colour means the same thing in every demo, legend, and sentence of that post.

### Motion, performance, lifecycle

- **Reduced motion:** honour `prefers-reduced-motion: reduce`. A canvas demo draws a single meaningful static frame (`HeroPipeline.staticFrame()`), auto-motion and reward effects are off, and user-driven interaction still works. `reveal.css` is inert under reduced motion automatically.
- **Pause off-screen** with an `IntersectionObserver` and **on hidden tabs** with `visibilitychange`. Myriad starts a simulation only at 90 % visibility (80 % on narrow screens) so the reader sees the whole figure and caption; `HeroPipeline` uses 5 % because it is ambient. Pick the higher threshold for teaching demos.
- **Time step:** scale motion by elapsed time, never by frame count. `HeroPipeline` uses `dt` in seconds capped at `0.05`; keep that convention in `src/lib/demo/loop.ts`.
- **Resolution:** `dpr = min(devicePixelRatio, 2)`, `canvas.width = cssWidth * dpr`, `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`, then draw in CSS pixels. Resize through a `ResizeObserver`.
- **No layout shift:** the container has `aspect-ratio` and a `min-height` before any script runs.
- **Budget:** a tier B demo is a few KB. A tier C demo pays React once per page. Anything above ~100 KB (data files, three.js) loads only after the demo is visible.

### Accessibility and i18n

- Decorative canvas: `aria-hidden="true"`. Meaningful canvas: `role="img"` and an `aria-label` that says in one sentence what the demo shows. Captions and instructions live in the DOM, not inside the canvas.
- Controls are real `<button>` and `<input>` elements with labels; live logs use `aria-live="polite"` (see `CacheAsidePlayground`).
- Pointer instructions differ by device: wrap them in `.mouse-only` / `.touch-only` spans and hide the wrong one with `@media (hover: hover)` / `@media (hover: none)`.
- UI strings in the existing islands are English and the Polish post embeds the same island. If a new demo has strings that matter for comprehension, accept a `lang` prop and look the strings up the way `src/i18n/ui.ts` does.

### Quality gates

- Pure simulation logic (`use<Name>.ts`, `src/lib/demo/*.ts`) is unit-tested with vitest (`pnpm test`); see `src/utils/posts.test.ts` for the style.
- `pnpm build` runs `astro check` first; a type error in a component fails the build.
- `pnpm format` before committing (Prettier with the Astro plugin).

---

## 4. Patterns worth copying from Myriad

Short versions; the private design doc has the full code.

**Figure anatomy.** `figure.graphic > h4.graphic-hed + .stage(canvas) + figcaption.graphic-caption(+ reset button)`. Heading above states the question, caption below states the action. Reset is a `<button>`.

**Observe first, control later.** The first instance of a demo in a post runs on its own (`interact={false}`); later instances hand the reader the controls. Same component, one prop.

**Many instances, one model.** Four Braitenberg creatures (fear, aggression, attraction, love) are one class with a different three-number "circuit" `{ same, cross, bias }`: `L = clamp(same·l + cross·r + bias)`, `R = clamp(same·r + cross·l + bias)`. Behaviour is data, so it can be compared, animated, and learned. Design new agent demos the same way: the rule is a small object, not a code branch.

**Two canvas layers.** A background canvas that is never cleared (persistent trails, one segment per frame at low alpha) under an overlay canvas cleared every frame (agents, pointer light). Cheap, and impossible on one layer.

**Pointer as the environment.** The cursor is the light source; `pointermove` on the figure stores a normalised `(nx, ny)` in 0..1 so the position survives resizes. On touch, `pointerdown` places it. A `pauseUntilLight` flag keeps agents still until the first interaction; a slow sinusoidal auto-sway keeps the scene alive when nobody interacts.

**Tween discrete changes.** Any value the reader changes in a jump (toggle, button) eases to its target over 200–300 ms; an instant jump reads as a glitch.

**Precomputed data, replayed.** Training curves and multi-run comparisons are computed offline (`scripts/gen-*.mjs` → `src/data/*.json`, rounded to 3 decimals) and replayed with `progress = (now − t0 − delay) / duration`. The step counter in the caption is derived from the same `progress`, so text and graphic never disagree. Live computation is for things the reader steers; precomputed is for things that must be identical for every reader.

**Reward.** A small "it worked" signal closes the experiment loop. This repo already has `Confetti.astro`: `window.dispatchEvent(new CustomEvent("confetti:fire"))`.

Minimal loop skeleton for `src/lib/demo/loop.ts` (matches `HeroPipeline` conventions):

```ts
export function createLoop(
  canvas: HTMLCanvasElement,
  hooks: { update(dt: number, now: number): void; draw(ctx: CanvasRenderingContext2D, w: number, h: number): void },
) {
  const ctx = canvas.getContext("2d")!;
  let raf = 0, last = 0, cssW = 0, cssH = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ({ width: cssW, height: cssH } = canvas.getBoundingClientRect());
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function frame(now: number) {
    if (!last) last = now;
    const dt = Math.min(0.05, (now - last) / 1000); // seconds, capped for hidden tabs
    last = now;
    hooks.update(dt, now);
    ctx.clearRect(0, 0, cssW, cssH);
    hooks.draw(ctx, cssW, cssH);
    raf = requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return {
    start() { if (raf) return; last = 0; resize(); raf = requestAnimationFrame(frame); },
    stop() { if (raf) cancelAnimationFrame(raf); raf = 0; },
    destroy() { this.stop(); ro.disconnect(); },
  };
}
```

---

## 5. How an agent proposes a demo

When asked to **outline, draft, review, or translate** a post, add a `Demo proposal` section to your answer. Propose one to three ideas, ranked, and mark the recommended one. Do not build anything until the author picks one.

Each proposal has exactly these fields:

```
### Demo proposal: <short name>
- Makes tangible: <the one concept, one sentence>
- Reader does → sees: move/toggle/type <X> → <Y> changes
- Tier: A | B | C, because <reason>
- Placement: after the paragraph "<first words…>" under "## <heading>"
- Data: live simulation | precomputed (<what, how generated>)
- Reuses: <HeroPipeline pattern | CacheAsidePlayground pattern | src/lib/demo | nothing>
- Effort: S (hours) | M (a day) | L (several days)
- Reduced motion / no JS: <what the reader gets instead>
```

A good proposal names the wrong prediction a reader is likely to make and shows how the demo corrects it. A proposal that only "visualises" something without a reader action is tier A at most, and usually not worth it.

---

## 6. Idea catalogue for this blog's topics

Starting points, all buildable on the patterns above. Match to the post's actual argument; do not force one in.

| Topic (existing tags / posts) | Demo | Reader controls | Tier |
| --- | --- | --- | --- |
| AI agents from scratch, agent loops | Agents as Braitenberg creatures: a tool/observation as "light", the policy as a 3-number circuit | Pointer position, which circuit | B |
| Retry, backoff, circuit breaker, rate limiting | Packets sent to a flaky service; failures as amber, breaker state as a node colour | Failure rate, strategy | B/C |
| Caching, TTL (Redis post) | Request stream on a canvas; hits vs misses as colour, TTL bar draining | TTL, key skew | C (exists as `CacheAsidePlayground`) |
| Load balancing, queues, workers | Request-agents choosing an instance | Algorithm (round robin, least connections), instance count | B |
| Embeddings, kNN, hard negative mining | Points on a plane, cursor is the query, k nearest highlighted; negatives pulled apart over epochs | Query position, k, epoch | B |
| Training / learning curves, evaluation metrics | Precomputed runs replayed with a step counter; many runs as a fan | Scrub progress, run count | B |
| E2E tests for LLM workflows | A test run as an agent walking through stages; a failing stage stops the walk | Which stage fails, retries | B |
| MCP vs CLI, local vs centralised execution | Two pipelines side by side, same task, different hop counts and latencies | Task type, network latency | B/C |
| Data modelling (EAV, value objects, `satisfies`) | Same operation against two models; generated SQL/types shown | Model switch, task | C (pattern exists as `EavExplorer`) |

---

## 7. Checklist before a demo merges

- [ ] Can be described as "move X and watch Y" in one sentence; the caption says it
- [ ] Paragraph above asks the question; caption below tells the reader what to do
- [ ] Lowest tier that works; hydration directive only in the `*Island.astro` wrapper
- [ ] No `is:inline` script, no CDN or external fetch (CSP)
- [ ] Colours from `--color-*` tokens, re-read on theme change, checked in light and dark
- [ ] Starts when visible, stops when off-screen and when the tab is hidden
- [ ] Motion scaled by `dt`; same look at 360 px and 720 px; `min(dpr, 2)`
- [ ] `aspect-ratio` / `min-height` on the container, no layout shift
- [ ] Reduced motion: static frame or inert; interaction still works
- [ ] Works with touch; `.touch-only` caption says "tap"
- [ ] `aria-label` or `aria-hidden` on the canvas; controls are real form elements
- [ ] Simulation logic has a vitest test; `pnpm build` passes (`astro check`)
- [ ] Polish post embeds the same component with the corrected relative import
- [ ] Page JS for a post with demos stays under ~300 KB; big data loads lazily

---

## 8. References

- Myriad, _Watch a Brain Learn_: https://aatishb.com/myriad/how-brains-learn/ (Astro + Svelte, Canvas 2D agents, WebGL light, three.js trajectory cube)
- Design write-up with full code skeletons (loop, inview, agent, tween, Astro template): https://claude.ai/artifact/QLHuzWF3cuBBzsTN5pt8SC
- In-repo reference implementations: `src/components/HeroPipeline.astro`, `src/components/Confetti.astro`, `src/styles/reveal.css`, `src/components/CacheAsidePlayground/`, `src/components/EavExplorer/`
- CSP policy and hash workflow: `vercel.json`, `scripts/csp-hashes.mjs`
- Post frontmatter rules: `docs/blog-post-metadata.md`
