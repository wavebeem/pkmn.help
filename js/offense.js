const React = require("react")
const TypeSelector = require("./type-selector")
const Matchups = require("./matchups")

const $ = React.createElement

function Offense(props) {
  const classH2 = "tc f3 mt4 mb2"
  return $("main", {className: "ph3 pt1 pb2 mw6 mw9-ns center"},
    $("div", {className: "dib w-50-ns v-top"},
      $("h2", {className: classH2}, "choose type"),
      $(TypeSelector, {
        value: props.type0,
        onChange: props.updateType0,
        includeNone: false
      })
    ),
    $("div", {className: "dib w-50-ns v-top pl3-ns mt4-ns"},
      $("hr", {className: "dn-ns subtle-hr mv4"}),
      $(Matchups.Offense, {type: props.type0})
    )
  )
}

module.exports = Offense
