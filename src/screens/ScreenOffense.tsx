import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
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
import {
  SpecialMove,
  Type,
  removeInvalidOffenseTypesForGeneration,
  specialMoves,
  typesFromString,
} from "../misc/data-types";
import styles from "./ScreenOffense.module.css";
import {
  CheckboxGroup,
  CheckboxGroupOption,
} from "../components/CheckboxGroup";

export function ScreenOffense(): ReactNode {
  const { coverageTypes, fallbackCoverageTypes, isLoading } = useAppContext();
  const [generation] = useGeneration();
  const { t, i18n } = useTranslation();
  const search = useSearch();
  const navigate = useNavigate();
  const [offenseTypes, setOffenseTypes] = useSessionStorage<Type[]>(
    "offense.types",
    []
  );

  const permalink = new URL(window.location.href);
  if (offenseTypes.length > 0) {
    permalink.searchParams.set("types", offenseTypes.join(" "));
  }

  useEffect(() => {
    if (search.has("types")) {
      setOffenseTypes(typesFromString(search.get("types") || ""));
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  useEffect(() => {
    setOffenseTypes((offenseTypes) =>
      removeInvalidOffenseTypesForGeneration(generation, offenseTypes)
    );
  }, [generation]);

  const listLength = coverageTypes?.length ?? 0;
  const listLengthFormatted = listLength.toLocaleString(i18n.languages);

  const options: readonly CheckboxGroupOption<SpecialMove>[] = [
    {
      id: "thousand_arrows",
      name: t(`offense.specialMoves.names.thousand_arrows`),
    },
    { id: "freeze-dry", name: t(`offense.specialMoves.names.freeze-dry`) },
  ] as const;

  const [specialMoves, setSpecialMoves] = useState<readonly SpecialMove[]>([]);

  return (
    <main className={classNames(styles.root, "content-wide center")}>
      <Flex direction="column" gap="xlarge">
        <Flex direction="column" gap="small">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("offense.chooseTypes")}
          </FancyText>
          <MultiTypeSelector
            generation={generation}
            value={offenseTypes}
            onChange={setOffenseTypes}
          />
        </Flex>
        <Flex direction="column" gap="small">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("offense.specialMoves.choose")}
          </FancyText>
          <CheckboxGroup
            options={options}
            value={specialMoves}
            onChange={setSpecialMoves}
          />
        </Flex>
        {generation === "default" && (
          <Flex direction="column" gap="small">
            <FancyText tag="h2" fontSize="large" fontWeight="medium">
              {t("offense.coverage.heading")}
            </FancyText>
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
              />
              <Flex>
                <CopyButton text={permalink.href}>
                  {t("general.copyLink")}
                </CopyButton>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex direction="column" gap="large">
        <Matchups
          kind="offense"
          generation={generation}
          types={offenseTypes}
          ability="none"
          teraType={Type.none}
          specialMoves={specialMoves}
        />
      </Flex>
    </main>
  );
}
