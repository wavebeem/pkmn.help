/* eslint-disable no-console */
import path from "path";
import { URL } from "url";
import { saveJSON } from "../util.js";

const API = process.env.API || "https://pokeapi.co/api/v2/";
const DEST = "data";

interface PokemonMoveNames {
  name: string;
  language: {
    name: string;
  };
}

export interface PokemonMoveAPI {
  name: string;
  names: PokemonMoveNames[];
  type: { name: string };
  power: number;
  damage_class: { name: string };
  learned_by_pokemon: { name: string }[];
}

export interface PokemonMoveSimple {
  name: string;
  names: Record<string, string>;
  type: string;
  power: number;
  damage_class: string;
  learned_by: string[];
}

export interface PokemonMoveBasic {
  name: string;
  url: string;
}

export interface PokemonSpeciesBasic {
  name: string;
  url: string;
}

export interface PokemonSpeciesDetail {
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

export interface PokemonForm {
  form_names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonDetail {
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
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  cries: {
    latest: string;
    legacy: string;
  };
}

export interface PokemonSimple {
  name: string;
  speciesNames: Record<string, string>;
  formNames: Record<string, string>;
  number: number;
  spriteURL: string;
  shinySpriteURL: string;
  cryURL: string;
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
  console.info("Fetching JSON", url);
  const resp = await fetch(url);
  const data: any = await resp.json();
  return data;
}

async function fetchPaginated<T>(url: string, limit = Infinity): Promise<T[]> {
  const results: T[] = [];
  let nextURL = url;
  let resp: any = null;
  do {
    resp = await fetchJSON(nextURL);
    results.push(...resp.results);
    if (process.env.SHORT) {
      nextURL = "";
    } else {
      nextURL = resp.next;
    }
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

export async function fetchMoves(): Promise<void> {
  const moveList = await fetchPaginated<PokemonMoveBasic>(
    new URL("move", API).toString(),
    Number(process.env.LIMIT || "Infinity"),
  );
  const moves: PokemonMoveSimple[] = [];
  for (const moveBasic of moveList) {
    const move = await fetchJSON<PokemonMoveAPI>(moveBasic.url);
    const { learned_by_pokemon, damage_class, name, names, power, type } = move;
    moves.push({
      name,
      type: type.name,
      power,
      damage_class: damage_class.name,
      names: Object.fromEntries(names.map((n) => [n.language.name, n.name])),
      learned_by: learned_by_pokemon.map((x) => x.name),
    });
  }
  saveJSON(path.resolve(DEST, "moves.json"), moves, {
    indent: 2,
  });
}

export async function fetchPokedex(): Promise<void> {
  const speciesList = await fetchPaginated<PokemonSpeciesBasic>(
    new URL("pokemon-species", API).toString(),
    Number(process.env.LIMIT || "Infinity"),
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
        spriteURL: detail.sprites.other.home.front_default,
        shinySpriteURL: detail.sprites.other.home.front_shiny ?? "",
        cryURL: detail.cries.latest,
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
