import { clsx } from "clsx";
import { ReactNode, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { Card } from "../components/Card";
import {
  CheckboxGroup,
  CheckboxGroupOption,
} from "../components/CheckboxGroup";
import { ClearChoices } from "../components/ClearChoices";
import { CopyButton } from "../components/CopyButton";
import { DexCoverage } from "../components/DexCoverage";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Matchups } from "../components/Matchups";
import { MultiTypeSelector } from "../components/MultiTypeSelector";
import { useAppContext } from "../hooks/useAppContext";
import { useGeneration } from "../hooks/useGeneration";
import { useSearch } from "../hooks/useSearch";
import { compare } from "../misc/compare";
import {
  AbilityName,
  SpecialMove,
  Type,
  removeInvalidOffenseTypesForGeneration,
  splitTokens,
  typesFromString,
} from "../misc/data-types";
import styles from "./ScreenOffense.module.css";

export type ScreenOffenseProps = {
  mode: "combination" | "single";
};

export function ScreenOffense({ mode }: ScreenOffenseProps): ReactNode {
  const typeLimit = Infinity;
  // const typeLimit = mode === "single" ? 1 : Infinity;

  const { coverageTypes, fallbackCoverageTypes, isLoading } = useAppContext();
  const [generation] = useGeneration();
  const { t, i18n } = useTranslation();
  const search = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [offenseTypes, setOffenseTypes] = useSessionStorage<Type[]>(
    "offense.types",
    [],
  );

  useEffect(() => {
    setOffenseTypes((types) => types.slice(-typeLimit));
  }, [typeLimit, setOffenseTypes]);

  useEffect(() => {
    if (!location.search) {
      return;
    }
    if (search.has("types")) {
      setOffenseTypes(typesFromString(search.get("types") || ""));
    }
    if (search.has("moves")) {
      setSpecialMoves(splitTokens(search.get("moves") || "") as any);
    }
    if (search.has("abilities")) {
      setAbilities(splitTokens(search.get("abilities") || "") as any);
    }
    navigate({ ...location, search: "" }, { replace: true });
  }, [search, location]);

  useEffect(() => {
    setOffenseTypes((offenseTypes) =>
      removeInvalidOffenseTypesForGeneration(generation, offenseTypes),
    );
  }, [generation]);

  const listLength = coverageTypes?.length ?? 0;
  const listLengthFormatted = listLength.toLocaleString(i18n.languages);

  const specialMovesOptions: CheckboxGroupOption<SpecialMove>[] = [
    {
      id: "thousand_arrows",
      name: t(`offense.specialMoves.names.thousand_arrows`),
    },
    {
      id: "freeze-dry",
      name: t(`offense.specialMoves.names.freeze-dry`),
    },
    {
      id: "flying_press",
      name: t(`offense.specialMoves.names.flying_press`),
    },
  ] as const;
  specialMovesOptions.sort((a, b) => {
    return compare(a.name, b.name);
  });

  const [specialMoves, setSpecialMoves] = useSessionStorage<SpecialMove[]>(
    "offense.specialMoves",
    [],
  );

  const abilitiesOptions: CheckboxGroupOption<AbilityName>[] = [
    {
      id: "tinted_lens",
      name: t(`defense.abilityNames.tinted_lens`),
    },
    { id: "scrappy", name: t(`defense.abilityNames.scrappy`) },
  ] as const;
  abilitiesOptions.sort((a, b) => {
    return compare(a.name, b.name);
  });

  const [abilities, setAbilities] = useSessionStorage<AbilityName[]>(
    "offense.abilities",
    [],
  );

  const resetOffense = useCallback((): void => {
    setOffenseTypes([]);
    setAbilities([]);
    setSpecialMoves([]);
    navigate({ ...location, search: "" }, { replace: true });
  }, [setOffenseTypes, setAbilities, setSpecialMoves, navigate, location]);

  const permalink = new URL(window.location.href);
  if (offenseTypes.length > 0) {
    permalink.searchParams.set("types", offenseTypes.join(" "));
  }
  if (abilities.length > 0) {
    permalink.searchParams.set("abilities", abilities.join(" "));
  }
  if (specialMoves.length > 0) {
    permalink.searchParams.set("moves", specialMoves.join(" "));
  }

  return (
    <main className={clsx(styles.root, "content-wide center")}>
      <Flex direction="column" gap="xlarge">
        <Flex direction="column" gap="medium">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("offense.chooseTypes")}
          </FancyText>
          <MultiTypeSelector
            generation={generation}
            value={offenseTypes}
            onChange={setOffenseTypes}
            limit={typeLimit}
          />
        </Flex>
        <Flex direction="column" gap="small">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("offense.specialMoves.choose")}
          </FancyText>
          <CheckboxGroup
            options={specialMovesOptions}
            value={specialMoves}
            onChange={setSpecialMoves}
          />
        </Flex>
        <Flex direction="column" gap="small">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("offense.abilities.choose")}
          </FancyText>
          <CheckboxGroup
            options={abilitiesOptions}
            value={abilities}
            onChange={setAbilities}
          />
        </Flex>

        {generation === "default" && (
          <Flex direction="column" gap="small">
            <Flex gap="large">
              <CopyButton text={permalink.href}>
                {t("general.copyLink")}
              </CopyButton>
              <ClearChoices onClick={resetOffense} />
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex direction="column" gap="large">
        <Matchups
          kind={
            mode === "combination" ? "offense-combination" : "offense-single"
          }
          generation={generation}
          types={offenseTypes}
          ability="none"
          teraType={Type.none}
          specialMoves={specialMoves}
          offenseAbilities={abilities}
        />

        {generation === "default" ? (
          <Flex direction="column" gap="small">
            <FancyText tag="h2" fontSize="large" fontWeight="medium">
              {t("offense.coverage.heading")}
            </FancyText>
            <Card size="small">
              <Flex direction="column" gap="large">
                <div>
                  <FancyLink to="/offense/coverage/">
                    {t("offense.coverage.edit")}
                  </FancyLink>{" "}
                  ({listLengthFormatted})
                </div>
                <DexCoverage
                  generation={generation}
                  coverageTypes={coverageTypes ?? fallbackCoverageTypes}
                  types={offenseTypes}
                  isLoading={isLoading}
                  offenseAbilities={abilities}
                  specialMoves={specialMoves}
                />
              </Flex>
            </Card>
          </Flex>
        ) : null}
      </Flex>
    </main>
  );
}
