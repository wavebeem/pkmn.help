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

function Badge(props: BadgeProps) {
  return (
    <div
      className={classnames(
        `type-bg-dark type-${props.type}`,
        "ba b--black-10",
        "ph1 pv1 br1",
        "ttc tc b f5"
      )}
      style={{ width: 80, margin: "0.125rem" }}
    >
      {props.type}
    </div>
  );
}

interface SectionProps {
  title: string;
  types: Type[];
}

function Section(props: SectionProps) {
  if (props.types.length === 0) {
    return null;
  }
  return (
    <div>
      <h3 className="f5 mt3 mb0 dark-gray">{props.title}</h3>
      <div className="mw5 center MatchupsSection-Container">
        {props.types.map(t => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

interface MatchupsProps {
  formatTitle: (value: string) => string;
  matchups: GroupedMatchups;
}

function Matchups({ formatTitle, matchups }: MatchupsProps) {
  return (
    <div className="tc">
      <Section
        title={formatTitle("4×")}
        types={matchups.typesFor(Effectiveness.QUADRUPLE)}
      />
      <Section
        title={formatTitle("2×")}
        types={matchups.typesFor(Effectiveness.DOUBLE)}
      />
      <Section
        title={formatTitle("1×")}
        types={matchups.typesFor(Effectiveness.REGULAR)}
      />
      <Section
        title={formatTitle("½×")}
        types={matchups.typesFor(Effectiveness.HALF)}
      />
      <Section
        title={formatTitle("¼×")}
        types={matchups.typesFor(Effectiveness.QUARTER)}
      />
      <Section
        title={formatTitle("0×")}
        types={matchups.typesFor(Effectiveness.ZERO)}
      />
    </div>
  );
}

export interface DefenseProps {
  type1: Type;
  type2: Type;
}

export function Defense(props: DefenseProps) {
  return (
    <Matchups
      formatTitle={x => `Takes ${x} from`}
      matchups={defensiveMatchups(props.type1, props.type2)}
    />
  );
}

Defense.displayName = "Matchups.Defense";

export interface OffenseProps {
  type: Type;
}

export function Offense(props: OffenseProps) {
  return (
    <Matchups
      formatTitle={x => `Deals ${x} to`}
      matchups={offensiveMatchups(props.type)}
    />
  );
}

Offense.displayName = "Matchups.Offense";
