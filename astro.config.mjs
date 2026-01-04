import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://shrvans-space.vercel.app/",
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap()],
  adapter: vercel({
    maxDuration: 30,
    webAnalytics: {
      enabled: true,
    },
  }),
});
