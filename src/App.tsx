import * as React from "react";

import { Offense } from "./Offense";
import { Defense } from "./Defense";
import { InfoScreen } from "./InfoScreen";
import { TabContainer, TabItem } from "./Tab";
import { Type } from "./data";

const Dex = React.lazy(async () => {
  const { Dex } = await import(
    /* webpackChunkName: "Dex" */
    /* webpackPrefetch: true */
    "./Dex"
  );
  return { default: Dex };
});

export function App() {
  const [tab, changeTab] = React.useState(1);
  const [offenseTypes, updateOffenseTypes] = React.useState([] as Type[]);
  const [type1, updateType1] = React.useState(Type.NORMAL);
  const [type2, updateType2] = React.useState(Type.NONE);
  const [currentPage, updateCurrentPage] = React.useState(0);
  const [search, updateSearch] = React.useState("");

  React.useEffect(() => {
    updateCurrentPage(0);
  }, [search]);

  return (
    <div className="sans-serif bg-near-white near-black min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
          <a href="#" className="no-underline white hover-white-80 DashedFocus">
            Pokémon Type Calculator
          </a>
        </h1>
        <TabContainer changeTab={changeTab} current={tab}>
          <TabItem name="offense" title="Offense">
            <Offense
              offenseTypes={offenseTypes}
              updateOffenseTypes={updateOffenseTypes}
            />
          </TabItem>
          <TabItem name="defense" title="Defense">
            <Defense
              type1={type1}
              type2={type2}
              updateType1={updateType1}
              updateType2={updateType2}
            />
          </TabItem>
          <TabItem name="pokedex" title="Pokédex">
            <React.Suspense
              fallback={<div className="Spinner center mt4 f2" />}
            >
              <Dex
                search={search}
                updateSearch={updateSearch}
                updateCurrentPage={updateCurrentPage}
                currentPage={currentPage}
                updateType1={updateType1}
                updateType2={updateType2}
                changeTab={changeTab}
              />
            </React.Suspense>
          </TabItem>
          <TabItem name="info" title="Info">
            <InfoScreen />
          </TabItem>
        </TabContainer>
      </div>
    </div>
  );
}

App.displayName = "App";
