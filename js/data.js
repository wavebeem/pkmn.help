const _ = require("lodash")

const types = [
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

const rawData = [
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

const pairs =
  _.flatMap(rawData, (row, i) =>
    _.map(row, (data, j) =>
      [keyForTypes(types[i], types[j]), data]
    )
  )

const table = _.fromPairs(pairs)

function matchupFor(ta1, ta2, tb) {
  const x1 = table[keyForTypes(tb, ta1)]
  // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
  const x2 = (ta1 !== ta2 && ta2 !== "none")
    ? table[keyForTypes(tb, ta2)]
    : 1

  const x3 = x1 * x2
  if (x3 === 4.00) return "quadruple"
  if (x3 === 2.00) return "double"
  if (x3 === 1.00) return "normal"
  if (x3 === 0.50) return "half"
  if (x3 === 0.25) return "quarter"
  if (x3 === 0.00) return "zero"
  throw new Error()
}

const typesOrNone = types.concat("none")

function mapToObj(array, fn) {
  const obj = {}
  array.forEach(x => obj[x] = fn(x))
  return obj
}

function offensiveMatchups(type) {
  const allMatchups =
    mapToObj(types, t => matchupFor(t, "none", type))
  return _.invertBy(allMatchups)
}

function defensiveMatchups(t1, t2) {
  const allMatchups =
    mapToObj(types, t => matchupFor(t1, t2, t))
  return _.invertBy(allMatchups)
}

exports.offensiveMatchups = offensiveMatchups
exports.defensiveMatchups = defensiveMatchups
exports.typesOrNone = typesOrNone
exports.types = types
