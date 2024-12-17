#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// public/icons 디렉토리 생성
const publicIconsDir = path.join(process.cwd(), "public/icons");
fs.mkdirSync(publicIconsDir, { recursive: true });
console.log("✅ Created public/icons directory");

// generate-icons.js 실행
try {
  execSync(
    "node ./node_modules/@thyeone/svg-sprite-generator/dist/generate-icons.js",
    {
      stdio: "inherit",
      cwd: process.cwd(),
    }
  );

  console.log("✅ Generated Icon components");
} catch (error) {
  console.error("❌ Error generating Icon components:", error);
}

console.log("\nSetup complete! Now you can:");
console.log("1. Add your SVG files to the public/icons directory");
console.log(
  "2. Run 'npx svg-sprite-generate' to generate the sprite and components"
);
