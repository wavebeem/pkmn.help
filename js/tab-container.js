var React = require("react")
var classes = require("./classes")

var $ = React.createElement

function makeTab(props, index, title) {
  var cur = props.current
  var className = classes([
    "pv3 ph4",
    "f5",
    "dib",
    "no-outline tab-bottom-focus",
    "b ttu",
    "ba b--transparent",
    "bg-transparent",
    "pointer",
    index === cur
      ? "black tab-bottom-shadow"
      : "black-40"
  ])
  var onClick = () => {
    props.changeTab(index)
  }
  return $("button", {key: index, className, onClick}, title)
}

function makeTabBar(props) {
  var className = classes([
    "tc w-100",
    "tab-bar-bottom-shadow",
    "mt5"
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