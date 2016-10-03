"use strict"

var ko = require("knockout")
var _ = require("lodash")

function Root() {
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
  ].map(row => row.split(" ").map(rawDataStrToNumber))

  function keyForTypes(t1, t2) {
    return t1 + " ~ " + t2
  }

  var pairs =
    _.flatMap(rawData, (row, i) =>
      _.map(row, (data, j) =>
        [keyForTypes(types[i], types[j]), data]
      )
    )

  var table = _.fromPairs(pairs)

  function matchupFor(ta1, ta2, tb) {
    var x1 = table[keyForTypes(tb, ta1)]
    var x2 = 1

    // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
    if (ta1 !== ta2 && ta2 !== "none") {
      x2 = table[keyForTypes(tb, ta2)]
    }

    var x3 = x1 * x2
    if (x3 === 4.00) return "doubleSuper"
    if (x3 === 2.00) return "super"
    if (x3 === 1.00) return "normal"
    if (x3 === 0.50) return "weak"
    if (x3 === 0.25) return "doubleWeak"
    if (x3 === 0.00) return "immune"
    throw new Error()
  }

  var typesOrNone = types.concat("none")

  var type1 = ko.observable("normal")
  var type2 = ko.observable("none")

  function canonicalizeDualTypes() {
    if (type1() === type2()) {
      type2("none")
    }
  }

  type1.subscribe(canonicalizeDualTypes)
  type2.subscribe(canonicalizeDualTypes)

  function classForType1(type) {
    return (type === type1() ? "selected " : "") + type
  }

  function classForType2(type) {
    return (type === type2() ? "selected " : "") + type
  }

  var matchups = ko.computed(function() {
    var t1 = type1()
    var t2 = type2()

    var allMatchups = _.reduce(types, (h, t) => {
      h[t] = matchupFor(t1, t2, t)
      return h
    }, {})

    // Group by effectiveness
    return _.groupBy(_.entries(allMatchups), 1)
  })

  return {
    typesOrNone,
    types,
    type1,
    type2,
    classForType1,
    classForType2,
    matchups
  }
}

var $root = Root()
ko.applyBindings($root)
