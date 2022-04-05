import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CoverageType, removeNones, Type, typesFromString } from "./data-types";
import * as Matchups from "./Matchups";
import TypeSelector from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";
import { useTypeCount } from "./useTypeCount";

interface DefenseProps {
  setDefenseParams: (params: string) => void;
  fallbackCoverageTypes: CoverageType[];
}

export default function ScreenDefense({
  setDefenseParams,
  fallbackCoverageTypes,
}: DefenseProps) {
  useScrollToFragment();

  const { t } = useTranslation();

  const search = useSearch();
  const history = useHistory();

  const [typeCount] = useTypeCount();

  const typesString = search.get("types") || "normal";
  const types = typesFromString(typesString).slice(0, Number(typeCount));

  function createParams(types: Type[]): string {
    types = [...new Set(types)];
    const params = new URLSearchParams();
    if (types.length >= 0) {
      params.set("types", types.join(" "));
    }
    return "?" + params;
  }

  function updateTypes(types: Type[]) {
    history.replace({ search: createParams(types) });
  }

  function updateTypeAt(index: number): (t: Type) => void {
    return (t: Type) => {
      updateTypes(removeNones(updateArrayAt(types, index, t)));
    };
  }

  const params = createParams(types);
  React.useEffect(() => {
    setDefenseParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const classH2 = "tc f5 mb2 mt4";
  return (
    <main className="ph3 pt0 pb4 content-wide center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>{t("defense.chooseFirst")}</h2>
        <TypeSelector
          name="primary"
          value={types[0]}
          onChange={updateTypeAt(0)}
          disabledTypes={[]}
          includeNone={false}
        />
        <h2 className={classH2}>{t("defense.chooseSecond")}</h2>
        <TypeSelector
          name="secondary"
          value={types[1] || Type.NONE}
          onChange={updateTypeAt(1)}
          disabledTypes={types.slice(0, 1)}
          includeNone={true}
        />
        {Number(typeCount) === 3 && (
          <>
            <h2 className={classH2}>{t("defense.chooseThird")}</h2>
            <TypeSelector
              name="third"
              value={types[2] || Type.NONE}
              onChange={updateTypeAt(2)}
              disabledTypes={types.slice(0, 2)}
              includeNone={true}
            />
          </>
        )}
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Defense
          types={types}
          fallbackCoverageTypes={fallbackCoverageTypes}
        />
      </div>
    </main>
  );
}
