const React = require("react")
const classnames = require("classnames")
const _ = require("lodash")
const ScrollHelper = require("./ScrollHelper").default
const Paginator = require("./Paginator").default
const Search = require("./Search").default

const $ = React.createElement

function makeType(t, i) {
  const className = classnames(
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
  const className = classnames(
    "b--black-10",
    "ph2 pv3",
    "flex items-center",
    {bt: i > 0},
    {mt2: i === 0}
  )
  const displayNumber = "#" + _.padStart(p.number, 3, "0")
  const style = {minHeight: "100px"}
  return $("div", {key: `pkmn-${p.number}`, className, style},
    $("div", {className: "flex-auto f4 f3-m f2-l mv0"},
      $("h2", {className: "truncate mt0 mb1"}, p.name),
      $("p", {className: "gray mv0"}, displayNumber)
    ),
    $("div", {}, p.types.map(makeType))
  )
}

function Dex(props) {
  const {
    pkmn,
    search,
    updateSearch,
    updateCurrentPage,
    currentPage
  } = props
  const className = classnames(
    "ph2 mt3",
    "center mw7"
  )
  const searchInput = $(Search, {search, updateSearch})
  const mons = $(Paginator, {
    currentPage,
    updatePageNext: () => updateCurrentPage(currentPage + 1),
    updatePagePrev: () => updateCurrentPage(currentPage - 1),
    pageSize: 50,
    emptyState: $("p", {className: "silver f1 b tc m0"}, "no pokémon found"),
    items: pkmn,
    render: makePKMN
  })
  return $("div", {className},
    $(ScrollHelper),
    $("div", {className: "ph1"}, searchInput),
    mons
  )
}

module.exports = Dex
