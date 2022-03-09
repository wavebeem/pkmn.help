import * as React from "react";
import { CoverageType, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";

interface DexCoverageProps {
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

// TODO: Translation
function DexCoverage({ coverageTypes, types, isLoading }: DexCoverageProps) {
  const count = coverageTypes.filter((ct) => {
    const matchups = types.map((t) => matchupFor(ct.types, t));
    return matchups.some((effectiveness) => {
      return effectiveness > 1;
    });
  }).length;
  const total = coverageTypes.length;
  const ratio = count / total || 0;
  const percent = (ratio * 100).toFixed(0);
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={count} max={total} />
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex-auto tc">Loading...</div>
        ) : (
          <>
            <div className="tl mr2 w3">{percent}%</div>
            <div className="flex-auto tr">
              {count} / {total} forms
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DexCoverage;
