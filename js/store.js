const Redux = require("redux")
const PKMN = require("./pkmn.json")

const initialState = {
  tab: 1,
  type0: "normal",
  type1: "normal",
  type2: "none",
  search: "",
  pkmn: PKMN,
  currentPage: 0,
}

const table = {
  ChangeTab(state, action) {
    return {tab: action.value}
  },
  UpdateType0(state, action) {
    return {type0: action.value}
  },
  UpdateType1(state, action) {
    return {type1: action.value}
  },
  UpdateType2(state, action) {
    return {type2: action.value}
  },
  UpdateSearch(state, action) {
    const currentPage = 0
    const search = action.value
    const pkmn = filterPKMN(search)
    return {search, pkmn, currentPage}
  },
  UpdateCurrentPage(state, action) {
    return {currentPage: action.value}
  }
}

function filterPKMN(search) {
  if (search === "") {
    return PKMN
  }
  const s = search.toLowerCase()
  return PKMN.filter(p => p.name.toLowerCase().indexOf(s) >= 0)
}

function update(a, b) {
  return Object.assign({}, a, b)
}

function normalize(state) {
  const {type1, type2} = state
  if (type1 === type2) {
    return update(state, {type1, type2: "none"})
  } else {
    return state
  }
}

function reducer(state, action) {
  if (table.hasOwnProperty(action.type)) {
    const handler = table[action.type]
    const delta = handler(state, action)
    return normalize(Object.assign({}, state, delta))
  } else {
    return state
  }
}

const store =
  Redux.createStore(
    reducer,
    initialState,
    // Redux DevTools for Chrome
    window.devToolsExtension && window.devToolsExtension()
  )

module.exports = store
