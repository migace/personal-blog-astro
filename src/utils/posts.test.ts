import { describe, expect, it } from "vitest";
import {
  filterByLang,
  getAllTags,
  getPostLang,
  getPostSlug,
  getPostUrl,
  getReadingTime,
  getRelatedPosts,
  getTranslationsMap,
  slugifyTag,
  sortByDateDesc,
  type BlogEntry,
} from "./posts";

function entry(
  id: string,
  overrides: Partial<BlogEntry["data"]> = {},
  body?: string,
): BlogEntry {
  return {
    id,
    body,
    data: {
      title: id,
      description: `${id} description`,
      pubDate: new Date("2026-01-01"),
      lang: "en",
      ...overrides,
    },
  } as BlogEntry;
}

describe("slugifyTag", () => {
  it("lowercases and hyphenates", () => {
    expect(slugifyTag("AI Systems")).toBe("ai-systems");
    expect(slugifyTag("  Engineering Practice ")).toBe("engineering-practice");
  });

  it("strips leading and trailing separators", () => {
    expect(slugifyTag("...TypeScript!")).toBe("typescript");
  });
});

describe("getPostLang / getPostSlug / getPostUrl", () => {
  it("derives language from the pl/ folder prefix", () => {
    expect(getPostLang(entry("pl/redis"))).toBe("pl");
    expect(getPostLang(entry("redis"))).toBe("en");
  });

  it("shares one slug across translations", () => {
    expect(getPostSlug(entry("pl/redis"))).toBe("redis");
    expect(getPostSlug(entry("redis"))).toBe("redis");
  });

  it("prefers an explicit translationKey", () => {
    expect(getPostSlug(entry("pl/redis", { translationKey: "cache" }))).toBe("cache");
  });

  it("prefixes non-default locales in URLs", () => {
    expect(getPostUrl(entry("redis"))).toBe("/blog/redis/");
    expect(getPostUrl(entry("pl/redis"))).toBe("/pl/blog/redis/");
  });
});

describe("filterByLang / sortByDateDesc", () => {
  it("filters by derived language", () => {
    const posts = [entry("a"), entry("pl/a"), entry("b")];
    expect(filterByLang(posts, "pl").map((p) => p.id)).toEqual(["pl/a"]);
  });

  it("sorts newest first without mutating the input", () => {
    const older = entry("older", { pubDate: new Date("2025-01-01") });
    const newer = entry("newer", { pubDate: new Date("2026-06-01") });
    const posts = [older, newer];
    expect(sortByDateDesc(posts).map((p) => p.id)).toEqual(["newer", "older"]);
    expect(posts[0].id).toBe("older");
  });
});

describe("getReadingTime", () => {
  it("rounds to at least one minute", () => {
    expect(getReadingTime("")).toBe(1);
    expect(getReadingTime("word ".repeat(50))).toBe(1);
    expect(getReadingTime("word ".repeat(600))).toBe(3);
  });
});

describe("getRelatedPosts", () => {
  it("ranks tag overlap above recency and stays within the language", () => {
    const current = entry("current", { tags: ["AI Systems", "Quality"] });
    const sameTag = entry("same-tag", {
      tags: ["AI Systems"],
      pubDate: new Date("2025-01-01"),
    });
    const noTag = entry("no-tag", { tags: ["Backend"], pubDate: new Date("2026-06-01") });
    const plPost = entry("pl/same-tag", { tags: ["AI Systems"] });

    const related = getRelatedPosts(current, [current, sameTag, noTag, plPost], 2);
    expect(related.map((p) => p.id)).toEqual(["same-tag", "no-tag"]);
  });
});

describe("getTranslationsMap / getAllTags", () => {
  it("groups translations under the shared slug", () => {
    const map = getTranslationsMap([entry("redis"), entry("pl/redis")]);
    expect(map.get("redis")?.en?.id).toBe("redis");
    expect(map.get("redis")?.pl?.id).toBe("pl/redis");
  });

  it("counts tags and sorts by frequency", () => {
    const tags = getAllTags([
      entry("a", { tags: ["AI Systems"] }),
      entry("b", { tags: ["AI Systems", "Quality"] }),
    ]);
    expect(tags[0]).toMatchObject({ tag: "AI Systems", slug: "ai-systems", count: 2 });
    expect(tags[1]).toMatchObject({ tag: "Quality", count: 1 });
  });
});
