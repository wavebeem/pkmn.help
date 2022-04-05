import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CommonSettings } from "./CommonSettings";
import { Generation } from "./data-generations";
import { CoverageType, Type, typesFromString } from "./data-types";
import * as Matchups from "./Matchups";
import MultiTypeSelector from "./MultiTypeSelector";
import { useSearch } from "./useSearch";

interface OffenseProps {
  generation: Generation;
  setGeneration: (generation: Generation) => void;
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  setOffenseParams: (params: string) => void;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export default function ScreenOffense({
  generation,
  setGeneration,
  coverageTypes,
  setCoverageTypes,
  setOffenseParams,
  fallbackCoverageTypes,
  isLoading,
}: OffenseProps) {
  const { t } = useTranslation();
  const search = useSearch();
  const history = useHistory();
  const offenseTypes = typesFromString(search.get("types") || "");

  function createParams(types: Type[]): string {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", types.join(" "));
    }
    return "?" + params;
  }

  const updateOffenseTypes = (types: Type[]) => {
    history.replace({ search: createParams(types) });
  };

  const params = createParams(offenseTypes);
  React.useEffect(() => {
    setOffenseParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const classH2 = "tc f5 mb2 mt4";
  return (
    <main className="ph3 pt0 pb4 content-wide center">
      <div className="pt3 pb4 bb border3">
        <CommonSettings generation={generation} setGeneration={setGeneration} />
      </div>
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>{t("offense.chooseTypes")}</h2>
        <MultiTypeSelector value={offenseTypes} onChange={updateOffenseTypes} />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense
          generation={generation}
          coverageTypes={coverageTypes}
          setCoverageTypes={setCoverageTypes}
          types={offenseTypes}
          fallbackCoverageTypes={fallbackCoverageTypes}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
