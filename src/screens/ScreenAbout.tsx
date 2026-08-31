import { ReactNode, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { useAppContext } from "../hooks/useAppContext";
import { resetApp } from "../misc/resetApp";
import { FancyLink } from "../components/FancyLink";
import { IconReset, IconRandom } from "../components/icons";
import { PageTitle } from "../components/PageTitle";
import { Pokemon } from "../misc/data-types";
import styles from "./ScreenAbout.module.css";
import { randomItem } from "../misc/random";
import { MonsterImage } from "../components/MonsterImage";

export function ScreenAbout(): ReactNode {
  const { needsAppUpdate, updateApp, allPokemon } = useAppContext();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const [easterEgg, setEasterEgg] = useState<Pokemon>();
  const [easterEggLoadedID, setEasterEggLoadedID] = useState("");

  return (
    <main className="center content-wide">
      <Flex
        className="content-narrow"
        direction="column"
        gap="large"
        padding="large"
      >
        <PageTitle title={t("navigation.about")} />

        <Flex direction="column" gap="xlarge">
          {needsAppUpdate && (
            <div className={styles.updateBanner}>
              <Card>
                <Flex gap="medium" align="center">
                  <Flex direction="column" flex="auto">
                    <FancyText tag="span" fontSize="large" fontWeight="medium">
                      {t("banners.updateReady.description")}
                    </FancyText>
                    <FancyLink to="/changelog/" reloadDocument>
                      {t("banners.updateReady.whatsNew")}
                    </FancyLink>
                  </Flex>
                  <Button variant="filled" type="button" onClick={updateApp}>
                    {t("banners.updateReady.update")}
                  </Button>
                </Flex>
              </Card>
            </div>
          )}
          <Section
            heading={
              <FancyText tag="h2" fontWeight="medium">
                {t("more.contact.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">
              <Trans
                i18nKey="more.contact.intro"
                values={{}}
                components={{
                  homepage: <FancyLink to="https://www.wavebeem.com" />,
                }}
              />
            </FancyText>

            <FancyText tag="p">
              <Trans
                i18nKey="more.contact.email"
                components={{
                  email: <FancyLink to="mailto:pkmn@wavebeem.com" />,
                }}
              />
            </FancyText>
          </Section>

          <Section
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                Translation <span aria-hidden="true">🌎</span>
              </FancyText>
            }
          >
            <FancyText tag="p">
              Please <FancyLink to="/translation/">help me translate</FancyLink>{" "}
              this site.
            </FancyText>
          </Section>

          <Section
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
                  changelog: <FancyLink to="/changelog/" reloadDocument />,
                }}
              />
            </FancyText>
          </Section>

          <Section
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.help.heading")}
              </FancyText>
            }
          >
            <Flex direction="column" gap="large">
              <Flex direction="column" align="flex-start" gap="small">
                <Button variant="outlined" size="small" onClick={resetApp}>
                  <IconReset size={16} />
                  {t("more.help.serviceWorker.button")}
                </Button>
              </Flex>
              <FancyText tag="p">
                {t("more.help.serviceWorker.description")}
              </FancyText>
            </Flex>
          </Section>

          <Section
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
                  plausible: <FancyLink to="https://plausible.io/pkmn.help" />,
                }}
              />
            </FancyText>
          </Section>

          <Section
            heading={
              <FancyText inline tag="h2" fontSize="xlarge" fontWeight="medium">
                {t("more.givingBack.heading")}
              </FancyText>
            }
          >
            <FancyText tag="p">{t("more.givingBack.description")}</FancyText>
          </Section>

          <Section
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
                  credits: <FancyLink to="/credits/" reloadDocument />,
                }}
              />
            </FancyText>
          </Section>

          <Section
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
                    <FancyLink to="https://github.com/wavebeem/pkmn.help" />
                  ),
                }}
              />
            </FancyText>
          </Section>

          <Section
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
                <FancyLink to="https://pokeapi.co/">PokéAPI</FancyLink>.
              </FancyText>

              <FancyText tag="p">
                This site uses the Roboto font, licensed under the {}
                <FancyLink to="https://www.apache.org/licenses/LICENSE-2.0">
                  Apache License 2.0
                </FancyLink>
                .
              </FancyText>

              <FancyText tag="p">
                This site also uses these {}
                <FancyLink to="/licenses/" reloadDocument>
                  open source packages
                </FancyLink>
                .
              </FancyText>

              <FancyText tag="p">
                PKMN.help &copy; 2013&ndash;{year} {}
                <FancyLink to="https://www.wavebeem.com">
                  Sage Fennel Mock
                </FancyLink>
                .
              </FancyText>
            </Flex>
          </Section>

          {easterEgg && (
            <div
              className={styles.easterEgg}
              data-animate={easterEggLoadedID === easterEgg.id}
            >
              <MonsterImage
                pokemonID={easterEgg.id}
                onLoad={({ pokemonID }) => {
                  setEasterEggLoadedID(pokemonID);
                }}
              />
            </div>
          )}

          <Flex>
            <Button
              variant="filled"
              onClick={(event) => {
                event.preventDefault();
                const pkmn = randomItem(allPokemon);
                if (!pkmn) {
                  return;
                }
                setEasterEgg(pkmn);
              }}
            >
              <IconRandom size={24} />
              {t("about.easterEgg.button")}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
