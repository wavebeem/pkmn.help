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
    var type1 = state.type1
    var type2 = action.value
    if (type1 === type2) {
      return {type2: "none"}
    } else {
      return {type2}
    }
  }
}

function reducer(state, action) {
  if (table.hasOwnProperty(action.type)) {
    return Object.assign({}, state, table[action.type](state, action))
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
