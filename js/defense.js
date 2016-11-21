var React = require("react")
var TypeSelector = require("./type-selector")
var Matchups = require("./matchups")

var $ = React.createElement

function Defense(props) {
  var classH2 = "tc f3 mt4"
  return $("main", {className: "ph3 pt1 pb2 mw6 mw9-ns center"},
    $("div", {className: "dib w-50-ns v-top"},
      $("h2", {className: classH2}, "choose primary type"),
      $(TypeSelector, {
        title: "choose primary type",
        value: props.type1,
        onChange: props.updateType1,
        includeNone: false
      }),
      $("h2", {className: classH2 + " mt4"}, "choose secondary type"),
      $(TypeSelector, {
        title: "choose secondary type",
        value: props.type2,
        onChange: props.updateType2,
        includeNone: true
      })
    ),
    $("div", {className: "dib w-50-ns v-top pl3-ns"},
      $("hr", {className: "dn-ns subtle-hr mv4"}),
      $("h2", {className: classH2}, "matchups"),
      $(Matchups, {
        type1: props.type1,
        type2: props.type2
      })
    )
  )
}

module.exports = Defense
