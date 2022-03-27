import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CoverageType, matchupFor, Type } from "./data";
import { PercentBar } from "./PercentBar";

interface DexCoverageProps {
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

function DexCoverage({ coverageTypes, types, isLoading }: DexCoverageProps) {
  const { t } = useTranslation();
  const weak = coverageTypes.filter((ct) => {
    const matchups = types.map((t) => matchupFor(ct.types, t));
    return matchups.some((effectiveness) => {
      return effectiveness > 1;
    });
  });
  const count = weak.length;
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
              <Trans
                i18nKey="offense.weaknessCoverageForms"
                values={{ count, total }}
                components={{
                  formslink: (
                    <Link
                      className="br1 underline fg-link OutlineFocus"
                      to="/offense/weakness-list/"
                    />
                  ),
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DexCoverage;
