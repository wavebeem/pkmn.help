import { clsx } from "clsx";
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
import { CollapsibleSection } from "./CollapsibleSection";
import { Divider } from "./Divider";
import { Meter } from "./Meter";
import { Icon } from "./Icon";
import { Card } from "./Card";
import { EmptyState } from "./EmptyState";

interface MatchupsProps {
  kind: "offense-single" | "offense-combination" | "defense";
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
  if (kind === "offense-single" || kind === "offense-combination") {
    matchups = offensiveMatchups({
      gen: generation,
      offenseTypes: types,
      specialMoves,
      offenseAbilities,
      kind: kind === "offense-combination" ? "combination" : "single",
    });
    if (types.includes(Type.stellar)) {
      matchups.matchups.unshift({
        types: [Type.stellar],
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
  const effs = [4, 2, 1, 0.5, 0.25, 0] as const;

  function getPercent(count: number, total: number): string {
    const value = Number(((count / total || 0) * 100).toFixed(1));
    return value.toLocaleString(i18n.languages);
  }

  if (kind === "offense-combination") {
    return (
      <div id={`matchup-${kind}`}>
        <Flex direction="column" gap="xlarge">
          <Flex direction="column" gap="small">
            <FancyText tag="h2" fontWeight="medium" fontSize="large">
              {t("offense.matchups.summary.heading")}
            </FancyText>

            <Card size="small">
              <table className={styles.offenseSummary}>
                <thead>
                  <tr>
                    <th>{t("offense.matchups.summary.damage")}</th>
                    <th>
                      {t("offense.matchups.summary.combinations.heading")} (
                      {matchups.matchups.length})
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {effs.map((eff) => {
                    return (
                      <tr>
                        <td className={styles.tableNumber}>
                          {formatEffectiveness(eff, i18n.languages)}
                        </td>
                        <td>
                          <Meter
                            value={matchups.typesFor(eff).length}
                            max={matchups.matchups.length}
                            background="var(--color-bg-ghost)"
                          />
                        </td>
                        <td className={styles.tableNumber}>
                          {getPercent(
                            matchups.typesFor(eff).length,
                            matchups.matchups.length,
                          )}
                          %
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </Flex>

          <Flex direction="column" gap="small">
            <FancyText tag="h2" fontWeight="medium" fontSize="large">
              {t("offense.matchups.types.heading")}
            </FancyText>
            <Card size="small">
              {effs.map((eff, i) => {
                const list = matchups.matchups.filter(
                  (m) => m.effectiveness === eff,
                );
                const effectivenessDisplay = formatEffectiveness(
                  eff,
                  i18n.languages,
                );
                return (
                  <Flex direction="column" gap="none" key={i}>
                    {i > 0 ? <Divider /> : null}
                    <CollapsibleSection
                      size="small"
                      // Ensure the open/closed state doesn't bleed over from
                      // different groups
                      key={`${eff}-${i}`}
                      heading={
                        <FancyText
                          tag="h3"
                          fontWeight="normal"
                          fontSize="medium"
                        >
                          <Flex>
                            <div>
                              {t("offense.dealsXTo", {
                                x: effectivenessDisplay,
                              })}
                            </div>
                            <Flex flex="auto" />
                            <div>{matchups.typesFor(eff).length}</div>
                            <div>&nbsp;&nbsp;</div>
                          </Flex>
                        </FancyText>
                      }
                    >
                      {list.length === 0 && (
                        <EmptyState borderless>
                          {t("offense.matchups.summary.combinations.empty")}
                        </EmptyState>
                      )}
                      <div className={clsx(styles.grid)} data-kind={kind}>
                        {list.map((x) => {
                          if (x.formName === "stellar") {
                            return (
                              <>
                                <PlainBadge key="form-tera" size="regular">
                                  {t("offense.teraPokemon")}
                                </PlainBadge>
                                <div />
                                <div />
                              </>
                            );
                          }
                          return x.types.map((t, i) => {
                            return (
                              <>
                                {i > 0 ? <Icon name="plus" size={32} /> : null}
                                <Badge
                                  key={`type-${t}`}
                                  type={t}
                                  variant="ghost"
                                />
                              </>
                            );
                          });
                        })}
                      </div>
                    </CollapsibleSection>
                  </Flex>
                );
              })}
            </Card>
          </Flex>
        </Flex>
      </div>
    );
  }

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
                {kind === "offense-single"
                  ? t("offense.dealsXTo", { x: effectivenessDisplay })
                  : t("defense.takesXFrom", { x: effectivenessDisplay })}
              </FancyText>
              <div className={clsx(styles.grid)} data-kind={kind}>
                {list.map((x) => {
                  if (x.formName === "stellar") {
                    return (
                      <PlainBadge key="form-tera" size="full-width">
                        {t("offense.teraPokemon")}
                      </PlainBadge>
                    );
                  }
                  const displayTypes =
                    kind === "offense-single" ? x.types.slice(0, 1) : x.types;
                  return displayTypes.map((t) => {
                    return <Badge key={`type-${t}`} type={t} />;
                  });
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
  locales: readonly string[],
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
