import { closest } from "fastest-levenshtein";
import removeAccents from "remove-accents";
import { Generation } from "./data-generations";
import { ValueOf } from "./util";
import versionsData from "../../data/versions.json";
import { VersionGroup } from "./data-version-groups";
import { versionGroupToGeneration } from "../hooks/useGeneration";

export interface Pokemon {
  id: string;
  name: string;
  species: string;
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
  hasCry: boolean;
  images: {
    default: boolean;
    female: boolean;
    shiny: boolean;
    shinyFemale: boolean;
  };
  typesByGeneration: Record<string, Type[]>;
}

export interface TranslatedPokemon extends Pokemon {
  speciesName: string;
  formName: string;
}

export type Type = ValueOf<typeof Type>;
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
  stellar: "stellar",
  none: "none",
} as const;

const typeSet = new Set(Object.values(Type));

export type SpecialMove = (typeof specialMoves)[number];
export const specialMoves = [
  "thousand_arrows",
  "freeze-dry",
  "flying_press",
] as const;

interface AbilityInfo {
  type: Type;
  value: number;
}

export type Ability = AbilityInfo[];

function createAbility(...abilityInfo: AbilityInfo[]): Ability {
  return abilityInfo;
}

export const abilities = {
  none: createAbility(),
  // Weakness
  fluffy: createAbility({ type: Type.fire, value: 2 }),
  // Resistances
  purifying_salt: createAbility({ type: Type.ghost, value: 0.5 }),
  heatproof: createAbility({ type: Type.fire, value: 0.5 }),
  water_bubble: createAbility({ type: Type.fire, value: 0.5 }),
  thick_fat: createAbility(
    { type: Type.fire, value: 0.5 },
    { type: Type.ice, value: 0.5 },
  ),
  // Immunities
  earth_eater: createAbility({ type: Type.ground, value: 0 }),
  levitate: createAbility({ type: Type.ground, value: 0 }),
  flash_fire: createAbility({ type: Type.fire, value: 0 }),
  well_baked_body: createAbility({ type: Type.fire, value: 0 }),
  dry_skin: createAbility(
    { type: Type.fire, value: 1.25 },
    { type: Type.water, value: 0 },
  ),
  storm_drain: createAbility({ type: Type.water, value: 0 }),
  water_absorb: createAbility({ type: Type.water, value: 0 }),
  sap_sipper: createAbility({ type: Type.grass, value: 0 }),
  lightning_rod: createAbility({ type: Type.electric, value: 0 }),
  motor_drive: createAbility({ type: Type.electric, value: 0 }),
  volt_absorb: createAbility({ type: Type.electric, value: 0 }),
  primordial_sea: createAbility({ type: Type.fire, value: 0 }),
  desolate_land: createAbility({ type: Type.water, value: 0 }),
  // Other
  filter: createAbility(),
  solid_rock: createAbility(),
  prism_armor: createAbility(),
  wonder_guard: createAbility(),
  delta_stream: createAbility(),
  tera_shell: createAbility(),
  tinted_lens: createAbility(),
  scrappy: createAbility(),
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
  // Vietnamese uses spaces in type names like `Giác Đấu` for `Fighting`
  return removeAccents(str.toLocaleLowerCase()).replace(/\s+/, "");
}

export function normalizeTypes(types: Type[]): Type[] {
  return removeNones(Array.from(new Set(types)));
}

export function typesFromString(str: string): Type[] {
  return [...new Set(str.split(/\s+/).filter(isType))];
}

export function splitTokens(input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .filter((x) => x !== "");
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
    typesOrNone.map((type) => {
      const translatedType = t(`types.${type}`);
      const normalizedType = normalizeTypeString(translatedType);
      return [type, normalizedType];
    }),
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
  Type.stellar,
];

export const typesWithoutNone = [...types];

