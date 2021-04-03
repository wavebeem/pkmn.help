import classnames from "classnames";
import * as React from "react";
import { CoverageType } from "./App";
import { Effectiveness, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";
import { AllPokemon } from "./pkmn";

const fallbackCoverageTypes = AllPokemon.filter((pkmn) => {
  // Slowking is weird right now... thanks Bulbapedia
  const [t1, t2] = pkmn.types as string[];
  return t1 !== "???" && t2 !== "???";
}).map<CoverageType>((pkmn) => {
  return {
    number: String(pkmn.number),
    name: pkmn.name,
    formName: pkmn.formName,
    type1: pkmn.types[0],
    type2: pkmn.types[1] ?? Type.NONE,
  };
});

interface DexCoverageProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: any[]) => void;
  types: Type[];
}

const buttonClasses = classnames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus",
  "active-squish",
  "border2 button-shadow button-bg button-bg-hover color-inherit"
);

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
  function saveCSV() {
    // TODO
  }
  function loadCSV() {
    // TODO
  }
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={count} max={total} />
      <div className="flex items-center">
        <div className="tl mr2 w3">{percent}%</div>
        <div className="flex-auto tr">
          {count} / {total} forms
        </div>
      </div>
      <div className="flex items-center pt2">
        <button type="button" className={buttonClasses} onClick={saveCSV}>
          Save CSV
        </button>
        <div className="pl2" />
        <button type="button" className={buttonClasses} onClick={loadCSV}>
          Load CSV
        </button>
      </div>
    </div>
  );
};

DexCoverage.displayName = "DexCoverage";

export default DexCoverage;
