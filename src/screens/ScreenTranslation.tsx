import { ReactNode } from "react";
import { Card } from "../components/Card";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Section } from "../components/Section";
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
    <main className="content-narrow center">
      <Flex direction="column" padding="large">
        <Flex direction="column" gap="large">
          <Section
            heading={
              <FancyText
                inline
                tag="h2"
                fontSize="xlarge"
                fontWeight="medium"
                id="translate"
              >
                Translation <span aria-hidden="true">🌎</span>
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                Download a translation file below to get started. You can edit
                CSV files with{" "}
                <ExternalLink href="https://docs.google.com/">
                  Google Docs
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.libreoffice.org/download/download-libreoffice/">
                  LibreOffice Calc
                </ExternalLink>
                ,{" "}
                <ExternalLink href="https://www.moderncsv.com/">
                  Modern CSV
                </ExternalLink>
                , and many other apps.
              </FancyText>
              <FancyText tag="p">
                Send me (Sage) the translated file via email when you&apos;re
                done (
                <ExternalLink href="mailto:pkmn@wavebeem.com">
                  pkmn
                  <wbr />
                  @wavebeem
                  <wbr />
                  .com
                </ExternalLink>
                ). If you have questions, feel free to ask. Confused about CSV
                files? I can set up a Google Sheet for you.
              </FancyText>
              <FancyText tag="p">
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
                      <>
                        <Card size="small">
                          <TranslationCard key={lang} lang={lang} />
                        </Card>
                      </>
                    );
                  })}
              </Flex>
            </Flex>
          </Section>
        </Flex>
      </Flex>
    </main>
  );
}
