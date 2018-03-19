import * as Redux from "redux";

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

const initialState: State = {
  tab: 1,
  type0: Type.NORMAL,
  type1: Type.NORMAL,
  type2: Type.NONE,
  search: "",
  pkmn: AllPokemon,
  currentPage: 0
};

export enum ActionTypes {
  CHANGE_TAB = "pkmn/CHANGE_TAB",
  UPDATE_TYPE0 = "pkmn/UPDATE_TYPE0",
  UPDATE_TYPE1 = "pkmn/UPDATE_TYPE1",
  UPDATE_TYPE2 = "pkmn/UPDATE_TYPE2",
  UPDATE_CURRENT_PAGE = "pkmn/UPDATE_CURRENT_PAGE",
  UPDATE_SEARCH = "pkmn/UPDATE_SEARCH"
}

interface ActionChangeTab {
  type: ActionTypes.CHANGE_TAB;
  value: number;
}

interface ActionUpdateType0 {
  type: ActionTypes.UPDATE_TYPE0;
  value: Type;
}

interface ActionUpdateType1 {
  type: ActionTypes.UPDATE_TYPE1;
  value: Type;
}

interface ActionUpdateType2 {
  type: ActionTypes.UPDATE_TYPE2;
  value: Type;
}

interface ActionUpdateCurrentPage {
  type: ActionTypes.UPDATE_CURRENT_PAGE;
  value: number;
}

interface ActionUpdateSearch {
  type: ActionTypes.UPDATE_SEARCH;
  value: string;
}

type Action =
  | ActionChangeTab
  | ActionUpdateType0
  | ActionUpdateType1
  | ActionUpdateType2
  | ActionUpdateCurrentPage
  | ActionUpdateSearch;

function filterPKMN(search: string) {
  if (search === "") {
    return AllPokemon;
  }
  const s = search.toLowerCase();
  return AllPokemon.filter(p => p.name.toLowerCase().indexOf(s) >= 0);
}

function normalize(state: State) {
  const { type1, type2 } = state;
  if (type1 === type2) {
    return { ...state, type1, type2: Type.NONE };
  } else {
    return state;
  }
}

function reducerHelper(action: Action) {
  switch (action.type) {
    case ActionTypes.CHANGE_TAB: {
      return { tab: action.value };
    }
    case ActionTypes.UPDATE_TYPE0: {
      return { type0: action.value };
    }
    case ActionTypes.UPDATE_TYPE1: {
      return { type1: action.value };
    }
    case ActionTypes.UPDATE_TYPE2: {
      return { type2: action.value };
    }
    case ActionTypes.UPDATE_CURRENT_PAGE: {
      return { currentPage: action.value };
    }
    case ActionTypes.UPDATE_SEARCH: {
      const currentPage = 0;
      const search = action.value;
      const pkmn = filterPKMN(search);
      return { search, pkmn, currentPage };
    }
    default: {
      // TypeScript is trying to be helpful here... but this is OK
      const type = (action as Action).type;
      console.warn(`unhandled action type: ${type}`);
      return {};
    }
  }
}

function reducer(state: State, action: Action) {
  const delta = reducerHelper(action);
  return normalize({ ...state, ...delta });
}

// Redux DevTools for Chrome
const dte = (window as any).devToolsExtension;

export default Redux.createStore(reducer, initialState, dte && dte());
