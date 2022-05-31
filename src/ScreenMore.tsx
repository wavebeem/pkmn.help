import classNames from "classnames";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "./Button";
import { generations, isGeneration } from "./data-generations";
import { resetApp } from "./resetApp";
import { Select } from "./Select";
import { useGeneration } from "./useGeneration";
import { useLanguage } from "./useLanguage";
import { useTheme } from "./useTheme";
import { useTypeCount } from "./useTypeCount";

export interface ScreenMoreProps {
  needsAppUpdate: boolean;
  updateApp: () => Promise<void>;
}

export default function ScreenMore({
  needsAppUpdate,
  updateApp,
}: ScreenMoreProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();

  return (
    <main className="pa3 center content-narrow lh-copy">
      <div
        hidden={!needsAppUpdate}
        className={classNames([
          "button-shadow",
          "bg1 fg1",
          "border2 ba br2",
          "pa3",
          "center",
          "flex justify-center",
        ])}
      >
        <span className="flex flex-auto items-center">
          {t("banners.updateReady.description")}
        </span>
        <Button className="ml3" type="button" onClick={updateApp}>
          {t("banners.updateReady.update")}
        </Button>
      </div>

      <h2 className="lh-title f4">{t("more.contact.heading")}</h2>

      <p>
        <Trans
          i18nKey="more.contact.intro"
          values={{}}
          components={{
            homepage: (
              <a
                href="https://www.wavebeem.com"
                className="br1 underline fg-link OutlineFocus"
              />
            ),
          }}
        />
      </p>

      <p>
        <Trans
          i18nKey="more.contact.email"
          components={{
            email: (
              <a
                className="br1 underline fg-link OutlineFocus"
                href="mailto:pkmn@wavebeem.com"
              />
            ),
          }}
        />
      </p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.settings.heading")}</h2>

      <div className="grid gap3 pb2">
        <Select
          label={t("more.settings.language.label")}
          value={language}
          helpText={t("more.settings.language.helpText")}
          onChange={(event) => {
            setLanguage(event.target.value);
            i18n.changeLanguage(language);
          }}
        >
          <option value="">{t("more.settings.language.default")}</option>
          <option disabled>&ndash;</option>
          <option value="en">English</option>
          <option value="es">Español (Spanish)</option>
          <option value="pt-BR">
            Português Brasileiro (Brazilian Portuguese)
          </option>
          <option value="de">Deutsch (German)</option>
          <option value="it">Italiano (Italian)</option>
          <option value="fr">Français (French)</option>
          <option value="ro">Română (Romanian)</option>
          <option value="ru">Русский (Russian)</option>
          <option value="kk">Қазақша (Kazakh)</option>
          <option value="ja">日本語 (Japanese)</option>
          <option value="ja-Hrkt">にほんご (Japanese Kana-only)</option>
          <option value="zh-Hans">简体中文 (Simplified Chinese)</option>
          <option value="zh-Hant">繁體中文 (Traditional Chinese)</option>
          <option value="ko">한국어 (Korean)</option>
        </Select>

        <Select
          label={t("more.settings.theme.label")}
          value={theme}
          helpText={t("more.settings.theme.help")}
          onChange={(event) => {
            setTheme(event.target.value);
          }}
        >
          <option value="auto">{t("more.settings.theme.values.auto")}</option>
          <option value="light">{t("more.settings.theme.values.light")}</option>
          <option value="dark">{t("more.settings.theme.values.dark")}</option>
        </Select>

        <Select
          label={t("games.label")}
          value={generation}
          helpText={t("games.help")}
          onChange={(event) => {
            const { value } = event.target;
            if (isGeneration(value)) {
              setGeneration(value);
            } else {
              console.error("not a generation:", value);
            }
          }}
        >
          {generations.map((gen) => {
            return (
              <option key={gen} value={gen}>
                {t(`games.byID.${gen}`)}
              </option>
            );
          })}
        </Select>

        <Select
          label={t("more.settings.typeCount.label")}
          value={typeCount}
          helpText={t("more.settings.typeCount.help")}
          onChange={(event) => {
            setTypeCount(event.target.value);
          }}
        >
          <option value="2">{t("more.settings.typeCount.values.2")}</option>
          <option value="3">{t("more.settings.typeCount.values.3")}</option>
        </Select>
      </div>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.help.heading")}</h2>

      <p>{t("more.help.serviceWorker.description")}</p>

      <div className="mv3">
        <Button onClick={resetApp}>
          {t("more.help.serviceWorker.button")}
        </Button>
      </div>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.privacy.heading")}</h2>

      <p>
        <Trans
          i18nKey="more.privacy.description"
          components={{
            plausible: (
              <a
                href="https://plausible.io/privacy"
                className="br1 underline fg-link OutlineFocus"
              />
            ),
          }}
        />
      </p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.givingBack.heading")}</h2>

      <p>{t("more.givingBack.description")}</p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.thanks.heading")}</h2>

      <ul className="lh-copy mt1 ph3">
        <li>{t("more.thanks.credits.abylayZhandarbek")}</li>
        <li>{t("more.thanks.credits.vio")}</li>
        <li>{t("more.thanks.credits.dragonify")}</li>
        <li>{t("more.thanks.credits.adamHayes")}</li>
        <li>{t("more.thanks.credits.drakoshen")}</li>
        <li>{t("more.thanks.credits.azertor")}</li>
        <li>{t("more.thanks.credits.kaishidow")}</li>
        <li>{t("more.thanks.credits.cozzzy")}</li>
        <li>{t("more.thanks.credits.luziferSenpai")}</li>
        <li>{t("more.thanks.credits.gabrieleGiugno")}</li>
        <li>{t("more.thanks.credits.minamorl")}</li>
        <li>{t("more.thanks.credits.jansjo")}</li>
        <li>{t("more.thanks.credits.other")}</li>
      </ul>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.openSource.heading")}</h2>

      <p>
        <Trans
          i18nKey="more.openSource.description"
          components={{
            github: (
              <a
                href="https://github.com/wavebeem/pkmn.help"
                className="br1 underline fg-link OutlineFocus"
              />
            ),
          }}
        />
      </p>

      <div role="presentation" className="mv2 bt border3" />

      <h2 className="lh-title f4">{t("more.legalInfo.heading")}</h2>

      <p>
        <Trans i18nKey="more.legalInfo.pokemon" values={{ year }} />
      </p>

      <p>{t("more.legalInfo.dontSueMe")}</p>

      <p>
        <Trans
          i18nKey="more.legalInfo.pokeAPI"
          components={{
            pokeapi: (
              <a
                className="br1 underline fg-link OutlineFocus"
                href="https://pokeapi.co/"
              />
            ),
          }}
        />
      </p>

      <p>
        <Trans
          i18nKey="more.legalInfo.wavebeem"
          values={{ year }}
          components={{
            wavebeem: (
              <a
                className="br1 underline fg-link OutlineFocus"
                href="https://www.wavebeem.com"
              />
            ),
          }}
        />
      </p>
    </main>
  );
}
