import * as fs from "fs";
import * as path from "path";
import { uniqBy } from "lodash";
import { saveJSON } from "./saveJSON";

const BULBA = path.resolve(__dirname, "../data/bulba.json");
const POKEAPI = path.resolve(__dirname, "../data/pokemon.json");
const DEST = path.resolve(__dirname, "../public/data-pkmn.json");

function loadJSON(filename: string): any {
  const json = fs.readFileSync(filename, "utf-8");
  return JSON.parse(json);
}

function pkmnUniqBy(mon: any): string {
  return JSON.stringify([
    mon.number,
    mon.hp,
    mon.attack,
    mon.defense,
    mon.spAttack,
    mon.spDefense,
    mon.speed,
    mon.types,
  ]);
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
  const uniqMons = uniqBy(pokeapi, pkmnUniqBy);
  saveJSON(DEST, uniqMons);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
