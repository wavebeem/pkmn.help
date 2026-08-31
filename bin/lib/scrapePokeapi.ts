/* eslint-disable no-console */
import path from "path";
import { MainClient, consoleLogger } from "pokenode-ts";
import { saveJSON, simplifyTranslations, toObject } from "../util.js";

const api = new MainClient({
  baseURL: process.env.API,
  logger: consoleLogger,
});
const DEST = "data";

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
  const limit = Number(process.env.LIMIT || "Infinity");
  const pokemonSimpleList: PokemonSimple[] = [];
  let speciesCount = 0;
  for await (const speciesDetail of api.pokemon.paginate("listPokemonSpecies", {
    resolve: true,
  })) {
    if (speciesCount++ >= limit) {
      break;
    }
    const speciesNames = simplifyTranslations(speciesDetail.names);
    for (const variety of speciesDetail.varieties) {
      const detail = await api.resolve(variety.pokemon);
      const stats = toObject({
        data: detail.stats,
        key: (item) => item.stat.name,
        value: (item) => item.base_stat,
      });
      let formNames = {};
      if (detail.forms.length > 0) {
        const form = await api.resolve(detail.forms[0]);
        formNames = simplifyTranslations(form.form_names);
      }
      const home = detail.sprites.other?.home;
      const mon: PokemonSimple = {
        name: detail.name,
        species: speciesDetail.name,
        speciesNames,
        formNames,
        number: speciesDetail.id,
        images: {
          default: home?.front_default ?? "",
          female: home?.front_female ?? "",
          shiny: home?.front_shiny ?? "",
          shinyFemale: home?.front_shiny_female ?? "",
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
