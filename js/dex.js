const React = require("react")
const PKMN = require("./pkmn.json")
// const PKMN = require("./pkmn.json").slice(0, 20)
const classes = require("./classes")

const $ = React.createElement

function makeType(t, i) {
  const className = classes(
    `type-${t}`,
    "ttu tc db pa2 f5-ns f6 br2 ba badge with-border-color b",
    {mt1: i > 0}
  )
  const style = {
    minWidth: "7.5em"
  }
  return $("span", {key: t, className, style}, t)
}

function makePKMN(p) {
  const className = classes(
    "bt b--black-10",
    "ph2 pv3",
    "flex items-center"
  )
  const height = "6rem"
  const style = {
    lineHeight: height,
    minHeight: height,
  }
  return $("div", {key: p.number, className},
    $("h3", {className: "f3 f2-ns mv0 flex-auto truncate", style},
      $("span", {className: "silver"}, `#${p.number}`),
      " ",
      p.name
    ),
    $("div", {}, p.types.map(makeType)),
  )
}

function Dex(props) {
  const className = classes(
    "ph2 mt3",
    "center mw7"
  )
  const searchInput =
    $("input", {
      className: classes(
        "f2 w-100 border-box",
        "pv2 ph4",
        "mv4",
        "chunky-focus",
        "br-pill ba b--black-20"
      ),
      placeholder: "search"
    })  
  return $("div", {className},
    $("div", {className: "mh2"}, searchInput),
    PKMN.map(makePKMN)
  )
}

module.exports = Dex
