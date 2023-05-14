import { Generation } from "./data-generations";
import {
  AbilityName,
  CoverageType,
  Type,
  abilities,
  typesForGeneration,
} from "./data-types";

const typesInPokemondbOrder = [
  Type.normal,
  Type.fire,
  Type.water,
  Type.electric,
  Type.grass,
  Type.ice,
  Type.fighting,
  Type.poison,
  Type.ground,
  Type.flying,
  Type.psychic,
  Type.bug,
  Type.rock,
  Type.ghost,
  Type.dragon,
  Type.dark,
  Type.steel,
  Type.fairy,
];

const _ = 1;
const h = 1 / 2;
const x = NaN;

const gen1 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, x, x, x],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, x, x, x],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, x, x, x],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, x, x, x],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, x, x, x],
  [_, _, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, x, x, x],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, x, x, x],
  [_, _, _, _, 2, _, _, h, h, _, _, 2, h, h, _, x, x, x],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, x, x, x],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, x, x, x],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, x, x, x],
  [_, h, _, _, 2, _, h, 2, _, h, 2, _, _, h, _, x, x, x],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, x, x, x],
  [0, _, _, _, _, _, _, _, _, _, 0, _, _, 2, _, x, x, x],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
];

const gen2 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, x],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, x],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, x],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, x],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h, x],
  [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, x],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, x],
  [_, _, _, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, x],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, x],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, x],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, 0, h, x],
  [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, x],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, x],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, h, x],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, h, x],
  [_, _, _, _, _, _, h, _, _, _, 2, _, _, 2, _, h, h, x],
  [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
];

const genDefault = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, _],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, _],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, _],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, _],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h, _],
  [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, _],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, h],
  [_, _, _, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, 2],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, _],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, _],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, 0, h, _],
  [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, h],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, _],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, h, 0],
  [_, _, _, _, _, _, h, _, _, _, 2, _, _, 2, _, h, _, h],
  [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, 2],
  [_, h, _, _, _, _, 2, h, _, _, _, _, _, _, 2, 2, h, _],
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

interface PartitionedMatchups {
  weakness: CoverageType[];
  resistance: CoverageType[];
  normal: CoverageType[];
}

export function partitionMatchups({
  coverageTypes,
  generation,
  types,
}: {
  coverageTypes: CoverageType[];
  generation: Generation;
  types: Type[];
}): PartitionedMatchups {
  if (types.length === 0) {
    return {
      weakness: [],
      resistance: [],
      normal: coverageTypes,
    };
  }
  const ret: PartitionedMatchups = {
    weakness: [],
    resistance: [],
    normal: [],
  };
  for (const ct of coverageTypes) {
    const arr = types.map((t) =>
      matchupFor({
        generation,
        defenseTypes: ct.types,
        offenseType: t,
        abilityName: undefined,
      })
    );
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    if (max > 1) {
      ret.weakness.push(ct);
    } else if (min < 1 && max < 1) {
      ret.resistance.push(ct);
    } else {
      ret.normal.push(ct);
    }
  }
  return ret;
}

export function matchupFor({
  generation,
  defenseTypes,
  offenseType,
  abilityName,
}: {
  generation: Generation;
  defenseTypes: Type[];
  offenseType: Type;
  abilityName: AbilityName | undefined;
}): number {
  return defenseTypes
    .filter((t) => t !== Type.none)
    .map((t) => {
      let eff = matchupForPair(generation, t, offenseType);
      if (abilityName) {
        const ability = abilities[abilityName];
        for (const abilityInfo of ability) {
          if (abilityInfo.type === offenseType) {
            eff *= abilityInfo.value;
          }
        }
      }
      return eff;
    })
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
      return matchupFor({
        generation: gen,
        defenseTypes: [t],
        offenseType: offense,
        abilityName: undefined,
      });
    });
    const max = Math.max(...effs);
    return new Matchup(gen, t, max);
  });
  return new GroupedMatchups(matchups);
}

export function defensiveMatchups(
  gen: Generation,
  defenseTypes: Type[],
  abilityName: AbilityName | undefined
): GroupedMatchups {
  const matchups = typesForGeneration(gen).map((t) => {
    const eff = matchupFor({
      generation: gen,
      defenseTypes,
      offenseType: t,
      abilityName,
    });
    return new Matchup(gen, t, eff);
  });
  return new GroupedMatchups(matchups);
}
