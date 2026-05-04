# Blog Post Metadata

Every blog post should define metadata in frontmatter. The blog index reads this metadata directly, so new posts should not require changes in `src/pages/blog/index.astro`.

Required fields:

```yaml
---
title: "Readable article title"
description: "One or two sentences explaining the problem, approach, and value of the article."
pubDate: "May 4 2026"
heroImage: "/image-name.png"
tags: ["AI workflow", "Playwright", "Quality"]
---
```

Tag guidelines:

- Use 1-3 tags.
- Prefer concrete topic tags over generic labels.
- Good examples: `TypeScript`, `Playwright`, `AI agents`, `Architecture`, `Data modeling`, `Developer tools`, `Quality`.
- Keep tags short enough to fit in compact pills.
- Reuse existing tags when the article belongs to an established theme.
- If unsure, pick one broad domain tag and one specific technology or practice tag.
