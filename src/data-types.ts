import { closest } from "fastest-levenshtein";
import removeAccents from "remove-accents";
import { Generation } from "./data-generations";

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
  imageType: "sprite" | "hd";
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

const typesGen2 = types.filter((t) => t !== Type.FAIRY);
const typesGen1 = typesGen2.filter(
  (t) => !(t === Type.DARK || t === Type.STEEL)
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
    if (i === 0) return [Type.NORMAL];
    return [];
  });
}

export const typesOrNone = [...types, Type.NONE];

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
  return types.filter((t) => t !== Type.NONE);
}
