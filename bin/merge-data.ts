import * as fs from "fs";
import { uniqBy, sortBy } from "lodash";
import * as path from "path";
import { saveJSON } from "./util";

const pokemondbJSON = path.resolve(__dirname, "../data/pokemondb-gen9.json");
const pokeapiJSON = path.resolve(__dirname, "../data/pokemon.json");
const mergedJSON = path.resolve(__dirname, "../data/merged-pokemon.json");
const destJSON = path.resolve(__dirname, "../public/data-pkmn.json");

function loadJSON(filename: string): any {
  const json = fs.readFileSync(filename, "utf-8");
  return JSON.parse(json);
}

function pkmnUniqBy(mon: Record<string, any>): string {
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
  const pokeapi: Record<string, any>[] = loadJSON(pokeapiJSON);
  const gen9: Record<string, any>[] = loadJSON(pokemondbJSON);
  const mons = [...pokeapi, ...gen9];
  const uniqMons = uniqBy(mons, pkmnUniqBy);
  const sortedMons = sortBy(uniqMons, (mon) => mon.number);
  saveJSON(mergedJSON, sortedMons, { indent: 2 });
  saveJSON(destJSON, sortedMons, { indent: 0 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
