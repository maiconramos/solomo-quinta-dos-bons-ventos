/**
 * Inject Meta CAPI secrets into messenger.php after build.
 * Usage: npx tsx scripts/inject-api-secrets.ts
 *
 * Reads META_PIXEL_ID and META_ACCESS_TOKEN from process.env,
 * replaces placeholders [[PIXEL_ID]] and [[ACCESS_TOKEN]] in out/api/messenger.php.
 *
 * Exits with code 0 even if env vars are missing (tracking is optional),
 * but logs a warning.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(__dirname, "..");
const TARGET = resolve(ROOT, "out", "api", "messenger.php");

function main() {
  // Check if the file exists
  if (!existsSync(TARGET)) {
    console.warn(`[inject-api-secrets] File not found: ${TARGET}`);
    console.warn("[inject-api-secrets] Skipping Meta CAPI secret injection.");
    return;
  }

  const pixelId = process.env.META_PIXEL_ID || "";
  const accessToken = process.env.META_ACCESS_TOKEN || "";

  if (!pixelId || !accessToken) {
    console.warn("[inject-api-secrets] META_PIXEL_ID or META_ACCESS_TOKEN not set.");
    console.warn("[inject-api-secrets] Skipping — tracking will be disabled on this deploy.");
    return;
  }

  let content = readFileSync(TARGET, "utf-8");

  // Replace placeholders
  const originalContent = content;
  content = content.replace(/\[\[PIXEL_ID\]\]/g, pixelId);
  content = content.replace(/\[\[ACCESS_TOKEN\]\]/g, accessToken);

  if (content === originalContent) {
    console.warn("[inject-api-secrets] No placeholders found in messenger.php. Already replaced?");
    return;
  }

  writeFileSync(TARGET, content, "utf-8");

  // Verify no placeholders remain
  const verify = readFileSync(TARGET, "utf-8");
  if (verify.includes("[[PIXEL_ID]]") || verify.includes("[[ACCESS_TOKEN]]")) {
    console.error("[inject-api-secrets] ERROR: Some placeholders were not replaced!");
    process.exit(1);
  }

  console.log("[inject-api-secrets] Meta CAPI secrets injected successfully.");
}

main();
