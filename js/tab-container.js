var React = require("react")
var classes = require("./classes")

var $ = React.createElement

function makeTab(props, index, title) {
  var cur = props.current
  var className = classes([
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
  var onClick = () => {
    props.changeTab(index)
  }
  return $("button", {key: index, className, onClick}, title)
}

function makeTabBar(props) {
  var className = classes([
    "tc w-100",
    "bg-white",
    "tab-bar-bottom-shadow",
    "pt4"
  ])
  return $("div", {className},
    props.titles.map((title, i) => makeTab(props, i, title))
  )
} 

function TabContainer(props) {
  return $("div", {},
    makeTabBar(props),
    props.items[props.current]
  )
}

module.exports = TabContainer