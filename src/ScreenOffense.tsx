import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Generation } from "./data-generations";
import {
  CoverageType,
  removeInvalidOffenseTypesForGeneration,
  Type,
  typesFromString,
} from "./data-types";
import { DexCoverage } from "./DexCoverage";
import { Matchups } from "./Matchups";
import { MultiTypeSelector } from "./MultiTypeSelector";
import { useSearch } from "./useSearch";

interface OffenseProps {
  generation: Generation;
  coverageTypes?: CoverageType[];
  setOffenseParams: (params: string) => void;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export function ScreenOffense({
  generation,
  coverageTypes,
  setOffenseParams,
  fallbackCoverageTypes,
  isLoading,
}: OffenseProps) {
  const { t, i18n } = useTranslation();
  const search = useSearch();
  const navigate = useNavigate();
  const offenseTypes = typesFromString(search.get("types") || "");

  function createParams(types: Type[]): string {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", types.join(" "));
    }
    return "?" + params;
  }

  React.useEffect(() => {
    updateOffenseTypes(
      removeInvalidOffenseTypesForGeneration(generation, offenseTypes)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  const updateOffenseTypes = (types: Type[]) => {
    navigate({ search: createParams(types) }, { replace: true });
  };

  const params = createParams(offenseTypes);
  React.useEffect(() => {
    setOffenseParams(params);
  }, [params, setOffenseParams]);

  const listLength = coverageTypes?.length ?? 0;
  const listLengthFormatted = listLength.toLocaleString(i18n.languages);

  const classH2 = "f4 mb2 mt4 weight-medium";
  return (
    <main className="ph3 pt0 pb4 content-wide center flex flex-column flex-row-ns">
      <div className="flex-auto w-50-ns">
        <h2 className={classH2}>{t("offense.chooseTypes")}</h2>
        <MultiTypeSelector
          generation={generation}
          value={offenseTypes}
          onChange={updateOffenseTypes}
        />
        <hr className="dn-ns subtle-hr mv4" />
        {generation === "default" && (
          <div className="mt4 mb0">
            <h2 className="f4 weight-medium ma0">
              {t("offense.coverage.heading")}
            </h2>
            <div className="pt2">
              <Link
                to="/offense/coverage/"
                className="underline fg-link br1 focus-outline"
              >
                {t("offense.coverage.edit")}
              </Link>{" "}
              ({listLengthFormatted})
            </div>
            <div
              className={classNames(isLoading && ["o-30 no-pointer cursor-na"])}
            >
              <DexCoverage
                generation={generation}
                coverageTypes={coverageTypes ?? fallbackCoverageTypes}
                types={offenseTypes}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex-auto w-50-ns pl5-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups
          kind="offense"
          generation={generation}
          types={offenseTypes}
          ability="none"
          teraType={Type.none}
        />
      </div>
    </main>
  );
}
