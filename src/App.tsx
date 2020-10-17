import * as React from "react";

import { Offense } from "./Offense";
import { Defense } from "./Defense";
import { InfoScreen } from "./InfoScreen";
import { TabContainer, TabItem } from "./Tab";
import { Type, types } from "./data";

const Dex = React.lazy(async () => {
  const { Dex } = await import(
    /* webpackChunkName: "Dex" */
    /* webpackPrefetch: true */
    "./Dex"
  );
  return { default: Dex };
});

const hashFromTab = ["#offense", "#defense", "#pokedex", "#info"];
const tabFromHash = new Map((Array.from(hashFromTab.entries(), kv => [kv[1], kv[0]])));
const hashFromType = new Map(types.map(t => [t, t.valueOf()]));
const typeFromHash = new Map(types.map(t => [t.valueOf(), t]));

function typesFromHash(fragments?: string): Type[] {
  if (!fragments) {
    return [];
  }
  const types = [];
  for (const fragment of fragments.split("+")) {
    const type = typeFromHash.get(fragment);
    if (type !== undefined) {
      types.push(type);
    }
  }
  return types;
}

const hashes = window.location.hash.split("/");
let hashTab = tabFromHash.get(hashes[0]);
if (hashTab === undefined) {
  hashTab = 1;
}
let hashOffense: Type[] = [];
let hashDefense: Type[] = [];
let hashSearch = "";
let hashPage = 1;
switch (hashTab) {
  case 0:
    hashOffense = typesFromHash(hashes[1]);
    break;
  case 1:
    hashDefense = typesFromHash(hashes[1]);
    break;
  case 2:
    hashPage = parseInt(hashes[1]);
    if (isNaN(hashPage)) {
      hashSearch = hashes[1] || "";
      hashPage = parseInt(hashes[2]) || 1;
    }
}
let resetCurrentPage = false;
export function App() {
  const [tab, changeTab] = React.useState(hashTab!);
  const [offenseTypes, updateOffenseTypes] = React.useState(hashOffense);
  const [type1, updateType1] = React.useState(hashDefense[0] || Type.NORMAL);
  const [type2, updateType2] = React.useState(hashDefense[1] || Type.NONE);
  const [currentPage, updateCurrentPage] = React.useState(hashPage - 1);
  const [search, updateSearch] = React.useState(hashSearch);

  React.useEffect(() => {
    if (resetCurrentPage) {
      updateCurrentPage(0);
    } else {
      resetCurrentPage = true;
    }
  }, [search]);

  React.useEffect(() => {
      let hash = hashFromTab[tab];
      switch (tab) {
        case 0:
          hash += "/" + offenseTypes.map(x => hashFromType.get(x)).join("+");
          break;

        case 1:
          hash += "/" + hashFromType.get(type1);
          if (type2 !== Type.NONE) {
            hash += "+" + hashFromType.get(type2);
          }
          break;

        case 2:
          if (search !== "") {
            hash += "/" + search;
          }
          if (currentPage > 0) {
            hash += "/" + (currentPage + 1);
          }
      }
      history.replaceState(undefined, "Pokémon Type Calculator", hash);
  }, [tab, offenseTypes, type1, type2, currentPage]);

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
