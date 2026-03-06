/**
 * Generate favicons from source logo.
 * Usage: npx tsx scripts/generate-favicons.ts
 *
 * Source: public/images/logo.png or public/images/logo.svg
 * Output: public/favicon.ico, public/*.png, public/site.webmanifest
 */

import sharp from "sharp";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const IMAGES = resolve(PUBLIC, "images");

async function findSource(): Promise<string> {
  const candidates = ["logo.png", "logo.svg", "logo.jpg"];
  for (const name of candidates) {
    const p = resolve(IMAGES, name);
    if (existsSync(p)) return p;
  }
  throw new Error(
    "No source logo found. Place logo.png or logo.svg in public/images/"
  );
}

interface FaviconSize {
  name: string;
  size: number;
}

const SIZES: FaviconSize[] = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function main() {
  const source = await findSource();
  console.log(`Source: ${source}`);

  const img = sharp(source);

  // Generate PNGs
  for (const { name, size } of SIZES) {
    const outPath = resolve(PUBLIC, name);
    await img
      .clone()
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`  Generated ${name} (${size}x${size})`);
  }

  // Generate favicon.ico (32x32 PNG wrapped as ICO)
  const ico32 = await img
    .clone()
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Simple ICO format: header + one entry + PNG data
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type: ICO
  icoHeader.writeUInt16LE(1, 4); // count: 1

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // width
  icoEntry.writeUInt8(32, 1); // height
  icoEntry.writeUInt8(0, 2); // color palette
  icoEntry.writeUInt8(0, 3); // reserved
  icoEntry.writeUInt16LE(1, 4); // color planes
  icoEntry.writeUInt16LE(32, 6); // bits per pixel
  icoEntry.writeUInt32LE(ico32.length, 8); // size of PNG data
  icoEntry.writeUInt32LE(22, 12); // offset (6 header + 16 entry)

  const icoBuffer = Buffer.concat([icoHeader, icoEntry, ico32]);
  writeFileSync(resolve(PUBLIC, "favicon.ico"), icoBuffer);
  console.log("  Generated favicon.ico");

  // Resolve basePath from NEXT_PUBLIC_SITE_URL (same logic as src/lib/env.ts)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  let manifestBasePath = "";
  try {
    if (siteUrl) {
      manifestBasePath = new URL(siteUrl).pathname.replace(/\/$/, "");
    }
  } catch { /* ignore invalid URL */ }

  // Generate site.webmanifest
  const manifest = {
    name: "Quinta dos Bons Ventos",
    short_name: "Quinta BV",
    icons: [
      { src: `${manifestBasePath}/android-chrome-192x192.png`, sizes: "192x192", type: "image/png" },
      { src: `${manifestBasePath}/android-chrome-512x512.png`, sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
  writeFileSync(
    resolve(PUBLIC, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("  Generated site.webmanifest");

  console.log("\nDone! Don't forget to update layout.tsx metadata if needed.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
