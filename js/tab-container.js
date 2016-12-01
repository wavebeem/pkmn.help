const React = require("react")
const classes = require("./classes")

const $ = React.createElement

function makeTab(props, index, title) {
  const cur = props.current
  const className = classes([
    "pv3 ph4",
    "f3",
    "dib",
    "no-outline tab-bottom-focus",
    "b ttu",
    "bn",
    "bg-transparent",
    "pointer",
    index === cur
      ? "black bottom-border-thick-current"
      : "black-50 bottom-border-thick"
  ])
  const onClick = () => {
    props.changeTab(index)
  }
  return $("button", {key: index, className, onClick}, title)
}

function makeTabBar(props) {
  const className = classes([
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