const React = require("react")
const ReactRedux = require("react-redux")
const Offense = require("./Offense").default
const Defense = require("./defense")
const {TabContainer, TabItem} = require("./Tab")
const Dex = require("./dex")

const $ = React.createElement

function App(props) {
  return $(TabContainer, {changeTab: props.changeTab, current: props.tab},
    $(TabItem, {title: "Offense"}, $(Offense, props)),
    $(TabItem, {title: "Defense"}, $(Defense, props)),
    $(TabItem, {title: "Pokédex"}, $(Dex, props))
  )
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
    },
    updateCurrentPage(page) {
      dispatch({
        type: "UpdateCurrentPage",
        value: page
      })
    },
  }
}

function mapStateToProps(state) {
  return state
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)
