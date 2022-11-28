import { Generation } from "./data-generations";
import { Type, typesForGeneration } from "./data-types";

const typesInPokemondbOrder = [
  Type.NORMAL,
  Type.FIRE,
  Type.WATER,
  Type.ELECTRIC,
  Type.GRASS,
  Type.ICE,
  Type.FIGHTING,
  Type.POISON,
  Type.GROUND,
  Type.FLYING,
  Type.PSYCHIC,
  Type.BUG,
  Type.ROCK,
  Type.GHOST,
  Type.DRAGON,
  Type.DARK,
  Type.STEEL,
  Type.FAIRY,
];

const _ = 1;
const H = 1 / 2;
const X = NaN;

const gen1 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, H, 0, _, X, X, X],
  [_, H, H, _, 2, 2, _, _, _, _, _, 2, H, _, H, X, X, X],
  [_, 2, H, _, H, _, _, _, 2, _, _, _, 2, _, H, X, X, X],
  [_, _, 2, H, H, _, _, _, 0, 2, _, _, _, _, H, X, X, X],
  [_, H, 2, _, H, _, _, H, 2, H, _, H, 2, _, H, X, X, X],
  [_, _, H, _, 2, H, _, _, 2, 2, _, _, _, _, 2, X, X, X],
  [2, _, _, _, _, 2, _, H, _, H, H, H, 2, 0, _, X, X, X],
  [_, _, _, _, 2, _, _, H, H, _, _, 2, H, H, _, X, X, X],
  [_, 2, _, 2, H, _, _, 2, _, 0, _, H, 2, _, _, X, X, X],
  [_, _, _, H, 2, _, 2, _, _, _, _, 2, H, _, _, X, X, X],
  [_, _, _, _, _, _, 2, 2, _, _, H, _, _, _, _, X, X, X],
  [_, H, _, _, 2, _, H, 2, _, H, 2, _, _, H, _, X, X, X],
  [_, 2, _, _, _, 2, H, _, H, 2, _, 2, _, _, _, X, X, X],
  [0, _, _, _, _, _, _, _, _, _, 0, _, _, 2, _, X, X, X],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, X, X, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
];

const gen2 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, H, 0, _, _, H, X],
  [_, H, H, _, 2, 2, _, _, _, _, _, 2, H, _, H, _, 2, X],
  [_, 2, H, _, H, _, _, _, 2, _, _, _, 2, _, H, _, _, X],
  [_, _, 2, H, H, _, _, _, 0, 2, _, _, _, _, H, _, _, X],
  [_, H, 2, _, H, _, _, H, 2, H, _, H, 2, _, H, _, H, X],
  [_, H, H, _, 2, H, _, _, 2, 2, _, _, _, _, 2, _, H, X],
  [2, _, _, _, _, 2, _, H, _, H, H, H, 2, 0, _, 2, 2, X],
  [_, _, _, _, 2, _, _, H, H, _, _, _, H, H, _, _, 0, X],
  [_, 2, _, 2, H, _, _, 2, _, 0, _, H, 2, _, _, _, 2, X],
  [_, _, _, H, 2, _, 2, _, _, _, _, 2, H, _, _, _, H, X],
  [_, _, _, _, _, _, 2, 2, _, _, H, _, _, _, _, 0, H, X],
  [_, H, _, _, 2, _, H, H, _, H, 2, _, _, H, _, 2, H, X],
  [_, 2, _, _, _, 2, H, _, H, 2, _, 2, _, _, _, _, H, X],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, H, H, X],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, H, X],
  [_, _, _, _, _, _, H, _, _, _, 2, _, _, 2, _, H, H, X],
  [_, H, H, H, _, 2, _, _, _, _, _, _, 2, _, _, _, H, X],
  [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
];