const typesScarletViolet = [...types];
const typesGen3Plus = types.filter((t) => !(t === Type.stellar));
const typesGen2Through5 = types.filter((t) => !(t === Type.fairy));
const typesGen1 = typesGen2Through5.filter(
  (t) => !(t === Type.dark || t === Type.steel),
);

export function typesForGeneration(generation: Generation): Type[] {
  switch (generation) {
    case "default":
      return [...typesGen3Plus];
    case "gen1":
      return [...typesGen1];
    case "gen2":
      return [...typesGen2Through5];
    default:
      throw new Error(`typesForGeneration: ${generation}`);
  }
}

export function typesForVersionGroup(versionGroup: VersionGroup): Type[] {
  switch (versionGroup) {
    // Only Scarlet/Violet and its DLC have the Tera Pokemon and the Stellar
    // type currently
    case "the-indigo-disk":
    case "the-teal-mask":
    case "scarlet-violet": {
      return typesScarletViolet;
    }
    default: {
      return typesForGeneration(versionGroupToGeneration(versionGroup));
    }
  }
}

export function removeInvalidOffenseTypesForGeneration(
  generation: Generation,
  types: Type[],
): Type[] {
  const set = new Set(typesForGeneration(generation));
  return types.filter((t) => set.has(t));
}

export function removeInvalidDefenseTypesForGeneration(
  generation: Generation,
  types: Type[],
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
  obj: Record<K, V>,
): K {
  const val = closest(value, Object.values(obj));
  const [key] = Object.entries<V>(obj).find(([, v]) => v === val) || [""];
  return key as K;
}

