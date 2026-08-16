import sharp from "sharp";
import { writeFile } from "node:fs/promises";

/* Renders the social card from the site's own palette so the preview looks
   like the page it links to. Run with `npm run og` after changing the
   wording or the colours; the output is committed, not built on deploy. */

const W = 1200;
const H = 630;
const GROUND = "#2b2723";
const INK = "#f2e8c9";
const SOFT = "#b9ac96";
const FILAMENT = "#e08a45";

// Same 4x4 Bayer halftone the site's Fig. 1 plate uses, as a static plate.
const dots = [];
const PITCH = 7;
const CX = 980;
const CY = 300;
for (let y = 0; y < H; y += PITCH) {
  for (let x = 0; x < W; x += PITCH) {
    const dx = (x - CX) / 420;
    const dy = (y - CY) / 420;
    const d = Math.sqrt(dx * dx + dy * dy);
    let v = 1 - d * 1.15;
    if (v <= 0) continue;
    v *= v;
    const rings = 0.5 + 0.5 * Math.sin(d * 22);
    const a = Math.min(1, v * (0.72 + 0.5 * rings));
    if (a < 0.06) continue;
    dots.push(
      `<circle cx="${x}" cy="${y}" r="${(a * PITCH) / 2.6}" fill="${FILAMENT}" opacity="${a.toFixed(2)}"/>`,
    );
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>
  <g>${dots.join("")}</g>
  <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="none" stroke="${SOFT}" stroke-opacity="0.35"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="96" y="150" fill="${SOFT}" font-size="26" letter-spacing="4">ASTRA</text>
    <text x="96" y="290" fill="${INK}" font-size="92" font-weight="700">Shrvan Benke</text>
    <text x="96" y="360" fill="${FILAMENT}" font-size="40">Full-stack engineer, Mumbai</text>
    <text x="96" y="452" fill="${SOFT}" font-size="30">i build web apps end to end — and care how they feel,</text>
    <text x="96" y="496" fill="${SOFT}" font-size="30">not just whether they work.</text>
    <text x="96" y="566" fill="${SOFT}" font-size="24" letter-spacing="2">SHRVAN.XYZ · GITHUB.COM/01SHRVAN</text>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile("public/og.png", png);
console.log(`wrote public/og.png (${(png.length / 1024).toFixed(0)} KB)`);
