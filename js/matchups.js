const React = require("react")
const classnames = require("classnames")
const Data = require("./data")

const {Effectiveness} = Data

const $ = React.createElement

function badge(type) {
  const style = {minWidth: "7.5em"}
  const className = classnames(
    "type-" + type,
    "ba b--black-10",
    "badge",
    "with-border-color",
    "dib pv2 ph3",
    "br1",
    "ma--2px",
    "ttu tc b f5 f4-l"
  )
  return $("div", {key: type, className, style}, type)
}

function section(title, info) {
  if (!info || info.length === 0) {
    return null
  }
  return $("div", {},
    $("h3", {className: "f4 mt3 mb0 dark-gray"}, title),
    $("div", {className: "mw6 center"}, info.map(badge))
  )
}

function renderMatchups(matchups) {
  return $("div", {className: "tc"},
    section("takes 4×", matchups.typesFor(Effectiveness.QUADRUPLE)),
    section("takes 2×", matchups.typesFor(Effectiveness.DOUBLE)),
    section("takes 1×", matchups.typesFor(Effectiveness.REGULAR)),
    section("takes ½×", matchups.typesFor(Effectiveness.HALF)),
    section("takes ¼×", matchups.typesFor(Effectiveness.QUARTER)),
    section("takes 0×", matchups.typesFor(Effectiveness.ZERO))
  )
}

function Defense(props) {
  const matchups = Data.defensiveMatchups(props.type1, props.type2)
  return renderMatchups(matchups)
}

function Offense(props) {
  const matchups = Data.offensiveMatchups(props.type)
  return renderMatchups(matchups)
}

exports.Defense = Defense
exports.Offense = Offense
