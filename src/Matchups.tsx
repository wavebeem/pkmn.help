import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG, typeColorBorder } from "./colors";
import { Generation } from "./data-generations";
import { defensiveMatchups, offensiveMatchups } from "./data-matchups";
import { Type } from "./data-types";

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
        "b f5 lh-title tc"
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
      <div className="flex flex-wrap gap1 MatchupsSection-Container">
        {types.map((t) => (
          <Badge key={`type-${t}`} type={t} />
        ))}
      </div>
    </div>
  );
}

interface MatchupsProps {
  kind: "offense" | "defense";
  generation: Generation;
  types: Type[];
}

export function Matchups({ kind, generation, types }: MatchupsProps) {
  const { t } = useTranslation();
  const formatTitle: (x: string) => string =
    kind === "offense"
      ? (x) => t("offense.dealsXTo", { x })
      : (x) => t("defense.takesXFrom", { x });
  const matchups =
    kind === "offense"
      ? offensiveMatchups(generation, types)
      : defensiveMatchups(generation, types);
  return (
    <div id={`matchup-${kind}`}>
      {effectivenessLevels.map((eff) => {
        return (
          <Section
            key={eff}
            title={formatTitle(effectivenessDisplay[eff])}
            types={matchups.typesFor(eff)}
          />
        );
      })}
    </div>
  );
}

const effectivenessLevels = [8, 4, 2, 1, 1 / 2, 1 / 4, 1 / 8, 0];

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
