import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Generation } from "./data-generations";
import { partitionMatchups } from "./data-matchups";
import { CoverageType, Type } from "./data-types";
import { Meter } from "./Meter";

interface DexCoverageProps {
  generation: Generation;
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

export function DexCoverage({
  generation,
  coverageTypes,
  types,
  isLoading,
}: DexCoverageProps) {
  const { t } = useTranslation();
  const {
    resistance: resist,
    normal,
    weakness: weak,
  } = partitionMatchups({
    coverageTypes,
    types,
    generation,
  });
  const total = coverageTypes.length;
  function getPercent(count: number): string {
    return ((count / total || 0) * 100).toFixed(1);
  }
  const typeParams = new URLSearchParams({ types: types.join(" ") });
  return (
    <div className="tabular-nums mw5 flex flex-column lh-copy">
      <div className="pt3" />
      <Meter value={weak.length} max={total} />
      <div className="flex w-100">
        {isLoading ? (
          <div className="flex-auto">{t("general.loading")}</div>
        ) : (
          <>
            <div>{getPercent(weak.length)}%&nbsp;</div>
            <Link
              to={`/offense/coverage/weakness/?${typeParams}`}
              className="underline fg-link br1 focus-outline"
            >
              {t("offense.coverage.weakness")}
            </Link>
            <div className="flex-auto tr ml2">({weak.length})</div>
          </>
        )}
      </div>
      <div className="pt3" />
      <Meter value={normal.length} max={total} />
      <div className="flex w-100">
        {isLoading ? (
          <div className="flex-auto">{t("general.loading")}</div>
        ) : (
          <>
            <div>{getPercent(normal.length)}%&nbsp;</div>
            <Link
              to={`/offense/coverage/normal/?${typeParams}`}
              className="underline fg-link br1 focus-outline"
            >
              {t("offense.coverage.normal")}
            </Link>
            <div className="flex-auto tr ml2">({normal.length})</div>
          </>
        )}
      </div>
      <div className="pt3" />
      <Meter value={resist.length} max={total} />
      <div className="flex w-100">
        {isLoading ? (
          <div className="flex-auto">{t("general.loading")}</div>
        ) : (
          <>
            <div>{getPercent(resist.length)}%&nbsp;</div>
            <Link
              to={`/offense/coverage/resistance/?${typeParams}`}
              className="underline fg-link br1 focus-outline"
            >
              {t("offense.coverage.resistance")}
            </Link>
            <div className="flex-auto tr ml2">({resist.length})</div>
          </>
        )}
      </div>
    </div>
  );
}
