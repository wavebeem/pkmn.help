/* eslint-disable no-console */
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { readJSON, saveJSON } from "../util.js";
import { PokemonSimple } from "./scrapePokeapi.js";

const SRC = "data/pokemon.json";
const CRY_DEST = "public/img";
const IMG_DEST = "public/img";
const DATA_DEST = "public/data-pkmn.json";

async function fetchBytes(url: string): Promise<Uint8Array> {
  const resp = await fetch(url);
  const buff = await resp.arrayBuffer();
  return new Uint8Array(buff);
}

export async function downloadMedia(): Promise<void> {
  const list = readJSON(SRC);
  for (const item of list) {
    await downloadSprite(item);
    await downloadShinySprite(item);
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
}

async function downloadShinySprite(item: PokemonSimple): Promise<void> {
  const shinyImgFilename = path.resolve(IMG_DEST, `${item.id}-shiny.png`);
  if (
    item.shinySpriteURL &&
    item.shinySpriteURL.includes("img.pokemondb.net")
  ) {
    const url = item.shinySpriteURL.replace("/icon/", "/normal/");
    console.log("Shiny", item.id);
    const img = await fetchBytes(url);
    fs.writeFileSync(shinyImgFilename, img);
  } else if (item.shinySpriteURL && !fs.existsSync(shinyImgFilename)) {
    console.log("Shiny", item.id);
    const img = await fetchBytes(item.shinySpriteURL);
    fs.writeFileSync(shinyImgFilename, img);
  }
  const newItem = item as any;
  newItem.hasShiny = Boolean(newItem.shinySpriteURL);
  delete newItem.shinySpriteURL;
}

async function downloadSprite(item: PokemonSimple): Promise<void> {
  const imgFilename = path.resolve(IMG_DEST, `${item.id}.png`);
  if (item.spriteURL && item.spriteURL.includes("img.pokemondb.net")) {
    const url = item.spriteURL.replace("/icon/", "/normal/");
    console.log("Normal", item.id);
    const img = await fetchBytes(url);
    fs.writeFileSync(imgFilename, img);
  } else if (item.spriteURL && !fs.existsSync(imgFilename)) {
    console.log("Normal", item.id);
    const img = await fetchBytes(item.spriteURL);
    fs.writeFileSync(imgFilename, img);
  }
  const newItem = item as any;
  delete newItem.spriteURL;
}
