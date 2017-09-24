import * as _ from "lodash";

enum Type {
  NORMAL = "normal",
  FIGHTING = "fighting",
  FLYING = "flying",
  POISON = "poison",
  GROUND = "ground",
  ROCK = "rock",
  BUG = "bug",
  GHOST = "ghost",
  STEEL = "steel",
  FIRE = "fire",
  WATER = "water",
  GRASS = "grass",
  ELECTRIC = "electric",
  PSYCHIC = "psychic",
  ICE = "ice",
  DRAGON = "dragon",
  DARK = "dark",
  FAIRY = "fairy",
  NONE = "none",
}

const types = [
  Type.NORMAL,
  Type.FIGHTING,
  Type.FLYING,
  Type.POISON,
  Type.GROUND,
  Type.ROCK,
  Type.BUG,
  Type.GHOST,
  Type.STEEL,
  Type.FIRE,
  Type.WATER,
  Type.GRASS,
  Type.ELECTRIC,
  Type.PSYCHIC,
  Type.ICE,
  Type.DRAGON,
  Type.DARK,
  Type.FAIRY,
];

const typesOrNone = [...types, Type.NONE];

enum Effectiveness {
  QUADRUPLE = 4,
  DOUBLE = 2,
  REGULAR = 1,
  HALF = 0.5,
  QUARTER = 0.25,
  ZERO = 0,
};

function rawDataStrToNumber(str: string) {
  if (str === "2") { return Effectiveness.DOUBLE; }
  if (str === "1") { return Effectiveness.REGULAR; }
  if (str === "½") { return Effectiveness.HALF; }
  if (str === "0") { return Effectiveness.ZERO; }
  throw new Error();
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

function keyForTypes(t1: Type, t2: Type) {
  return t1 + " ~ " + t2;
}

// TODO: Types seem wrong here
const pairs =
  _.flatMap(rawData, (row, i) => {
    return _.map(row, (data, j) => {
      return [keyForTypes(types[i], types[j]), data];
    });
  });

// TODO: Types seem wrong here
const table = _.fromPairs(pairs);

function matchupFor(ta1: Type, ta2: Type, tb: Type) {
  const x1 = table[keyForTypes(tb, ta1)];
  // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
  const x2 = (ta1 !== ta2 && ta2 !== Type.NONE)
    ? table[keyForTypes(tb, ta2)]
    : 1
  const x3 = x1 * x2;
  if (x3 === 4) { return Effectiveness.QUADRUPLE; }
  if (x3 === 2) { return Effectiveness.DOUBLE; }
  if (x3 === 1) { return Effectiveness.REGULAR; }
  if (x3 === 0.5) { return Effectiveness.HALF; }
  if (x3 === 0.25) { return Effectiveness.QUARTER; }
  if (x3 === 0) { return Effectiveness.ZERO; }
  throw new Error();
}

class Matchup {
  constructor(
    public type: Type,
    public effectiveness: Effectiveness,
  ) {}
}

class GroupedMatchups {
  constructor(public matchups: Matchup[]) {}

  typesFor(effectivenes: Effectiveness): Type[] {
    const ms = _.filter(this.matchups, m => m.effectiveness === effectivenes);
    return _.map(ms, m => m.type);
  }
}

function offensiveMatchups(type: Type) {
  const matchups = _.map(types, t => {
    const eff = matchupFor(t, Type.NONE, type);
    return new Matchup(t, eff);
  });
  debugger;
  return new GroupedMatchups(matchups);
}

function defensiveMatchups(t1: Type, t2: Type) {
  const matchups = _.map(types, t => {
    const eff = matchupFor(t1, t2, t);
    return new Matchup(t, eff);
  });
  return new GroupedMatchups(matchups);
}

export {
  Type,
  Effectiveness,
  Matchup,
  GroupedMatchups,
  offensiveMatchups,
  defensiveMatchups,
  typesOrNone,
  types,
};
