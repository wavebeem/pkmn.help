import { CoverageType, Type } from "./data";
import data from "./data-pkmn.json";

export interface Pokemon {
  id: string;
  name: string;
  speciesNames: Record<string, string>;
  formNames: Record<string, string>;
  number: number;
  types: Type[];
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export const AllPokemon: Pokemon[] = data;

export const fallbackCoverageTypes = AllPokemon.filter((pkmn) => {
  // Slowking is weird right now... thanks Bulbapedia
  const [t1, t2] = pkmn.types as string[];
  return t1 !== "???" && t2 !== "???";
}).map<CoverageType>((pkmn) => {
  return {
    number: String(pkmn.number),
    name: pkmn.name,
    type1: pkmn.types[0],
    type2: pkmn.types[1] ?? Type.NONE,
  };
});
