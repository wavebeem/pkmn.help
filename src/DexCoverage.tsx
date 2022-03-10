import * as React from "react";
import { useTranslation } from "react-i18next";
import { CoverageType, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";

interface DexCoverageProps {
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

// TODO: Translation
function DexCoverage({ coverageTypes, types, isLoading }: DexCoverageProps) {
  const { t } = useTranslation();
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
          <div className="flex-auto tc">{t("general.loading")}</div>
        ) : (
          <>
            <div className="tl mr2 w3">{percent}%</div>
            <div className="flex-auto tr">
              {t("offense.weaknessCoverageForms", { count, total })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DexCoverage;
