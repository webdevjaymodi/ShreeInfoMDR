const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public");
const entries = ["index.html", "assets", "images"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  const src = path.join(root, entry);
  const dest = path.join(outDir, entry);
  if (!fs.existsSync(src)) {
    throw new Error(`Required static asset not found: ${entry}`);
  }
  fs.cpSync(src, dest, { recursive: true });
}

console.log(`Static site copied to ${path.relative(root, outDir)}/`);
