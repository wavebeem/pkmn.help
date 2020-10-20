import * as React from "react";
import { Type, types } from "./data";
import InfoScreen from "./InfoScreen";
import ScreenDefense from "./ScreenDefense";
import ScreenOffense from "./ScreenOffense";
import TabItem from "./TabItem";
import TabContainer from "./TabContainer";
import { useSearch } from "./useSearch";

const Dex = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "Dex" */
    /* webpackPrefetch: true */
    "./Dex"
  );
});

if (window.location.pathname === "/") {
  window.history.replaceState(
    undefined,
    "Pokémon Type Calculator",
    "/defense?types=normal"
  );
}

const typeNames = new Map(types.map((t) => [t.valueOf(), t]));
const params = new URLSearchParams(window.location.search.toLowerCase());
const paramTypes = params.get("types");
const initTypes: Type[] = [];
if (paramTypes) {
  for (const paramType of paramTypes.split(" ")) {
    const parsedType = typeNames.get(paramType);
    if (parsedType !== undefined) {
      initTypes.push(parsedType);
    }
  }
}

export interface AppState {
  defenseParams: string;
  offenseParams: string;
  dexParams: string;
}

export default function App() {
  const search = useSearch();
  const [defenseParams, setDefenseParams] = React.useState("?" + search);
  const [offenseParams, setOffenseParams] = React.useState("?" + search);
  const [dexParams, setDexParams] = React.useState("?" + search);
  return (
    <div className="sans-serif bg-near-white near-black min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
          <a href="#" className="no-underline white hover-white-80 DashedFocus">
            Pokémon Type Calculator
          </a>
        </h1>
        <TabContainer>
          <TabItem
            url={`/offense${offenseParams}`}
            name="offense"
            title="Offense"
          >
            <ScreenOffense setOffenseParams={setOffenseParams} />
          </TabItem>
          <TabItem
            url={`/defense${defenseParams}`}
            name="defense"
            title="Defense"
          >
            <ScreenDefense setDefenseParams={setDefenseParams} />
          </TabItem>
          {/* <TabItem name="pokedex" title="Pokédex">
            <React.Suspense
              fallback={<div className="Spinner center mt4 f2" />}
            >
              <Dex state={state} setState={setState} />
            </React.Suspense>
          </TabItem> */}
          <TabItem url="/info" name="info" title="Info">
            <InfoScreen />
          </TabItem>
        </TabContainer>
      </div>
    </div>
  );
}

App.displayName = "App";
