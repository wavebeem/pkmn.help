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
import { MatchupsTeam } from "./MatchupsTeam";
import { MonsterType } from "./MonsterType";
import { TypeSelector } from "./TypeSelector";
import { updateArrayAt } from "./updateArrayAt";
import { useScrollToFragment } from "./useScrollToFragment";
import { useSearch } from "./useSearch";
import { useTypeCount } from "./useTypeCount";

interface ScreenDefenseTeamProps {
  generation: Generation;
  setDefenseTeamParams: (params: string) => void;
  defenseParams: string;
}

export function ScreenDefenseTeam({
  generation,
  setDefenseTeamParams,
  defenseParams,
}: ScreenDefenseTeamProps) {
  useScrollToFragment();

  const { t } = useTranslation();

  const search = useSearch();
  const history = useHistory();

  const [typeCount] = useTypeCount();

  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const typesStringList = search.getAll("types");
  const typesList = typesStringList.map((t) =>
    typesFromString(t).slice(0, Number(typeCount))
  );

  React.useEffect(() => {
    updateTypes(
      typesList.map((t) =>
        removeInvalidDefenseTypesForGeneration(generation, t)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  function createParams(typesList: Type[][]): string {
    typesList = [...new Set(typesList)];
    const params = new URLSearchParams();
    for (const types of typesList) {
      params.append("types", types.join(" "));
    }
    return "?" + params;
  }

  function updateTypes(typesList: Type[][]) {
    const search = createParams(typesList);
    if (search !== location.search) {
      history.replace({ search });
    }
  }

  function updateTypesAt(
    listIndex: number,
    typeIndex: number
  ): (t: Type) => void {
    return (t) => {
      updateTypes(
        typesList.map((types, i) => {
          if (i === listIndex) {
            return removeNones(updateArrayAt(types, typeIndex, t));
          }
          return types;
        })
      );
    };
  }

  const params = createParams(typesList);
  React.useEffect(() => {
    setDefenseTeamParams(params);
  }, [params, setDefenseTeamParams]);

  const classH2 = "f5 mb2 mt4";
  return (
    <main className="ph3 pt0 pb4 content-wide center">
      <div className="dib w-50-l w-100 v-top">
        <Link to={`/defense/${defenseParams}`}>Solo &rarr;</Link>
        <div className="flex flex-column gap3">
          {typesList.map((types, typeIndex) => {
            const name = t("defense.team.name", { teamNumber: typeIndex + 1 });
            return (
              <div
                key={typeIndex}
                className="bg1 br3 ba border2 pa3 button-shadow"
              >
                <div className="flex gap2 items-center justify-between">
                  <div className="inline-flex flex-wrap gap2">
                    {types.map((t) => (
                      <MonsterType key={t} type={t} />
                    ))}
                  </div>
                  {/* TODO: Each Pokémon should have a heading of some kind... */}
                  {/* <h2 className="f4 flex-auto ma0">{name}</h2> */}
                  <div className="flex gap2">
                    <Button
                      hidden={typeIndex === currentIndex}
                      onClick={() => {
                        setCurrentIndex(typeIndex);
                      }}
                      aria-label={t("defense.team.editLong", { name })}
                      title={t("defense.team.editLong", { name })}
                    >
                      {t("defense.team.edit")}
                    </Button>
                    <Button
                      hidden={typeIndex !== currentIndex}
                      onClick={() => {
                        setCurrentIndex(-1);
                      }}
                      aria-label={t("defense.team.saveLong", { name })}
                      title={t("defense.team.saveLong", { name })}
                    >
                      {t("defense.team.save")}
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentIndex(-1);
                        const list = [...typesList];
                        list.splice(typeIndex, 1);
                        updateTypes(list);
                      }}
                      aria-label={t("defense.team.removeLong", { name })}
                      title={t("defense.team.removeLong", { name })}
                    >
                      {t("defense.team.remove")}
                    </Button>
                  </div>
                </div>
                <div
                  hidden={typeIndex !== currentIndex}
                  className="bt border3 mt3"
                >
                  <h2 className={classH2}>{t("defense.chooseFirst")}</h2>
                  <TypeSelector
                    generation={generation}
                    name="primary"
                    value={types[0]}
                    onChange={updateTypesAt(typeIndex, 0)}
                    disabledTypes={[]}
                    includeNone={false}
                  />
                  <h2 className={classH2}>{t("defense.chooseSecond")}</h2>
                  <TypeSelector
                    generation={generation}
                    name="secondary"
                    value={types[1] || Type.NONE}
                    onChange={updateTypesAt(typeIndex, 1)}
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
                        onChange={updateTypesAt(typeIndex, 2)}
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
              const newTypes = [...typesList, [Type.NORMAL]];
              updateTypes(newTypes);
              setCurrentIndex(newTypes.length - 1);
            }}
          >
            Add Pokémon
          </Button>
        </div>
      </div>
      <div className="dib w-50-ns w-100 v-top pl5-ns">
        <hr className="dn-ns subtle-hr mv4" />
        <div className="pt2" />
        <MatchupsTeam
          // TODO: Call this correctly...
          kind="defense"
          generation={generation}
          typesList={typesList}
        />
      </div>
    </main>
  );
}
