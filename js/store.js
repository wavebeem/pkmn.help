var Redux = require("redux")

var initialState = {
  type1: "fire",
  type2: "flying"
}

var table = {
  UpdateType1(state, action) {
    return {type1: action.value}
  },
  UpdateType2(state, action) {
    return {type2: action.value}
  }
}

function normalize(state) {
  var type1 = state.type1
  var type2 = state.type2
  if (type1 === type2) {
    return Object.assign({}, {type1, type2: "none"})
  } else {
    return state
  }
}

function reducer(state, action) {
  if (table.hasOwnProperty(action.type)) {
    var handler = table[action.type]
    var delta = handler(state, action)
    return normalize(Object.assign({}, state, delta))
  } else {
    return state
  }
}

var store =
  Redux.createStore(
    reducer,
    initialState,
    // Redux DevTools for Chrome
    window.devToolsExtension && window.devToolsExtension()
  )

module.exports = store
