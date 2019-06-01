import React from "react";

import Offense from "./Offense";
import Defense from "./Defense";
import Dex from "./Dex";
import { TabContainer, TabItem } from "./Tab";
import { Type } from "./data";
import { AllPokemon } from "./pkmn";
import Footer from "./Footer";

function App() {
  const [tab, changeTab] = React.useState(1);
  const [type0, updateType0] = React.useState(Type.NORMAL);
  const [type1, updateType1] = React.useState(Type.NORMAL);
  const [type2, updateType2] = React.useState(Type.NONE);
  const [search, setSearch] = React.useState("");
  const [currentPage, updateCurrentPage] = React.useState(0);
  const [pkmn, updatePKMN] = React.useState(AllPokemon);
  function updateSearch(str: string) {
    setSearch(str);
    updatePKMN(filterPKMN(str));
    updateCurrentPage(0);
  }
  function filterPKMN(search: string) {
    if (search === "") {
      return AllPokemon;
    }
    const s = search.toLowerCase();
    return AllPokemon.filter(p => p.name.toLowerCase().indexOf(s) >= 0);
  }
  return (
    <div className="sans-serif bg-near-white mid-gray min-vh-100 flex flex-column">
      <div className="flex-auto">
        <h1 className="f2 tc relative white bg-dark-red pokeball-header">
          <a href="#" className="link white dim">
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
            <Dex
              updateCurrentPage={updateCurrentPage}
              updateSearch={updateSearch}
              currentPage={currentPage}
              pkmn={pkmn}
              search={search}
            />
          </TabItem>
        </TabContainer>
      </div>
      <Footer />
    </div>
  );
}

App.displayName = "App";

export default App;
