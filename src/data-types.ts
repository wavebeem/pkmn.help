import { closest } from "fastest-levenshtein";
import removeAccents from "remove-accents";
import { Generation } from "./data-generations";
import { ValueOf } from "./util";

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
  hasShiny: boolean;
  imageType: "sprite" | "hd";
}

export const Type = {
  normal: "normal",
  fighting: "fighting",
  flying: "flying",
  poison: "poison",
  ground: "ground",
  rock: "rock",
  bug: "bug",
  ghost: "ghost",
  steel: "steel",
  fire: "fire",
  water: "water",
  grass: "grass",
  electric: "electric",
  psychic: "psychic",
  ice: "ice",
  dragon: "dragon",
  dark: "dark",
  fairy: "fairy",
  none: "none",
} as const;

const typeSet = new Set(Object.values(Type));

export type Type = ValueOf<typeof Type>;

export type Ability = { type: Type; value: number }[];

function createAbility(value: number, ...types: Type[]): Ability {
  return types.map((type) => ({ type, value }));
}

export const abilities = {
  none: createAbility(1),
  // Resistances
  purifying_salt: createAbility(0.5, Type.ghost),
  heatproof: createAbility(0.5, Type.fire),
  water_bubble: createAbility(0.5, Type.fire),
  thick_fat: createAbility(0.5, Type.fire, Type.ice),
  // Immunities
  earth_eater: createAbility(0, Type.ground),
  levitate: createAbility(0, Type.ground),
  flash_fire: createAbility(0, Type.fire),
  well_baked_body: createAbility(0, Type.fire),
  dry_skin: createAbility(0, Type.water),
  storm_drain: createAbility(0, Type.water),
  water_absorb: createAbility(0, Type.water),
  sap_sipper: createAbility(0, Type.grass),
  lightning_rod: createAbility(0, Type.electric),
  motor_drive: createAbility(0, Type.electric),
  volt_absorb: createAbility(0, Type.electric),
} as const;

const abilitySet = new Set(Object.keys(abilities));

function isAbility(str: string): str is AbilityName {
  return abilitySet.has(str);
}

export type AbilityName = keyof typeof abilities;

export function abilityNameFromString(str: string | undefined): AbilityName {
  if (str && isAbility(str)) {
    return str;
  }
  return "none";
}

function isType(str: string): str is Type {
  return typeSet.has(str as Type);
}

function normalizeTypeString(str: string): string {
  return removeAccents(str.toLocaleLowerCase());
}

export function typesFromString(str: string): Type[] {
  return [...new Set(str.split(/\s+/).filter(isType))];
}

export function typesFromUserInput({
  types,
  t,
  strict = false,
}: {
  types: string;
  t: (key: string) => string;
  strict?: boolean;
}): Type[] {
  const map = Object.fromEntries(
    typesOrNone.map((type) => [type, normalizeTypeString(t(`types.${type}`))])
  );
  const lookup = strict ? reverseLookup : reverseClosestLookup;
  return types
    .split(/\s+/)
    .filter((s) => s)
    .map(normalizeTypeString)
    .map((type) => lookup(type, map) as Type)
    .filter((s) => s);
}

export const types = [
  Type.normal,
  Type.fighting,
  Type.flying,
  Type.poison,
  Type.ground,
  Type.rock,
  Type.bug,
  Type.ghost,
  Type.steel,
  Type.fire,
  Type.water,
  Type.grass,
  Type.electric,
  Type.psychic,
  Type.ice,
  Type.dragon,
  Type.dark,
  Type.fairy,
];

const typesGen2 = types.filter((t) => t !== Type.fairy);
const typesGen1 = typesGen2.filter(
  (t) => !(t === Type.dark || t === Type.steel)
);

export function typesForGeneration(generation: Generation): Type[] {
  switch (generation) {
    case "default":
      return types;
    case "gen1":
      return typesGen1;
    case "gen2":
      return typesGen2;
    default:
      throw new Error(`typesForGeneration: ${generation}`);
  }
}

export function removeInvalidOffenseTypesForGeneration(
  generation: Generation,
  types: Type[]
): Type[] {
  const set = new Set(typesForGeneration(generation));
  return types.filter((t) => set.has(t));
}

export function removeInvalidDefenseTypesForGeneration(
  generation: Generation,
  types: Type[]
): Type[] {
  const set = new Set(typesForGeneration(generation));
  return types.flatMap((t, i) => {
    if (set.has(t)) return [t];
    if (i === 0) return [Type.normal];
    return [];
  });
}

export const typesOrNone = [...types, Type.none];

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

export function reverseLookup<K extends string, V extends string>(
  value: V,
  obj: Record<K, V>
): K {
  const [key] = Object.entries<V>(obj).find(([, v]) => v === value) || [""];
  return key as K;
}

export interface CoverageType {
  number: string;
  name: string;
  types: Type[];
}

export function objectToCoverageType({ obj }: { obj: unknown }): CoverageType {
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

export function removeNones(types: Type[]): Type[] {
  return types.filter((t) => t !== Type.none);
}
