import * as React from "react";
import { Lang } from "./detectLanguage";
import {
  languageNamesEnglish,
  languageNamesNative,
  formatLanguageCompletion,
  languageBounty,
  officialLanguagesSet,
} from "./lang";

interface TranslationCardProps {
  lang: Lang;
}

export function TranslationCard({ lang }: TranslationCardProps): JSX.Element {
  return (
    <div className="fg1 bg1 ba border2 br3 button-shadow flex flex-column gap1">
      <div className="flex flex-wrap gap1 pt3 ph3">
        <h3 className="f4 weight-medium ma0">{languageNamesNative[lang]}</h3>
        <div className="flex-auto" />
        {!officialLanguagesSet.has(lang as any) && (
          <span className="ph2 bg1 br-pill ba border3">
            <span aria-hidden="true">🏗️</span> Unofficial
          </span>
        )}
        {Boolean(languageBounty[lang]) && (
          <span className="ph2 bg1 br-pill ba border3">
            <span aria-hidden="true">💰</span> {languageBounty[lang]} USD
          </span>
        )}
      </div>
      <p className="ma0 ph3">{formatLanguageCompletion(lang)} translated</p>
      <p className="mv0 mh2 bt border3 ph2 pt2 pb2 mt3">
        <a
          href={`/translations/${lang}.csv`}
          download={`pkmn.help - ${languageNamesEnglish[lang]}.csv`}
          className="no-underline fg-link focus-outline br2"
        >
          Download {languageNamesEnglish[lang]} CSV
        </a>
      </p>
    </div>
  );
}
