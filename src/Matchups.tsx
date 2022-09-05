import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import {
  defensiveMatchups,
  GroupedMatchups,
  offensiveMatchups,
} from "./data-matchups";
import { Generation } from "./data-generations";
import { CoverageType, Type } from "./data-types";
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
        "b f5 lh-title"
      )}
      style={{
        padding: 2,
        ["--type-color" as any]: typeColor(type),
      }}
    >
      <div
        className="br1 ba b--transparent white truncate"
        style={{
          paddingLeft: 4,
          paddingRight: 4,
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
      <h2 className="f5 mt4 mb2">{title}</h2>
      <div className="center flex flex-wrap gap1 justify-center MatchupsSection-Container">
        {types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

interface MatchupsProps {
  generation: Generation;
  coverageTypes?: CoverageType[];
  kind: "offense" | "defense";
  types: Type[];
  formatTitle: (value: string) => string;
  matchups: GroupedMatchups;
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

function Matchups({
  generation,
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
    <div className="tc" id={`matchup-${kind}`}>
      {kind === "offense" && generation === "default" && (
        <div>
          <h2 className="f5 mt3 mb0">{t("offense.coverage.heading")}</h2>
          <div className="pt2">
            <Link
              to="/offense/coverage/"
              className="underline fg-link br1 OutlineFocus"
            >
              {t("offense.coverage.edit")}
            </Link>{" "}
            ({coverageTypes?.length ?? 0})
          </div>
          <div
            className={classNames(
              "pt2 mw5 center tc",
              isLoading && ["o-30 no-pointer cursor-na"]
            )}
          >
            <DexCoverage
              generation={generation}
              coverageTypes={coverageTypes ?? fallbackCoverageTypes}
              types={types}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
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
  generation: Generation;
  types: Type[];
  fallbackCoverageTypes: CoverageType[];
}

export function Defense({
  generation,
  types,
  fallbackCoverageTypes,
}: DefenseProps) {
  const { t } = useTranslation();
  return (
    <Matchups
      generation={generation}
      kind="defense"
      types={types}
      formatTitle={(x) => t("defense.takesXFrom", { x })}
      matchups={defensiveMatchups(generation, types)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={false}
    />
  );
}

export interface OffenseProps {
  generation: Generation;
  coverageTypes?: CoverageType[];
  setCoverageTypes: (types: CoverageType[]) => void;
  types: Type[];
  fallbackCoverageTypes: CoverageType[];
  isLoading: boolean;
}

export function Offense({
  generation,
  coverageTypes,
  types,
  fallbackCoverageTypes,
  isLoading,
}: OffenseProps) {
  const { t } = useTranslation();
  return (
    <Matchups
      generation={generation}
      kind="offense"
      types={types}
      coverageTypes={coverageTypes}
      formatTitle={(x) => t("offense.dealsXTo", { x })}
      matchups={offensiveMatchups(generation, types)}
      fallbackCoverageTypes={fallbackCoverageTypes}
      isLoading={isLoading}
    />
  );
}
