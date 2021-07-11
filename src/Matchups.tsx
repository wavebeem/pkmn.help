import classnames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  CoverageType,
  defensiveMatchups,
  Effectiveness,
  GroupedMatchups,
  offensiveMatchups,
  Type,
} from "./data";
import DexCoverage from "./DexCoverage";
import { cssType } from "./main";

interface BadgeProps {
  type: Type;
}

function Badge({ type }: BadgeProps) {
  return (
    <div
      className={classnames(
        `type-bg-dark`,
        cssType(type),
        "ba border3",
        "ph1 pv1 br1",
        "ttc tc b f5"
      )}
      style={{ width: 80, margin: "0.125rem" }}
    >
      {type}
    </div>
  );
}

Badge.displayName = "Badge";

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
      <h3 className="f5 mt3 mb0">{title}</h3>
      <div className="mw5 center MatchupsSection-Container">
        {types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

Section.displayName = "Section";

interface MatchupsProps {
  coverageTypes?: CoverageType[];
  kind: "offense" | "defense";
  types: Type[];
  formatTitle: (value: string) => string;
  matchups: GroupedMatchups;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

function Matchups({
  coverageTypes,
  kind,
  types,
  formatTitle,
  matchups,
  fallbackCoverageTypes,
  isLoading,
}: MatchupsProps) {
  return (
    <div className="tc pt2" id={`matchup-${kind}`}>
      {kind === "offense" ? (
        <div>
          <h3 className="f5 mt3 mb0">
            Weakness Coverage{" "}
            <span className="normal">
              (
              <Link
                to="/offense/coverage"
                className="underline fg-link OutlineFocus"
              >
                edit
              </Link>
              )
            </span>
          </h3>
          <div
            className={classnames(
              "pt1 mw5 center tc",
              isLoading && ["o-30 no-pointer cursor-na"]
            )}
          >
            <DexCoverage
              coverageTypes={coverageTypes ?? fallbackCoverageTypes}
              types={types}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : null}
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

Matchups.displayName = "Matchups";

export interface DefenseProps {
  type1: Type;
  type2: Type;
  fallbackCoverageTypes: CoverageType[];
}

export function Defense({ type1, type2, fallbackCoverageTypes }: DefenseProps) {
  return (
    <Matchups
      kind="defense"
      types={[type1, type2]}
      formatTitle={(x) => `Takes ${x} From`}
      matchups={defensiveMatchups(type1, type2)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={false}
    />
  );
}

Defense.displayName = "Matchups.Defense";

export interface OffenseProps {
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  types: Type[];
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export function Offense({
  coverageTypes,
  types,
  fallbackCoverageTypes,
  isLoading,
}: OffenseProps) {
  return (
    <Matchups
      kind="offense"
      types={types}
      coverageTypes={coverageTypes}
      formatTitle={(x) => `Deals ${x} to`}
      matchups={offensiveMatchups(types)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={isLoading}
    />
  );
}

Offense.displayName = "Matchups.Offense";
