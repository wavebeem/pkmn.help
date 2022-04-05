// https://pokemondb.net/type/old
// https://pokemondb.net/type
// TODO: Rename "Generation" to "Game"

export const generations = ["gen1", "gen2", "default"] as const;
export type Generation = typeof generations[number];
