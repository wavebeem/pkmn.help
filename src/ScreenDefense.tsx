import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
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
} from "./data-types";
import { Matchups } from "./Matchups";
import { MatchupsTeam, MatchupsTeamProps } from "./MatchupsTeam";
import { MonsterType } from "./MonsterType";
import { Select } from "./Select";
import { TypeSelector } from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";
import { useTeamTypes } from "./useTeamTypes";
import { useTypeCount } from "./useTypeCount";
import { useTeamAbilities } from "./useTeamAbilities";

const modes = ["solo", "team"] as const;
type Mode = typeof modes[number];

const classH2 = "f5 mb2 mt4";

const tabClass = classNames([
  "no-underline",
  "pv1 ph3 f5",
  "focus-tab",
  "tc",
  "ba border1 br-pill",
  "bg1 fg1",
  "active-squish",
]);

const tabClassActive = classNames(["button-selected"]);

interface State {
  mode: Mode;
  format: MatchupsTeamProps["format"];
  types: Type[];
  ability: AbilityName;
  teamTypesList: Type[][];
  teamAbilityList: AbilityName[];
}

interface ScreenDefenseTeamProps {
  generation: Generation;
  setDefenseParams: (params: string) => void;
}

export function ScreenDefense({
  generation,
  setDefenseParams,
}: ScreenDefenseTeamProps) {
  useScrollToFragment();

  const { t } = useTranslation();

  const search = useSearch();
  const history = useHistory();

  const [teamTypes, setTeamTypes] = useTeamTypes();
  const [teamAbilities, setTeamAbilities] = useTeamAbilities();

  const [typeCount] = useTypeCount();

  const [teamIndex, setTeamIndex] = React.useState(-1);

  const state: State = {
    mode: (search.get("mode") || "solo") as any,
    types: typesFromString(search.get("types") || "normal").slice(
      0,
      Number(typeCount)
    ),
    ability: abilityNameFromString(search.get("ability") || undefined),
    format: (search.get("format") || "simple") as any,
    teamTypesList: (() => {
      if (search.get("team_types") === null && search.get("mode") !== "team") {
        return teamTypes;
      }
      return search.getAll("team_types").map((t) => {
        return typesFromString(t).slice(0, Number(typeCount));
      });
    })(),
    teamAbilityList: (() => {
      if (
        search.get("team_abilities") === null &&
        search.get("mode") !== "team"
      ) {
        return teamAbilities;
      }
      return (search.get("team_abilities") || "")
        .split(/\s+/)
        .filter((str) => str)
        .map(abilityNameFromString);
    })(),
  };

  React.useEffect(() => {
    update({
      ...state,
      teamTypesList: state.teamTypesList.map((t) =>
        removeInvalidDefenseTypesForGeneration(generation, t)
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  function createParams({
    mode,
    ability,
    format,
    teamTypesList,
    teamAbilityList,
    types,
  }: State): string {
    teamTypesList = teamTypesList.map((types) => [...new Set(types)]);
    types = [...new Set(types)];
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (types.length >= 0) {
      params.set("types", types.join(" "));
    }
    if (ability) {
      params.set("ability", ability);
    }
    for (const types of teamTypesList) {
      params.append("team_types", types.join(" "));
    }
    if (teamAbilityList.length > 0) {
      params.append("team_abilities", teamAbilityList.join(" "));
    }
    params.set("format", format);
    return "?" + params;
  }

  function update(state: State) {
    const search = createParams(state);
    setTeamTypes(state.teamTypesList);
    setTeamAbilities(state.teamAbilityList);
    if (search !== location.search) {
      history.replace({ search });
    }
  }

  function updateTeamTypesAt(
    listIndex: number,
    typeIndex: number
  ): (t: Type) => void {
    return (t) => {
      update({
        ...state,
        teamTypesList: state.teamTypesList.map((types, i) => {
          if (i === listIndex) {
            return removeNones(updateArrayAt(types, typeIndex, t));
          }
          return types;
        }),
      });
    };
  }

  function updateTypeAt(index: number): (t: Type) => void {
    return (t: Type) => {
      update({
        ...state,
        types: removeNones(updateArrayAt(state.types, index, t)),
      });
    };
  }

  const params = createParams(state);
  React.useEffect(() => {
    setDefenseParams(params);
  }, [params, setDefenseParams]);

  const oppositeParams = createParams({
    ...state,
    mode: state.mode === "solo" ? "team" : "solo",
  });

  // Sort names alphabetically and remove "none" since we put that first
  // manually and add a divider after it
  const sortedAbilityNames = Object.keys(abilities)
    .filter((name) => name !== "none")
    .sort((a, b) => {
      const ta = t(`defense.abilityNames.${a}`);
      const tb = t(`defense.abilityNames.${b}`);
      return ta.localeCompare(tb);
    });

  if (state.mode === "solo") {
    return (
      <main className="ph3 pt0 pb4 content-wide center flex flex-column flex-row-ns">
        <div className="flex-auto w-50-ns">
          <h2 className={classH2}>{t("defense.mode.heading")}</h2>
          <div className="flex flex-wrap gap2">
            <NavLink
              to={params}
              className={tabClass}
              activeClassName={tabClassActive}
              isActive={() => true}
            >
              {t("defense.mode.solo")}
            </NavLink>
            <NavLink
              to={oppositeParams}
              className={tabClass}
              activeClassName={tabClassActive}
              isActive={() => false}
            >
              {t("defense.mode.team")}
            </NavLink>
          </div>
          <h2 className={classH2}>{t("defense.chooseFirst")}</h2>
          <TypeSelector
            generation={generation}
            name="primary"
            value={state.types[0]}
            onChange={updateTypeAt(0)}
            disabledTypes={[]}
            includeNone={false}
          />
          <h2 className={classH2}>{t("defense.chooseSecond")}</h2>
          <TypeSelector
            generation={generation}
            name="secondary"
            value={state.types[1] || Type.none}
            onChange={updateTypeAt(1)}
            disabledTypes={state.types.slice(0, 1)}
            includeNone={true}
          />
          {Number(typeCount) === 3 && (
            <>
              <h2 className={classH2}>{t("defense.chooseThird")}</h2>
              <TypeSelector
                generation={generation}
                name="third"
                value={state.types[2] || Type.none}
                onChange={updateTypeAt(2)}
                disabledTypes={state.types.slice(0, 2)}
                includeNone={true}
              />
            </>
          )}
          <div className="pt4 mw-max">
            <Select
              label={t("defense.chooseAbility")}
              value={state.ability}
              onChange={(event) => {
                update({
                  ...state,
                  ability: abilityNameFromString(event.target.value),
                });
              }}
            >
              <option value="">{t("defense.abilityNames.none")}</option>
              <option disabled>&ndash;</option>
              {sortedAbilityNames.map((name) => {
                return (
                  <option key={name} value={name}>
                    {t(`defense.abilityNames.${name}`)}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="flex-auto w-50-ns pl5-ns">
          <hr className="dn-ns subtle-hr mv4" />
          <Matchups
            kind="defense"
            generation={generation}
            types={state.types}
            ability={state.ability}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="ph3 pt0 pb4 content-wide center flex flex-column flex-row-l">
      <div className="flex-auto w-50-l">
        <h2 className={classH2}>{t("defense.mode.heading")}</h2>
        <div className="flex flex-wrap gap2">
          <NavLink
            to={oppositeParams}
            className={tabClass}
            activeClassName={tabClassActive}
            isActive={() => false}
          >
            {t("defense.mode.solo")}
          </NavLink>
          <NavLink
            to={params}
            className={tabClass}
            activeClassName={tabClassActive}
            isActive={() => true}
          >
            {t("defense.mode.team")}
          </NavLink>
        </div>
        <h2 className={classH2}>{t("defense.team.heading")}</h2>
        <div className="flex flex-column gap3">
          {state.teamTypesList.length === 0 && (
            <p className="fg4 f4 b m0 ba tc ma0 ph2 pv4 border3 br2">
              {t("defense.team.empty")}
            </p>
          )}
          {state.teamTypesList.map((types, typeIndex) => {
            const name = `${typeIndex + 1}`;
            return (
              <div
                key={typeIndex}
                className="br3 ba border2 pa3 bg1 button-shadow"
              >
                <div className="flex flex-wrap gap2 items-center">
                  <div className="f5 b pr2 tabular-nums">{typeIndex + 1}</div>
                  <div className="flex flex-column flex-row-ns flex-wrap justify-center gap2">
                    {types.map((t) => (
                      <MonsterType key={t} type={t} />
                    ))}
                  </div>
                  <div className="flex-auto" />
                  <div className="flex flex-column flex-row-ns gap2">
                    <Button
                      size="small"
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
                      size="small"
                      onClick={() => {
                        setTeamIndex(-1);
                        const teamTypesList = [...state.teamTypesList];
                        teamTypesList.splice(typeIndex, 1);
                        const teamAbilityList = [...state.teamAbilityList];
                        teamAbilityList.splice(typeIndex, 1);
                        update({ ...state, teamTypesList, teamAbilityList });
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
                    name="primary"
                    value={types[0]}
                    onChange={updateTeamTypesAt(typeIndex, 0)}
                    disabledTypes={[]}
                    includeNone={false}
                  />
                  <h2 className={classH2}>{t("defense.chooseSecond")}</h2>
                  <TypeSelector
                    generation={generation}
                    name="secondary"
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
                        name="third"
                        value={types[2] || Type.none}
                        onChange={updateTeamTypesAt(typeIndex, 2)}
                        disabledTypes={types.slice(0, 2)}
                        includeNone={true}
                      />
                    </>
                  )}
                  <div className="pt4 mw-max">
                    <Select
                      label={t("defense.chooseAbility")}
                      value={state.teamAbilityList[typeIndex]}
                      onChange={(event) => {
                        const ability = abilityNameFromString(
                          event.target.value
                        );
                        if (!ability) {
                          return;
                        }
                        update({
                          ...state,
                          teamAbilityList: updateArrayAt(
                            state.teamAbilityList,
                            typeIndex,
                            ability
                          ),
                        });
                      }}
                    >
                      <option value="">{t("defense.abilityNames.none")}</option>
                      <option disabled>&ndash;</option>
                      {sortedAbilityNames.map((name) => {
                        return (
                          <option key={name} value={name}>
                            {t(`defense.abilityNames.${name}`)}
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
              const newTypes = [...state.teamTypesList, [Type.normal]];
              update({
                ...state,
                teamTypesList: newTypes,
              });
              setTeamIndex(newTypes.length - 1);
            }}
          >
            {t("defense.team.add")}
          </Button>
        </div>
      </div>
      <div className="flex-auto w-50-l pl5-l">
        <hr className="dn-l subtle-hr mv4" />
        <div className="pt0 pt4-l mw-max">
          <Select
            onChange={(event) => {
              update({
                ...state,
                format: event.target.value as any,
              });
            }}
            value={state.format}
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
          typesList={state.teamTypesList}
          abilityList={state.teamAbilityList}
          format={state.format}
        />
      </div>
    </main>
  );
}
