const React = require("react")
const ReactRedux = require("react-redux")
const Offense = require("./offense")
const Defense = require("./defense")
const TabContainer = require("./tab-container")
const Dex = require("./dex")

const $ = React.createElement

function App(props) {
  return $(TabContainer, {
    changeTab: props.changeTab,
    current: props.tab,
    items: [
      {title: "Offense", element: Offense(props)},
      {title: "Defense", element: Defense(props)},
      {title: "Pokédex", element: Dex(props)},
    ],
  })
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab(tab) {
      dispatch({
        type: "ChangeTab",
        value: tab
      })
    },
    updateType0(type) {
      dispatch({
        type: "UpdateType0",
        value: type
      })
    },
    updateType1(type) {
      dispatch({
        type: "UpdateType1",
        value: type
      })
    },
    updateType2(type) {
      dispatch({
        type: "UpdateType2",
        value: type
      })
    },
    updateSearch(search) {
      dispatch({
        type: "UpdateSearch",
        value: search
      })
    }
  }
}

function mapStateToProps(state) {
  return state
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)
