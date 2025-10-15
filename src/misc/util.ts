// Utility functions for data manipulation and filtering.

import { Stats, Pokemon } from "../types"; // Adjust import path as needed

/**
 * Calculate the Base Stat Product for a given Stats object.
 */
export function getBaseStatProduct(stats: Stats): number {
  return (
    stats.hp *
    stats.attack *
    stats.defense *
    stats.spAtk *
    stats.spDef *
    stats.speed
  );
}

/**
 * Filter pokemons by a minimum Base Stat Product value.
 */
export function filterByBaseStatProduct(pokemons: Pokemon[], threshold: number): Pokemon[] {
  return pokemons.filter(p => getBaseStatProduct(p.stats) >= threshold);
}

/**
 * Filter pokemons by generation.
 */
export function filterByGeneration(pokemons: Pokemon[], generations: number[]): Pokemon[] {
  return pokemons.filter(p => generations.includes(p.generation));
}

/**
 * Filter pokemons by types (any match).
 */
export function filterByTypes(pokemons: Pokemon[], types: string[]): Pokemon[] {
  return pokemons.filter(p => types.some(type => p.types.includes(type)));
}
