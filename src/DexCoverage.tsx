import * as React from "react";
import {
  CoverageType,
  Effectiveness,
  fallbackCoverageTypes,
  matchupFor,
  Type,
} from "./data";
import { PercentBar } from "./PercentBar";
import { AllPokemon } from "./pkmn";

interface DexCoverageProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  types: Type[];
}

const DexCoverage: React.FC<DexCoverageProps> = ({
  coverageTypes = fallbackCoverageTypes,
  setCoverageTypes,
  types,
}) => {
  const count = coverageTypes.filter(({ type1, type2 }) => {
    const matchups = types.map((t) => matchupFor(type1, type2, t));
    return matchups.some((effectiveness) => {
      return effectiveness > Effectiveness.REGULAR;
    });
  }).length;
  const total = coverageTypes.length;
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

DexCoverage.displayName = "DexCoverage";

export default DexCoverage;
