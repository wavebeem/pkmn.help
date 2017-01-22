const React = require("react")
const _ = require("lodash")
const Paginator = require("./paginator")
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

function makePKMN(p, i) {
  const className = classes(
    "b--black-10",
    "ph2 pv3",
    "flex items-center",
    {bt: i > 0},
    {mt2: i === 0},
  )
  const displayNumber = "#" + _.padStart(p.number, 3, "0")
  const style = {minHeight: "100px"}
  return $("div", {key: `pkmn-${p.number}`, className, style},
    $("div", {className: "flex-auto f4 f2-ns mv0"},
      $("h3", {className: "truncate mt0 mb1"}, p.name),
      $("p", {className: "silver mv0"}, displayNumber)
    ),
    $("div", {}, p.types.map(makeType))
  )
}

// TODO: Improve performance, somehow?
// TODO: Switch to image for "back to top" link

function Dex(props) {
  const {
    pkmn,
    search,
    updateSearch,
    updateCurrentPage,
    currentPage
  } = props
  const className = classes(
    "ph2 mt3",
    "center mw7"
  )
  const searchInput =
    $("input", {
      type: "search",
      autoComplete: "off",
      autoCorrect: "off",
      inputMode: "verbatim",
      autoCapitalize: "none",
      className: classes(
        "f2 f1-l w-100 border-box",
        "pv2 ph4",
        "mv4",
        "chunky-focus",
        "inset-shadow",
        "br-pill ba",
        // "b--black-40 bg-mid-gray white"
        "b--black-30"
      ),
      placeholder: "search",
      value: search,
      onChange: event =>
        updateSearch(event.target.value),
    })  
  const mons = $(Paginator, {
    currentPage,
    updatePageNext: () => updateCurrentPage(currentPage + 1),
    updatePagePrev: () => updateCurrentPage(currentPage - 1),
    pageSize: 100,
    // pageSize: 10,
    emptyState: $("p", {className: "silver f1 b tc m0"}, "no pokémon found"),
    items: pkmn,
    render: makePKMN
  })
  return $("div", {className},
    $("a", {href: "#", className: "GoToTop"}, "⬆"),
    $("div", {className: "ph1"}, searchInput),
    mons
  )
}

module.exports = Dex
