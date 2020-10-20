import * as React from "react";
import * as Router from "react-router";

import Offense from "./Offense";
import Defense from "./Defense";
import InfoScreen from "./InfoScreen";
import { TabItem } from "./Tab";
import TabContainer from "./TabContainer";
import { Type, types } from "./data";

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
  const [state, setState] = React.useState<AppState>({
    defenseParams: "",
    offenseParams: "",
    dexParams: "",
  });
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
            url={`/offense${state.offenseParams}`}
            name="offense"
            title="Offense"
          >
            <Offense setState={setState} />
          </TabItem>
          {/* <TabItem name="defense" title="Defense">
            <Defense state={state} setState={setState} />
          </TabItem>
          <TabItem name="pokedex" title="Pokédex">
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
