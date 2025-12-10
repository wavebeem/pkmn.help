import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../components/Badge";
import { EmptyState } from "../components/EmptyState";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { IconBack } from "../components/icons";
import { Paginator } from "../components/Paginator";
import { PlainBadge } from "../components/PlainBadge";
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
    search.get("abilities") || "",
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
        <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
          {t(`offense.coverageList.${mode}.heading`)}
        </FancyText>

        <Flex gap="small" align="center">
          <IconBack />
          <FancyText tag="span" fontSize="large" fontWeight="medium">
            <FancyLink to="/offense/">{t("coverage.back")}</FancyLink>
          </FancyText>
        </Flex>

        {types.length > 0 && (
          <Flex wrap gap="medium">
            {types.map((t) => (
              <Badge key={t} type={t} size="medium" />
            ))}
          </Flex>
        )}

        {abilities.length > 0 && (
          <Flex wrap gap="medium">
            {abilities.map((ability) => (
              <PlainBadge key={ability}>
                {t(`defense.abilityNames.${ability}`)}
              </PlainBadge>
            ))}
          </Flex>
        )}

        {moves.length > 0 && (
          <Flex wrap gap="medium">
            {moves.map((move) => (
              <PlainBadge key={move}>
                {t(`offense.specialMoves.names.${move}`)}
              </PlainBadge>
            ))}
          </Flex>
        )}

        <Paginator
          setPage={setPage}
          currentPage={page}
          pageSize={12}
          emptyState={
            <EmptyState>{t("offense.coverageList.empty")}</EmptyState>
          }
          items={items}
          renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
          renderPage={(items) => {
            return (
              <Flex direction="column" paddingY="large">
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
                        gap="small"
                        justify="flex-start"
                        align="center"
                      >
                        {types.map((t) => (
                          <Badge key={t} type={t} size="small" />
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
          <Flex gap="small" align="center">
            <IconBack />
            <FancyText tag="span" fontSize="large" fontWeight="medium">
              <FancyLink to="/offense/">{t("coverage.back")}</FancyLink>
            </FancyText>
          </Flex>
        )}
      </Flex>
    </main>
  );
}
