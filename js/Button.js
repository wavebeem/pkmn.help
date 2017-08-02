const React = require("react")
const classnames = require("classnames")

const $ = React.createElement

function buttonClass(disabled) {
  return classnames(
    "db w-100",
    "ba br2",
    "pv3 ph4",
    "b f4",
    "ttu",
    "chunky-focus",
    disabled
      ? "b--black-10 black-20 bg-transparent"
      : "b--black-30 bg-white pointer"
  )
}

function Button(props) {
  const {onClick, disabled, children} = props
  const className = buttonClass(disabled)
  return $("button", {onClick, disabled, className}, children)
}

module.exports = Button
