var React = require("react")
var ReactRedux = require("react-redux")
var TypeSelector = require("./type-selector")
var Matchups = require("./matchups")

var $ = React.createElement

function App(props) {
  return $("main", {},
    $("h2", {}, "primary type"),
    $(TypeSelector, {
      value: props.type1,
      onChange: props.updateType1,
      includeNone: false
    }),
    $("h2", {}, "secondary type"),
    $(TypeSelector, {
      value: props.type2,
      onChange: props.updateType2,
      includeNone: true
    }),
    $("hr"),
    $(Matchups, {
      type1: props.type1,
      type2: props.type2
    })
  )
}

function mapDispatchToProps(dispatch) {
  return {
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
    type1: state.type1,
    type2: state.type2
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)
