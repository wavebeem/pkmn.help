import * as React from "react";
import { Effectiveness, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";
import { AllPokemon } from "./pkmn";

interface DexCoverageProps {
  types: Type[];
}

const mostPokemon = AllPokemon.filter((pkmn) => {
  const [t1, t2 = Type.NONE] = pkmn.types;
  // Slowking is weird right now... thanks Bulbapedia
  return (t1 as any) !== "???" && (t2 as any) !== "???";
});

const DexCoverage: React.FC<DexCoverageProps> = (props) => {
  const count = mostPokemon.filter((pkmn) => {
    const [t1, t2 = Type.NONE] = pkmn.types;
    const matchups = props.types.map((t) => matchupFor(t1, t2, t));
    return matchups.some((effectiveness) => {
      return effectiveness > Effectiveness.REGULAR;
    });
  }).length;
  const total = mostPokemon.length;
  const ratio = count / total;
  const percent = (ratio * 100).toFixed(0);
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={count} max={total} />
      <div className="flex items-center">
        <div className="tl mr2 w3">{percent}%</div>
        <div className="flex-auto tr">
          {count} / {total} forms
        </div>
      </div>
    </div>
  );
};

export default DexCoverage;
