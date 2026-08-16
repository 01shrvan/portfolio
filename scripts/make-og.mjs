/* Screenshots /og-card from a running preview server into public/og.png, so
   the card is rendered in the site's real fonts by a real browser.
   Usage: npm run build && npm run preview  (then, in another shell) npm run og */
import { execSync } from "node:child_process";
import { resolve } from "node:path";

const url = process.env.OG_URL ?? "http://localhost:4321/og-card";
const out = resolve("public/og.png");
const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run(`npx playwright-cli resize 1200 630`);
run(`npx playwright-cli goto ${url}`);
run(`npx playwright-cli screenshot --filename="${out}"`);
console.log(`wrote ${out}`);
