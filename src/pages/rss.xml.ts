import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/lib/site";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL(SITE.url)).origin;

  const posts = (await getCollection("writings"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.data.title)}</title>
      <link>${base}/writings/${p.id}</link>
      <guid isPermaLink="true">${base}/writings/${p.id}</guid>
      <description>${escape(p.data.tldr)}</description>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name.toLowerCase())}</title>
    <link>${base}</link>
    <description>notes and devlogs on things i learn and break</description>
    <language>en</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
