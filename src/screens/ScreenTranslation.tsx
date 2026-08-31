import { ReactNode } from "react";
import { Card } from "../components/Card";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { PageTitle } from "../components/PageTitle";
import { TranslationCard } from "../components/TranslationCard";
import { compare } from "../misc/compare";
import { supportedLanguages } from "../misc/detectLanguage";
import {
  languageBounty,
  languageCompletions,
  officialLanguagesSet,
} from "../misc/lang";

// No need to translate this screen, since translators need to be fluent in
// English anyway.
export function ScreenTranslation(): ReactNode {
  return (
    <main className="center content-wide">
      <Flex
        className="content-narrow"
        direction="column"
        gap="large"
        padding="large"
      >
        <PageTitle title="Translation" />

        <Flex direction="column" gap="large">
          <FancyText tag="p">
            Download a translation file below to get started. You can edit CSV
            files with{" "}
            <FancyLink to="https://docs.google.com/">Google Docs</FancyLink>,{" "}
            <FancyLink to="https://www.libreoffice.org/download/download-libreoffice/">
              LibreOffice Calc
            </FancyLink>
            , <FancyLink to="https://www.moderncsv.com/">Modern CSV</FancyLink>,
            and many other apps.
          </FancyText>
          <FancyText tag="p">
            <strong>Please do not use Microsoft Excel.</strong> It has
            repeatedly broken the CSV files.
          </FancyText>
          <FancyText tag="p">
            Send me (Sage) the translated file via email when you&apos;re done (
            <FancyLink to="mailto:pkmn@wavebeem.com">
              pkmn
              <wbr />
              @wavebeem
              <wbr />
              .com
            </FancyLink>
            ). If you have questions, feel free to ask. Confused about CSV
            files? I can set up a Google Sheet for you.
          </FancyText>
          <FancyText tag="p" color="secondary" fontSize="small">
            * = Not an official language for Pokémon games
          </FancyText>
          <Flex direction="column" gap="medium">
            {supportedLanguages
              .slice(0)
              .filter((lang) => !(lang === "en" || lang === "ja-Hrkt"))
              .sort((a, b) => {
                return (
                  compare(languageBounty[b], languageBounty[a]) ||
                  compare(
                    officialLanguagesSet.has(a) ? 0 : 1,
                    officialLanguagesSet.has(b) ? 0 : 1,
                  ) ||
                  compare(
                    languageCompletions[a] || 0,
                    languageCompletions[b] || 0,
                  ) ||
                  compare(a, b)
                );
              })
              .map((lang) => {
                return (
                  <Card size="small" key={lang}>
                    <TranslationCard key={lang} lang={lang} />
                  </Card>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
