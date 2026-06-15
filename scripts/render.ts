/**
 * CLI render script for batch/output processing.
 * Run via: npx ts-node scripts/render.ts
 *
 * This is where we'll add:
 * - Multi-composition batch renders
 * - Audio track stitching
 * - Output format conversions
 */

import { execSync } from "child_process";
import { resolve } from "path";

const ROOT = resolve(__dirname, "..");

const compositions = ["HelloWorld"];

for (const id of compositions) {
  const output = resolve(ROOT, "renders", `${id}.mp4`);
  console.log(`Rendering ${id} -> ${output}`);
  execSync(`npx remotion render ${id} ${output}`, {
    cwd: ROOT,
    stdio: "inherit",
  });
}