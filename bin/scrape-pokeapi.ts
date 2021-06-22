import fetch from "node-fetch";
import path from "path";
import fs from "fs";
import { URL } from "url";

const API = "https://pokeapi.co/api/v2/";
const DEST = path.resolve(__dirname, "../data");

interface PokemonBasicInfo {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

interface PokemonSimple {
  name: string;
  formName: string;
  number: number;
  spriteURL: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  id: string;
  types: string[];
}

async function fetchJSON<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  return await resp.json();
}

async function fetchBuffer(url: string): Promise<Buffer> {
  const resp = await fetch(url);
  return await resp.buffer();
}

async function fetchPaginated<T>(url: string, limit = Infinity): Promise<T[]> {
  const results: T[] = [];
  let nextURL = url;
  let resp: any = null;
  do {
    resp = await fetchJSON(nextURL);
    results.push(...resp.results);
    nextURL = resp.next;
  } while (nextURL && results.length < limit);
  results.length = limit;
  return results;
}

function saveJSON(filename: string, data: any): void {
  fs.writeFileSync(
    path.resolve(__dirname, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

async function main(): Promise<void> {
  const pokemonList = await fetchPaginated<PokemonBasicInfo>(
    new URL("pokemon", API).toString(),
    10
  );
  const pokemonSimpleList: PokemonSimple[] = [];
  for (const pkmn of pokemonList) {
    const detail = await fetchJSON<PokemonDetail>(pkmn.url);
    const stats = new Map<string, number>();
    for (const s of detail.stats) {
      stats.set(s.stat.name, s.base_stat);
    }
    // TODO: Use `pokemon-species` instead so we can fetch the `varieties` and
    // enumerate their details to get all sprites, types, form names, and stat
    // totals
    const mon: PokemonSimple = {
      name: detail.name,
      formName: "", // TODO: Scrape forms also
      number: detail.id,
      spriteURL: detail.sprites.front_default,
      hp: stats.get("hp") ?? 0,
      attack: stats.get("attack") ?? 0,
      defense: stats.get("defense") ?? 0,
      spAttack: stats.get("special-attack") ?? 0,
      spDefense: stats.get("special-defense") ?? 0,
      speed: stats.get("speed") ?? 0,
      id: String(detail.id),
      types: detail.types.map((t) => t.type.name),
    };
    pokemonSimpleList.push(mon);
  }
  saveJSON(path.resolve(DEST, "pokemon.json"), pokemonSimpleList);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
