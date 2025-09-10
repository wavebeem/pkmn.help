import classNames from "classnames";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { characters } from "../misc/characters";
import { Generation } from "../misc/data-generations";
import {
  defensiveMatchups,
  GroupedMatchups,
  offensiveMatchups,
} from "../misc/data-matchups";
import { AbilityName, SpecialMove, Type } from "../misc/data-types";
import { Badge } from "./Badge";
import { FancyText } from "./FancyText";
import { Flex } from "./Flex";
import styles from "./Matchups.module.css";
import { PlainBadge } from "./PlainBadge";

interface MatchupsProps {
  kind: "offense" | "defense";
  generation: Generation;
  types: Type[];
  teraType: Type;
  ability: AbilityName;
  offenseAbilities: readonly AbilityName[];
  specialMoves: readonly SpecialMove[];
}

export function Matchups({
  kind,
  generation,
  types,
  teraType,
  ability,
  specialMoves,
  offenseAbilities,
}: MatchupsProps): ReactNode {
  const { t, i18n } = useTranslation();
  let matchups: GroupedMatchups;
  if (kind === "offense") {
    matchups = offensiveMatchups({
      gen: generation,
      offenseTypes: types,
      specialMoves,
      offenseAbilities,
    });
    if (types.includes(Type.stellar)) {
      matchups.matchups.unshift({
        type: Type.stellar,
        generation,
        effectiveness: 2,
        formName: "stellar",
      });
    }
  } else {
    matchups = defensiveMatchups({
      gen: generation,
      defenseTypes: types,
      defenseTeraType: teraType,
      abilityName: ability,
    });
  }
  const grouped = matchups.groupByEffectiveness();
  return (
    <div id={`matchup-${kind}`}>
      <Flex direction="column" gap="xlarge">
        {grouped.map((list, i) => {
          if (list.length === 0) {
            return null;
          }
          const eff = list[0].effectiveness;
          const effectivenessDisplay = formatEffectiveness(eff, i18n.languages);
          return (
            <Flex direction="column" gap="medium" key={i}>
              <FancyText tag="h2" fontWeight="medium" fontSize="large">
                {kind === "offense"
                  ? t("offense.dealsXTo", { x: effectivenessDisplay })
                  : t("defense.takesXFrom", { x: effectivenessDisplay })}
              </FancyText>
              <div className={classNames(styles.grid)}>
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
              </div>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
}

function formatEffectiveness(
  eff: number | undefined,
  locales: readonly string[]
): string {
  if (eff == undefined) {
    return characters.ndash;
  }
  if (Number.isNaN(eff)) {
    return "???";
  }
  // Avoid showing too many decimal places
  const number = Number(eff.toFixed(3));
  return number.toLocaleString(locales) + characters.times;
}
