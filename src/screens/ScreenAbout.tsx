import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Divider } from "../components/Divider";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { useAppContext } from "../hooks/useAppContext";
import { resetApp } from "../misc/resetApp";

export function ScreenAbout(): ReactNode {
  const { needsAppUpdate, updateApp } = useAppContext();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <main className="content-narrow center">
      <Flex direction="column" padding="large">
        <Flex direction="column">
          {needsAppUpdate && (
            <>
              <Flex padding="medium" />
              <Card>
                <Flex gap="medium" align="center">
                  <Flex direction="column" flex="auto">
                    <FancyText tag="span" fontSize="large" fontWeight="medium">
                      {t("banners.updateReady.description")}
                    </FancyText>
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md">
                      {t("banners.updateReady.whatsNew")}
                    </ExternalLink>
                  </Flex>
                  <Button type="button" onClick={updateApp}>
                    {t("banners.updateReady.update")}
                  </Button>
                </Flex>
              </Card>
            </>
          )}
          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText tag="h2" fontWeight="medium">
                {t("more.contact.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                <Trans
                  i18nKey="more.contact.intro"
                  values={{}}
                  components={{
                    homepage: <ExternalLink href="https://www.wavebeem.com" />,
                  }}
                />
              </FancyText>

              <FancyText tag="p">
                <Trans
                  i18nKey="more.contact.email"
                  components={{
                    email: <ExternalLink href="mailto:pkmn@wavebeem.com" />,
                  }}
                />
              </FancyText>
            </Flex>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.changes.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.changes.description"
                components={{
                  changelog: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CHANGELOG.md" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.help.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <Flex direction="column" align="flex-start">
                <Button onClick={resetApp}>
                  {t("more.help.serviceWorker.button")}
                </Button>
              </Flex>
              <FancyText tag="p">
                {t("more.help.serviceWorker.description")}
              </FancyText>
            </Flex>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.privacy.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.privacy.description"
                components={{
                  plausible: (
                    <ExternalLink href="https://plausible.io/pkmn.help" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.givingBack.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">{t("more.givingBack.description")}</FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.thanks.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.thanks.description"
                components={{
                  credits: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help/blob/HEAD/CREDITS.md" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.openSource.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.openSource.description"
                components={{
                  github: (
                    <ExternalLink href="https://github.com/wavebeem/pkmn.help" />
                  ),
                }}
              />
            </FancyText>
          </CollapsibleSection>

          <Divider />

          <CollapsibleSection
            initiallyOpen
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.legalInfo.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <FancyText tag="p">
                Pokémon &copy; 2002&ndash;{year} Pokémon. &copy; 1995&ndash;
                {year} Nintendo/Creatures Inc./GAME FREAK inc. &trade;, &reg;
                and Pokémon character names are trademarks of Nintendo.
              </FancyText>

              <FancyText tag="p">
                No copyright or trademark infringement is intended in using
                Pokémon content on this page.
              </FancyText>

              <FancyText tag="p">
                Pokédex data is from {}
                <ExternalLink href="https://pokeapi.co/">PokéAPI</ExternalLink>.
              </FancyText>

              <FancyText tag="p">
                pkmn.help &copy; 2013&ndash;{year} {}
                <ExternalLink href="https://www.wavebeem.com">
                  Sage Fennel
                </ExternalLink>
                .
              </FancyText>
            </Flex>
          </CollapsibleSection>
          <Divider />
          <Flex padding="medium" />
          <div aria-hidden="true">
            <span aria-hidden="true">{"(ノ^_^)ノ"}</span> Have you tried
            pressing the Pokéball button at the top of the page?
          </div>
        </Flex>
      </Flex>
    </main>
  );
}
