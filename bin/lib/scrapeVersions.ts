/* eslint-disable no-console */
import path from "path";
import { URL } from "url";
import {
  PokemonTranslation,
  PokeRef,
  saveJSON,
  simplifyTranslations,
} from "../util.js";
import { fetchJSON, fetchPaginated } from "./util.js";

const API = process.env.API || "https://pokeapi.co/api/v2/";
const DEST = "data";

interface PokemonGeneration {
  name: string;
  names: PokemonTranslation[];
  main_region: PokeRef;
  version_groups: PokeRef[];
}

interface PokemonPokedexEntries {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: PokeRef;
  }[];
}

interface PokemonVersionGroup {
  name: string;
  versions: PokeRef[];
  pokedexes: PokeRef[];
}

interface PokemonVersion {
  name: string;
  names: PokemonTranslation[];
}

const generationsToVersionGroups: Record<string, string[]> = {};
const versionGroupsToVersions: Record<string, string[]> = {};
const versionNames: Record<string, Record<string, string>> = {};
const generationNames: Record<string, Record<string, string>> = {};
const monstersInVersionGroup: Record<string, string[]> = {};

export async function scrapeVersions(): Promise<void> {
  const genList = await fetchPaginated<PokeRef>(
    new URL("generation", API).href,
    Number(process.env.LIMIT || "Infinity"),
  );
  for (const genListItem of genList) {
    const gen = await fetchJSON<PokemonGeneration>(genListItem.url);
    generationNames[gen.name] = simplifyTranslations(gen.names);
    for (const vgRef of gen.version_groups) {
      const vg = await fetchJSON<PokemonVersionGroup>(vgRef.url);
      monstersInVersionGroup[vg.name] ||= [];
      for (const dexRef of vg.pokedexes) {
        const dex = await fetchJSON<PokemonPokedexEntries>(dexRef.url);
        for (const mon of dex.pokemon_entries) {
          monstersInVersionGroup[vg.name].push(mon.pokemon_species.name);
        }
      }

      generationsToVersionGroups[gen.name] ||= [];
      generationsToVersionGroups[gen.name].push(vg.name);

      for (const vRef of vg.versions) {
        const v = await fetchJSON<PokemonVersion>(vRef.url);
        versionGroupsToVersions[vg.name] ||= [];
        versionGroupsToVersions[vg.name].push(v.name);
        versionNames[v.name] = simplifyTranslations(v.names);
      }
    }
  }
  const output = {
    generationsToVersionGroups,
    versionGroupsToVersions,
    generationNames,
    versionNames,
    monstersInVersionGroup,
  };
  saveJSON(path.resolve(DEST, "versions.json"), output, {
    indent: 2,
  });
}
