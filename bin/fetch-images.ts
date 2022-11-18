import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { readJSON, saveJSON } from "./util";

const SRC = path.resolve(__dirname, "../data/merged-pokemon.json");
const IMG_DEST = path.resolve(__dirname, "../public/img");
const DATA_DEST = path.resolve(__dirname, "../public/data-pkmn.json");

async function fetchBuffer(url: string): Promise<Buffer> {
  const resp = await fetch(url);
  return await resp.buffer();
}

async function main(): Promise<void> {
  const list = readJSON(SRC);
  for (const item of list) {
    const imgFilename = path.resolve(IMG_DEST, `${item.id}.png`);
    if (item.spriteURL && !fs.existsSync(imgFilename)) {
      console.log(imgFilename);
      if (item.spriteURL.includes("img.pokemondb.net")) {
        const url = item.spriteURL.replace("/icon/", "/normal/");
        console.log(url);
        const img = await fetchBuffer(url);
        fs.writeFileSync(path.resolve(IMG_DEST, `${item.id}.tmp.png`), img);
      } else {
        const img = await fetchBuffer(item.spriteURL);
        fs.writeFileSync(imgFilename, img);
      }
      console.log(item.id);
    }
    delete item.spriteURL;
  }
  saveJSON(DATA_DEST, list);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
