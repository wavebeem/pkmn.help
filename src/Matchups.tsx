import * as React from "react";
import { useTranslation } from "react-i18next";
import { Generation } from "./data-generations";
import { defensiveMatchups, offensiveMatchups } from "./data-matchups";
import { AbilityName, Type } from "./data-types";
import { Badge } from "./Badge";
import styles from "./Matchups.module.css";

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
      <div className={styles.matchups}>
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
  ability: AbilityName;
}

export function Matchups({ kind, generation, types, ability }: MatchupsProps) {
  const { t } = useTranslation();
  const formatTitle: (x: string) => string =
    kind === "offense"
      ? (x) => t("offense.dealsXTo", { x })
      : (x) => t("defense.takesXFrom", { x });
  const matchups =
    kind === "offense"
      ? offensiveMatchups(generation, types)
      : defensiveMatchups(generation, types, ability);
  const grouped = matchups.groupByEffectiveness();
  return (
    <div id={`matchup-${kind}`}>
      {grouped.map((list) => {
        const eff = list.length > 0 ? list[0].effectiveness : undefined;
        return (
          <Section
            key={eff}
            title={formatTitle(formatEffectiveness(eff))}
            types={list.map((x) => x.type)}
          />
        );
      })}
    </div>
  );
}

function formatEffectiveness(eff: number | undefined): string {
  switch (eff) {
    case 1 / 2:
      return "1⁄2×";
    case 1 / 4:
      return "1⁄4×";
    case 1 / 8:
      return "1⁄8×";
    case 1 / 16:
      return "1⁄16×";
    case 0:
      return "0×";
    case undefined:
      return "–"; // n-dash
    default:
      return `${eff}×`;
  }
}
