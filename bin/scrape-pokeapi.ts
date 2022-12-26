import fetch from "node-fetch";
import path from "path";
import { URL } from "url";
import { saveJSON } from "./util";

const API = process.env.API || "https://pokeapi.co/api/v2/";
const DEST = path.resolve(__dirname, "../data");

interface PokemonSpeciesBasic {
  name: string;
  url: string;
}

interface PokemonSpeciesDetail {
  id: number;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonForm {
  form_names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonDetail {
  id: number;
  name: string;
  is_default: boolean;
  forms: {
    name: string;
    url: string;
  }[];
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
    front_shiny: string;
  };
}

interface PokemonSimple {
  name: string;
  speciesNames: Record<string, string>;
  formNames: Record<string, string>;
  number: number;
  spriteURL: string;
  shinySpriteURL: string;
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

async function fetchPaginated<T>(url: string, limit = Infinity): Promise<T[]> {
  const results: T[] = [];
  let nextURL = url;
  let resp: any = null;
  do {
    resp = await fetchJSON(nextURL);
    results.push(...resp.results);
    nextURL = resp.next;
  } while (nextURL && results.length < limit);
  if (Number.isFinite(limit)) {
    results.length = limit;
  }
  return results;
}

function toObject<T, K extends string, V>({
  data,
  key,
  value,
}: {
  data: T[];
  key: (item: T) => K;
  value: (item: T) => V;
}): Record<K, V> {
  const obj = {} as Record<K, V>;
  for (const item of data) {
    obj[key(item)] = value(item);
  }
  return obj;
}

async function main(): Promise<void> {
  const speciesList = await fetchPaginated<PokemonSpeciesBasic>(
    new URL("pokemon-species", API).toString(),
    Number(process.env.LIMIT || "Infinity")
  );
  const pokemonSimpleList: PokemonSimple[] = [];
  for (const species of speciesList) {
    const speciesDetail = await fetchJSON<PokemonSpeciesDetail>(species.url);
    const speciesNames = toObject({
      data: speciesDetail.names,
      key: (item) => item.language.name,
      value: (item) => item.name,
    });
    for (const variety of speciesDetail.varieties) {
      const detail = await fetchJSON<PokemonDetail>(variety.pokemon.url);
      const stats = toObject({
        data: detail.stats,
        key: (item) => item.stat.name,
        value: (item) => item.base_stat,
      });
      let formNames = {};
      if (detail.forms.length > 0) {
        const form = await fetchJSON<PokemonForm>(detail.forms[0].url);
        formNames = toObject({
          data: form.form_names,
          key: (item) => item.language.name,
          value: (item) => item.name,
        });
      }
      const mon: PokemonSimple = {
        name: detail.name,
        speciesNames,
        formNames,
        number: speciesDetail.id,
        spriteURL: detail.sprites.front_default,
        shinySpriteURL: detail.sprites.front_shiny ?? "",
        hp: stats["hp"] ?? 0,
        attack: stats["attack"] ?? 0,
        defense: stats["defense"] ?? 0,
        spAttack: stats["special-attack"] ?? 0,
        spDefense: stats["special-defense"] ?? 0,
        speed: stats["speed"] ?? 0,
        id: String(detail.id),
        types: detail.types.map((t) => t.type.name),
      };
      pokemonSimpleList.push(mon);
      console.log(speciesDetail.id, detail.id);
    }
  }
  saveJSON(path.resolve(DEST, "pokemon.json"), pokemonSimpleList, {
    indent: 2,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
