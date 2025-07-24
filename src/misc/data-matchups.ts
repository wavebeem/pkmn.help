import { compare } from "./compare";
import { Generation } from "./data-generations";
import {
  AbilityName,
  CoverageType,
  SpecialMove,
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
  Type.stellar,
  Type.aether,
];

const _ = 1;
const h = 1 / 2;
const x = NaN;

const gen1 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, x, x, x, x],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, x, x, x, x],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, x, x, x, x],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, x, x, x, x],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, x, x, x, x],
  [_, _, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, x, x, x, x],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, x, x, x, x],
  [_, _, _, _, 2, _, _, h, h, _, _, 2, h, h, _, x, x, x, x],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, x, x, x, x],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, x, x, x, x],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, x, x, x, x],
  [_, h, _, _, 2, _, h, 2, _, h, 2, _, _, h, _, x, x, x, x],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, x, x, x, x],
  [0, _, _, _, _, _, _, _, _, _, 0, _, _, 2, _, x, x, x, x],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
];

const gen2 = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, x, x],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, x, x],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, x, x],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, x, x],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h, x, x],
  [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, x, x],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, x, x],
  [_, _, _, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, x, x],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, x, x],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, x, x],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, 0, h, x, x],
  [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, x, x],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, x, x],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, h, x, x],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, h, x, x],
  [_, _, _, _, _, _, h, _, _, _, 2, _, _, 2, _, h, h, x, x],
  [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
];

const genOdyssey = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, x, x, _],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, x, x, h],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, x, x, h],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, x, x, h],
  [_, h, 2, _, h, _, _, _, 2, h, _, h, 2, _, h, _, h, x, x, _],
  [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, x, x, _],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, x, x, _],
  [_, _, 2, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, x, x, 2],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, x, x, h],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, x, x, h],
  [_, _, _, _, _, h, 2, 2, _, _, h, _, _, _, _, 0, h, x, x, _],
  [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, x, x, _],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, x, x, _],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, _, x, x, _],
  [_, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, _, x, x, _],
  [_, _, _, _, _, h, h, _, _, _, 2, _, _, 2, _, h, _, x, x, 2],
  [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, x, x, _],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
  [_, _, _, _, _, _, _, h, _, _, _, _, _, _, _, h, _, x, x, h],
];

