import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import {
  CoverageType,
  defensiveMatchups,
  GroupedMatchups,
  offensiveMatchups,
  Type,
} from "./data";
import DexCoverage from "./DexCoverage";

interface BadgeProps {
  type: Type;
}

function Badge({ type }: BadgeProps) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        "type-bg",
        "ba border-vibrant",
        "br2",
        "ttc tc b f5 lh-title"
      )}
      style={{
        width: 80,
        margin: "0.125rem",
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className="br1 ba b--transparent white truncate"
        style={{
          background: typeColorBG(type),
          borderColor: typeColorBorder(type),
        }}
      >
        {t(`types.${type}`)}
      </div>
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
      <h2 className="f5 mt3 mb0">{title}</h2>
      <div className="mw5 center MatchupsSection-Container">
        {types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

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
  const { t } = useTranslation();
  return (
    <div className="tc pt2" id={`matchup-${kind}`}>
      {kind === "offense" ? (
        <div>
          <h2 className="f5 mt3 mb0">
            {t("offense.weaknessCoverage")}{" "}
            <span className="normal">
              (
              <Link
                to="/offense/coverage/"
                className="underline fg-link br1 OutlineFocus"
                aria-label={t("offense.weaknessCoverageEditLong")}
              >
                {t("offense.weaknessCoverageEdit")}
              </Link>
              )
            </span>
          </h2>
          <div
            className={classNames(
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
      {effectivenessLevels.map((eff) => {
        return (
          <Section
            key={eff}
            title={formatTitle(displayEffectiveness[eff])}
            types={matchups.typesFor(eff)}
          />
        );
      })}
    </div>
  );
}

const effectivenessLevels = [8, 4, 2, 1, 1 / 2, 1 / 4, 1 / 8, 0];

const displayEffectiveness = {
  [8]: "8×",
  [4]: "4×",
  [2]: "2×",
  [1]: "1×",
  [1 / 2]: "½×",
  [1 / 4]: "¼×",
  [1 / 8]: "⅛×",
  [0]: "0×",
};

export interface DefenseProps {
  types: Type[];
  fallbackCoverageTypes: CoverageType[];
}

export function Defense({ types, fallbackCoverageTypes }: DefenseProps) {
  const { t } = useTranslation();
  return (
    <Matchups
      kind="defense"
      types={types}
      formatTitle={(x) => t("defense.takesXFrom", { x })}
      matchups={defensiveMatchups(types)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={false}
    />
  );
}

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
  const { t } = useTranslation();
  return (
    <Matchups
      kind="offense"
      types={types}
      coverageTypes={coverageTypes}
      formatTitle={(x) => t("offense.dealsXTo", { x })}
      matchups={offensiveMatchups(types)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={isLoading}
    />
  );
}
