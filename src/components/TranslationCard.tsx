import * as React from "react";
import { Lang } from "../misc/detectLanguage";
import {
  languageNamesEnglish,
  languageNamesNative,
  formatLanguageCompletion,
  languageBounty,
  officialLanguagesSet,
} from "../misc/lang";
import styles from "./TranslationCard.module.css";
import { Flex } from "./Flex";
import { FancyText } from "./FancyText";
import { ExternalLink } from "./ExternalLink";
import { Divider } from "./Divider";

interface TranslationCardProps {
  lang: Lang;
}

export function TranslationCard({ lang }: TranslationCardProps): JSX.Element {
  return (
    <div className={styles.TranslationCard_root}>
      <Flex direction="column" gap="medium">
        <Flex gap="small" wrap>
          <FancyText tag="h3" fontSize="large" fontWeight="medium">
            {languageNamesNative[lang]}
          </FancyText>
          <Flex flex="auto" />
          {!officialLanguagesSet.has(lang as any) && (
            <span className={styles.TranslationCard_pill}>
              <span aria-hidden="true">🏗️</span> Unofficial
            </span>
          )}
          {Boolean(languageBounty[lang]) && (
            <span className={styles.TranslationCard_pill}>
              <span aria-hidden="true">💰</span> {languageBounty[lang]} USD
            </span>
          )}
        </Flex>
        <FancyText tag="p">
          {formatLanguageCompletion(lang)} translated
        </FancyText>
        <Divider />
        <FancyText tag="p">
          <ExternalLink
            underline="never"
            href={`/translations/${lang}.csv`}
            download={`pkmn.help - ${languageNamesEnglish[lang]}.csv`}
          >
            Download {languageNamesEnglish[lang]} CSV
          </ExternalLink>
        </FancyText>
      </Flex>
    </div>
  );
}
