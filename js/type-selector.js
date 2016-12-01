const React = require("react")
const Data = require("./data")
const classes = require("./classes")

const $ = React.createElement

const labelClasses = [
  "db",
  "f5 f4-l",
  "min-width--7em",
  "pv2 ph2 ma2",
  "br-pill"
]

function label(selected, type) {
  const className = classes(
    {"white bg-black-50 text-shadow-black": selected},
    labelClasses
  )
  return $("span", {className}, type)
}

const buttonClasses = [
  "chunky-focus",
  "ba bw--2px with-border-color",
  "w-100",
  "dib",
  "ttu b pointer",
  "pa0",
  "br-pill"
]

const classSizing = "dib w-25-l w-50 pa1"

function TypeSelector(props) {
  const types = props.includeNone ? Data.typesOrNone : Data.types
  const onChange = props.onChange
  const value = props.value

  const makeLabel = type =>
    label(type === value, type)

  const makeButton = type =>
    $("button", {
      className: classes(
        {"no-box-shadow": type === value},
        "type-" + type,
        buttonClasses
      ),
      onClick: () => onChange(type)
    }, makeLabel(type))

  const makeWrapper = type =>
    $("div", {className: classSizing, key: type}, makeButton(type))

  return $("div", {}, types.map(makeWrapper))
}

module.exports = TypeSelector
