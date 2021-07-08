import fs from "fs";
import path from "path";
import { saveJSON } from "./saveJSON";

const BULBA = path.resolve(__dirname, "../data/bulba.json");
const POKEAPI = path.resolve(__dirname, "../data/pokemon.json");
const DEST = path.resolve(__dirname, "../src/data-pkmn.json");

function loadJSON(filename: string): any {
  const json = fs.readFileSync(filename, "utf-8");
  return JSON.parse(json);
}

async function main() {
  const bulba = loadJSON(BULBA);
  const pokeapi = loadJSON(POKEAPI);
  for (const mon of pokeapi) {
    const url = bulba[mon.number];
    if (!url) {
      throw new Error(
        `missing Bulbapedia URL for ${mon.name} (#${mon.number})`
      );
    }
    mon.bulbapediaURL = url;
  }
  saveJSON(DEST, pokeapi);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
