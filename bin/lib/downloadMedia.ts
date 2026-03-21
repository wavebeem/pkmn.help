/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { readJSON, saveJSON } from "../util.js";
import { PokemonSimple } from "./scrapePokeapi.js";

const SRC = "data/pokemon.json";
const CRY_DEST = "public/cry";
const IMG_DEST = "pokedex-img";
const DATA_DEST = "public/data-pkmn.json";

async function fetchBytes(url: string): Promise<Uint8Array> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`${resp.status} ${resp.statusText}`);
  }
  const buff = await resp.arrayBuffer();
  return new Uint8Array(buff);
}

export async function downloadMedia(): Promise<void> {
  const list = readJSON(SRC);
  for (const item of list) {
    await downloadSprites(item);
    await downloadCry(item);
  }
  saveJSON(DATA_DEST, list);
}

async function downloadCry(item: PokemonSimple): Promise<void> {
  const cryFilename = path.resolve(CRY_DEST, `${item.id}.ogg`);
  if (item.cryURL && !fs.existsSync(cryFilename)) {
    console.log("Cry", item.id);
    const cry = await fetchBytes(item.cryURL);
    fs.writeFileSync(cryFilename, cry);
  }
  const newItem = item as any;
  newItem.hasCry = Boolean(newItem.cryURL);
  delete newItem.cryURL;
}

async function downloadSprites(item: PokemonSimple): Promise<void> {
  const map = new Map([
    ["default", `${item.id}.png`],
    ["female", `${item.id}-female.png`],
    ["shiny", `${item.id}-shiny.png`],
    ["shinyFemale", `${item.id}-shiny-female.png`],
  ] as const);
  for (const [type, filename] of map.entries()) {
    const imgFilename = path.resolve(IMG_DEST, filename);
    if (item.images[type] && !fs.existsSync(imgFilename)) {
      console.log(type, item.id);
      const img = await fetchBytes(item.images[type]);
      fs.writeFileSync(imgFilename, img);
    }
  }
}
