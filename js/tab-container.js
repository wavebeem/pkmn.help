const React = require("react")
const classnames = require("classnames")

const $ = React.createElement

function makeTab(props, index, title) {
  const cur = props.current
  const className = classnames([
    "pv3 ph3 f5 w-third",
    "pv3-ns ph4-ns f3-ns",
    "dib",
    "no-outline tab-bottom-focus",
    "ttu",
    "bn",
    "bg-transparent",
    "pointer",
    index === cur
      ? "black bottom-border-thick-current b"
      : "black-50 bottom-border-thick"
  ])
  const style = {
    maxWidth: "150px"
  }
  const onClick = () => {
    props.changeTab(index)
  }
  return $("button", {key: index, className, onClick, style}, title)
}

function makeTabBar(props) {
  const className = classnames([
    "tc w-100",
    "bg-white",
    "tab-bar-bottom-shadow",
    "pt4"
  ])
  return $("div", {className},
    props.items.map((item, i) => makeTab(props, i, item.title))
  )
}

function TabContainer(props) {
  return $("div", {},
    makeTabBar(props),
    props.items[props.current].element
  )
}

module.exports = TabContainer
