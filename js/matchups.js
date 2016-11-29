"use strict"

var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

function badge(type) {
  var style = {minWidth: "7.5em"}
  var className = classes(
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
  if (!info) {
    return null
  }
  return $("div", {},
    $("h3", {className: "f4 mt3 mb0 dark-gray"}, title),
    $("div", {className: "mw6 center"}, info.map(badge))
  )
}

function Defense(props) {
  var matchups = Data.defensiveMatchups(props.type1, props.type2)
  return $("div", {className: "tc"},
    section("takes 4×", matchups.quadruple),
    section("takes 2×", matchups.double),
    section("takes 1×", matchups.normal),
    section("takes ½×", matchups.half),
    section("takes ¼×", matchups.quarter),
    section("takes 0×", matchups.zero)
  )
}

function Offense(props) {
  var matchups = Data.offensiveMatchups(props.type)
  return $("div", {className: "tc"},
    section("deals 4×", matchups.quadruple),
    section("deals 2×", matchups.double),
    section("deals 1×", matchups.normal),
    section("deals ½×", matchups.half),
    section("deals ¼×", matchups.quarter),
    section("deals 0×", matchups.zero)
  )
}

exports.Defense = Defense
exports.Offense = Offense
