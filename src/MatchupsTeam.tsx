import * as React from "react";
import { groupBy, sortBy } from "lodash";
import { Badge } from "./Badge";
import { Generation } from "./data-generations";
import { defensiveMatchups } from "./data-matchups";
import { Type } from "./data-types";
import { useTranslation } from "react-i18next";
import { assertNever } from "./assertNever";

const effectivenessDisplay = {
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
  displayType: "complex" | "simple" | "resist" | "weak";
}

export function MatchupsTeam({
  kind,
  generation,
  typesList,
  displayType,
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

  switch (displayType) {
    case "complex":
      // Already has the correct default value above
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
          name: "≥ " + effectivenessDisplay[2],
          createMatcher: (type) => (matchup) => {
            return type === matchup.type && matchup.effectiveness > 1;
          },
        }),
        new Matcher({
          name: "≤ " + effectivenessDisplay[1 / 2],
          createMatcher: (type) => (matchup) => {
            return (
              type === matchup.type &&
              matchup.effectiveness < 1 &&
              matchup.effectiveness !== 0
            );
          },
        }),
        new Matcher({
          name: effectivenessDisplay[0],
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
      assertNever(displayType);
  }

  return (
    <div id={`MatchupsTeam-${kind}`}>
      <div className="overflow-x-auto">
        <table className="collapse tc tabular-nums">
          <thead>
            <tr>
              <th className="pv2 ph2 w0">{t("defense.team.type")}</th>
              {matchers.map((m) => {
                return (
                  <th key={m.name} className="pv2 ph2 bb border3">
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
                <tr key={type} className="">
                  <th className="pv1 pr2">
                    <Badge type={type} />
                  </th>
                  {matchers.map((m) => {
                    // TODO: Fix the data structure to match the UI so I don't
                    // have to use `.find` inside a `.map` lol
                    const count = matchups.find(m.createMatcher(type))
                      ?.count ?? <span className="o-0">0</span>;
                    return (
                      <td key={m.name + type} className="pv2 ph3 ba border3">
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
      {/* {Object.entries(data3).map(([type_, matchups]) => {
        const type = type_ as Type;
        return (
          <div
            key={type}
            className="flex justify-between items-start gap2 bb border3 pv2"
          >
            <Badge type={type} />
            <div className="flex flex-wrap gap3">
              {matchups.map(({ effectiveness, count }) => {
                const key = [type, effectiveness, count].join(".");
                return (
                  <div
                    key={key}
                    className="tabular-nums ba ph2 bg1 border3 pa1 br-pill"
                  >
                    <b>{matchupDisplayEffectiveness[effectiveness]}</b>
                    {}&nbsp;&rarr;&nbsp;{count}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })} */}
      {/* <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data3, null, 2)}
      </pre> */}
    </div>
  );
}
