import { closest } from "fastest-levenshtein";

export enum Type {
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

function isType(str: string): str is Type {
  return types.some((t) => t === str);
}

export function typesFromString(str: string): Type[] {
  return str.split(/\s+/).filter(isType);
}

export const types = [
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

export const typesOrNone = [...types, Type.NONE];

export function stringToType(string: string, fallback: Type): Type {
  string = string.toLowerCase().replace(/[^a-z]/, "");
  if (string === "") {
    return fallback;
  }
  return closest(string, typesOrNone) as Type;
}

export enum Effectiveness {
  QUADRUPLE = 4,
  DOUBLE = 2,
  REGULAR = 1,
  HALF = 0.5,
  QUARTER = 0.25,
  ZERO = 0,
}

const rawData = [
  [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
  [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
  [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
  [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
  [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
  [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
  [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1],
];

function keyForTypes(t1: Type, t2: Type) {
  return t1 + " ~ " + t2;
}

export interface CoverageType {
  number: string;
  name: string;
  type1: Type;
  type2: Type;
}

export function objectToCoverageType(obj: unknown): CoverageType {
  const ct = obj as Partial<CoverageType>;
  return {
    number: ct.number || "",
    name: ct.name || "",
    type1: stringToType(ct.type1 || "", Type.NORMAL),
    type2: stringToType(ct.type2 || "", Type.NONE),
  };
}

const pairs = rawData.flatMap((row, i) => {
  return row.map<[string, number]>((data, j) => {
    return [keyForTypes(types[i], types[j]), data];
  });
});

const table = Object.fromEntries(pairs);

export function matchupFor(ta1: Type, ta2: Type, tb: Type) {
  const x1 = table[keyForTypes(tb, ta1)];
  // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
  const x2 = ta1 !== ta2 && ta2 !== Type.NONE ? table[keyForTypes(tb, ta2)] : 1;
  const x3 = x1 * x2;
  if (x3 === 4) {
    return Effectiveness.QUADRUPLE;
  }
  if (x3 === 2) {
    return Effectiveness.DOUBLE;
  }
  if (x3 === 1) {
    return Effectiveness.REGULAR;
  }
  if (x3 === 0.5) {
    return Effectiveness.HALF;
  }
  if (x3 === 0.25) {
    return Effectiveness.QUARTER;
  }
  if (x3 === 0) {
    return Effectiveness.ZERO;
  }
  throw new Error();
}

export class Matchup {
  constructor(public type: Type, public effectiveness: Effectiveness) {}
}

export class GroupedMatchups {
  constructor(public matchups: Matchup[]) {}

  typesFor(effectivenes: Effectiveness): Type[] {
    return this.matchups
      .filter((m) => m.effectiveness === effectivenes)
      .map((m) => m.type);
  }
}

export function offensiveMatchups(offenseTypes: Type[]) {
  const matchups = types.map((t) => {
    if (offenseTypes.length === 0) {
      return new Matchup(t, Effectiveness.REGULAR);
    }
    const effs = offenseTypes.map((offense) => {
      return matchupFor(t, Type.NONE, offense);
    });
    const max = Math.max(...effs);
    return new Matchup(t, max);
  });
  return new GroupedMatchups(matchups);
}

export function defensiveMatchups(t1: Type, t2: Type) {
  const matchups = types.map((t) => {
    const eff = matchupFor(t1, t2, t);
    return new Matchup(t, eff);
  });
  return new GroupedMatchups(matchups);
}
