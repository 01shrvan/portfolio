import { execSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.OG_BASE ?? "http://localhost:4550";
const slugs = readdirSync(resolve("dist/og"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

mkdirSync(resolve("public/og"), { recursive: true });
const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run(`npx playwright-cli open --browser=chrome`);
run(`npx playwright-cli resize 1200 630`);
for (const slug of slugs) {
  run(`npx playwright-cli goto ${base}/og/${slug}`);
  run(`npx playwright-cli screenshot --filename="${resolve("public/og", `${slug}.png`)}"`);
  console.log(`  ${slug}.png`);
}
console.log(`wrote ${slugs.length} cards`);
