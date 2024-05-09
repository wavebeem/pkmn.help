import classNames from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./MatchupsTeam.module.css";
import { assertNever } from "../misc/assertNever";
import { compact } from "../misc/compact";
import { Badge } from "./Badge";
import { Generation } from "../misc/data-generations";
import { matchupFor } from "../misc/data-matchups";
import { AbilityName, Type, typesForGeneration } from "../misc/data-types";
import { useTypeCount } from "../hooks/useTypeCount";
import { EmptyState } from "./EmptyState";

const matchupKeys = [
  "weak",
  "resist",
  "16",
  "8",
  "4",
  "2",
  "1",
  "1/2",
  "1/4",
  "1/8",
  "1/16",
  "0",
] as const;
type MatchupKey = typeof matchupKeys[number];

function getEffectivenessDisplay(
  langs: readonly string[],
  key: MatchupKey
): string {
  function num(value: number): string {
    return value.toLocaleString(langs);
  }

  switch (key) {
    case "weak":
      return "≥ " + num(2);
    case "resist":
      return "≤ " + num(1 / 2);
    case "16":
      return num(16);
    case "8":
      return num(8);
    case "4":
      return num(4);
    case "2":
      return num(2);
    case "1":
      return num(1);
    case "1/2":
      return num(1 / 2);
    case "1/4":
      return num(1 / 4);
    case "1/8":
      return num(1 / 8);
    case "1/16":
      return num(1 / 16);
    case "0":
      return "0";
  }
}

class Matcher {
  constructor(readonly key: MatchupKey) {}

  getNameForLang(langs: readonly string[]): string {
    return getEffectivenessDisplay(langs, this.key);
  }

  match(eff: number): boolean {
    const x = roundEffectiveness(eff);
    switch (this.key) {
      case "weak":
        return x > 1;
      case "resist":
        return x < 1 && x !== 0;
      case "16":
        return x === 16;
      case "8":
        return x === 8;
      case "4":
        return x === 4;
      case "2":
        return x === 2;
      case "1":
        return x === 1;
      case "1/2":
        return x === 1 / 2;
      case "1/4":
        return x === 1 / 4;
      case "1/8":
        return x === 1 / 8;
      case "1/16":
        return x === 1 / 16;
      case "0":
        return x === 0;
      default:
        assertNever(this.key);
    }
  }
}

export interface MatchupsTeamProps {
  generation: Generation;
  typesList: Type[][];
  teraTypes: Type[];
  abilityList: AbilityName[];
  format: "complex" | "simple" | "resist" | "weak";
}

export function MatchupsTeam({
  generation,
  typesList,
  teraTypes,
  format,
  abilityList,
}: MatchupsTeamProps) {
  const { t, i18n } = useTranslation();
  const [typeCount] = useTypeCount();
  const generationTypes = typesForGeneration(generation);

  const matchers: Matcher[] = (() => {
    switch (format) {
      case "complex":
        return compact([
          typeCount === "3" && new Matcher("16"),
          new Matcher("8"),
          new Matcher("4"),
          new Matcher("2"),
          new Matcher("1"),
          new Matcher("1/2"),
          new Matcher("1/4"),
          new Matcher("1/8"),
          typeCount === "3" && new Matcher("1/16"),
          new Matcher("0"),
        ]);
      case "simple":
        return [new Matcher("weak"), new Matcher("resist"), new Matcher("0")];
      case "resist":
        return compact([
          new Matcher("1/2"),
          new Matcher("1/4"),
          new Matcher("1/8"),
          typeCount === "3" && new Matcher("1/16"),
          new Matcher("0"),
        ]);
      case "weak":
        return compact([
          typeCount === "3" && new Matcher("16"),
          new Matcher("8"),
          new Matcher("4"),
          new Matcher("2"),
        ]);
      default:
        assertNever(format);
    }
  })();

  const rows: [Type, ...number[]][] = [];
  for (const genType of generationTypes) {
    const row: typeof rows[number] = [genType];
    for (const m of matchers) {
      let num = 0;
      for (const [typeIndex, types] of typesList.entries()) {
        const abilityName = abilityList[typeIndex];
        const teraType = teraTypes[typeIndex];
        const eff = matchupFor({
          generation,
          defenseTypes: types,
          offenseType: genType,
          defenseTeraType: teraType,
          abilityName,
        });
        if (m.match(eff)) {
          num++;
        }
      }
      row.push(num);
    }
    rows.push(row);
  }

  if (typesList.length === 0) {
    return <EmptyState>{t("defense.team.empty")}</EmptyState>;
  }

  return (
    <div className={classNames(styles.root, "focus-simple", "tabular-nums")}>
      <div
        className={classNames(styles.tableWrapper, "focus-none")}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th className={styles.thCorner}>{t("defense.team.type")}</th>
              {matchers.map((m) => {
                const name = m.getNameForLang(i18n.languages);
                return (
                  <th key={name} className={styles.thTop}>
                    {name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(([type, ...counts]) => {
              return (
                <tr key={type}>
                  <th className={styles.thLeft}>
                    <Badge type={type} />
                  </th>
                  {counts.map((count, i) => {
                    return (
                      <td key={i} className={styles.td} data-count={count}>
                        {count === 0 ? "-" : count}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function roundEffectiveness(x: number): number {
  if (Number.isNaN(x)) {
    return x;
  }
  if (Number.isInteger(Math.log2(x))) {
    return x;
  }
  if (x > 1) {
    let n = 0;
    while (x > 0) {
      x >>= 1;
      n++;
    }
    const a = 2 ** (n - 1);
    const b = 2 ** n;
    const da = Math.abs(x - a);
    const db = Math.abs(x - b);
    return da < db ? a : b;
  }
  if (x === 0) {
    return 0;
  }
  if (x < 1) {
    return 1 / roundEffectiveness(1 / x);
  }
  throw new Error(`Unexpected value: ${x}`);
}
