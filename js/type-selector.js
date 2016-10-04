var React = require("react")
var Data = require("./data")

var $ = React.createElement

function menuItems(types) {
  return types.map(t => $("option", {key: t, value: t}, t))
}

function TypeSelector(props) {
  function onChange(event) {
    props.onChange(event.target.value)
  }
  var types = props.includeNone ? Data.typesOrNone : Data.types
  return $("select", {onChange, value: props.value}, menuItems(types))
}

module.exports = TypeSelector
