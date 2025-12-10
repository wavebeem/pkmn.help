import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { IconBack } from "../components/icons";
import styles from "./ScreenPokedexHelp.module.css";

export function ScreenPokedexHelp(): ReactNode {
  const { t } = useTranslation();
  return (
    <main className="center content-narrow">
      <Flex flex="auto" padding="medium" />
      <Flex flex="auto" padding="small" />
      <Flex direction="column" gap="large" padding="large">
        <FancyText tag="h2" fontSize="large" fontWeight="medium">
          {t("pokedexHelp.searchByName.heading")}
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchByName.description")}
        </FancyText>

        <FancyText tag="h2" fontSize="large" fontWeight="medium">
          {t("pokedexHelp.searchByNumber.heading")}
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchByNumber.description")}
        </FancyText>

        <FancyText tag="h2" fontSize="large" fontWeight="medium">
          {t("pokedexHelp.searchByType.heading")}
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchByType.description")}
        </FancyText>

        <FancyText tag="p">
          <code className={styles.code}>
            {t("pokedexHelp.searchExamples.type.query")}
          </code>
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchExamples.type.description")}
        </FancyText>

        <FancyText tag="p">
          <code className={styles.code}>
            {t("pokedexHelp.searchExamples.doubleType.query")}
          </code>
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchExamples.doubleType.description")}
        </FancyText>

        <FancyText tag="p">
          <code className={styles.code}>
            {t("pokedexHelp.searchExamples.singleType.query")}
          </code>
        </FancyText>
        <FancyText tag="p">
          {t("pokedexHelp.searchExamples.singleType.description")}
        </FancyText>

        <Flex gap="small" align="center">
          <IconBack />
          <FancyText tag="span" fontSize="large" fontWeight="medium">
            <FancyLink to="/pokedex/">{t("pokedexHelp.back")}</FancyLink>
          </FancyText>
        </Flex>
      </Flex>
    </main>
  );
}
