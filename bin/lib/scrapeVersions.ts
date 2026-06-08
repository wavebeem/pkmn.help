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
const versionGroupsToGenerations: Record<string, string> = {};
const versionNames: Record<string, Record<string, string>> = {};
const generationNames: Record<string, Record<string, string>> = {};
const monstersInVersionGroup: Record<string, [number, string][]> = {};
const generations: string[] = [];

export async function scrapeVersions(): Promise<void> {
  const genList = await fetchPaginated<PokeRef>(
    new URL("generation", API).href,
    Number(process.env.LIMIT || "Infinity"),
  );
  for (const genListItem of genList) {
    const gen = await fetchJSON<PokemonGeneration>(genListItem.url);
    generationNames[gen.name] = simplifyTranslations(gen.names);
    generations.push(gen.name);
    for (const vgRef of gen.version_groups) {
      const vg = await fetchJSON<PokemonVersionGroup>(vgRef.url);
      versionGroupsToGenerations[vg.name] = gen.name;
      monstersInVersionGroup[vg.name] ||= [];
      // Confusingly, base games list all their DLCs as Pokédexes, even though
      // each DLC is listed as a version group with its own Pokédex. We only
      // want to show each game/DLC with its respective Pokédex.
      for (const dexRef of vg.pokedexes.slice(0, 1)) {
        const dex = await fetchJSON<PokemonPokedexEntries>(dexRef.url);
        for (const mon of dex.pokemon_entries) {
          monstersInVersionGroup[vg.name].push([
            mon.entry_number,
            mon.pokemon_species.name,
          ]);
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
    versionGroupsToGenerations,
    generations,
    generationNames,
    versionNames,
    monstersInVersionGroup,
  };
  saveJSON(path.resolve(DEST, "versions.json"), output, {
    indent: 2,
  });
}
