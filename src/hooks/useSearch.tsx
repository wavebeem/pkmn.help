import { useState, useMemo } from "react";

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

type Pokemon = {
  name: string;
  stats: Stats;
  sprite: string;
};

type UseSearchOptions = {
  filterBaseStatProductAbove?: number;
};

export function useSearch(
  pokemons: Pokemon[],
  searchTerm: string,
  options: UseSearchOptions = {}
) {
  const [term, setTerm] = useState(searchTerm);

  const filteredPokemons = useMemo(() => {
    let result = pokemons;

    if (term) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (options.filterBaseStatProductAbove !== undefined) {
      result = result.filter((p) => {
        const product =
          p.stats.hp *
          p.stats.attack *
          p.stats.defense *
          p.stats.spAtk *
          p.stats.spDef *
          p.stats.speed;
        return product > options.filterBaseStatProductAbove!;
      });
    }

    return result;
  }, [pokemons, term, options.filterBaseStatProductAbove]);

  return {
    term,
    setTerm,
    results: filteredPokemons,
  };
}
