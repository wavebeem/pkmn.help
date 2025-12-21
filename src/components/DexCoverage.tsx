import { useTranslation } from "react-i18next";
import { Generation } from "../misc/data-generations";
import { partitionMatchups } from "../misc/data-matchups";
import {
  AbilityName,
  CoverageType,
  SpecialMove,
  Type,
} from "../misc/data-types";
import styles from "./DexCoverage.module.css";
import { FancyLink } from "./FancyLink";
import { FancyText } from "./FancyText";
import { Flex } from "./Flex";
import { Meter } from "./Meter";
import { Spinner } from "./Spinner";
import { ReactNode } from "react";

interface DexCoverageProps {
  generation: Generation;
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
  offenseAbilities: AbilityName[];
  specialMoves: SpecialMove[];
}

export function DexCoverage({
  generation,
  coverageTypes,
  types,
  isLoading,
  offenseAbilities,
  specialMoves,
}: DexCoverageProps): ReactNode {
  const { t, i18n } = useTranslation();
  const {
    resistance: resist,
    normal,
    weakness: weak,
  } = partitionMatchups({
    coverageTypes,
    types,
    generation,
    offenseAbilities,
    specialMoves,
  });
  const total = coverageTypes.length;

  function getPercent(count: number): string {
    const value = Number(((count / total || 0) * 100).toFixed(1));
    return value.toLocaleString(i18n.languages);
  }

  const params = new URLSearchParams({
    types: types.join(" "),
  });
  if (specialMoves.length > 0) {
    params.set("moves", specialMoves.join(" "));
  }
  if (offenseAbilities.length > 0) {
    params.set("abilities", offenseAbilities.join(" "));
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.root}>
      <Flex direction="column" gap="large">
        <Flex direction="column">
          <Meter
            value={weak.length}
            max={total}
            background="var(--color-bg-base)"
          />
          <Flex gap="medium">
            <div>
              {getPercent(weak.length)}%{" "}
              <FancyLink to={`/offense/coverage/weakness/?${params}`}>
                {t("offense.coverage.weakness")}
              </FancyLink>
            </div>
            <Flex flex="auto" />
            <FancyText tag="div" textAlign="right">
              ({weak.length.toLocaleString(i18n.languages)})
            </FancyText>
          </Flex>
        </Flex>

        <Flex direction="column">
          <Meter
            value={normal.length}
            max={total}
            background="var(--color-bg-base)"
          />
          <Flex gap="medium">
            <div>
              {getPercent(normal.length)}%{" "}
              <FancyLink to={`/offense/coverage/normal/?${params}`}>
                {t("offense.coverage.normal")}
              </FancyLink>
            </div>
            <Flex flex="auto" />
            <FancyText tag="div" textAlign="right">
              ({normal.length.toLocaleString(i18n.languages)})
            </FancyText>
          </Flex>
        </Flex>

        <Flex direction="column">
          <Meter
            value={resist.length}
            max={total}
            background="var(--color-bg-base)"
          />
          <Flex gap="medium">
            <div>
              {getPercent(resist.length)}%{" "}
              <FancyLink to={`/offense/coverage/resistance/?${params}`}>
                {t("offense.coverage.resistance")}
              </FancyLink>
            </div>
            <Flex flex="auto" />
            <FancyText tag="div" textAlign="right">
              ({resist.length.toLocaleString(i18n.languages)})
            </FancyText>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
