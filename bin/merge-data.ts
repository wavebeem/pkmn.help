/* eslint-disable no-console */
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

  for (const mon of pokeapi) {
    mon.imageType = "sprite";
  }

  for (const mon of gen9) {
    mon.imageType = "hd";
  }

  let mons = [...pokeapi, ...gen9];
  const idSet = new Set<string>();

  mons = uniqBy(mons, pkmnUniqBy);
  mons = sortBy(mons, (mon) => mon.number);
  mons = mons.filter((mon) => mon.name !== "pikachu-starter");

  // Create unique IDs for gen9 data
  for (const m of mons) {
    const id = String(m.id || m.number);
    if (idSet.has(id)) {
      console.log(m.name, m.formNames.en, id, "exists...");
      let i = 1;
      while (idSet.has(id + "-" + i)) {
        i++;
      }
      m.id = id + "-" + i;
      console.log(m.name, m.formNames.en, m.id);
    } else {
      m.id = id;
    }
    idSet.add(m.id);
  }

  saveJSON(mergedJSON, mons, { indent: 2 });
  saveJSON(destJSON, mons, { indent: 0 });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
