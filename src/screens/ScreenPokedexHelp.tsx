import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";

interface ScreenPokedexHelpProps {}

export function ScreenPokedexHelp(_props: ScreenPokedexHelpProps) {
  const { t } = useTranslation();
  const classH2 = "lh-title f4 weight-medium";
  return (
    <main className="pa3 center content-narrow">
      <h2 className={classH2}>{t("pokedexHelp.searchByName.heading")}</h2>
      <p>{t("pokedexHelp.searchByName.description")}</p>

      <h2 className={classH2}>{t("pokedexHelp.searchByNumber.heading")}</h2>
      <p>{t("pokedexHelp.searchByNumber.description")}</p>

      <h2 className={classH2}>{t("pokedexHelp.searchByType.heading")}</h2>
      <p>{t("pokedexHelp.searchByType.description")}</p>

      <ul className="pl3">
        <li>
          <code className="dib br2 ph2 bg3">
            {t("pokedexHelp.searchExamples.type.query")}
          </code>
          <p>{t("pokedexHelp.searchExamples.type.description")}</p>
        </li>
        <li>
          <code className="dib br2 ph2 bg3">
            {t("pokedexHelp.searchExamples.doubleType.query")}
          </code>
          <p>{t("pokedexHelp.searchExamples.doubleType.description")}</p>
        </li>
        <li>
          <code className="dib br2 ph2 bg3">
            {t("pokedexHelp.searchExamples.singleType.query")}
          </code>
          <p>{t("pokedexHelp.searchExamples.singleType.description")}</p>
        </li>
      </ul>

      <p className="flex gap1 items-center">
        <Icon name="arrowLeft" />
        <Link to="/pokedex/" className="underline fg-link br1 focus-outline">
          {t("pokedexHelp.back")}
        </Link>
      </p>
    </main>
  );
}
