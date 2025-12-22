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
import { IconDownload } from "./icons";
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
          fontWeight="normal"
          lang={lang}
          id={titleId}
        >
          {languageNamesNative[lang]}
          {!officialLanguagesSet.has(lang) && (
            <FancyText color="secondary" tag="span" fontWeight="normal">
              {" *"}
            </FancyText>
          )}
        </FancyText>
      </div>
      <div className={styles.completion}>
        <FancyText color="secondary" tag="span">
          {formatLanguageCompletion(lang)} translated
        </FancyText>
      </div>
      <div className={styles.download}>
        <ExternalLink
          aria-labelledby={titleId}
          href={`/translations/${lang}.csv`}
          download={`PKMN.help - ${languageNamesEnglish[lang]}.csv`}
          outlined
        >
          {languageNamesEnglish[lang]} CSV
          <IconDownload size="1em" />
        </ExternalLink>
      </div>
    </div>
  );
}
