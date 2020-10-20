import * as React from "react";
import InfoScreen from "./InfoScreen";
import ScreenDefense from "./ScreenDefense";
import ScreenOffense from "./ScreenOffense";
import TabItem from "./TabItem";
import TabContainer from "./TabContainer";

const ScreenDex = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "Dex" */
    /* webpackPrefetch: true */
    "./ScreenDex"
  );
});

export default function App() {
  const [defenseParams, setDefenseParams] = React.useState("");
  const [offenseParams, setOffenseParams] = React.useState("");
  const [dexParams, setDexParams] = React.useState("");
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
          <TabItem url={`/pokedex${dexParams}`} name="pokedex" title="Pokédex">
            <React.Suspense
              fallback={<div className="Spinner center mt4 f2" />}
            >
              <ScreenDex setDexParams={setDexParams} />
            </React.Suspense>
          </TabItem>
          <TabItem url="/info" name="info" title="Info">
            <InfoScreen />
          </TabItem>
        </TabContainer>
      </div>
    </div>
  );
}

App.displayName = "App";
