import { Type } from "./data";
import data from "./data-pkmn.json";

export interface Pokemon {
  id: string;
  name: string;
  number: number;
  types: Type[];
}

export const AllPokemon: Pokemon[] = data;
