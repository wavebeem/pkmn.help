/* eslint-disable no-console */
import * as fs from "fs";
import { saveJSON } from "../util.js";

// const pokemondbJSON = "data/pokemondb-gen9.json";
const pokeapiJSON = "data/pokemon.json";
const mergedJSON = "data/merged-pokemon.json";
const destJSON = "public/data-pkmn.json";

function loadJSON(filename: string): any {
  const json = fs.readFileSync(filename, "utf-8");
  return JSON.parse(json);
}

function compare<T>(a: T, b: T): -1 | 0 | 1 {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function uniqBy<T>(list: readonly T[], fn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return list.filter((x) => {
    const key = fn(x);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

const blockListNames = new Set(["pikachu-starter", "eevee-starter"]);

const blockListForms = new Set([
  // Koraidon
  "Limited Build",
  "Sprinting Build",
  "Swimming Build",
  "Gliding Build",

  // Miraidon
  "Low-Power Mode",
  "Drive Mode",
  "Aquatic Mode",
  "Glide Mode",

  // Pikachu has too many cosmetic forms
  "World Cap",
  "Partner Cap",
  "Alola Cap",
  "Kalos Cap",
  "Unova Cap",
  "Sinnoh Cap",
  "Hoenn Cap",
  "Original Cap",
  "Cosplay Pikachu",
  "Pikachu Libre",
  "Pikachu Ph.D.",
  "Pikachu Pop Star",
  "Pikachu Belle",
  "Pikachu Rock Star",
]);

export async function mergeData(): Promise<void> {
  const pokeapi: Record<string, any>[] = loadJSON(pokeapiJSON);
  // const gen9: Record<string, any>[] = loadJSON(pokemondbJSON);

  let mons = pokeapi;
  // let mons = [...pokeapi, ...gen9];
  const idSet = new Set<string>();

  mons = uniqBy(mons, (mon) =>
    JSON.stringify([
      mon.number,
      mon.hp,
      mon.attack,
      mon.defense,
      mon.spAttack,
      mon.spDefense,
      mon.speed,
      mon.types,
    ]),
  );
  mons = mons.sort((a, b) => compare(a.number, b.number));
  mons = mons.filter((mon) => !blockListNames.has(mon.name));
  mons = mons.filter((mon) => !blockListForms.has(mon.formNames.en));

  // Create unique IDs for gen9 data
  for (const m of mons) {
    delete m.cryURL;
    if (fs.existsSync(`public/cry/${m.id}.ogg`)) {
      m.hasCry = true;
    }
    m.images.default = Boolean(m.images.default);
    m.images.female = Boolean(m.images.female);
    m.images.shiny = Boolean(m.images.shiny);
    m.images.shinyFemale = Boolean(m.images.shinyFemale);
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
