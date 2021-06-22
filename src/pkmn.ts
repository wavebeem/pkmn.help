import { Type } from "./data";
import data from "./data-pkmn.json";

export interface Pokemon {
  id: string;
  bulbapediaURL: string;
  name: string;
  names: Record<string, string>;
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
