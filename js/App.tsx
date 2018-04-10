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
    );
  }
}

export default App;
