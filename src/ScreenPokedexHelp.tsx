import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ScreenPokdexHelpProps {
  pokedexParams: string;
}

export default function ScreenPokdexHelp({
  pokedexParams,
}: ScreenPokdexHelpProps) {
  const { t } = useTranslation();
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f4">{t("pokedexHelp.searchByName.heading")}</h2>
      <p>{t("pokedexHelp.searchByName.description")}</p>

      <h2 className="lh-title f4">{t("pokedexHelp.searchByNumber.heading")}</h2>
      <p>{t("pokedexHelp.searchByNumber.description")}</p>

      <h2 className="lh-title f4">{t("pokedexHelp.searchByType.heading")}</h2>
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

      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <Link
          to={`/pokedex/${pokedexParams}`}
          className="underline fg-link OutlineFocus"
        >
          {t("pokedexHelp.back")}
        </Link>
      </p>
    </main>
  );
}
