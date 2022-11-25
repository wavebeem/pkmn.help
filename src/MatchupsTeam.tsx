import * as React from "react";
import { groupBy, mapValues, sortBy } from "lodash";
import { useTranslation } from "react-i18next";
import { Badge } from "./Badge";
import { Generation } from "./data-generations";
import { defensiveMatchups } from "./data-matchups";
import { Type, typesForGeneration } from "./data-types";
import {
  matchupEffectivenessLevels,
  matchupDisplayEffectiveness,
} from "./Matchups";

interface SectionProps {
  title: string;
  types: Type[];
}

function Section({ title, types }: SectionProps) {
  if (types.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 className="f5 mt4 mb2">{title}</h2>
      <div className="flex flex-wrap gap1 MatchupsSection-Container">
        {types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

interface MatchupsTeamProps {
  kind: "defense";
  generation: Generation;
  typesList: Type[][];
}

export function MatchupsTeam({
  kind,
  generation,
  typesList,
}: MatchupsTeamProps) {
  const { t } = useTranslation();
  const formatTitle: (x: string) => string = (x) =>
    t("defense.takesXFrom", { x });

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
  // TODO: Sort data by effectiveness level, then type
  const data2 = sortBy(
    data1,
    ({ type }) => type,
    ({ effectiveness }) => -effectiveness
  );
  const data3 = groupBy(data2, ({ type }) => type);

  return (
    <div id={`MatchupsTeam-${kind}`}>
      {data2.map(({ type, effectiveness, count }) => {
        return (
          <div
            key={`${type}.${effectiveness}`}
            className="flex justify-between gap2 bb border3 pv2"
          >
            <span className="tabular-nums">
              <b className="dib" style={{ minWidth: "6ch" }}>
                {matchupDisplayEffectiveness[effectiveness]}
              </b>{" "}
              {count}
            </span>
            <Badge type={type} />
          </div>
        );
      })}
      {/* <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data3, null, 2)}
      </pre> */}
      {/* {matchupEffectivenessLevels.map((eff) => {
        return (
          <Section
            key={eff}
            title={formatTitle(matchupDisplayEffectiveness[eff])}
            types={matchups.typesFor(eff)}
          />
        );
      })} */}
    </div>
  );
}
