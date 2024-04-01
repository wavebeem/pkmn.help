import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Generation } from "./data-generations";
import {
  removeInvalidDefenseTypesForGeneration,
  removeNones,
  Type,
  abilityNameFromString,
  AbilityName,
  typesFromString,
  abilities,
  types,
  typesWithoutNone,
} from "./data-types";
import { MatchupsTeam, MatchupsTeamProps } from "./MatchupsTeam";
import { Select } from "./Select";
import { TypeSelector } from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";
import { useTypeCount } from "./useTypeCount";
import { Badge } from "./Badge";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "./CopyButton";

const classH2 = "f4 weight-medium mb2 mt4";

const tabClass = classNames([
  "active-darken",
  "no-underline",
  "pv2 ph3 f5",
  "focus-tab",
  "tc",
  "ba border1 br-pill",
  "bg1 fg1",
]);

const tabClassActive = classNames(["button-selected"]);

function getTabClass({ isActive }: { isActive: boolean }): string {
  return classNames(tabClass, isActive && tabClassActive);
}

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

interface State {
  teamTypesList: Type[][];
  teamTeraTypeList: Type[];
  teamAbilityList: AbilityName[];
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
  const [teamIndex, setTeamIndex] = React.useState(-1);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
    <main className="ph3 pt0 pb4 content-wide center flex flex-column flex-row-l">
      <div className="flex-auto w-50-l">
        <h2 className={classH2}>{t("defense.mode.heading")}</h2>
        <div className="flex flex-wrap gap2">
          <NavLink to="/defense/" className={getTabClass({ isActive: false })}>
            {t("defense.mode.solo")}
          </NavLink>
          <NavLink to="" className={getTabClass({ isActive: true })}>
            {t("defense.mode.team")}
          </NavLink>
        </div>
        <h2 className={classH2}>{t("defense.team.heading")}</h2>
        <div className="flex flex-column gap3">
          {teamTypes.length === 0 && (
            <p className="fg4 f4 b m0 ba tc ma0 ph2 pv4 border3 br2">
              {t("defense.team.empty")}
            </p>
          )}
          {teamTypes.map((types, typeIndex) => {
            const name = String(typeIndex + 1);
            return (
              <div
                key={typeIndex}
                className="br3 ba border2 pa3 bg1 button-shadow"
              >
                <div className="flex flex-wrap gap2 items-center">
                  <div className="f5 b pr2 tabular-nums">{name}</div>
                  <div className="flex flex-column flex-row-ns flex-wrap justify-center gap2">
                    {types.map((t) => (
                      <Badge key={t} type={t} />
                    ))}
                  </div>
                  <div className="flex-auto" />
                  <div className="flex flex-column gap2">
                    <Button
                      onClick={() => {
                        if (typeIndex === teamIndex) {
                          setTeamIndex(-1);
                        } else {
                          setTeamIndex(typeIndex);
                        }
                      }}
                      aria-label={t(
                        typeIndex === teamIndex
                          ? "defense.team.saveLong"
                          : "defense.team.editLong",
                        { name }
                      )}
                      title={t(
                        typeIndex === teamIndex
                          ? "defense.team.saveLong"
                          : "defense.team.editLong",
                        { name }
                      )}
                    >
                      {t(
                        typeIndex === teamIndex
                          ? "defense.team.save"
                          : "defense.team.edit"
                      )}
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
                      aria-label={t("defense.team.removeLong", { name })}
                      title={t("defense.team.removeLong", { name })}
                    >
                      {t("defense.team.remove")}
                    </Button>
                  </div>
                </div>
                <div
                  hidden={typeIndex !== teamIndex}
                  className="bt border3 mt3"
                >
                  <h2 className={classH2}>{t("defense.chooseFirst")}</h2>
                  <TypeSelector
                    generation={generation}
                    value={types[0]}
                    onChange={updateTeamTypesAt(typeIndex, 0)}
                    disabledTypes={[]}
                    includeNone={false}
                  />
                  <h2 className={classH2}>{t("defense.chooseSecond")}</h2>
                  <TypeSelector
                    generation={generation}
                    value={types[1] || Type.none}
                    onChange={updateTeamTypesAt(typeIndex, 1)}
                    disabledTypes={types.slice(0, 1)}
                    includeNone={true}
                  />
                  {Number(typeCount) === 3 && (
                    <>
                      <h2 className={classH2}>{t("defense.chooseThird")}</h2>
                      <TypeSelector
                        generation={generation}
                        value={types[2] || Type.none}
                        onChange={updateTeamTypesAt(typeIndex, 2)}
                        disabledTypes={types.slice(0, 2)}
                        includeNone={true}
                      />
                    </>
                  )}
                  <div className="pt4">
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
                  </div>
                  <div className="pt4">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt3">
          <Button
            onClick={() => {
              const newTypes = [...teamTypes, [Type.normal]];
              setTeamTypes(newTypes);
              setTeamIndex(newTypes.length - 1);
            }}
          >
            {t("defense.team.add")}
          </Button>
        </div>
        <div className="pt4">
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
        </div>
      </div>
      <div className="flex-auto w-50-l pl5-l">
        <hr className="dn-l subtle-hr mv4" />
        <div className="pt0 pt4-l">
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
        </div>
        <h2 className={classH2}>{t("defense.team.tableHeading")}</h2>
        <MatchupsTeam
          generation={generation}
          typesList={teamTypes}
          teraTypes={teamTeraTypes}
          abilityList={teamAbilities}
          format={format}
        />
      </div>
    </main>
  );
}
