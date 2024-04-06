/* eslint-disable no-console */
import fs, { mkdirSync } from "fs";
import path from "path";
import sharp from "sharp";

const IMG_SRC = "pokedex-img";
const IMG_DEST = "public/img";

export async function optimizeImages() {
  const pathPrefixes = {
    png256: path.join(IMG_DEST, "png256"),
    png512: path.join(IMG_DEST, "png512"),
    webp256: path.join(IMG_DEST, "webp256"),
    webp512: path.join(IMG_DEST, "webp512"),
  };
  for (const prefix of Object.values(pathPrefixes)) {
    mkdirSync(prefix, { recursive: true });
  }
  mkdirSync(pathPrefixes.webp256, { recursive: true });
  for (const name of fs.readdirSync(IMG_SRC)) {
    const baseName = path.basename(name, ".png");
    const fullName = path.join(IMG_SRC, name);

    const namePNG256 = path.join(pathPrefixes.png256, `${baseName}.png`);
    const namePNG512 = path.join(pathPrefixes.png512, `${baseName}.png`);
    const nameWebp256 = path.join(pathPrefixes.webp256, `${baseName}.webp`);
    const nameWebp512 = path.join(pathPrefixes.webp512, `${baseName}.webp`);

    console.log("Optimizing", fullName + "...");
    await Promise.all([
      sharp(fullName).resize(256).toFile(namePNG256),
      sharp(fullName).toFile(namePNG512),
      sharp(fullName).resize(256).toFile(nameWebp256),
      sharp(fullName).toFile(nameWebp512),
    ]);
  }
}
