import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* Content lives in markdown next to the code. Adding a project means adding
   a file — no CMS, no network call at build, nothing to go down. */

const works = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    href: z.string().url(),
    date: z.coerce.date(),
    /** Shown on the homepage. Everything shows on /works regardless. */
    featured: z.boolean().default(false),
    /** Hand-ordered; lower sorts first. Ties fall back to newest date. */
    order: z.number().default(99),
    stack: z.array(z.string()).default([]),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writings" }),
  schema: z.object({
    title: z.string(),
    tldr: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, writings };
