/* eslint-disable no-console */
import path from "path";
import { MainClient, consoleLogger } from "pokenode-ts";
import { saveJSON, simplifyTranslations } from "../util.js";

const api = new MainClient({
  baseURL: process.env.API,
  logger: consoleLogger,
});
const DEST = "data";

const generationsToVersionGroups: Record<string, string[]> = {};
const versionGroupsToVersions: Record<string, string[]> = {};
const versionGroupsToGenerations: Record<string, string> = {};
const versionNames: Record<string, Record<string, string>> = {};
const generationNames: Record<string, Record<string, string>> = {};
const monstersInVersionGroup: Record<string, string[]> = {};
const generations: string[] = [];

// DLC version groups whose Pokédex is already folded into the base game's
// (see the merge below), so they shouldn't also be listed as their own
// separately selectable Pokédex. Colosseum and XD have no Pokédex data in
// PokeAPI at all, so they're skipped too.
const skipVersionGroups = new Set([
  "the-isle-of-armor",
  "the-crown-tundra",
  "the-teal-mask",
  "the-indigo-disk",
  "mega-dimension",
  "colosseum",
  "xd",
]);

async function fetchNationalNumbers(): Promise<Map<string, number>> {
  const dex = await api.game.getPokedexByName("national");
  const numbers = new Map<string, number>();
  for (const mon of dex.pokemon_entries) {
    numbers.set(mon.pokemon_species.name, mon.entry_number);
  }
  return numbers;
}

export async function scrapeVersions(): Promise<void> {
  const nationalNumbers = await fetchNationalNumbers();
  const limit = Number(process.env.LIMIT || "Infinity");
  let genCount = 0;
  for await (const gen of api.game.paginate("listGenerations", {
    resolve: true,
  })) {
    if (genCount++ >= limit) {
      break;
    }
    generationNames[gen.name] = simplifyTranslations(gen.names);
    generations.push(gen.name);
    for (const vgRef of gen.version_groups) {
      const vg = await api.resolve(vgRef);
      if (skipVersionGroups.has(vg.name)) {
        continue;
      }
      versionGroupsToGenerations[vg.name] = gen.name;

      // Union every Pokédex a version group has (base game + DLC, or a
      // single game's sub-regional Pokédexes), numbered by National Dex
      // number instead of each one's own regional numbering.
      const species = new Set<string>();
      for (const dexRef of vg.pokedexes) {
        const dex = await api.resolve(dexRef);
        for (const mon of dex.pokemon_entries) {
          species.add(mon.pokemon_species.name);
        }
      }
      monstersInVersionGroup[vg.name] = [...species].sort((a, b) => {
        const numberA = nationalNumbers.get(a);
        const numberB = nationalNumbers.get(b);
        if (numberA === undefined) {
          throw new Error(`no national dex number for ${a}`);
        }
        if (numberB === undefined) {
          throw new Error(`no national dex number for ${b}`);
        }
        return numberA - numberB;
      });

      generationsToVersionGroups[gen.name] ||= [];
      generationsToVersionGroups[gen.name].push(vg.name);

      for (const vRef of vg.versions) {
        const v = await api.resolve(vRef);
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