const genDefault = [
  [_, _, _, _, _, _, _, _, _, _, _, _, H, 0, _, _, H, _],
  [_, H, H, _, 2, 2, _, _, _, _, _, 2, H, _, H, _, 2, _],
  [_, 2, H, _, H, _, _, _, 2, _, _, _, 2, _, H, _, _, _],
  [_, _, 2, H, H, _, _, _, 0, 2, _, _, _, _, H, _, _, _],
  [_, H, 2, _, H, _, _, H, 2, H, _, H, 2, _, H, _, H, _],
  [_, H, H, _, 2, H, _, _, 2, 2, _, _, _, _, 2, _, H, _],
  [2, _, _, _, _, 2, _, H, _, H, H, H, 2, 0, _, 2, 2, H],
  [_, _, _, _, 2, _, _, H, H, _, _, _, H, H, _, _, 0, 2],
  [_, 2, _, 2, H, _, _, 2, _, 0, _, H, 2, _, _, _, 2, _],
  [_, _, _, H, 2, _, 2, _, _, _, _, 2, H, _, _, _, H, _],
  [_, _, _, _, _, _, 2, 2, _, _, H, _, _, _, _, 0, H, _],
  [_, H, _, _, 2, _, H, H, _, H, 2, _, _, H, _, 2, H, H],
  [_, 2, _, _, _, 2, H, _, H, 2, _, 2, _, _, _, _, H, _],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, H, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, H, 0],
  [_, _, _, _, _, _, H, _, _, _, 2, _, _, 2, _, H, _, H],
  [_, H, H, H, _, 2, _, _, _, _, _, _, 2, _, _, _, H, 2],
  [_, H, _, _, _, _, 2, H, _, _, _, _, _, _, 2, 2, H, _],
];

const generationMatchupData = {
  gen1: gen1,
  gen2: gen2,
  default: genDefault,
};

function matchupForPair(
  gen: Generation,
  defenseType: Type,
  offenseType: Type
): number {
  const map = generationMatchupMaps[gen];
  const key = getKey(offenseType, defenseType);
  const val = map.get(key);
  if (val === undefined) {
    throw new Error(`matchupForPair: ${key}`);
  }
  return val;
}

export function matchupFor(
  gen: Generation,
  defenseTypes: Type[],
  offenseType: Type
): number {
  return defenseTypes
    .filter((t) => t !== Type.NONE)
    .map((t) => matchupForPair(gen, t, offenseType))
    .reduce((a, b) => a * b, 1);
}

function createMatchupMap(gen: Generation): Map<string, number> {
  const map = new Map<string, number>();
  const data = generationMatchupData[gen];
  for (const [r, row] of data.entries()) {
    for (const [c, col] of row.entries()) {
      const t1 = typesInPokemondbOrder[r];
      const t2 = typesInPokemondbOrder[c];
      const key = getKey(t1, t2);
      map.set(key, col);
    }
  }
  return map;
}

function getKey(t1: Type, t2: Type): string {
  return `${t1} > ${t2}`;
}

const generationMatchupMaps = {
  gen1: createMatchupMap("gen1"),
  gen2: createMatchupMap("gen2"),
  default: createMatchupMap("default"),
};

class Matchup {
  constructor(
    public generation: Generation,
    public type: Type,
    public effectiveness: number
  ) {}
}

export class GroupedMatchups {
  constructor(public matchups: Matchup[]) {}

  typesFor(effectivenes: number): Type[] {
    return this.matchups
      .filter((m) => m.effectiveness === effectivenes)
      .map((m) => m.type);
  }
}

export function offensiveMatchups(
  gen: Generation,
  offenseTypes: Type[]
): GroupedMatchups {
  const matchups = typesForGeneration(gen).map((t) => {
    if (offenseTypes.length === 0) {
      return new Matchup(gen, t, 1);
    }
    const effs = offenseTypes.map((offense) => {
      return matchupFor(gen, [t], offense);
    });
    const max = Math.max(...effs);
    return new Matchup(gen, t, max);
  });
  return new GroupedMatchups(matchups);
}

export function defensiveMatchups(
  gen: Generation,
  defenseTypes: Type[]
): GroupedMatchups {
  const matchups = typesForGeneration(gen).map((t) => {
    const eff = matchupFor(gen, defenseTypes, t);
    return new Matchup(gen, t, eff);
  });
  return new GroupedMatchups(matchups);
}
