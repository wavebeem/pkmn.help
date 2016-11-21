var React = require("react")
var classes = require("./classes")

var $ = React.createElement

function makeTab(props, index, title) {
  var cur = props.current
  var className = classes([
    "pv3 ph4",
    "f6",
    "ba br2 br--top",
    "link",
    "focus-inner-ring",
    "b ttl",
    "bg-transparent",
    "b--black-10",
    "pointer",
    index === cur
      ? "black border-bottom--transparent"
      : "black-40 border-not-bottom--transparent"
  ])
  var onClick = () => {
    props.changeTab(index)
  }
  return $("button", {key: index, className, onClick}, title)
}

function makeLine() {
  return $("div", {className: "flex-auto w-100 bb b--black-10"})
}

function makeTabBar(props) {
  return $("div", {className: "flex mt5"},
    makeLine(),
    props.titles.map((title, i) => makeTab(props, i, title)),
    makeLine()
  )
} 

function TabContainer(props) {
  return $("div", {},
    makeTabBar(props),
    props.items[props.current]
  )
}

module.exports = TabContainer