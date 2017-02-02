const React = require("react")
const Data = require("./data")
const classes = require("./classes")

const $ = React.createElement

const labelClasses = [
  "db tl",
  "min-width--7em",
  "ph3",
  "flex-auto",
  "truncate",
  "br2"
]

function makeCircle(type) {
  const size = 20
  const className = `type-${type} with-border-color br-pill ba`
  const style = {
    boxShadow: "0 0 0 1px white",
    flexShrink: 0,
    width: size,
    height: size,
  }
  return $("span", {className, style})
}

function makeLabel(type) {
  const className = classes(labelClasses)
  return $("span", {className}, type)
}

const buttonClasses = [
  "db w-100",
  "ba br-pill",
  "pa2",
  "b f6 f5-l",
  "ttu",
  "flex flex-row items-center justify-center",
  "chunky-focus",
  "pointer"
]

const classSizing = "dib w-25-l w-50 pa1"

function TypeSelector(props) {
  const types = props.includeNone ? Data.typesOrNone : Data.types
  const onChange = props.onChange
  const value = props.value

  const makeButton = (value, type) =>
    $("button",
      {
        className: classes(
          buttonClasses,
          type === value
            ? "b--black-20 bg-gray white text-shadow-black no-box-shadow"
            : "b--black-30 bg-white black"
        ),
        onClick: () => onChange(type)
      },
      makeCircle(type),
      makeLabel(type)
    )

  const makeWrapper = type =>
    $("div", {className: classSizing, key: type}, makeButton(value, type))

  return $("div", {}, types.map(makeWrapper))
}

module.exports = TypeSelector
