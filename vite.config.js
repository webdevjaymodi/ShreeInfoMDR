import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

function copyStaticImages() {
  return {
    name: "copy-static-images",
    closeBundle() {
      const source = path.resolve(__dirname, "images");
      const destination = path.resolve(__dirname, "dist/images");
      fs.rmSync(destination, { recursive: true, force: true });
      fs.cpSync(source, destination, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [copyStaticImages()],
});
