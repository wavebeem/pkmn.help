import classNames from "classnames";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { DefenseTabs } from "../components/DefenseTabs";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Matchups } from "../components/Matchups";
import { Select } from "../components/Select";
import { TypeSelector } from "../components/TypeSelector";
import { useScrollToFragment } from "../hooks/useScrollToFragment";
import { useSearch } from "../hooks/useSearch";
import { useTypeCount } from "../hooks/useTypeCount";
import {
  AbilityName,
  Type,
  abilities,
  abilityNameFromString,
  types as allTypes,
  normalizeTypes,
  typesFromString,
} from "../misc/data-types";
import { updateArrayAt } from "../misc/updateArrayAt";
import styles from "./ScreenDefense.module.css";
import { useGeneration } from "../hooks/useGeneration";

export function ScreenDefense(): ReactNode {
  useScrollToFragment();

  const [generation] = useGeneration();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [typeCount] = useTypeCount();
  const search = useSearch();

  const [types, setTypes] = useSessionStorage<Type[]>("defense.types", [
    Type.normal,
  ]);
  const [teraType, setTeraType] = useSessionStorage<Type>(
    "defense.teraType",
    Type.none
  );
  const [ability, setAbility] = useSessionStorage<AbilityName>(
    "defense.ability",
    "none"
  );

  useEffect(() => {
    setTypes((types) => types.slice(0, Number(typeCount)));
  }, [typeCount]);

  useEffect(() => {
    if (search.has("types")) {
      setTypes(
        typesFromString(search.get("types") || "normal").slice(
          0,
          Number(typeCount)
        )
      );
    }
    if (search.has("tera_type")) {
      setTeraType(typesFromString(search.get("tera_type") || "none")[0]);
    }
    if (search.has("ability")) {
      setAbility(abilityNameFromString(search.get("ability") || undefined));
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  const permalink = new URL(window.location.href);
  {
    const typesSet = [...new Set(types)];
    if (typesSet.length >= 0) {
      permalink.searchParams.set("types", typesSet.join(" "));
    }
    if (ability) {
      permalink.searchParams.set("ability", ability);
    }
    if (teraType) {
      permalink.searchParams.set("tera_type", teraType);
    }
  }

  function updateTypeAt(index: number): (type: Type) => void {
    return (type) => {
      setTypes(normalizeTypes(updateArrayAt(types, index, type)));
    };
  }

  // Sort names alphabetically and remove "none" since we put that first
  // manually and add a divider after it
  const sortedAbilityNames = Object.keys(abilities)
    .filter((name) => name !== "none")
    .sort((a, b) => {
      const ta = t(`defense.abilityNames.${a}`);
      const tb = t(`defense.abilityNames.${b}`);
      return ta.localeCompare(tb);
    });

  return (
    <main className={classNames(styles.root, "content-wide center")}>
      <Flex direction="column" gap="xlarge">
        <Flex direction="column" gap="medium">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("defense.mode.heading")}
          </FancyText>
          <DefenseTabs />
        </Flex>

        <Flex direction="column" gap="medium">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("defense.chooseFirst")}
          </FancyText>
          <TypeSelector
            generation={generation}
            value={types[0]}
            onChange={updateTypeAt(0)}
            disabledTypes={[]}
            includeNone={false}
          />
        </Flex>

        <Flex direction="column" gap="medium">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("defense.chooseSecond")}
          </FancyText>
          <TypeSelector
            generation={generation}
            value={types[1] || Type.none}
            onChange={updateTypeAt(1)}
            disabledTypes={types.slice(0, 1)}
            includeNone={true}
          />
        </Flex>

        {Number(typeCount) === 3 && (
          <Flex direction="column" gap="medium">
            <FancyText tag="h2" fontSize="large" fontWeight="medium">
              {t("defense.chooseThird")}
            </FancyText>
            <TypeSelector
              generation={generation}
              value={types[2] || Type.none}
              onChange={updateTypeAt(2)}
              disabledTypes={types.slice(0, 2)}
              includeNone={true}
            />
          </Flex>
        )}

        <Flex direction="column" gap="large">
          <Flex flex="auto">
            <Select
              label={t("defense.chooseAbility")}
              value={ability}
              onChange={(event) => {
                setAbility(abilityNameFromString(event.target.value));
              }}
            >
              <option value="">{t("defense.abilityNames.none")}</option>
              <hr />
              {sortedAbilityNames.map((name) => {
                return (
                  <option key={name} value={name}>
                    {t(`defense.abilityNames.${name}`)}
                  </option>
                );
              })}
            </Select>
          </Flex>

          <Flex flex="auto">
            <Select
              label={t("defense.chooseTeraType")}
              value={teraType}
              onChange={(event) => {
                setTeraType(typesFromString(event.target.value)[0]);
              }}
            >
              <option value="">{t("types.none")}</option>
              <hr />
              {allTypes.map((name) => {
                return (
                  <option key={name} value={name}>
                    {t(`types.${name}`)}
                  </option>
                );
              })}
            </Select>
          </Flex>
        </Flex>

        <Flex>
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
        </Flex>
      </Flex>

      <Flex direction="column" gap="large">
        <Matchups
          kind="defense"
          generation={generation}
          types={types}
          ability={ability}
          teraType={teraType}
          offenseAbilities={[]}
          specialMoves={[]}
        />
      </Flex>
    </main>
  );
}
