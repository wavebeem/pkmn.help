// Generates src/style/theme/md-tokens.css: every M3 color role, as a
// --md-<kebab-case-role-name> CSS var.
//
// Run: npm run generate-md3-theme
//
// M3 "custom brand" static scheme
//
// - primary/secondary/tertiary: Fire/Water/Grass, one TonalPalette each
// - neutral (surfaces, background, outline): its own seed, per theme
// - everything else (error, scrim, etc.): fallback TONAL_SPOT scheme Each role
//   name gets pulled from whichever of those it belongs to.
//
// https://m3.material.io/styles/color/static/custom-brand
//
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import {
  DynamicScheme,
  TonalPalette,
  Variant,
  Hct,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

const contrastLevel = 0;
const fallbackVariant = Variant.TONAL_SPOT;
const neutralVariant = Variant.NEUTRAL;

// Matches src/misc/colors.ts's typeColors. Already the app's palette.
const primarySeedHex = "#e62829"; // fire
const secondarySeedHex = "#2980ef"; // water
const tertiarySeedHex = "#3fa129"; // grass

const lightNeutralSeedHex = "#fac000"; // electric
const darkNeutralSeedHex = "#fac000"; // electric

// Per-role tone assignments for a role built from a single TonalPalette at
// contrastLevel 0. Same values as @material/material-color-utilities's own
// customColor() helper (utils/theme_utils.js).
const CUSTOM_ROLE_TONES = {
  light: {
    color: 40,
    onColor: 100,
    colorContainer: 90,
    onColorContainer: 10,
  },
  dark: {
    color: 80,
    onColor: 20,
    colorContainer: 30,
    onColorContainer: 90,
  },
};
type ToneKey = keyof typeof CUSTOM_ROLE_TONES.light;

// One TonalPalette per accent, keyed by its role-name prefix.
const CUSTOM_PALETTES: { prefix: string; palette: TonalPalette }[] = [
  { prefix: "primary", seedHex: primarySeedHex },
  { prefix: "secondary", seedHex: secondarySeedHex },
  { prefix: "tertiary", seedHex: tertiarySeedHex },
].map(({ prefix, seedHex }) => ({
  prefix,
  palette: TonalPalette.fromInt(argbFromHex(seedHex)),
}));

// If cssName is one of a custom accent's 4 roles (e.g. "tertiary",
// "on-tertiary-container"), returns the palette to read it from and which
// tone. Otherwise undefined, meaning some other source owns this role.
function matchCustomRole(
  cssName: string,
): { palette: TonalPalette; toneKey: ToneKey } | undefined {
  for (const { prefix, palette } of CUSTOM_PALETTES) {
    if (cssName === prefix) {
      return { palette, toneKey: "color" };
    }
    if (cssName === `on-${prefix}`) {
      return { palette, toneKey: "onColor" };
    }
    if (cssName === `${prefix}-container`) {
      return { palette, toneKey: "colorContainer" };
    }
    if (cssName === `on-${prefix}-container`) {
      return { palette, toneKey: "onColorContainer" };
    }
  }
  return undefined;
}

// True for roles that should come from the neutral scheme (surfaces,
// background, outline) rather than the fallback scheme.
function isNeutralRoleName(cssName: string): boolean {
  return (
    cssName.includes("surface") ||
    cssName.includes("background") ||
    cssName.includes("outline")
  );
}

function neutralScheme(seedHex: string, isDark: boolean): DynamicScheme {
  return new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex(seedHex)),
    variant: neutralVariant,
    contrastLevel,
    isDark,
  });
}

function fallbackScheme(isDark: boolean): DynamicScheme {
  return new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex(primarySeedHex)),
    variant: fallbackVariant,
    contrastLevel,
    isDark,
  });
}

// Every role DynamicScheme exposes is a `get roleName()` accessor on its
// prototype, so this finds them all without hand-listing role names.
function getRoleNames(scheme: DynamicScheme): string[] {
  const proto = Object.getPrototypeOf(scheme);
  const names: string[] = [];
  for (const name of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor !== undefined && typeof descriptor.get === "function") {
      names.push(name);
    }
  }
  return names;
}

// "onPrimaryContainer" -> "on-primary-container"
function kebabCase(name: string): string {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function roleValue(scheme: DynamicScheme, roleName: string): number {
  const scheme_ = scheme as unknown as Record<string, number>;
  return scheme_[roleName];
}

function buildLines(): string {
  const fallbackLight = fallbackScheme(false);
  const fallbackDark = fallbackScheme(true);
  const neutralLight = neutralScheme(lightNeutralSeedHex, false);
  const neutralDark = neutralScheme(darkNeutralSeedHex, true);

  let lines = "";
  for (const roleName of getRoleNames(fallbackLight)) {
    const cssName = kebabCase(roleName);
    const custom = matchCustomRole(cssName);
    let lightHex: string;
    let darkHex: string;
    if (custom) {
      lightHex = hexFromArgb(
        custom.palette.tone(CUSTOM_ROLE_TONES.light[custom.toneKey]),
      );
      darkHex = hexFromArgb(
        custom.palette.tone(CUSTOM_ROLE_TONES.dark[custom.toneKey]),
      );
    } else if (isNeutralRoleName(cssName)) {
      lightHex = hexFromArgb(roleValue(neutralLight, roleName));
      darkHex = hexFromArgb(roleValue(neutralDark, roleName));
    } else {
      lightHex = hexFromArgb(roleValue(fallbackLight, roleName));
      darkHex = hexFromArgb(roleValue(fallbackDark, roleName));
    }
    lines += `  --md-${cssName}: light-dark(${lightHex}, ${darkHex});\n`;
  }
  return lines;
}

function buildOutput(lines: string): string {
  return `\
/* GENERATED. Don't hand-edit. Regenerate with: npm run generate-md3-theme */
:root {
${lines}}
`;
}

function main(): void {
  const content = buildOutput(buildLines());
  const filename = "src/style/theme/md-tokens.css";
  writeFileSync(filename, content, "utf-8");
  execSync("npm run fix:format");
}

main();
