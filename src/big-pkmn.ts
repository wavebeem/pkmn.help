import { CoverageType, Pokemon, Type } from "./data";
import data from "./data-pkmn.json";

export const AllPokemon: Pokemon[] = data as any;

export const fallbackCoverageTypes = AllPokemon.map<CoverageType>((pkmn) => {
  return {
    number: String(pkmn.number),
    name: pkmn.name,
    type1: pkmn.types[0],
    type2: pkmn.types[1] ?? Type.NONE,
  };
});
