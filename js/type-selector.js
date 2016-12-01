var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

var labelClasses = [
  "db",
  "f5 f4-l",
  "min-width--7em",
  "pv2 ph2 ma2",
  "br-pill"
]

function label(selected, type) {
  var className = classes(
    selected && "white bg-black-50 text-shadow-black",
    labelClasses
  )
  return $("span", {className}, type)
}

var buttonClasses = [
  "chunky-focus",
  "ba bw--2px with-border-color",
  "w-100",
  "dib",
  "ttu b pointer",
  "pa0",
  "br-pill"
]

var classSizing = "dib w-25-l w-50 pa1"

function TypeSelector(props) {
  var types = props.includeNone ? Data.typesOrNone : Data.types
  var onChange = props.onChange
  var value = props.value

  var makeLabel = type =>
    label(type === value, type)

  var makeButton = type =>
    $("button", {
      className: classes(
        type === value && "no-box-shadow",
        "type-" + type,
        buttonClasses
      ),
      onClick: () => onChange(type)
    }, makeLabel(type))

  var makeWrapper = type =>
    $("div", {className: classSizing, key: type}, makeButton(type))

  return $("div", {}, types.map(makeWrapper))
}

module.exports = TypeSelector
