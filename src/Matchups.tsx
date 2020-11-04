import classnames from "classnames";
import * as React from "react";
import {
  defensiveMatchups,
  Effectiveness,
  GroupedMatchups,
  offensiveMatchups,
  Type,
} from "./data";

const DexCoverage = React.lazy(async () => {
  return await import(
    /* webpackChunkName: "DexCoverage" */
    /* webpackPrefetch: true */
    "./DexCoverage"
  );
});

interface BadgeProps {
  type: Type;
}

function Badge(props: BadgeProps) {
  return (
    <div
      className={classnames(
        `type-bg-dark type-${props.type}`,
        "ba b--black-20",
        "ph1 pv1 br1",
        "ttc tc b f5"
      )}
      style={{ width: 80, margin: "0.125rem" }}
    >
      {props.type}
    </div>
  );
}

Badge.displayName = "Badge";

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
        {props.types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

Section.displayName = "Section";

interface MatchupsProps {
  kind: "offense" | "defense";
  types: Type[];
  formatTitle: (value: string) => string;
  matchups: GroupedMatchups;
}

function Matchups(props: MatchupsProps) {
  return (
    <div className="tc pt2" id={`matchup-${props.kind}`}>
      {props.kind === "offense" ? (
        <div>
          <h3 className="f5 mt3 mb0 dark-gray">Weakness Coverage</h3>
          <div className="pt1 mw5 center tc">
            <React.Suspense
              fallback={<div className="Spinner mt2 f2 center" />}
            >
              <DexCoverage types={props.types} />
            </React.Suspense>
          </div>
        </div>
      ) : null}
      <Section
        title={props.formatTitle("4×")}
        types={props.matchups.typesFor(Effectiveness.QUADRUPLE)}
      />
      <Section
        title={props.formatTitle("2×")}
        types={props.matchups.typesFor(Effectiveness.DOUBLE)}
      />
      <Section
        title={props.formatTitle("1×")}
        types={props.matchups.typesFor(Effectiveness.REGULAR)}
      />
      <Section
        title={props.formatTitle("½×")}
        types={props.matchups.typesFor(Effectiveness.HALF)}
      />
      <Section
        title={props.formatTitle("¼×")}
        types={props.matchups.typesFor(Effectiveness.QUARTER)}
      />
      <Section
        title={props.formatTitle("0×")}
        types={props.matchups.typesFor(Effectiveness.ZERO)}
      />
    </div>
  );
}

Matchups.displayName = "Matchups";

export interface DefenseProps {
  type1: Type;
  type2: Type;
}

export function Defense(props: DefenseProps) {
  return (
    <Matchups
      kind="defense"
      types={[props.type1, props.type2]}
      formatTitle={(x) => `Takes ${x} From`}
      matchups={defensiveMatchups(props.type1, props.type2)}
    />
  );
}

Defense.displayName = "Matchups.Defense";

export interface OffenseProps {
  types: Type[];
}

export function Offense(props: OffenseProps) {
  return (
    <Matchups
      kind="offense"
      types={props.types}
      formatTitle={(x) => `Deals ${x} to`}
      matchups={offensiveMatchups(props.types)}
    />
  );
}

Offense.displayName = "Matchups.Offense";
