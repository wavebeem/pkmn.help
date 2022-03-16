import { closest } from "fastest-levenshtein";

export interface Pokemon {
  id: string;
  name: string;
  speciesNames: Record<string, string>;
  formNames: Record<string, string>;
  number: number;
  types: Type[];
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  bulbapediaURL: string;
}

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
  return [...new Set(str.split(/\s+/).filter(isType))];
}

export function typesFromUserInput({
  types,
  t,
}: {
  types: string;
  t: (key: string) => string;
}): Type[] {
  const map = Object.fromEntries(
    typesOrNone.map((type) => [type, t(`types.${type}`)])
  );
  return types
    .split(/\s+/)
    .filter((s) => s)
    .map((type) => reverseClosestLookup(type, map) as Type);
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

// whatYouMeant("こおり", {
//   ice: "こおり",
//   fire: "ほのお"
// });

// find closest(key, Object.values(obj)))
// return key of first value that matches

export function reverseClosestLookup<K extends string, V extends string>(
  value: V,
  obj: Record<K, V>
): K {
  const val = closest(value, Object.values(obj));
  const [key] = Object.entries<V>(obj).find(([, v]) => v === val) || [""];
  return key as K;
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
  types: Type[];
}

export function objectToCoverageType({
  obj,
  t,
}: {
  obj: unknown;
  t: (key: string) => string;
}): CoverageType {
  const {
    number = "",
    name = "",
    type1 = "",
    type2 = "",
    type3 = "",
  } = obj as Record<string, string | undefined>;
  const types = removeNones([type1, type2, type3].filter((s) => s) as Type[]);
  return { number, name, types };
}

const pairs = rawData.flatMap((row, i) => {
  return row.map<[string, number]>((data, j) => {
    return [keyForTypes(types[i], types[j]), data];
  });
});

const table = Object.fromEntries(pairs);

function multiply(a: number, b: number): number {
  return a * b;
}

export function removeNones(types: Type[]): Type[] {
  return types.filter((t) => t !== Type.NONE);
}

function matchupForPair(t1: Type, t2: Type): number {
  const key = keyForTypes(t2, t1);
  const val = table[key];
  if (val === undefined) {
    throw new Error(`matchupForPair: ${t1} vs ${t2}`);
  }
  return val;
}

export function matchupFor(defenseTypes: Type[], offenseType: Type): number {
  return defenseTypes
    .filter((t) => t !== Type.NONE)
    .map((t) => matchupForPair(t, offenseType))
    .reduce(multiply, 1);
}

export class Matchup {
  constructor(public type: Type, public effectiveness: number) {}
}

export class GroupedMatchups {
  constructor(public matchups: Matchup[]) {}

  typesFor(effectivenes: number): Type[] {
    return this.matchups
      .filter((m) => m.effectiveness === effectivenes)
      .map((m) => m.type);
  }
}

export function offensiveMatchups(offenseTypes: Type[]): GroupedMatchups {
  const matchups = types.map((t) => {
    if (offenseTypes.length === 0) {
      return new Matchup(t, 1);
    }
    const effs = offenseTypes.map((offense) => {
      return matchupFor([t], offense);
    });
    const max = Math.max(...effs);
    return new Matchup(t, max);
  });
  return new GroupedMatchups(matchups);
}

export function defensiveMatchups(defenseTypes: Type[]): GroupedMatchups {
  const matchups = types.map((t) => {
    const eff = matchupFor(defenseTypes, t);
    return new Matchup(t, eff);
  });
  return new GroupedMatchups(matchups);
}
