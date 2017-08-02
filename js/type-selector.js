const React = require("react")
const classnames = require("classnames")
const Data = require("./data")

const $ = React.createElement

const labelClasses = [
  "tl",
  "pl2 pr1",
  "flex-auto",
  "truncate"
]

const BUTTON_INNER_HEIGHT = "20px"

function makeCircle(type, isFocused) {
  const size = BUTTON_INNER_HEIGHT
  const className = classnames(
    `type-${type} b--black br-pill ba`,
    isFocused
      ? "b--black-70"
      : "with-border-color"
  )
  const style = {
    flexShrink: 0,
    width: size,
    height: size,
  }
  return $("span", {className, style})
}

function makeLabel(type) {
  const className = classnames(labelClasses)
  const style = {
    lineHeight: BUTTON_INNER_HEIGHT
  }
  return $("span", {className, style}, type)
}

const buttonClasses = [
  "db w-100",
  "ba br-pill",
  "pa2",
  "b f6 f5-l",
  "ttu",
  "chunky-focus",
]

const classSizing = "dib w-25-l w-50 pa1"

function TypeSelector(props) {
  const {disabledTypes=[], onChange, value, includeNone} = props
  const types = includeNone ? Data.typesOrNone : Data.types
  const styles = {
    disabled: "b--black-10 bg-near-white o-60",
    selected: "pointer b--black-20 bg-gray white text-shadow-black no-box-shadow",
    normal: "pointer b--black-30 bg-white black",
  }
  const makeButton = (isDisabled, value, type) => {
    const style =
      isDisabled ? styles.disabled :
      type === value ? styles.selected :
      styles.normal
    return $("button",
      {
        disabled: isDisabled,
        className: classnames(style, buttonClasses),
        onClick: () => onChange(type)
      },
      $("span", {className: "flex flex-row items-center justify-center"},
        makeCircle(type, type === value),
        makeLabel(type)
      )
    )
  }
  const makeWrapper = type => {
    const isDisabled = disabledTypes.indexOf(type) >= 0
    return $("div", {className: classSizing, key: type},
      makeButton(isDisabled, value, type)
    )
  }
  return $("div", {}, types.map(makeWrapper))
}

module.exports = TypeSelector
