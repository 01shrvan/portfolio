import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.shrvan.xyz",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap({ filter: (page) => !page.includes("/og/") }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "vesper",
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
