import { ReactNode, useId } from "react";
import { Lang } from "../misc/detectLanguage";
import {
  formatLanguageCompletion,
  languageNamesEnglish,
  languageNamesNative,
  officialLanguagesSet,
} from "../misc/lang";
import { ExternalLink } from "./ExternalLink";
import { FancyText } from "./FancyText";
import styles from "./TranslationCard.module.css";

interface TranslationCardProps {
  lang: Lang;
}

export function TranslationCard({ lang }: TranslationCardProps): ReactNode {
  const titleId = useId();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <FancyText
          tag="h3"
          fontSize="large"
          fontWeight="medium"
          lang={lang}
          id={titleId}
        >
          {languageNamesNative[lang]}
          {!officialLanguagesSet.has(lang) && " *"}
        </FancyText>
      </div>
      <div className={styles.completion}>
        {formatLanguageCompletion(lang)} translated
      </div>
      <div className={styles.download}>
        <ExternalLink
          aria-labelledby={titleId}
          href={`/translations/${lang}.csv`}
          download={`pkmn.help - ${languageNamesEnglish[lang]}.csv`}
        >
          Download CSV
        </ExternalLink>
      </div>
    </div>
  );
}
