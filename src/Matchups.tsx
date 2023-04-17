import * as React from "react";
import { useTranslation } from "react-i18next";
import { Generation } from "./data-generations";
import { defensiveMatchups, offensiveMatchups } from "./data-matchups";
import { Type } from "./data-types";
import { Badge } from "./Badge";

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
      <div className="MatchupsSection-Container">
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
