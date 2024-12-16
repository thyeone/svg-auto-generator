#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";

try {
  execSync("node ./generate-icons.js", { stdio: "inherit" });

  const iconsPath = path.join(process.cwd(), "public/icons/*.svg");
  const spritePath = path.join(process.cwd(), "public/sprite.svg");
  execSync(`svgstore -o ${spritePath} ${iconsPath}`, { stdio: "inherit" });

  console.log("✅ SVG sprite generation complete!");
} catch (error) {
  console.error("❌ Error generating SVG sprite:", error);
  process.exit(1);
}
