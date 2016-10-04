"use strict"

var React = require("react")
var Data = require("./data")

var $ = React.createElement

function badge(type) {
  return $("div", {key: type, className: "badge type-" + type}, type)
}

function section(title, info) {
  if (!info) {
    return null
  }
  return $("div", {className: "matchups"},
    $("h3", {}, title),
    info.map(badge)
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
