var React = require("react")
var ReactRedux = require("react-redux")
var TypeSelector = require("./type-selector")
var Matchups = require("./matchups")

var $ = React.createElement

function App(props) {
  var classH2 = "tc f3"
  var selector = TypeSelector
  return $("main", {className: "ph3 pt1 pb2 mw6 margin-horiz-auto"},
    $("h2", {className: classH2}, "choose primary type"),
    $(selector, {
      title: "choose primary type",
      value: props.type1,
      onChange: props.updateType1,
      includeNone: false
    }),
    $("h2", {className: classH2}, "choose secondary type"),
    $(selector, {
      title: "choose secondary type",
      value: props.type2,
      onChange: props.updateType2,
      includeNone: true
    }),
    $("hr", {className: "dn-ns subtle-hr mv4"}),
    $("h2", {className: classH2}, "matchups"),
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
