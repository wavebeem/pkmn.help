import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { CopyButton } from "../components/CopyButton";
import { DefenseTabs } from "../components/DefenseTabs";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { MatchupsTeam, MatchupsTeamProps } from "../components/MatchupsTeam";
import { Select } from "../components/Select";
import { TypeSelector } from "../components/TypeSelector";
import { useScrollToFragment } from "../hooks/useScrollToFragment";
import { useSearch } from "../hooks/useSearch";
import { useTypeCount } from "../hooks/useTypeCount";
import { Generation } from "../misc/data-generations";
import {
  AbilityName,
  Type,
  abilities,
  abilityNameFromString,
  removeInvalidDefenseTypesForGeneration,
  removeNones,
  typesFromString,
  typesWithoutNone,
} from "../misc/data-types";
import { updateArrayAt } from "../misc/updateArrayAt";
import styles from "./ScreenDefenseTeam.module.css";
import { EmptyState } from "../components/EmptyState";
import { Card } from "../components/Card";
import { Divider } from "../components/Divider";

function setAbilityAt({
  list,
  index,
  value,
  length,
}: {
  list: AbilityName[];
  index: number;
  value: AbilityName;
  length: number;
}): AbilityName[] {
  const sparseArray = updateArrayAt(list, index, value);
  if (sparseArray.length < length) {
    sparseArray.length = length;
  }
  const fullArray = Array.from(sparseArray);
  return fullArray.map((v) => v || "none");
}

function setTeraTypeAt({
  list,
  index,
  value,
  length,
}: {
  list: Type[];
  index: number;
  value: Type;
  length: number;
}): Type[] {
  const sparseArray = updateArrayAt(list, index, value);
  if (sparseArray.length < length) {
    sparseArray.length = length;
  }
  const fullArray = Array.from(sparseArray);
  return fullArray.map((v) => v || Type.none);
}

interface ScreenDefenseTeamProps {
  generation: Generation;
}

