import * as React from "react";
import { Badge } from "./Badge";
import { Generation } from "./data-generations";
import { matchupFor } from "./data-matchups";
import { Type, typesForGeneration } from "./data-types";
import { useTranslation } from "react-i18next";
import { assertNever } from "./assertNever";
import { useTypeCount } from "./useTypeCount";
import { compact } from "./compact";

const matchupKeys = [
  "weak",
  "resist",
  "8",
  "4",
  "2",
  "1",
  "1/2",
  "1/4",
  "1/8",
  "0",
] as const;
type MatchupKey = typeof matchupKeys[number];

const effectivenessDisplay = {
  weak: "≥ 2×",
  resist: "≤ ½×",
  "8": "8×",
  "4": "4×",
  "2": "2×",
  "1": "1×",
  "1/2": "½×",
  "1/4": "¼×",
  "1/8": "⅛×",
  "0": "0×",
};

class Matcher {
  constructor(readonly key: MatchupKey) {}

  get name(): string {
    return effectivenessDisplay[this.key];
  }

  match(eff: number): boolean {
    switch (this.key) {
      case "weak":
        return eff > 1;
      case "resist":
        return eff < 1 && eff !== 0;
      case "8":
        return eff === 8;
      case "4":
        return eff === 4;
      case "2":
        return eff === 2;
      case "1":
        return eff === 1;
      case "1/2":
        return eff === 1 / 2;
      case "1/4":
        return eff === 1 / 4;
      case "1/8":
        return eff === 1 / 8;
      case "0":
        return eff === 0;
      default:
        assertNever(this.key);
    }
  }
}

export interface MatchupsTeamProps {
  kind: "defense";
  generation: Generation;
  typesList: Type[][];
  format: "complex" | "simple" | "resist" | "weak";
}

export function MatchupsTeam({
  kind,
  generation,
  typesList,
  format,
}: MatchupsTeamProps) {
  const { t } = useTranslation();

  const [typeCount] = useTypeCount();

  const generationTypes = typesForGeneration(generation);

  const matchers: Matcher[] = (() => {
    switch (format) {
      case "complex":
        return compact([
          typeCount === "3" && new Matcher("8"),
          new Matcher("4"),
          new Matcher("2"),
          new Matcher("1"),
          new Matcher("1/2"),
          new Matcher("1/4"),
          typeCount === "3" && new Matcher("1/8"),
          new Matcher("0"),
        ]);
      case "simple":
        return [new Matcher("weak"), new Matcher("resist"), new Matcher("0")];
      case "resist":
        return compact([
          new Matcher("1/2"),
          new Matcher("1/4"),
          typeCount === "3" && new Matcher("1/8"),
          new Matcher("0"),
        ]);
      case "weak":
        return compact([
          typeCount === "3" && new Matcher("8"),
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
      for (const types of typesList) {
        const eff = matchupFor(generation, types, genType);
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
    <div className="br2 SimpleFocus ba bg1 button-shadow pa2 border2">
      <div className="overflow-x-auto NoFocus" tabIndex={0}>
        <table className="collapse tc w-100 tabular-nums">
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
                <tr key={type} className="bt border3">
                  <th className="pv1">
                    <Badge type={type} />
                  </th>
                  {counts.map((count, i) => {
                    const display =
                      count === 0 ? <span className="o-10">-</span> : count;
                    return (
                      <td key={i} className="pv2 ph3">
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
