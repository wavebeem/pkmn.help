"use strict"

var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

function badge(type) {
  var className = classes(
    "badge",
    "dib pa2",
    "type-" + type,
    "w-33 w-25-ns",
    // "min-width--7em",
    "ttu tc b f6"
  )
  return $("div", {key: type, className}, type)
}

function section(title, info) {
  if (!info) {
    return null
  }
  return $("div", {},
    $("h3", {className: "f4 mt3 mb2 dark-gray"}, title),
    info.map(badge)
  )
}

function Matchups(props) {
  var matchups = Data.matchups(props.type1, props.type2)
  return $("div", {className: "tc"},
    section("takes 4×", matchups.takesQuadrupleFrom),
    section("takes 2×", matchups.takesDoubleFrom),
    section("takes 1×", matchups.takesNormalFrom),
    section("takes ½×", matchups.takesHalfFrom),
    section("takes ¼×", matchups.takesQuarterFrom),
    section("takes 0×", matchups.takesZeroFrom)
  )
}

module.exports = Matchups
