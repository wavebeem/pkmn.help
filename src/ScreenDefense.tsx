import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./Button";
import { Generation } from "./data-generations";
import {
  removeInvalidDefenseTypesForGeneration,
  removeNones,
  Type,
  typesFromString,
} from "./data-types";
import { Matchups } from "./Matchups";
import { MatchupsTeam, MatchupsTeamProps } from "./MatchupsTeam";
import { MonsterType } from "./MonsterType";
import { Select } from "./Select";
import { TypeSelector } from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";
import { useTypeCount } from "./useTypeCount";

const modes = ["solo", "team"] as const;
type Mode = typeof modes[number];

interface State {
  mode: Mode;
  format: MatchupsTeamProps["format"];
  types: Type[];
  teamTypesList: Type[][];
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

  const [typeCount] = useTypeCount();

  const [teamIndex, setTeamIndex] = React.useState(-1);

  const state: State = {
    mode: (search.get("mode") || "solo") as any,
    types: typesFromString(search.get("types") || "normal").slice(
      0,
      Number(typeCount)
    ),
    format: (search.get("format") || "simple") as any,
    teamTypesList: search.getAll("team_types").map((t) => {
      return typesFromString(t).slice(0, Number(typeCount));
    }),
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

  function createParams({ mode, format, teamTypesList, types }: State): string {
    teamTypesList = teamTypesList.map((types) => [...new Set(types)]);
    types = [...new Set(types)];
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (types.length >= 0) {
      params.set("types", types.join(" "));
    }
    for (const types of teamTypesList) {
      params.append("team_types", types.join(" "));
    }
    params.set("format", format);
    return "?" + params;
  }

  function update(state: State) {
    const search = createParams(state);
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

  const classH2 = "f5 mb2 mt4";

  if (state.mode === "solo") {
    return (
      <main className="ph3 pt0 pb4 content-wide center">
        <div className="dib w-50-ns w-100 v-top">
          {/* TODO: Solo/Team selector */}
          <h2 className={classH2}>{t("defense.mode.heading")}</h2>
          <div className="flex flex-wrap gap2">
            <b>Solo</b>
            <Link
              to={oppositeParams}
              className="underline fg-link br1 OutlineFocus"
            >
              Team
            </Link>
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
            value={state.types[1] || Type.NONE}
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
                value={state.types[2] || Type.NONE}
                onChange={updateTypeAt(2)}
                disabledTypes={state.types.slice(0, 2)}
                includeNone={true}
              />
            </>
          )}
        </div>
        <div className="dib w-50-ns w-100 v-top pl5-ns">
          <hr className="dn-ns subtle-hr mv4" />
          <Matchups
            kind="defense"
            generation={generation}
            types={state.types}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="ph3 pt2 pb4 content-wide center">
      <div
        // TODO: Use flex instead of inline-block for this layout...
        className="dib w-50-l w-100 v-top"
      >
        {/* TODO: Solo/Team selector */}
        <h2 className={classH2}>{t("defense.mode.heading")}</h2>
        <div className="flex flex-wrap gap2">
          <Link
            to={oppositeParams}
            className="underline fg-link br1 OutlineFocus"
          >
            Solo
          </Link>
          <b>Team</b>
        </div>
        <div className="flex flex-column gap3 pt2">
          {state.teamTypesList.map((types, typeIndex) => {
            const name = t("defense.team.name", { teamNumber: typeIndex + 1 });
            return (
              <div
                key={typeIndex}
                className="bg1 br3 ba border2 pa3 button-shadow"
              >
                <div className="flex flex-wrap gap2 items-center justify-between">
                  <div className="inline-flex flex-wrap gap2">
                    {types.map((t) => (
                      <MonsterType key={t} type={t} />
                    ))}
                  </div>
                  {/* TODO: Each Pokémon should have a heading of some kind... */}
                  {/* <h2 className="f4 flex-auto ma0">{name}</h2> */}
                  <div className="flex gap2">
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
                        const list = [...state.teamTypesList];
                        list.splice(typeIndex, 1);
                        update({
                          ...state,
                          teamTypesList: list,
                        });
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
                    value={types[1] || Type.NONE}
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
                        value={types[2] || Type.NONE}
                        onChange={updateTeamTypesAt(typeIndex, 2)}
                        disabledTypes={types.slice(0, 2)}
                        includeNone={true}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt3">
          <Button
            onClick={() => {
              const newTypes = [...state.teamTypesList, [Type.NORMAL]];
              update({
                ...state,
                teamTypesList: newTypes,
              });
              setTeamIndex(newTypes.length - 1);
            }}
          >
            Add Pokémon
          </Button>
        </div>
      </div>
      <div className="dib w-50-l w-100 v-top pl5-l">
        <hr className="dn-l subtle-hr mv4" />
        <div className="pt2" />
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
        <div className="pt2" />
        <MatchupsTeam
          kind="defense"
          generation={generation}
          typesList={state.teamTypesList}
          format={state.format}
        />
      </div>
    </main>
  );
}
