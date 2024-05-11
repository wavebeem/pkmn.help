import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Generation } from "../misc/data-generations";
import { partitionMatchups } from "../misc/data-matchups";
import { CoverageType, Type } from "../misc/data-types";
import { Meter } from "./Meter";
import styles from "./DexCoverage.module.css";
import { Flex } from "./Flex";
import { Spinner } from "./Spinner";
import { FancyText } from "./FancyText";
import { FancyLink } from "./FancyLink";

interface DexCoverageProps {
  generation: Generation;
  coverageTypes: CoverageType[];
  types: Type[];
  isLoading: boolean;
}

export function DexCoverage({
  generation,
  coverageTypes,
  types,
  isLoading,
}: DexCoverageProps) {
  const { t, i18n } = useTranslation();
  const {
    resistance: resist,
    normal,
    weakness: weak,
  } = partitionMatchups({
    coverageTypes,
    types,
    generation,
  });
  const total = coverageTypes.length;

  function getPercent(count: number): string {
    const value = Number(((count / total || 0) * 100).toFixed(1));
    return value.toLocaleString(i18n.languages);
  }

  const typeParams = new URLSearchParams({ types: types.join(" ") });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.root}>
      <Flex direction="column" gap="large">
        <Flex direction="column">
          <Meter value={weak.length} max={total} />
          <Flex gap="medium">
            <div>
              {getPercent(weak.length)}%{" "}
              <FancyLink to={`/offense/coverage/weakness/?${typeParams}`}>
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
          <Meter value={normal.length} max={total} />
          <Flex gap="medium">
            <div>
              {getPercent(normal.length)}%{" "}
              <FancyLink to={`/offense/coverage/normal/?${typeParams}`}>
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
          <Meter value={resist.length} max={total} />
          <Flex gap="medium">
            <div>
              {getPercent(resist.length)}%{" "}
              <FancyLink to={`/offense/coverage/resistance/?${typeParams}`}>
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
