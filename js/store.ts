import * as Redux from "redux";

import {Type} from "./data";
import {Pokemon, AllPokemon} from "./pkmn";

interface State {
  tab: number,
  type0: Type,
  type1: Type,
  type2: Type,
  search: string,
  pkmn: Pokemon[],
  currentPage: number,
}

const initialState: State = {
  tab: 1,
  type0: Type.NORMAL,
  type1: Type.NORMAL,
  type2: Type.NONE,
  search: "",
  pkmn: AllPokemon,
  currentPage: 0,
}

interface Action extends Redux.Action {
  value: any,
}

interface Reducer {
  (state: State, action: Action): any
}

interface DispatchTable {
  [type: string]: Reducer
}

const table: DispatchTable = {
  ChangeTab(_state, {value}: Action) {
    return {tab: value};
  },
  UpdateType0(_state, {value}: Action) {
    return {type0: value};
  },
  UpdateType1(_state, {value}: Action) {
    return {type1: value};
  },
  UpdateType2(_state, {value}: Action) {
    return {type2: value};
  },
  UpdateCurrentPage(_state, {value}: Action) {
    return {currentPage: value};
  },
  UpdateSearch(_state, {value}: Action) {
    const currentPage = 0;
    const search = value;
    const pkmn = filterPKMN(search);
    return {search, pkmn, currentPage};
  },
}

function filterPKMN(search: string) {
  if (search === "") {
    return AllPokemon;
  }
  const s = search.toLowerCase();
  return AllPokemon.filter(p => p.name.toLowerCase().indexOf(s) >= 0);
}

function normalize(state: State) {
  const {type1, type2} = state;
  if (type1 === type2) {
    return {...state, type1, type2: Type.NONE};
  } else {
    return state;
  }
}

function reducer(state: State, action: Action) {
  if (table.hasOwnProperty(action.type)) {
    const handler = table[action.type];
    const delta = handler(state, action);
    return normalize({...state, ...delta});
  } else {
    return state;
  }
}

// Redux DevTools for Chrome
const dte = (window as any).devToolsExtension;
const store = Redux.createStore(reducer, initialState, dte && dte());

export default store;
