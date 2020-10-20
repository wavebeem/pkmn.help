import * as React from "react";
import { useHistory } from "react-router-dom";
import { AppState } from "./App";
import { Type, types } from "./data";
import * as Matchups from "./Matchups";
import { MultiTypeSelector } from "./MultiTypeSelector";
import { useSearch } from "./useSearch";

interface OffenseProps {
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function Offense(props: OffenseProps) {
  const { setState } = props;
  const search = useSearch();
  const history = useHistory();
  const offenseTypes = (search.get("types") || "")
    .split(/\s+/)
    .filter((s) => types.some((t) => t === s)) as Type[];

  const typesString = offenseTypes.join(" ");

  const updateQuery = (query: string) => {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", query);
    }
    const search = `?${params}`;
    history.replace({ search: search });
    setState((state) => ({ ...state, offenseParams: search }));
  };

  const updateOffenseTypes = (types: Type[]) => {
    updateQuery(types.join(" "));
  };

  React.useEffect(() => {
    updateQuery(typesString);
  }, [typesString]);

  const classH2 = "tc f5 mv3";
  return (
    <main className="ph3 pt1 pb4 mw6 mw9-ns center">
      <div className="dib w-50-ns w-100 v-top">
        <h2 className={classH2}>Choose Types</h2>
        <MultiTypeSelector value={offenseTypes} onChange={updateOffenseTypes} />
      </div>
      <div className="dib w-50-ns w-100 v-top pl3-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <Matchups.Offense types={offenseTypes} />
      </div>
    </main>
  );
}

Offense.displayName = "Offense";
