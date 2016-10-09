"use strict"

var _ = require("lodash")

var types = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy"
]

function rawDataStrToNumber(str) {
  if (str === "2") return 2
  if (str === "1") return 1
  if (str === "½") return 0.5
  if (str === "0") return 0
  throw new Error()
}

var rawData = [
  "1 1 1 1 1 ½ 1 0 ½ 1 1 1 1 1 1 1 1 1",
  "2 1 ½ ½ 1 2 ½ 0 2 1 1 1 1 ½ 2 1 2 ½",
  "1 2 1 1 1 ½ 2 1 ½ 1 1 2 ½ 1 1 1 1 1",
  "1 1 1 ½ ½ ½ 1 ½ 0 1 1 2 1 1 1 1 1 2",
  "1 1 0 2 1 2 ½ 1 2 2 1 ½ 2 1 1 1 1 1",
  "1 ½ 2 1 ½ 1 2 1 ½ 2 1 1 1 1 2 1 1 1",
  "1 ½ ½ ½ 1 1 1 ½ ½ ½ 1 2 1 2 1 1 2 ½",
  "0 1 1 1 1 1 1 2 1 1 1 1 1 2 1 1 ½ 1",
  "1 1 1 1 1 2 1 1 ½ ½ ½ 1 ½ 1 2 1 1 2",
  "1 1 1 1 1 ½ 2 1 2 ½ ½ 2 1 1 2 ½ 1 1",
  "1 1 1 1 2 2 1 1 1 2 ½ ½ 1 1 1 ½ 1 1",
  "1 1 ½ ½ 2 2 ½ 1 ½ ½ 2 ½ 1 1 1 ½ 1 1",
  "1 1 2 1 0 1 1 1 1 1 2 ½ ½ 1 1 ½ 1 1",
  "1 2 1 2 1 1 1 1 ½ 1 1 1 1 ½ 1 1 0 1",
  "1 1 2 1 2 1 1 1 ½ ½ ½ 2 1 1 ½ 2 1 1",
  "1 1 1 1 1 1 1 1 ½ 1 1 1 1 1 1 2 1 0",
  "1 ½ 1 1 1 1 1 2 1 1 1 1 1 2 1 1 ½ ½",
  "1 2 1 ½ 1 1 1 1 ½ ½ 1 1 1 1 1 2 2 1"
].map(function(row) {
  return row.split(" ").map(rawDataStrToNumber)
})

function keyForTypes(t1, t2) {
  return t1 + " ~ " + t2
}

var pairs =
  _.flatMap(rawData, function(row, i) {
    return _.map(row, function(data, j) {
      return [keyForTypes(types[i], types[j]), data]
    })
  })

var table = _.fromPairs(pairs)

function matchupFor(ta1, ta2, tb) {
  var x1 = table[keyForTypes(tb, ta1)]
  var x2 = 1

  // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
  if (ta1 !== ta2 && ta2 !== "none") {
    x2 = table[keyForTypes(tb, ta2)]
  }

  var x3 = x1 * x2
  if (x3 === 4.00) return "takesQuadrupleFrom"
  if (x3 === 2.00) return "takesDoubleFrom"
  if (x3 === 1.00) return "takesNormalFrom"
  if (x3 === 0.50) return "takesHalfFrom"
  if (x3 === 0.25) return "takesQuarterFrom"
  if (x3 === 0.00) return "takesZeroFrom"
  throw new Error()
}

var typesOrNone = types.concat("none")

function mapToObj(array, fn) {
  var obj = {}
  array.forEach(function(x) { obj[x] = fn(x) })
  return obj
}

function matchups(t1, t2) {
  var allMatchups =
    mapToObj(types, function(t) { return matchupFor(t1, t2, t) })
  return _.invertBy(allMatchups)
}

exports.matchups = matchups
exports.typesOrNone = typesOrNone
exports.types = types
