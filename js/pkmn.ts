import {Type} from "./data";
import data from "./data-pkmn.json";

interface Pokemon {
  name: string,
  number: number,
  types: Type[],
}

const AllPokemon: Pokemon[] = data;

export {
  Pokemon,
  AllPokemon,
}
