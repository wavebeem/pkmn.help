var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

var roundingInner = "br2"
var roundingOuter = "br3"

// var roundingInner = "br-pill"
// var roundingOuter = "br-pill"

var labelClasses = [
  "type-label",
  "f5",
  "min-width--7em",
  "pv2 ph2 ma2",
  roundingInner
]

function label(selected, type) {
  var className = classes(
    selected && "black sunken bg-white-90",
    labelClasses
  )
  return $("span", {className}, type)
}

var buttonClasses = [
  "bw2",
  "chunky-focus",
  "bn",
  "bn",
  "w-100",
  "dib",
  "ttu b pointer",
  "pa0",
  roundingOuter
]

var classSizing = "dib w-33-ns w-50 pa1"

function ClassicTypeSelector(props) {
  var types = props.includeNone ? Data.typesOrNone : Data.types
  var onChange = props.onChange
  var value = props.value

  var makeLabel = type =>
    label(type === value, type)

  var makeButton = type =>
    $("button", {
      className: classes(
        type === value
          ? "weird-shadow"
          : "bottom-edge",
        "type-" + type,
        buttonClasses
      ),
      onClick: () => onChange(type)
    }, makeLabel(type))

  var makeWrapper = type =>
    $("div", {className: classSizing, key: type}, makeButton(type))

  return $("div", {}, types.map(makeWrapper))
}

module.exports = ClassicTypeSelector
