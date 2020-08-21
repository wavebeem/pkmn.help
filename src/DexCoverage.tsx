import * as React from "react";

import { AllPokemon } from "./pkmn";
import { Type, matchupFor, Effectiveness } from "./data";

interface DexCoverageProps {
  types: Type[];
}

const mostPokemon = AllPokemon.filter((pkmn) => {
  const [t1, t2 = Type.NONE] = pkmn.types;
  // Slowking is weird right now... thanks Bulbapedia
  return (t1 as any) !== "???" && (t2 as any) !== "???";
});

export const DexCoverage: React.FC<DexCoverageProps> = (props) => {
  const count = mostPokemon.filter((pkmn) => {
    const [t1, t2 = Type.NONE] = pkmn.types;
    const matchups = props.types.map((t) => matchupFor(t1, t2, t));
    return matchups.some((effectiveness) => {
      return effectiveness > Effectiveness.REGULAR;
    });
  }).length;
  const ratio = count / mostPokemon.length;
  const percent = (ratio * 100).toFixed(1);
  return <span className="tabular-nums">{percent}% of all forms</span>;
};
