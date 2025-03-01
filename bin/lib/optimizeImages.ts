/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { cpus } from "node:os";
import sharp, { PngOptions, WebpOptions } from "sharp";

const IMG_SRC = "pokedex-img";
const IMG_DEST = "public/img";

export async function optimizeImages({
  force = false,
}: {
  force: boolean;
}): Promise<void> {
  const path256 = path.join(IMG_DEST, "256");
  const path512 = path.join(IMG_DEST, "512");
  fs.mkdirSync(path256, { recursive: true });
  fs.mkdirSync(path512, { recursive: true });
  const concurrencyLimit = cpus().length;
  let promises: Promise<any>[] = [];
  for (const name of fs.readdirSync(IMG_SRC)) {
    const baseName = path.basename(name, ".png");
    const fullName = path.join(IMG_SRC, name);
    const namePNG256 = path.join(path256, `${baseName}.png`);
    const namePNG512 = path.join(path512, `${baseName}.png`);
    const nameWebp256 = path.join(path256, `${baseName}.webp`);
    const nameWebp512 = path.join(path512, `${baseName}.webp`);
    const pngOptions: PngOptions = {};
    // The default (80) is just slightly noticeably degrading the quality. 90
    // feels indistinguishable from 100, but has a much better file size.
    const webpOptions: WebpOptions = {
      quality: 90,
    };
    if (force || !fs.existsSync(namePNG256)) {
      promises.push(
        sharp(fullName).png(pngOptions).resize(256).toFile(namePNG256)
      );
    }
    if (force || !fs.existsSync(namePNG512)) {
      promises.push(sharp(fullName).png(pngOptions).toFile(namePNG512));
    }
    if (force || !fs.existsSync(nameWebp256)) {
      promises.push(
        sharp(fullName).webp(webpOptions).resize(256).toFile(nameWebp256)
      );
    }
    if (force || !fs.existsSync(nameWebp512)) {
      promises.push(sharp(fullName).webp(webpOptions).toFile(nameWebp512));
    }
    if (promises.length === 0) {
      continue;
    }
    console.log("Optimizing", fullName + "...");
    if (promises.length >= concurrencyLimit) {
      await Promise.all(promises);
      promises = [];
    }
  }
  await Promise.all(promises);
}
