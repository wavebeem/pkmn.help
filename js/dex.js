const React = require("react")
const classes = require("./classes")

const $ = React.createElement

function makeType(t, i) {
  const className = classes(
    `type-${t}`,
    "ttu tc db ph1 pv2 f5-ns f6 br2 ba badge with-border-color b",
    {mt1: i > 0}
  )
  const style = {
    minWidth: "7em"
  }
  return $("span", {key: t, className, style}, t)
}

function makePKMN(p) {
  const className = classes(
    "bt b--black-10",
    "ph2 pv3",
    "flex items-center"
  )
  const height = "5rem"
  const style = {
    lineHeight: height,
    minHeight: height,
  }
  return $("div", {key: p.number, className},
    $("div", {className: "flex-auto f4 f2-ns mv0"},
      $("h3", {className: "truncate mt0 mb1"}, p.name),
      $("p", {className: "silver mv0"}, `#${p.number}`)
    ),
    $("div", {}, p.types.map(makeType))
  )
}

// TODO: Debounce the input event
// TODO: Improve performance
// TODO: Switch to image for "back to top" link

function Dex(props) {
  const {pkmn, search, updateSearch} = props
  const className = classes(
    "ph2 mt3",
    "center mw7"
  )
  const searchInput =
    $("input", {
      type: "search",
      autocomplete: "off",
      autocorrect: "off",
      inputmode: "verbatim",
      autocapitalize: "none",
      className: classes(
        "f2 w-100 border-box",
        "pv2 ph4",
        "mv4",
        "chunky-focus",
        "br-pill ba b--black-20"
      ),
      placeholder: "TEST ME",
      value: search,
      onChange: event =>
        updateSearch(event.target.value),
    })  
  return $("div", {className},
    $("a", {href: "#", className: "GoToTop"}, "⬆"),
    $("div", {className: "mh2"}, searchInput),
    pkmn.map(makePKMN)
  )
}

module.exports = Dex
