import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Icon } from "../components/Icon";
import { Paginator } from "../components/Paginator";
import { useAppContext } from "../hooks/useAppContext";
import { useGeneration } from "../hooks/useGeneration";
import { useSearch } from "../hooks/useSearch";
import { partitionMatchups } from "../misc/data-matchups";
import {
  AbilityName,
  SpecialMove,
  splitTokens,
  typesFromString,
} from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import styles from "./ScreenCoverageList.module.css";

interface CoverageListProps {
  mode: "weakness" | "resistance" | "normal";
}

export function ScreenCoverageList({ mode }: CoverageListProps): ReactNode {
  const { coverageTypes } = useAppContext();
  const [generation] = useGeneration();
  const { t } = useTranslation();
  const search = useSearch();
  const [page, setPage] = useState(0);
  const types = typesFromString(search.get("types") || "");
  const abilities: AbilityName[] = splitTokens(
    search.get("abilities") || ""
  ) as any;
  const moves: SpecialMove[] = splitTokens(search.get("moves") || "") as any;
  const partitionedMatchups = partitionMatchups({
    coverageTypes,
    types,
    generation,
    offenseAbilities: abilities,
    specialMoves: moves,
  });
  const items = partitionedMatchups[mode];
  return (
    <main className="center content-narrow">
      <Flex direction="column" gap="large" padding="large">
        <Flex padding="small" />

        <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
          {t(`offense.coverageList.${mode}.heading`)}
        </FancyText>

        <FancyText tag="p" fontSize="large" fontWeight="medium">
          <Icon name="arrowLeft" />{" "}
          <FancyLink to="/offense/">{t("coverage.back")}</FancyLink>
        </FancyText>

        {types.length > 0 && (
          <>
            <FancyText tag="p">
              {t(`offense.coverageList.${mode}.description`)}
            </FancyText>
            <Flex wrap gap="medium">
              {types.map((t) => (
                <Badge key={t} type={t} />
              ))}
            </Flex>
          </>
        )}

        <Paginator
          setPage={setPage}
          currentPage={page}
          pageSize={20}
          emptyState={
            <EmptyState>{t("offense.coverageList.empty")}</EmptyState>
          }
          items={items}
          renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
          renderPage={(items) => {
            return (
              <Flex direction="column" gap="large" paddingY="large">
                {items.map(({ number, name, types }, i) => {
                  const dexParams = new URLSearchParams({
                    q: number,
                    page: "1",
                  });
                  const dexLink = `/pokedex/?${dexParams}`;
                  return (
                    <div key={i} className={styles.dexItem}>
                      <Flex direction="column">
                        <FancyText tag="div" color="3" fontSize="large">
                          {formatMonsterNumber(Number(number))}
                        </FancyText>
                        <FancyText
                          tag="div"
                          fontWeight="medium"
                          fontSize="large"
                        >
                          <FancyLink underline="never" to={dexLink}>
                            {name}
                          </FancyLink>
                        </FancyText>
                      </Flex>
                      <Flex
                        wrap
                        gap="medium"
                        justify="flex-start"
                        align="center"
                      >
                        {types.map((t) => (
                          <Badge key={t} type={t} />
                        ))}
                      </Flex>
                    </div>
                  );
                })}
              </Flex>
            );
          }}
        />

        {items.length > 0 && (
          <FancyText tag="p" fontSize="large" fontWeight="medium">
            <Icon name="arrowLeft" />{" "}
            <FancyLink to="/offense/">{t("coverage.back")}</FancyLink>
          </FancyText>
        )}
      </Flex>
    </main>
  );
}
