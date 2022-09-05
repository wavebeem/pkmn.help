import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Generation } from "./data-generations";
import { matchupFor } from "./data-matchups";
import { CoverageType, Type } from "./data-types";
import { PercentBar } from "./PercentBar";

interface DexCoverageProps {
  generation: Generation;
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

function DexCoverage({
  generation,
  coverageTypes,
  types,
  isLoading,
}: DexCoverageProps) {
  const { t } = useTranslation();
  const weakToAny = coverageTypes.filter((ct) => {
    return types
      .map((t) => matchupFor(generation, ct.types, t))
      .some((x) => x > 1);
  });
  const resistAll = coverageTypes.filter((ct) => {
    return types
      .map((t) => matchupFor(generation, ct.types, t))
      .every((x) => x < 1);
  });
  const total = coverageTypes.length;
  function getPercent(count: number): string {
    return ((count / total || 0) * 100).toFixed(0);
  }
  const typeParams = new URLSearchParams({ types: types.join(" ") });
  return (
    <div className="pt1 tabular-nums flex flex-column lh-copy">
      <PercentBar value={weakToAny.length} max={total} />
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex-auto tc">{t("general.loading")}</div>
        ) : (
          <>
            <div>{getPercent(weakToAny.length)}%&nbsp;</div>
            <Link
              to={`/offense/weakness-list/?${typeParams}`}
              className="underline fg-link br1 OutlineFocus"
            >
              {t("offense.coverage.weakAny")}
            </Link>
            <div className="flex-auto tr ml2">({weakToAny.length})</div>
          </>
        )}
      </div>
      <div className="pt2" />
      <PercentBar value={resistAll.length} max={total} />
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex-auto tc">{t("general.loading")}</div>
        ) : (
          <>
            <div>{getPercent(resistAll.length)}%&nbsp;</div>
            <Link
              to={`/offense/resistance-list/?${typeParams}`}
              className="underline fg-link br1 OutlineFocus"
            >
              {t("offense.coverage.resistAll")}
            </Link>
            <div className="flex-auto tr ml2">({resistAll.length})</div>
          </>
        )}
      </div>
    </div>
  );
}

export default DexCoverage;
