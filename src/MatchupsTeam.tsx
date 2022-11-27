import * as React from "react";
import { groupBy, sortBy } from "lodash";
import { Badge } from "./Badge";
import { Generation } from "./data-generations";
import { defensiveMatchups } from "./data-matchups";
import { Type } from "./data-types";
import { useTranslation } from "react-i18next";
import { assertNever } from "./assertNever";

const effectivenessDisplay = {
  weak: "≥ 2×",
  resist: "≤ ½×",
  immune: "0×",
  [8]: "8×",
  [4]: "4×",
  [2]: "2×",
  [1]: "1×",
  [1 / 2]: "½×",
  [1 / 4]: "¼×",
  [1 / 8]: "⅛×",
  [0]: "0×",
};

// TODO: Simplify this abstraction by pulling all the logic into a type enum and
// a switch statement with all the logic in here... then the UI can just use
// lists of predefined matchers easily
class Matcher {
  readonly name: string;
  readonly createMatcher: (
    type: Type
  ) => (matchup: {
    type: Type;
    effectiveness: number;
    count: number;
  }) => boolean;

  constructor({
    name,
    createMatcher,
  }: {
    name: Matcher["name"];
    createMatcher: Matcher["createMatcher"];
  }) {
    this.name = name;
    this.createMatcher = createMatcher;
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

  // Type + Effectiveness => amount
  const map = new Map<string, number>();
  for (const types of typesList) {
    const groupedMatchups = defensiveMatchups(generation, types);
    for (const matchup of groupedMatchups.matchups) {
      const key = JSON.stringify({
        type: matchup.type,
        effectiveness: matchup.effectiveness,
      });
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }

  const data1 = Array.from(map.entries()).map(([key, count]) => {
    const { type, effectiveness }: { type: Type; effectiveness: number } =
      JSON.parse(key);
    return { type, effectiveness, count };
  });
  const data2 = sortBy(
    data1,
    ({ type }) => type,
    ({ effectiveness }) => -effectiveness
  );
  // const data3 = groupBy(data2, ({ type }) => type);
  // Type error with lodash groupBy...
  const data3 = groupBy(data2, ({ type }) => type) as any as Record<
    Type,
    typeof data2
  >;

  let matchers: Matcher[] = [];

  switch (format) {
    case "complex":
      matchers = [
        // TODO: Add 8x matcher if 3 types are enabled...
        new Matcher({
          name: effectivenessDisplay[4],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness >= 4;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[2],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 2;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[1],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 1;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[1 / 2],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 1 / 2;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[1 / 4],
          createMatcher: (type) => (matchup) => {
            return (
              matchup.type === type &&
              matchup.effectiveness <= 1 / 4 &&
              matchup.effectiveness !== 0
            );
          },
        }),
        // TODO: Add 1/8x matcher if 3 types are enabled...
        new Matcher({
          name: effectivenessDisplay[0],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 0;
          },
        }),
      ];
      break;
    case "simple":
      matchers = [
        new Matcher({
          name: effectivenessDisplay.weak,
          createMatcher: (type) => (matchup) => {
            return type === matchup.type && matchup.effectiveness > 1;
          },
        }),
        new Matcher({
          name: effectivenessDisplay.resist,
          createMatcher: (type) => (matchup) => {
            return (
              type === matchup.type &&
              matchup.effectiveness < 1 &&
              matchup.effectiveness !== 0
            );
          },
        }),
        new Matcher({
          name: effectivenessDisplay.immune,
          createMatcher: (type) => (matchup) => {
            return type === matchup.type && matchup.effectiveness === 0;
          },
        }),
      ];
      break;
    case "resist":
      matchers = [
        new Matcher({
          name: effectivenessDisplay[1 / 2],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 1 / 2;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[1 / 4],
          createMatcher: (type) => (matchup) => {
            return (
              matchup.type === type &&
              matchup.effectiveness <= 1 / 4 &&
              matchup.effectiveness !== 0
            );
          },
        }),
        // TODO: Add 1/8x matcher if 3 types are enabled...
        new Matcher({
          name: effectivenessDisplay[0],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 0;
          },
        }),
      ];
      break;
    case "weak":
      matchers = [
        // TODO: Add 8x matcher if 3 types are enabled...
        new Matcher({
          name: effectivenessDisplay[4],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness >= 4;
          },
        }),
        new Matcher({
          name: effectivenessDisplay[2],
          createMatcher: (type) => (matchup) => {
            return matchup.type === type && matchup.effectiveness === 2;
          },
        }),
      ];
      break;
    default:
      assertNever(format);
  }

  if (typesList.length === 0) {
    return (
      <p className="fg4 f4 b m0 ba tc ma0 ph2 pv4 border3 br2">
        {t("defense.team.empty")}
      </p>
    );
  }

  return (
    <div id={`MatchupsTeam-${kind}`}>
      <div className="br2 SimpleFocus ba bg1 button-shadow pa2 border2">
        <div className="overflow-x-auto" tabIndex={0}>
          <table className="collapse tc w-100 tabular-nums mr2">
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
              {Object.entries(data3).map(([type_, matchups]) => {
                const type = type_ as Type;
                return (
                  <tr key={type} className="bt border3">
                    <th className="pv1">
                      <Badge type={type} />
                    </th>
                    {matchers.map((m) => {
                      // TODO: Fix the data structure to match the UI so I don't
                      // have to use `.find` inside a `.map` lol
                      const count = matchups.find(m.createMatcher(type))
                        ?.count ?? <span className="o-10">-</span>;
                      return (
                        <td key={m.name + type} className="pv2 ph3">
                          {count}
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
    </div>
  );
}
