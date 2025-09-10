import classNames from "classnames";
import { Fragment, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { DefenseTabs } from "../components/DefenseTabs";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Matchups } from "../components/Matchups";
import { Select } from "../components/Select";
import { MultiTypeSelector } from "../components/MultiTypeSelector";
import { useScrollToFragment } from "../hooks/useScrollToFragment";
import { useSearch } from "../hooks/useSearch";
import { useTypeCount } from "../hooks/useTypeCount";
import {
  AbilityName,
  Type,
  abilities,
  abilityNameFromString,
  types as allTypes,
  typesFromString,
} from "../misc/data-types";
import styles from "./ScreenDefense.module.css";
import { useGeneration } from "../hooks/useGeneration";

export function ScreenDefense(): ReactNode {
  useScrollToFragment();

  const [generation] = useGeneration();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [typeCount] = useTypeCount();
  const search = useSearch();

  const [types, setTypes] = useSessionStorage<Type[]>("defense.types", []);
  const [teraType, setTeraType] = useSessionStorage<Type>(
    "defense.teraType",
    Type.none,
  );
  const [ability, setAbility] = useSessionStorage<AbilityName>(
    "defense.ability",
    "none",
  );

  useEffect(() => {
    setTypes((types) => types.slice(0, Number(typeCount)));
  }, [typeCount]);

  useEffect(() => {
    if (search.has("types")) {
      setTypes(
        typesFromString(search.get("types") || "normal").slice(
          0,
          Number(typeCount),
        ),
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

  // Sort names alphabetically and remove "none" since we put that first
  // manually and add a divider after it
  const sortedAbilityNames = strongKeys(abilities)
    .filter((name) => {
      return !(name === "none" || name === "scrappy" || name === "tinted_lens");
    })
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
            {t("defense.chooseTypes")}
          </FancyText>
          <MultiTypeSelector
            generation={generation}
            value={types}
            onChange={setTypes}
            limit={Number(typeCount)}
          />
        </Flex>

        <Flex direction="column" gap="large">
          <div className={styles.selectGroup}>
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
            <Select
              label={t("defense.chooseTeraType")}
              value={teraType}
              onChange={(event) => {
                setTeraType(typesFromString(event.target.value)[0]);
              }}
            >
              <option value="">{t("types.none")}</option>
              <hr />
              {allTypes.flatMap((name) => {
                return (
                  <Fragment key={name}>
                    {name === "fire" || name === "stellar" ? <hr /> : null}
                    <option value={name}>{t(`types.${name}`)}</option>
                  </Fragment>
                );
              })}
            </Select>
          </div>
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

function strongKeys<TObject extends object>(
  object: TObject,
): (keyof TObject)[] {
  return Object.keys(object) as any;
}
