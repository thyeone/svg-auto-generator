#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.join(__dirname, "./generate-icons.js");
const targetFile = path.join(process.cwd(), "generate-icons.js");

fs.copyFileSync(sourceFile, targetFile);
console.log("✅ Generated generate-icons.js");

const publicIconsDir = path.join(process.cwd(), "public/icons");
fs.mkdirSync(publicIconsDir, { recursive: true });
console.log("✅ Created public/icons directory");

console.log("\nSetup complete! Now you can:");
console.log("1. Add your SVG files to the public/icons directory");
console.log(
  "2. Run 'npx svg-sprite-generate' to generate the sprite and components"
);
