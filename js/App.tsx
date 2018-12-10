import * as React from "react";

import Offense from "./Offense";
import Defense from "./Defense";
import Dex from "./Dex";
import { TabContainer, TabItem } from "./Tab";
import { Type } from "./data";
import { Pokemon, AllPokemon } from "./pkmn";

export interface State {
  tab: number;
  type0: Type;
  type1: Type;
  type2: Type;
  search: string;
  pkmn: Pokemon[];
  currentPage: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    tab: 1,
    type0: Type.NORMAL,
    type1: Type.NORMAL,
    type2: Type.NONE,
    search: "",
    pkmn: AllPokemon,
    currentPage: 0
  };

  changeTab = (tab: number) => {
    this.setState({ tab });
  };

  updateType0 = (type0: Type) => {
    this.setState({ type0 });
  };

  updateType1 = (type1: Type) => {
    this.updateTypes(type1, this.state.type2);
  };

  updateType2 = (type2: Type) => {
    this.updateTypes(this.state.type1, type2);
  };

  updateTypes = (type1: Type, type2: Type) => {
    this.setState({ type1, type2: type1 === type2 ? Type.NONE : type2 });
  };

  updateSearch = (search: string) => {
    this.setState({ search, pkmn: this.filterPKMN(search), currentPage: 0 });
  };

  updateCurrentPage = (currentPage: number) => {
    this.setState({ currentPage });
  };

  filterPKMN(search: string) {
    if (search === "") {
      return AllPokemon;
    }
    const s = search.toLowerCase();
    return AllPokemon.filter(p => p.name.toLowerCase().indexOf(s) >= 0);
  }

  render() {
    const props = {
      ...this.state,
      changeTab: this.changeTab,
      updateType0: this.updateType0,
      updateType1: this.updateType1,
      updateType2: this.updateType2,
      updateSearch: this.updateSearch,
      updateCurrentPage: this.updateCurrentPage
    };
    return (
      <div className="sans-serif bg-near-white mid-gray min-vh-100 flex flex-column">
        <div className="flex-auto">
          <h1 className="f2 tc relative white bg-dark-red pokeball-header">
            <a href="#" className="link white dim">
              Pokémon Type Calculator
            </a>
          </h1>
          <TabContainer changeTab={this.changeTab} current={this.state.tab}>
            <TabItem name="offense" title="Offense">
              <Offense {...props} />
            </TabItem>
            <TabItem name="defense" title="Defense">
              <Defense {...props} />
            </TabItem>
            <TabItem name="pokedex" title="Pokédex">
              <Dex {...props} />
            </TabItem>
          </TabContainer>
        </div>
        <div className="black dark-red bt b--black-05 mt4 ph3 pb2 f4">
          <div className="mt4" />
          <div className="mw8 center">
            <p>
              Sorry about the recent downtime on December 4th, 2018. I migrated
              web hosts and had some issues getting a new certificate. Thank you
              for your patience.
            </p>
          </div>
        </div>
        <footer className="black dark-gray bt b--black-05 ph3 pb2 f4">
          <div className="mw8 center">
            {/* <div className="mt4" /> */}
            <p>
              Pokémon © 2002-2013 Pokémon. © 1995-2013 Nintendo/Creatures
              Inc./GAME FREAK inc. TM, ® and Pokémon character names are
              trademarks of Nintendo.
            </p>
            <p>
              No copyright or trademark infringement is intended in using
              Pokémon content on this page.
            </p>
            <p>
              Code for this page © 2013-{new Date().getFullYear()}{" "}
              <a
                href="https://mockbrian.com"
                className="bb link hover-gray black bb"
              >
                Brian Mock
              </a>.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
