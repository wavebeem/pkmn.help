import fetch from "node-fetch";
import path from "path";
import fs from "fs";

const SRC = path.resolve(__dirname, "../data/pokemon.json");
const IMG_DEST = path.resolve(__dirname, "../img");
const DATA_DEST = path.resolve(__dirname, "../src/data-pkmn.json");

async function fetchBuffer(url: string): Promise<Buffer> {
  const resp = await fetch(url);
  return await resp.buffer();
}

function loadJSON(filename: string): any {
  return JSON.parse(fs.readFileSync(filename, "utf-8"));
}

function saveJSON(filename: string, data: any): void {
  fs.writeFileSync(
    path.resolve(__dirname, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

async function main(): Promise<void> {
  const list = loadJSON(SRC);
  for (const item of list) {
    const imgFilename = path.resolve(IMG_DEST, `${item.id}.png`);
    if (item.spriteURL && !fs.existsSync(imgFilename)) {
      const img = await fetchBuffer(item.spriteURL);
      fs.writeFileSync(imgFilename, img);
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
