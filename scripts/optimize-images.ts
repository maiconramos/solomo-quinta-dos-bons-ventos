/**
 * Optimize images in public/images/.
 * - Resize originals to max 1920px width
 * - Generate .webp and .avif variants
 * - Skip already-optimized files via manifest
 *
 * Usage: npx tsx scripts/optimize-images.ts
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, extname, basename } from "path";
import { createHash } from "crypto";

const ROOT = resolve(__dirname, "..");
const IMAGES_DIR = resolve(ROOT, "public", "images");
const MANIFEST_PATH = resolve(IMAGES_DIR, ".optimized-manifest.json");
const MAX_WIDTH = 1920;
const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

interface Manifest {
  [filePath: string]: string; // filename -> hash
}

function loadManifest(): Manifest {
  if (existsSync(MANIFEST_PATH)) {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  }
  return {};
}

function saveManifest(manifest: Manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function fileHash(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash("md5").update(content).digest("hex");
}

function collectImages(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;

  for (const entry of readdirSync(dir)) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...collectImages(fullPath));
    } else if (SUPPORTED_EXTS.has(extname(entry).toLowerCase())) {
      // Skip already-generated variants
      if (!entry.includes(".optimized.")) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath: string): Promise<void> {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath, ext);
  const dir = resolve(filePath, "..");

  const img = sharp(filePath);
  const meta = await img.metadata();

  // Resize original in-place if wider than MAX_WIDTH
  if (meta.width && meta.width > MAX_WIDTH) {
    const resized = img.clone().resize(MAX_WIDTH, undefined, { withoutEnlargement: true });

    if (ext === ".png") {
      await resized.png({ quality: 85 }).toFile(filePath + ".tmp");
    } else {
      await resized.jpeg({ quality: 85 }).toFile(filePath + ".tmp");
    }

    // Replace original with resized
    const { renameSync } = await import("fs");
    renameSync(filePath + ".tmp", filePath);
    console.log(`  Resized ${basename(filePath)} to max ${MAX_WIDTH}px`);
  }

  // Generate WebP variant
  const webpPath = resolve(dir, `${name}.webp`);
  if (!existsSync(webpPath) || ext !== ".webp") {
    await sharp(filePath)
      .resize(MAX_WIDTH, undefined, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath);
    console.log(`  Generated ${name}.webp`);
  }

  // Generate AVIF variant
  const avifPath = resolve(dir, `${name}.avif`);
  if (!existsSync(avifPath)) {
    await sharp(filePath)
      .resize(MAX_WIDTH, undefined, { withoutEnlargement: true })
      .avif({ quality: 65 })
      .toFile(avifPath);
    console.log(`  Generated ${name}.avif`);
  }
}

async function main() {
  if (!existsSync(IMAGES_DIR)) {
    console.log("No public/images/ directory found. Skipping optimization.");
    return;
  }

  const manifest = loadManifest();
  const images = collectImages(IMAGES_DIR);

  if (images.length === 0) {
    console.log("No images to optimize.");
    return;
  }

  console.log(`Found ${images.length} image(s) to check.\n`);

  let optimized = 0;
  for (const filePath of images) {
    const relativeName = filePath.replace(IMAGES_DIR + "/", "");
    const hash = fileHash(filePath);

    if (manifest[relativeName] === hash) {
      continue; // Already optimized
    }

    console.log(`Optimizing: ${relativeName}`);
    await optimizeImage(filePath);
    manifest[relativeName] = fileHash(filePath); // Update hash after optimization
    optimized++;
  }

  saveManifest(manifest);

  if (optimized === 0) {
    console.log("All images already optimized.");
  } else {
    console.log(`\nOptimized ${optimized} image(s).`);
  }
}

main().catch((err) => {
  console.error("Image optimization failed:", err.message);
  process.exit(1);
});
