import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  // `image()` resolves hero paths relative to the MDX file and returns
  // ImageMetadata, so astro:assets can emit srcset/AVIF at build time.
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // i18n: language of the post and a stable key shared across translations.
    lang: z.enum(["en", "pl"]).default("en"),
    // Defaults to the file slug when omitted (set in utils/posts helpers).
    translationKey: z.string().optional(),
  }),
});

export const collections = { blog };
