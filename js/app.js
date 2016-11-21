var React = require("react")
var ReactRedux = require("react-redux")
var Offense = require("./offense")
var Defense = require("./defense")
var TabContainer = require("./tab-container")

var $ = React.createElement

function App(props) {
  return $(TabContainer, {
    changeTab: props.changeTab,
    current: props.tab,
    titles: ["Offense", "Defense"],
    items: [Offense(props), Defense(props)]
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
    }
  }
}

function mapStateToProps(state) {
  return {
    tab: state.tab,
    type0: state.type0,
    type1: state.type1,
    type2: state.type2
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)