const genDefault = [
  [_, _, _, _, _, _, _, _, _, _, _, _, h, 0, _, _, h, _, _],
  [_, h, h, _, 2, 2, _, _, _, _, _, 2, h, _, h, _, 2, _, _],
  [_, 2, h, _, h, _, _, _, 2, _, _, _, 2, _, h, _, _, _, _],
  [_, _, 2, h, h, _, _, _, 0, 2, _, _, _, _, h, _, _, _, _],
  [_, h, 2, _, h, _, _, h, 2, h, _, h, 2, _, h, _, h, _, _],
  [_, h, h, _, 2, h, _, _, 2, 2, _, _, _, _, 2, _, h, _, _],
  [2, _, _, _, _, 2, _, h, _, h, h, h, 2, 0, _, 2, 2, h, _],
  [_, _, _, _, 2, _, _, h, h, _, _, _, h, h, _, _, 0, 2, _],
  [_, 2, _, 2, h, _, _, 2, _, 0, _, h, 2, _, _, _, 2, _, _],
  [_, _, _, h, 2, _, 2, _, _, _, _, 2, h, _, _, _, h, _, _],
  [_, _, _, _, _, _, 2, 2, _, _, h, _, _, _, _, 0, h, _, _],
  [_, h, _, _, 2, _, h, h, _, h, 2, _, _, h, _, 2, h, h, _],
  [_, 2, _, _, _, 2, h, _, h, 2, _, 2, _, _, _, _, h, _, _],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, h, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, h, 0, _],
  [_, _, _, _, _, _, h, _, _, _, 2, _, _, 2, _, h, _, h, _],
  [_, h, h, h, _, 2, _, _, _, _, _, _, 2, _, _, _, h, 2, _],
  [_, h, _, _, _, _, 2, h, _, _, _, _, _, _, 2, 2, h, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const generationMatchupData = {
  gen1: gen1,
  gen2: gen2,
  odyssey: genOdyssey,
  default: genDefault,
};

function matchupForPair(
  gen: Generation,
  defenseType: Type,
  offenseType: Type,
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
  offenseAbilities,
  specialMoves,
}: {
  coverageTypes: CoverageType[];
  generation: Generation;
  types: Type[];
  offenseAbilities: AbilityName[];
  specialMoves: SpecialMove[];
}): PartitionedMatchups {
  const ret: PartitionedMatchups = {
    weakness: [],
    resistance: [],
    normal: [],
  };
  for (const ct of coverageTypes) {
    const arr: number[] = [];
    let abilities = [...offenseAbilities];
    if (abilities.length === 0) {
      abilities = ["none"];
    }
    let moves: readonly (SpecialMove | undefined)[] = [...specialMoves];
    if (moves.length === 0) {
      moves = [undefined];
    } else if (moves.includes("flying_press") && types.length > 0) {
      moves = [...specialMoves, undefined];
    }
    let offTypes: readonly (Type | undefined)[] = [...types];
    if (moves.includes("flying_press")) {
      offTypes = [...offTypes];
    }
    if (moves.includes("freeze-dry") && !offTypes.includes("ice")) {
      offTypes = [...offTypes, "ice"];
    }
    if (moves.includes("thousand_arrows") && !offTypes.includes("ground")) {
      offTypes = [...offTypes, "ground"];
    }
    if (offTypes.length === 0) {
      offTypes = [undefined];
    }
    for (const offenseAbilityName of abilities) {
      for (const specialMove of moves) {
        for (const t of offTypes) {
          arr.push(
            matchupFor({
              generation,
              defenseTypes: ct.types,
              defenseTeraType: Type.none,
              offenseType: t,
              abilityName: "none",
              offenseAbilityName,
              specialMove,
            }),
          );
        }
      }
    }
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
  defenseTeraType = Type.none,
  offenseAbilityName = Type.none,
  abilityName,
  specialMove,
}: {
  generation: Generation;
  defenseTypes: Type[];
  defenseTeraType: Type;
  offenseType: Type | undefined;
  offenseAbilityName: AbilityName;
  abilityName: AbilityName;
  specialMove?: SpecialMove;
}): number {
  // Flying Press is basically a Flying move and a Fighting move multiplied
  // together. So just compute those two regular attacks separately and combine
  // them.
  if (specialMove === "flying_press") {
    const opts = {
      generation,
      defenseTypes,
      defenseTeraType,
      offenseAbilityName,
      abilityName,
      specialMove: undefined,
    } as const;
    const a = matchupFor({ ...opts, offenseType: "flying" });
    const b = matchupFor({ ...opts, offenseType: "fighting" });
    return a * b;
  }
  let n = 1;
  // Tera Pokémon (other than Stellar type) use their Tera type as their sole
  // defensive type
  //
  // https://bulbapedia.bulbagarden.net/wiki/Terastal_phenomenon
  if (!(defenseTeraType === Type.none || defenseTeraType === Type.stellar)) {
    defenseTypes = [defenseTeraType, Type.none];
  }
  // Apply multipliers based on ability
  if (abilityName) {
    for (const info of abilities[abilityName]) {
      if (info.type === offenseType) {
        n *= info.value;
      }
    }
  }
  // Apply multipliers based on defense types
  for (const t of defenseTypes) {
    let x = 1;
    // Don't crash if types are "none" or missing
    if (t !== Type.none && offenseType) {
      x = matchupForPair(generation, t, offenseType);
    }
    // Ghost can be hurt normally by Normal and Fighting
    //
    // https://bulbapedia.bulbagarden.net/wiki/Scrappy_(Ability)
    if (
      offenseAbilityName === "scrappy" &&
      t === Type.ghost &&
      (offenseType === Type.normal || offenseType === Type.fighting)
    ) {
      x = 1;
    }
    if (t === Type.flying && abilityName === "delta_stream" && x > 1) {
      // Delta stream protects flying types from super effective damage
      //
      // https://bulbapedia.bulbagarden.net/wiki/Delta_Stream_(Ability)
      x = 1;
    }
    // Freeze-Dry always deals 2x to Water
    //
    // https://bulbapedia.bulbagarden.net/wiki/Freeze-Dry_(move)
    if (
      t === Type.water &&
      specialMove === "freeze-dry" &&
      offenseType === Type.ice
    ) {
      x = 2;
    }
    // Thousand Arrows deals regular damage to Flying instead of zero
    //
    // https://bulbapedia.bulbagarden.net/wiki/Thousand_Arrows_(move)
    if (
      t === Type.flying &&
      specialMove === "thousand_arrows" &&
      offenseType === Type.ground
    ) {
      x = 1;
    }
    n *= x;
  }
  // Tera Pokémon take double damage from Stellar attacks
  //
  // https://bulbapedia.bulbagarden.net/wiki/Stellar_(type)
  if (defenseTeraType !== Type.none && offenseType === Type.stellar) {
    n *= 2;
  }
  // Doubles damage of ineffective moves
  //
  // https://bulbapedia.bulbagarden.net/wiki/Tinted_Lens_(Ability)
  if (offenseAbilityName === "tinted_lens" && n < 1) {
    n *= 2;
  }
  // Wonder guard blocks all non-super effective damage
  //
  // https://bulbapedia.bulbagarden.net/wiki/Wonder_Guard_(Ability)
  if (abilityName === "wonder_guard") {
    if (n <= 1) {
      n = 0;
    }
  }
  // Filter reduces all super effective damage by 25%
  //
  // https://bulbapedia.bulbagarden.net/wiki/Filter_(Ability)
  if (abilityName === "filter") {
    if (n > 1) {
      n *= 0.75;
    }
  }
  // When Terapagos is hit by a damage-dealing move at full HP (that does not
  // have no effect due to type matchups), it will always be not very effective.
  //
  // Seeing as we don't model HP, just assume we're at full HP the whole time
  // and that people know what the ability actually does.
  //
  //https://bulbapedia.bulbagarden.net/wiki/Tera_Shell_(Ability)
  if (abilityName === "tera_shell") {
    if (n > 0) {
      n = 0.5;
    }
  }
  return n;
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
  odyssey: createMatchupMap("odyssey"),
  default: createMatchupMap("default"),
};

