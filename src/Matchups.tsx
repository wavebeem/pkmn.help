import * as React from "react";
import { useTranslation } from "react-i18next";
import { Generation } from "./data-generations";
import { defensiveMatchups, offensiveMatchups } from "./data-matchups";
import { AbilityName, Type } from "./data-types";
import { Badge } from "./Badge";
import styles from "./Matchups.module.css";
import { PlainBadge } from "./PlainBadge";
import classNames from "classnames";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2 className="f4 weight-medium mt4 mb2">{title}</h2>
      <div className={classNames("grid gap1", styles.matchups)}>{children}</div>
    </div>
  );
}

interface MatchupsProps {
  kind: "offense" | "defense";
  generation: Generation;
  types: Type[];
  teraType: Type;
  ability: AbilityName;
}

export function Matchups({
  kind,
  generation,
  types,
  teraType,
  ability,
}: MatchupsProps) {
  const { t, i18n } = useTranslation();
  const formatTitle: (x: string) => string =
    kind === "offense"
      ? (x) => t("offense.dealsXTo", { x })
      : (x) => t("defense.takesXFrom", { x });
  const matchups =
    kind === "offense"
      ? offensiveMatchups({ gen: generation, offenseTypes: types })
      : defensiveMatchups({
          gen: generation,
          defenseTypes: types,
          defenseTeraType: teraType,
          abilityName: ability,
        });
  if (types.includes(Type.stellar)) {
    matchups.matchups.unshift({
      type: Type.stellar,
      generation,
      effectiveness: 2,
      formName: "stellar",
    });
  }
  const grouped = matchups.groupByEffectiveness();
  return (
    <div id={`matchup-${kind}`}>
      {grouped.map((list) => {
        if (list.length === 0) {
          return null;
        }
        const eff = list[0].effectiveness;
        return (
          <Section
            key={eff}
            title={formatTitle(formatEffectiveness(eff, i18n.languages))}
          >
            {list.map((x) => {
              if (kind === "offense" && x.formName === "stellar") {
                return (
                  <PlainBadge key="form-tera">
                    {t("offense.teraPokemon")}
                  </PlainBadge>
                );
              }
              return <Badge key={`type-${x.type}`} type={x.type} />;
            })}
          </Section>
        );
      })}
    </div>
  );
}

function formatEffectiveness(
  eff: number | undefined,
  locales: readonly string[]
): string {
  const times = "\u{00d7}";
  const ndash = "\u{2013}";
  if (eff == undefined) {
    return ndash; // n-dash
  }
  if (Number.isNaN(eff)) {
    return "???";
  }
  // Avoid showing too many decimal places
  const number = Number(eff.toFixed(3));
  return number.toLocaleString(locales) + times;
}
