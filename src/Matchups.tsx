import React from "react";
import classnames from "classnames";

import {
  Type,
  Effectiveness,
  GroupedMatchups,
  defensiveMatchups,
  offensiveMatchups
} from "./data";

interface BadgeProps {
  type: Type;
}

function Badge({ type }: BadgeProps) {
  const style = { width: 120, margin: "0.125rem" };
  const className = classnames(
    `type-bg type-${type}`,
    "ba b--black-20",
    "pv2 br1",
    "ttc tc b f5"
  );
  return (
    <div className={className} style={style}>
      {type}
    </div>
  );
}

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
      <h3 className="f4 mt3 mb0 dark-gray">{title}</h3>
      <div className="mw6 center MatchupsSection-Container">
        {types.map(t => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

interface MatchupsProps {
  makePrefix: (value: string) => string;
  matchups: GroupedMatchups;
}

function Matchups({ makePrefix, matchups }: MatchupsProps) {
  return (
    <div className="tc">
      <Section
        title={makePrefix("4×")}
        types={matchups.typesFor(Effectiveness.QUADRUPLE)}
      />
      <Section
        title={makePrefix("2×")}
        types={matchups.typesFor(Effectiveness.DOUBLE)}
      />
      <Section
        title={makePrefix("1×")}
        types={matchups.typesFor(Effectiveness.REGULAR)}
      />
      <Section
        title={makePrefix("½×")}
        types={matchups.typesFor(Effectiveness.HALF)}
      />
      <Section
        title={makePrefix("¼×")}
        types={matchups.typesFor(Effectiveness.QUARTER)}
      />
      <Section
        title={makePrefix("0×")}
        types={matchups.typesFor(Effectiveness.ZERO)}
      />
    </div>
  );
}

export interface DefenseProps {
  type1: Type;
  type2: Type;
}

export function Defense({ type1, type2 }: DefenseProps) {
  const matchups = defensiveMatchups(type1, type2);
  return <Matchups makePrefix={x => `takes ${x} from`} matchups={matchups} />;
}

Defense.displayName = "Matchups.Defense";

export interface OffenseProps {
  type: Type;
}

export function Offense({ type }: OffenseProps) {
  const matchups = offensiveMatchups(type);
  return <Matchups makePrefix={x => `deals ${x} to`} matchups={matchups} />;
}

Offense.displayName = "Matchups.Offense";
