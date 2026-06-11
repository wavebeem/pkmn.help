/* eslint-disable no-console */
import path from "path";
import { URL } from "url";
import { PokeRef, saveJSON, simplifyTranslations, toObject } from "../util.js";
import { fetchJSON, fetchPaginated } from "./util.js";

const API = process.env.API || "https://pokeapi.co/api/v2/";
const DEST = "data";

export interface PokemonSpeciesBasic {
  name: string;
  url: string;
}

export interface PokemonSpeciesDetail {
  id: number;
  name: string;
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
  past_types: {
    generation: PokeRef;
    types: { slot: number; type: PokeRef }[];
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
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
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
  species: string;
  speciesNames: Record<string, string>;
  formNames: Record<string, string>;
  number: number;
  images: {
    default: string;
    female: string;
    shiny: string;
    shinyFemale: string;
  };
  cryURL: string;
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  id: string;
  types: string[];
  typesByGeneration: Record<string, string[]>;
}

export async function scrapePokeapi(): Promise<void> {
  const speciesList = await fetchPaginated<PokemonSpeciesBasic>(
    new URL("pokemon-species", API).href,
    Number(process.env.LIMIT || "Infinity"),
  );
  const pokemonSimpleList: PokemonSimple[] = [];
  for (const species of speciesList) {
    const speciesDetail = await fetchJSON<PokemonSpeciesDetail>(species.url);
    const speciesNames = simplifyTranslations(speciesDetail.names);
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
        formNames = simplifyTranslations(form.form_names);
      }
      const mon: PokemonSimple = {
        name: detail.name,
        species: speciesDetail.name,
        speciesNames,
        formNames,
        number: speciesDetail.id,
        images: {
          default: detail.sprites.other.home.front_default,
          female: detail.sprites.other.home.front_female ?? "",
          shiny: detail.sprites.other.home.front_shiny ?? "",
          shinyFemale: detail.sprites.other.home.front_shiny_female ?? "",
        },
        cryURL: detail.cries.latest,
        hp: stats["hp"] ?? 0,
        attack: stats["attack"] ?? 0,
        defense: stats["defense"] ?? 0,
        spAttack: stats["special-attack"] ?? 0,
        spDefense: stats["special-defense"] ?? 0,
        speed: stats["speed"] ?? 0,
        id: String(detail.id),
        types: detail.types.map((t) => t.type.name),
        typesByGeneration: toObject({
          data: detail.past_types,
          value: (item) => item.types.map((t) => t.type.name),
          key: (item) => item.generation.name,
        }),
      };
      pokemonSimpleList.push(mon);
      console.log(speciesDetail.id, detail.id);
    }
  }
  saveJSON(path.resolve(DEST, "pokemon.json"), pokemonSimpleList, {
    indent: 2,
  });
}
