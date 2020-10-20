import * as React from "react";
import { useHistory } from "react-router-dom";
import { Type, typesFromString } from "./data";
import { sendPageView } from "./ga";
import * as Matchups from "./Matchups";
import MultiTypeSelector from "./MultiTypeSelector";
import { useSearch } from "./useSearch";

interface OffenseProps {
  setOffenseParams: (params: string) => void;
}

export default function ScreenOffense(props: OffenseProps) {
  const search = useSearch();
  const history = useHistory();
  const offenseTypes = typesFromString(search.get("types") || "");

  const updateOffenseTypes = (types: Type[]) => {
    const params = new URLSearchParams();
    if (types.length > 0) {
      params.set("types", types.join(" "));
    }
    history.replace({ search: "?" + params });
    props.setOffenseParams("?" + params);
  };

  React.useEffect(() => {
    sendPageView();
  }, []);

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

ScreenOffense.displayName = "ScreenOffense";
