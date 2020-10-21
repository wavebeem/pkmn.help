import * as React from "react";
import { useHistory } from "react-router-dom";
import { Type, typesFromString } from "./data";
import * as Matchups from "./Matchups";
import TypeSelector from "./TypeSelector";
import { usePageView } from "./usePageView";
import { useSearch } from "./useSearch";

interface DefenseProps {
  setDefenseParams: (params: string) => void;
}

export default function ScreenDefense(props: DefenseProps) {
  usePageView();

  const search = useSearch();
  const history = useHistory();

  const [type1 = Type.NORMAL, type2 = Type.NONE] = typesFromString(
    search.get("types") || ""
  );

  function createParams(types: Type[]): string {
    const params = new URLSearchParams();
    if (types.length >= 0) {
      if (types[1] === Type.NONE) {
        params.set("types", types[0]);
      } else {
        params.set("types", types.join(" "));
      }
    }
    const s = params.toString();
    if (s) {
      return "?" + s;
    }
    return "";
  }

  function updateTypes(types: Type[]) {
    history.replace({ search: createParams(types) });
  }

  function updateType1(t: Type) {
    updateTypes([t, type2]);
  }

  function updateType2(t: Type) {
    updateTypes([type1, t]);
  }

  const params = createParams([type1, type2]);
  React.useEffect(() => {
    props.setDefenseParams(params);
  }, [params]);

  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 mw6 mw9-ns center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose Primary Type</h2>
        <TypeSelector
          value={type1}
          onChange={updateType1}
          disabledTypes={[]}
          includeNone={false}
        />
        <h2 className={`${classH2} mt4`}>Choose Secondary Type</h2>
        <TypeSelector
          value={type2}
          onChange={updateType2}
          disabledTypes={[type1]}
          includeNone={true}
        />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Defense type1={type1} type2={type2} />
      </div>
    </main>
  );
}

ScreenDefense.displayName = "ScreenDefense";
