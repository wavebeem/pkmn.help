var React = require("react")
var TypeSelector = require("./type-selector")
var OffensiveMatchups = require("./offensive-matchups")

var $ = React.createElement

function Offense(props) {
  var classH2 = "tc f3 mt4"
  return $("main", {className: "ph3 pt1 pb2 mw6 mw9-ns center"},
    $("div", {className: "dib w-50-ns v-top"},
      $("h2", {className: classH2}, "choose type"),
      $(TypeSelector, {
        value: props.type0,
        onChange: props.updateType0,
        includeNone: false
      })
    ),
    $("div", {className: "dib w-50-ns v-top pl3-ns"},
      $("hr", {className: "dn-ns subtle-hr mv4"}),
      $("h2", {className: classH2}, "matchups"),
      $(OffensiveMatchups, {type: props.type0})
    )
  )
}

module.exports = Offense