export function reverseLookup<K extends string, V extends string>(
  value: V,
  obj: Record<K, V>,
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

function removeNones(types: (Type | undefined | null)[]): Type[] {
  return types.filter((t): t is Type => Boolean(t && t !== Type.none));
}

const generationIndexes = new Map(
  versionsData.generations.map((x, i) => [x, i]),
);

export function restorePastTypesByVersionGroup(
  pkmn: Pokemon,
  vg: string,
): Pokemon {
  const ret = { ...pkmn };
  const generation: string = (versionsData.versionGroupsToGenerations as any)[
    vg
  ];
  const currentIndex = generationIndexes.get(generation) ?? -1;
  for (const [typeGeneration, types] of Object.entries(
    pkmn.typesByGeneration,
  )) {
    const pastIndex = generationIndexes.get(typeGeneration) ?? -1;
    if (currentIndex <= pastIndex) {
      ret.types = [...types];
    }
  }
  return ret;
}

// TODO: We should remove regional variants and mega evolutions by default,
// adding them back in only when we know they apply. I wish we could easily get
// this information from PokeAPI.
//
// https://github.com/PokeAPI/pokeapi/issues/1266
//
export function restoreRegionalVariantsInPokedex({
  dex,
  slugToMon,
  versionGroup,
}: {
  dex: Pokemon[];
  slugToMon: Map<string, Pokemon>;
  versionGroup: VersionGroup;
}): Pokemon[] {
  let ret: typeof dex = [];
  let replacements: Record<string, string[]> = {};
  let additions: Record<string, string[]> = {};
  switch (versionGroup) {
    case "sun-moon":
    case "ultra-sun-ultra-moon": {
      replacements = {
        rattata: ["rattata-alola"],
        raticate: ["raticate-alola"],
        raichu: ["raichu-alola"],
        sandshrew: ["sandshrew-alola"],
        sandslash: ["sandslash-alola"],
        vulpix: ["vulpix-alola"],
        ninetales: ["ninetales-alola"],
        diglett: ["diglett-alola"],
        dugtrio: ["dugtrio-alola"],
        meowth: ["meowth-alola"],
        persian: ["persian-alola"],
        geodude: ["geodude-alola"],
        graveler: ["graveler-alola"],
        golem: ["golem-alola"],
        grimer: ["grimer-alola"],
        muk: ["muk-alola"],
        exeggutor: ["exeggutor-alola"],
        marowak: ["marowak-alola"],
      };
      break;
    }
    case "sword-shield": {
      replacements = {
        meowth: ["meowth-galar"],
        ponyta: ["ponyta-galar"],
        rapidash: ["rapidash-galar"],
        slowpoke: ["slowpoke-galar"],
        farfetchd: ["farfetchd-galar"],
        weezing: ["weezing-galar"],
        "mr-mime": ["mr-mime-galar"],
        corsola: ["corsola-galar"],
        zigzagoon: ["zigzagoon-galar"],
        linoone: ["linoone-galar"],
        darumaka: ["darumaka-galar"],
        darmanitan: ["darmanitan-galar"],
        yamask: ["yamask-galar"],
        stunfisk: ["stunfisk-galar"],
      };
      break;
    }
    case "the-isle-of-armor": {
      replacements = {
        slowbro: ["slowbro-galar"],
      };
      break;
    }
    case "the-crown-tundra": {
      replacements = {
        slowking: ["slowking-galar"],
      };
      additions = {
        articuno: ["articuno-galar"],
        zapdos: ["zapdos-galar"],
        moltres: ["moltres-galar"],
      };
      break;
    }
    case "legends-arceus": {
      replacements = {
        growlithe: ["growlithe-hisui"],
        arcanine: ["arcanine-hisui"],
        voltorb: ["voltorb-hisui"],
        electrode: ["electrode-hisui"],
        qwilfish: ["qwilfish-hisui"],
        sneasel: ["sneasel-hisui"],
        lilligant: ["lilligant-hisui"],
        zorua: ["zorua-hisui"],
        zoroark: ["zoroark-hisui"],
        braviary: ["braviary-hisui"],
        sliggoo: ["sliggoo-hisui"],
        goodra: ["goodra-hisui"],
        avalugg: ["avalugg-hisui"],
      };
      additions = {
        decidueye: ["decidueye-hisui"],
        typhlosion: ["typhlosion-hisui"],
        samurott: ["samurott-hisui"],
      };
      break;
    }
    case "scarlet-violet": {
      replacements = {
        wooper: ["wooper-paldea"],
        tauros: [
          "tauros-paldea-combat-breed",
          "tauros-paldea-blaze-breed",
          "tauros-paldea-aqua-breed",
        ],
      };
      break;
    }
    default: {
      break;
    }
  }
  for (const mon of dex) {
    if (mon.name in replacements) {
      for (const m of replacements[mon.name]) {
        const pokemon = slugToMon.get(m);
        if (!pokemon) {
          throw new Error(`no such pokemon ${m}`);
        }
        ret.push(pokemon);
      }
    } else if (mon.name in additions) {
      for (const m of additions[mon.name]) {
        const pokemon = slugToMon.get(m);
        if (!pokemon) {
          throw new Error(`no such pokemon ${m}`);
        }
        ret.push(pokemon);
      }
      ret.push(mon);
    } else {
      ret.push(mon);
    }
    switch (versionGroup) {
      case "sword-shield":
      case "the-isle-of-armor":
      case "the-crown-tundra": {
        break;
      }
      default: {
        ret = ret.filter((p) => !isGmax(p));
      }
    }
    switch (versionGroup) {
      case "x-y":
      case "legends-za":
      case "omega-ruby-alpha-sapphire":
      case "champions": {
        break;
      }
      default: {
        ret = ret.filter((p) => !isMega(p));
      }
    }
  }
  return ret;
}

function isGmax(pkmn: Pokemon): boolean {
  return pkmn.name.endsWith("-gmax");
}

function isMega(pkmn: Pokemon): boolean {
  const n = pkmn.name;
  return (
    n.endsWith("-mega") ||
    n.endsWith("-mega-x") ||
    n.endsWith("-mega-y") ||
    n.endsWith("-mega-z")
  );
}
