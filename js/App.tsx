import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";

import Offense from "./Offense";
import Defense from "./defense";
import * as Dex from "./dex";
import {TabContainer, TabItem} from "./Tab";
import {State} from "./store";
import {Type} from "./data";

interface AppPropMethods {
  changeTab(index: number): void,
  updateType0(type: Type): void,
  updateType1(type: Type): void,
  updateType2(type: Type): void,
  updateSearch(search: string): void,
  updateCurrentPage(index: number): void,
}

type AppProps = State & AppPropMethods;

function App(props: AppProps) {
  const {changeTab, tab} = props;
  return (
    <TabContainer changeTab={changeTab} current={tab}>
      <TabItem title="Offense"><Offense {...props} /></TabItem>
      <TabItem title="Defense"><Defense {...props} /></TabItem>
      <TabItem title="Pokédex"><Dex {...props} /></TabItem>
    </TabContainer>
  );
}

function mapDispatchToProps(dispatch: Redux.Dispatch<State>): AppPropMethods {
  return {
    changeTab(tab: number) {
      dispatch({
        type: "ChangeTab",
        value: tab,
      })
    },
    updateType0(type: Type) {
      dispatch({
        type: "UpdateType0",
        value: type,
      })
    },
    updateType1(type: Type) {
      dispatch({
        type: "UpdateType1",
        value: type,
      })
    },
    updateType2(type: Type) {
      dispatch({
        type: "UpdateType2",
        value: type,
      })
    },
    updateSearch(search: string) {
      dispatch({
        type: "UpdateSearch",
        value: search,
      })
    },
    updateCurrentPage(page: number) {
      dispatch({
        type: "UpdateCurrentPage",
        value: page,
      })
    },
  }
}

function mapStateToProps(state: State) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
