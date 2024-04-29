/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMG_SRC = "pokedex-img";
const IMG_DEST = "public/img";

export async function optimizeImages() {
  const path256 = path.join(IMG_DEST, "256");
  const path512 = path.join(IMG_DEST, "512");
  fs.mkdirSync(path256, { recursive: true });
  fs.mkdirSync(path512, { recursive: true });
  for (const name of fs.readdirSync(IMG_SRC)) {
    const baseName = path.basename(name, ".png");
    const fullName = path.join(IMG_SRC, name);
    const namePNG256 = path.join(path256, `${baseName}.png`);
    const namePNG512 = path.join(path512, `${baseName}.png`);
    const nameWebp256 = path.join(path256, `${baseName}.webp`);
    const nameWebp512 = path.join(path512, `${baseName}.webp`);
    const promises: Promise<any>[] = [];
    if (!fs.existsSync(namePNG256)) {
      promises.push(sharp(fullName).png({}).resize(256).toFile(namePNG256));
    }
    if (!fs.existsSync(namePNG512)) {
      promises.push(sharp(fullName).png({}).toFile(namePNG512));
    }
    if (!fs.existsSync(nameWebp256)) {
      promises.push(sharp(fullName).webp({}).resize(256).toFile(nameWebp256));
    }
    if (!fs.existsSync(nameWebp512)) {
      promises.push(sharp(fullName).webp({}).toFile(nameWebp512));
    }
    if (promises.length === 0) {
      continue;
    }
    console.log("Optimizing", fullName + "...");
    await Promise.all(promises);
  }
}
