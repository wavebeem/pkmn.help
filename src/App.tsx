import * as React from "react";

import { Spinner } from "./Spinner";
import { Offense } from "./Offense";
import { Defense } from "./Defense";
import { TabContainer, TabItem } from "./Tab";
import { Type } from "./data";
import { Footer } from "./Footer";

const Dex = React.lazy(async () => {
  const { Dex } = await import(/* webpackChunkName: "Dex" */ "./Dex");
  return { default: Dex };
});

export function App() {
  const [tab, changeTab] = React.useState(1);
  const [type0, updateType0] = React.useState(Type.NORMAL);
  const [type1, updateType1] = React.useState(Type.NORMAL);
  const [type2, updateType2] = React.useState(Type.NONE);
  const [search, updateSearch] = React.useState("");
  const [currentPage, updateCurrentPage] = React.useState(0);

  React.useEffect(() => {
    updateCurrentPage(0);
  }, [search]);

  return (
    <div className="sans-serif bg-near-white mid-gray min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f3-ns f4 tc relative white bg-dark-red PokeballHeader">
          <a href="#" className="no-underline white hover-white-80 DashedFocus">
            Pokémon Type Calculator
          </a>
        </h1>
        <TabContainer changeTab={changeTab} current={tab}>
          <TabItem name="offense" title="Offense">
            <Offense type0={type0} updateType0={updateType0} />
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
              fallback={
                <div className="flex justify-center mt4">
                  <Spinner />
                </div>
              }
            >
              <Dex
                updateCurrentPage={updateCurrentPage}
                updateSearch={updateSearch}
                currentPage={currentPage}
                search={search}
                updateType0={updateType0}
                updateType1={updateType1}
                updateType2={updateType2}
                changeTab={changeTab}
              />
            </React.Suspense>
          </TabItem>
        </TabContainer>
      </div>
      <Footer />
    </div>
  );
}

App.displayName = "App";