class Matchup {
  constructor(
    public generation: Generation,
    public type: Type,
    public effectiveness: number,
    public formName?: string,
  ) {}
}

export class GroupedMatchups {
  constructor(public matchups: Matchup[]) {}

  toTestFormat(): Record<string, any> {
    return Object.fromEntries(
      this.matchups.map((m) => [m.type, m.effectiveness]),
    );
  }

  typesFor(effectivenes: number): Type[] {
    return this.matchups
      .filter((m) => m.effectiveness === effectivenes)
      .map((m) => m.type);
  }

  groupByEffectiveness(): Matchup[][] {
    const map: Map<number, Matchup[]> = new Map();
    for (const matchup of this.matchups) {
      const list = map.get(matchup.effectiveness);
      if (list) {
        list.push(matchup);
      } else {
        map.set(matchup.effectiveness, [matchup]);
      }
    }
    const effectivenesses = Array.from(map.keys()).sort(compare).reverse();
    return effectivenesses.map((eff) => {
      const list = map.get(eff);
      if (list) {
        return list;
      }
      throw new Error(`groupByEffectiveness: ${eff}`);
    });
  }
}

export function offensiveMatchups({
  gen,
  offenseTypes,
  specialMoves,
  offenseAbilities,
}: {
  gen: Generation;
  offenseTypes: readonly Type[];
  specialMoves: readonly SpecialMove[];
  offenseAbilities: readonly AbilityName[];
}): GroupedMatchups {
  const matchups = typesForGeneration(gen)
    .filter((t) => t !== Type.stellar)
    .map((t) => {
      let moves: readonly (SpecialMove | undefined)[] = specialMoves;
      if (moves.length === 0) {
        moves = [undefined];
      } else if (moves.includes("flying_press") && offenseTypes.length > 0) {
        moves = [...moves, undefined];
      }
      let abilities: readonly AbilityName[] = [...offenseAbilities];
      if (offenseAbilities.length === 0) {
        abilities = ["none"];
      }
      let offTypes: readonly (Type | undefined)[] = [...offenseTypes];
      if (moves.includes("flying_press")) {
        offTypes = [...offTypes];
      }
      if (moves.includes("freeze-dry") && !offTypes.includes("ice")) {
        offTypes = [...offTypes, "ice"];
      }
      if (moves.includes("thousand_arrows") && !offTypes.includes("ground")) {
        offTypes = [...offTypes, "ground"];
      }
      if (offTypes.length === 0) {
        offTypes = [undefined];
      }
      const effs = abilities.flatMap((offenseAbilityName) => {
        return moves.flatMap((move) => {
          return offTypes.map((offense) => {
            const x = matchupFor({
              generation: gen,
              defenseTypes: [t],
              defenseTeraType: "none",
              offenseType: offense,
              abilityName: "none",
              specialMove: move,
              offenseAbilityName,
            });
            return x;
          });
        });
      });
      const max = Math.max(...effs);
      return new Matchup(gen, t, max);
    });
  return new GroupedMatchups(matchups);
}

export function defensiveMatchups({
  gen,
  defenseTypes,
  defenseTeraType,
  abilityName,
}: {
  gen: Generation;
  defenseTypes: Type[];
  defenseTeraType: Type;
  abilityName: AbilityName;
}): GroupedMatchups {
  const matchups = typesForGeneration(gen).map((t) => {
    const eff = matchupFor({
      generation: gen,
      defenseTypes,
      defenseTeraType,
      offenseType: t,
      abilityName,
      offenseAbilityName: "none",
    });
    return new Matchup(gen, t, eff);
  });
  return new GroupedMatchups(matchups);
}
