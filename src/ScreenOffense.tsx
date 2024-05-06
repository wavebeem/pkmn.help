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
import { Matchups } from "./components/Matchups";
import { MultiTypeSelector } from "./MultiTypeSelector";
import { useSearch } from "./hooks/useSearch";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "./components/CopyButton";

interface OffenseProps {
  generation: Generation;
  coverageTypes?: CoverageType[];
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export function ScreenOffense({
  generation,
  coverageTypes,
  fallbackCoverageTypes,
  isLoading,
}: OffenseProps) {
  const { t, i18n } = useTranslation();
  const search = useSearch();
  const navigate = useNavigate();
  const [offenseTypes, setOffenseTypes] = useSessionStorage<Type[]>(
    "offense.types",
    []
  );

  const permalink = new URL(window.location.href);
  if (offenseTypes.length > 0) {
    permalink.searchParams.set("types", offenseTypes.join(" "));
  }

  React.useEffect(() => {
    if (search.has("types")) {
      setOffenseTypes(typesFromString(search.get("types") || ""));
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  React.useEffect(() => {
    setOffenseTypes((offenseTypes) =>
      removeInvalidOffenseTypesForGeneration(generation, offenseTypes)
    );
  }, [generation]);

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
          onChange={setOffenseTypes}
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
            <div className="pt4">
              <CopyButton text={permalink.href}>
                {t("general.copyLink")}
              </CopyButton>
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
