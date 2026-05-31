import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getReadingTime(body?: string): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function sortByDateDesc(posts: BlogEntry[]): BlogEntry[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function getRelatedPosts(
  current: BlogEntry,
  all: BlogEntry[],
  limit = 3
): BlogEntry[] {
  const currentTags = new Set((current.data.tags ?? []).map(slugifyTag));
  const others = all.filter((p) => p.id !== current.id);

  const scored = others
    .map((post) => {
      const overlap = (post.data.tags ?? []).filter((tag) =>
        currentTags.has(slugifyTag(tag))
      ).length;
      return { post, overlap };
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    });

  const related = scored.filter((s) => s.overlap > 0).map((s) => s.post);
  if (related.length >= limit) return related.slice(0, limit);

  const fill = scored.filter((s) => s.overlap === 0).map((s) => s.post);
  return [...related, ...fill].slice(0, limit);
}

export function getAllTags(posts: BlogEntry[]): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      const slug = slugifyTag(tag);
      const existing = counts.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(slug, { tag, count: 1 });
      }
    }
  }
  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
