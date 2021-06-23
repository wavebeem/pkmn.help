import { Type } from "./data";
import data from "./data-pkmn.json";

export interface Pokemon {
  id: string;
  name: string;
  isDefault: boolean;
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