export function ScreenDefenseTeam({ generation }: ScreenDefenseTeamProps) {
  useScrollToFragment();

  const { t } = useTranslation();
  const search = useSearch();
  const navigate = useNavigate();
  const [format, setFormat] = useSessionStorage<MatchupsTeamProps["format"]>(
    "defenseTeam.format",
    "simple"
  );
  const [teamTypes, setTeamTypes] = useSessionStorage<Type[][]>(
    "defenseTeam.types",
    []
  );
  const [teamTeraTypes, setTeamTeraTypes] = useSessionStorage<Type[]>(
    "defenseTeam.teraTypes",
    []
  );
  const [teamAbilities, setTeamAbilities] = useSessionStorage<AbilityName[]>(
    "defenseTeam.abilities",
    []
  );
  const [typeCount] = useTypeCount();
  const [teamIndex, setTeamIndex] = useState(-1);

  useEffect(() => {
    setTeamTypes((teamTypes) => {
      return teamTypes.map((types) => types.slice(0, Number(typeCount)));
    });
  }, [typeCount]);

  useEffect(() => {
    if (search.has("format")) {
      setFormat((search.get("format") || "simple") as any);
    }
    if (search.has("types")) {
      setTeamTypes(
        search.getAll("types").map((type) => {
          return typesFromString(type).slice(0, Number(typeCount));
        })
      );
    }
    if (search.has("tera")) {
      setTeamTeraTypes(
        search.getAll("tera").map((type) => {
          return typesFromString(type)[0];
        })
      );
    }
    if (search.has("abilities")) {
      setTeamAbilities(
        (search.get("abilities") || "")
          .split(/\s+/)
          .filter((str) => str)
          .map(abilityNameFromString)
      );
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  useEffect(() => {
    setTeamTypes((teamTypes) => {
      return teamTypes.map((type) => {
        return removeInvalidDefenseTypesForGeneration(generation, type);
      });
    });
  }, [generation]);

  function updateTeamTypesAt(
    listIndex: number,
    typeIndex: number
  ): (type: Type) => void {
    return (t) => {
      setTeamTypes(
        teamTypes.map((types, i) => {
          if (i === listIndex) {
            return removeNones(updateArrayAt(types, typeIndex, t));
          }
          return types;
        })
      );
    };
  }

  const permalink = new URL(location.href);
  {
    for (const types of teamTypes) {
      permalink.searchParams.append("types", types.join(" "));
    }
    for (const type of teamTeraTypes) {
      permalink.searchParams.append("tera", type);
    }
    if (teamAbilities.length > 0) {
      permalink.searchParams.append("abilities", teamAbilities.join(" "));
    }
    permalink.searchParams.set("format", format);
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

        <Flex direction="column" gap="large">
          <Flex direction="column" gap="medium">
            <FancyText tag="h2" fontSize="large" fontWeight="medium">
              {t("defense.team.heading")}
            </FancyText>
            <Flex direction="column" gap="large">
              {teamTypes.length === 0 && (
                <EmptyState>{t("defense.team.empty")}</EmptyState>
              )}
              {teamTypes.map((types, typeIndex) => {
                const name = String(typeIndex + 1);
                return (
                  <Card key={typeIndex}>
                    <Flex wrap gap="medium" align="center" justify="flex-end">
                      <FancyText tag="div" fontWeight="medium" tabularNums>
                        {name}
                      </FancyText>
                      <Flex direction="row" wrap justify="center" gap="medium">
                        {types.map((t) => (
                          <Badge key={t} type={t} />
                        ))}
                      </Flex>
                      <Flex flex="auto" />
                      <Flex
                        direction="row"
                        wrap
                        justify="flex-end"
                        gap="medium"
                      >
                        <Button
                          aria-pressed={typeIndex === teamIndex}
                          onClick={() => {
                            if (typeIndex === teamIndex) {
                              setTeamIndex(-1);
                            } else {
                              setTeamIndex(typeIndex);
                            }
                          }}
                        >
                          {t("defense.team.edit")}
                        </Button>
                        <Button
                          onClick={() => {
                            setTeamIndex(-1);
                            const teamTypesList = [...teamTypes];
                            teamTypesList.splice(typeIndex, 1);
                            const teamAbilityList = [...teamAbilities];
                            teamAbilityList.splice(typeIndex, 1);
                            setTeamTypes(teamTypesList);
                            setTeamAbilities(teamAbilityList);
                          }}
                        >
                          {t("defense.team.remove")}
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex
                      hidden={typeIndex !== teamIndex}
                      direction="column"
                      gap="large"
                    >
                      <div />
                      <Divider />
                      <Flex direction="column" gap="medium">
                        <FancyText
                          tag="h3"
                          fontSize="large"
                          fontWeight="normal"
                        >
                          {t("defense.chooseFirst")}
                        </FancyText>
                        <TypeSelector
                          generation={generation}
                          value={types[0]}
                          onChange={updateTeamTypesAt(typeIndex, 0)}
                          disabledTypes={[]}
                          includeNone={false}
                        />
                      </Flex>

                      <Flex direction="column" gap="medium">
                        <FancyText
                          tag="h3"
                          fontSize="large"
                          fontWeight="normal"
                        >
                          {t("defense.chooseSecond")}
                        </FancyText>
                        <TypeSelector
                          generation={generation}
                          value={types[1] || Type.none}
                          onChange={updateTeamTypesAt(typeIndex, 1)}
                          disabledTypes={types.slice(0, 1)}
                          includeNone={true}
                        />
                      </Flex>
                      {Number(typeCount) === 3 && (
                        <>
                          <FancyText
                            tag="h3"
                            fontSize="large"
                            fontWeight="normal"
                          >
                            {t("defense.chooseThird")}
                          </FancyText>
                          <TypeSelector
                            generation={generation}
                            value={types[2] || Type.none}
                            onChange={updateTeamTypesAt(typeIndex, 2)}
                            disabledTypes={types.slice(0, 2)}
                            includeNone={true}
                          />
                        </>
                      )}
                      <Select
                        label={t("defense.chooseAbility")}
                        value={teamAbilities[typeIndex]}
                        onChange={(event) => {
                          const ability = abilityNameFromString(
                            event.target.value
                          );
                          if (!ability) {
                            return;
                          }
                          setTeamAbilities(
                            setAbilityAt({
                              list: teamAbilities,
                              index: typeIndex,
                              value: ability,
                              length: teamTypes.length,
                            })
                          );
                        }}
                      >
                        <option value="">
                          {t("defense.abilityNames.none")}
                        </option>
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
                        value={teamTeraTypes[typeIndex]}
                        onChange={(event) => {
                          const type = typesFromString(event.target.value)[0];
                          if (!type) {
                            return;
                          }
                          setTeamTeraTypes(
                            setTeraTypeAt({
                              list: teamTeraTypes,
                              index: typeIndex,
                              value: type,
                              length: teamTypes.length,
                            })
                          );
                        }}
                      >
                        <option value={Type.none}>{t("types.none")}</option>
                        <hr />
                        {typesWithoutNone.map((name) => {
                          return (
                            <option key={name} value={name}>
                              {t(`types.${name}`)}
                            </option>
                          );
                        })}
                      </Select>
                    </Flex>
                  </Card>
                );
              })}
            </Flex>
          </Flex>
          <Flex>
            <Button
              onClick={() => {
                const newTypes = [...teamTypes, [Type.normal]];
                setTeamTypes(newTypes);
                setTeamIndex(newTypes.length - 1);
              }}
            >
              {t("defense.team.add")}
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
        </Flex>
      </Flex>

      <Flex direction="column" gap="xlarge">
        <Flex>
          <Select
            onChange={(event) => {
              setFormat(event.target.value as any);
            }}
            value={format}
            label={t("defense.team.displayType")}
          >
            <option value="simple">{t("defense.team.simple")}</option>
            <option value="complex">{t("defense.team.complex")}</option>
            <option value="weak">{t("defense.team.weak")}</option>
            <option value="resist">{t("defense.team.resist")}</option>
          </Select>
        </Flex>
        <Flex direction="column" gap="medium">
          <FancyText tag="h2" fontSize="large" fontWeight="medium">
            {t("defense.team.tableHeading")}
          </FancyText>
          <MatchupsTeam
            generation={generation}
            typesList={teamTypes}
            teraTypes={teamTeraTypes}
            abilityList={teamAbilities}
            format={format}
          />
        </Flex>
      </Flex>
    </main>
  );
}
