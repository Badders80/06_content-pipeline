/**
 * CLI render script for batch/output processing.
 * Run via: npx ts-node scripts/render.ts [composition_id ...]
 */

import { execSync } from "child_process";
import { resolve } from "path";
import * as fs from "fs";

const ROOT = resolve(__dirname, "..");
const ROOT_TSX = resolve(ROOT, "src/Root.tsx");

// Dynamic extraction of registered composition IDs from Root.tsx
function getRegisteredCompositions(): string[] {
  if (!fs.existsSync(ROOT_TSX)) return [];
  const content = fs.readFileSync(ROOT_TSX, "utf-8");
  const regex = /id="([^"]+)"/g;
  const ids: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

const registered = getRegisteredCompositions();
const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  console.log(`
Remotion Render CLI Helper

Usage:
  npx ts-node scripts/render.ts [composition_id ...]
  npx ts-node scripts/render.ts --all

Available Compositions:
${registered.map(id => `  - ${id}`).join("\n")}
  `);
  process.exit(0);
}

let toRender: string[] = [];

if (args.includes("--all")) {
  toRender = registered;
} else if (args.length > 0) {
  // Validate composition IDs
  const invalid = args.filter(arg => !registered.includes(arg));
  if (invalid.length > 0) {
    console.error(`Error: Unknown composition ID(s): ${invalid.join(", ")}`);
    console.error(`Available: ${registered.join(", ")}`);
    process.exit(1);
  }
  toRender = args;
} else {
  console.log("No composition specified. Registered compositions:");
  registered.forEach((id, i) => console.log(`  [${i + 1}] ${id}`));
  console.log("\nUsage:  npx ts-node scripts/render.ts <CompositionName>");
  console.log("Or run: npx ts-node scripts/render.ts --all");
  process.exit(0);
}

// Render compositions
for (const id of toRender) {
  const output = resolve(ROOT, "renders", `${id}.mp4`);
  console.log(`\n========================================`);
  console.log(`Rendering: ${id}`);
  console.log(`Output:    ${output}`);
  console.log(`========================================\n`);

  const dir = resolve(ROOT, "renders");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    execSync(`npx remotion render ${id} renders/${id}.mp4`, {
      cwd: ROOT,
      stdio: "inherit",
    });
  } catch (err) {
    console.error(`Error rendering composition: ${id}`);
    process.exit(1);
  }
}