const React = require("react")
const classes = require("./classes")

const $ = React.createElement

function makeTab(props, index, title) {
  const cur = props.current
  const className = classes([
    "pv3 ph3 f5 ",
    "pv3-ns ph4-ns f3-ns",
    "dib",
    "no-outline tab-bottom-focus",
    "b ttu",
    "bn",
    "bg-transparent",
    "pointer",
    {
      "black bottom-border-thick-current": index === cur,
      "black-50 bottom-border-thick": index !== cur,
    }
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
