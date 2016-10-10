"use strict"

var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

function badge(type) {
  var className = classes(
    "badge",
    "type-" + type,
    "ttu tc b ba br1",
    "border--shaded"
  )
  return $("div", {key: type, className}, type)
}

function section(title, info) {
  if (!info) {
    return null
  }
  return $("div", {className: "tc"},
    $("h3", {}, title),
    info.map(badge),
    $("hr")
  )
}

function Matchups(props) {
  var matchups = Data.matchups(props.type1, props.type2)
  return $("div", {},
    section("takes 4×", matchups.takesQuadrupleFrom),
    section("takes 2×", matchups.takesDoubleFrom),
    section("takes 1×", matchups.takesNormalFrom),
    section("takes ½×", matchups.takesHalfFrom),
    section("takes ¼×", matchups.takesQuarterFrom),
    section("takes 0×", matchups.takesZeroFrom)
  )
}

module.exports = Matchups
