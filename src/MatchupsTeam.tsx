import * as React from "react";
import { Badge } from "./Badge";
import { Generation } from "./data-generations";
import { matchupFor } from "./data-matchups";
import { AbilityName, Type, typesForGeneration } from "./data-types";
import { useTranslation } from "react-i18next";
import { assertNever } from "./assertNever";
import { useTypeCount } from "./useTypeCount";
import { compact } from "./compact";

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

const effectivenessDisplay = {
  weak: "≥ 2",
  resist: "≤ ½",
  "16": "16",
  "8": "8",
  "4": "4",
  "2": "2",
  "1": "1",
  "1/2": "½",
  "1/4": "¼",
  "1/8": "⅛",
  "1/16": "1⁄16",
  "0": "0",
};

class Matcher {
  constructor(readonly key: MatchupKey) {}

  get name(): string {
    return effectivenessDisplay[this.key];
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
  abilityList: AbilityName[];
  format: "complex" | "simple" | "resist" | "weak";
}

export function MatchupsTeam({
  generation,
  typesList,
  format,
  abilityList,
}: MatchupsTeamProps) {
  const { t } = useTranslation();
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
        const eff = matchupFor({
          generation,
          defenseTypes: types,
          offenseType: genType,
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
    return (
      <p className="fg4 f4 b m0 ba tc ma0 ph2 pv4 border3 br2">
        {t("defense.team.empty")}
      </p>
    );
  }

  return (
    <div className="br2 focus-simple ba bg1 button-shadow pa2 border2">
      <div className="overflow-x-auto focus-none" tabIndex={0}>
        <table className="collapse tc w-100">
          <thead>
            <tr className="bb border3">
              <th className="pa2 w0">{t("defense.team.type")}</th>
              {matchers.map((m) => {
                return (
                  <th key={m.name} className="pa2">
                    {m.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(([type, ...counts]) => {
              return (
                <tr key={type} className="bt border3 tabular-nums">
                  <th className="pv1">
                    <Badge type={type} />
                  </th>
                  {counts.map((count, i) => {
                    const display =
                      count === 0 ? <span className="o-10">-</span> : count;
                    return (
                      <td key={i} className="pv2 ph2">
                        {display}
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
