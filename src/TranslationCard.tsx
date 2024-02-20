import * as React from "react";
import { Lang } from "./detectLanguage";
import {
  languageNamesEnglish,
  languageNamesNative,
  formatLanguageCompletion,
  languageBounty,
} from "./ScreenMore";

interface TranslationCardProps {
  lang: Lang;
}

export function TranslationCard({ lang }: TranslationCardProps): JSX.Element {
  return (
    <div className="fg1 bg1 ba border2 br3 button-shadow flex flex-column gap1">
      <div className="flex flex-wrap gap1 pt3 ph3">
        <h3 className="f5 ma0">{languageNamesNative[lang]}</h3>
        <div className="flex-auto" />
        {Boolean(languageBounty[lang]) && (
          <span className="ph2 bg1 br-pill ba border3">
            <span aria-hidden="true">💰</span> {languageBounty[lang]} USD
          </span>
        )}
      </div>
      <p className="ma0 ph3">{formatLanguageCompletion(lang)} translated</p>
      <p className="ma0 bt border3 ph3 pt2 pb2 mt3">
        <a
          href={`/translations/${lang}.csv`}
          // download={`pkmn.help - ${languageNamesEnglish[lang]}.csv`}
          className="no-underline fg-link focus-outline br2"
        >
          Download {languageNamesEnglish[lang]} CSV
        </a>
      </p>
    </div>
  );
}
