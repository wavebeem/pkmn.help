import * as React from "react";
import { useHistory } from "react-router-dom";
import { CoverageType, removeNones, Type, typesFromString } from "./data";
import * as Matchups from "./Matchups";
import TypeSelector from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";

interface DefenseProps {
  setDefenseParams: (params: string) => void;
  fallbackCoverageTypes: CoverageType[];
}

export default function ScreenDefense({
  setDefenseParams,
  fallbackCoverageTypes,
}: DefenseProps) {
  useScrollToFragment();

  const search = useSearch();
  const history = useHistory();

  const types = typesFromString(search.get("types") || "normal");

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

  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 content-wide center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose Primary Type</h2>
        <TypeSelector
          name="primary"
          value={types[0]}
          onChange={updateTypeAt(0)}
          disabledTypes={[]}
          includeNone={false}
        />
        <h2 className={`${classH2} mt4`}>Choose Secondary Type</h2>
        <TypeSelector
          name="secondary"
          value={types[1] || Type.NONE}
          onChange={updateTypeAt(1)}
          disabledTypes={types.slice(0, 1)}
          includeNone={true}
        />
        <h2 className={`${classH2} mt4`}>Choose Tertiary Type</h2>
        <TypeSelector
          name="tertiary"
          value={types[2] || Type.NONE}
          onChange={updateTypeAt(2)}
          disabledTypes={types.slice(0, 2)}
          includeNone={true}
        />
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
