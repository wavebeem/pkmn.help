import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { partitionMatchups } from "./data-matchups";
import { Generation } from "./data-generations";
import { CoverageType, typesFromString } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { IconArrowLeft } from "./IconArrows";
import { MonsterType } from "./MonsterType";
import { Paginator } from "./Paginator";
import { useSearch } from "./useSearch";

interface CoverageListProps {
  mode: "weakness" | "resistance" | "normal";
  generation: Generation;
  coverageTypes: CoverageType[];
}

export function ScreenCoverageList({
  mode,
  generation,
  coverageTypes,
}: CoverageListProps) {
  const { t } = useTranslation();
  const search = useSearch();
  const page = Number(search.get("page") || 1) - 1;
  const types = typesFromString(search.get("types") || "");
  const partitionedMatchups = partitionMatchups({
    coverageTypes,
    types,
    generation,
  });
  const items = partitionedMatchups[mode];
  const offenseParams = new URLSearchParams({ types: types.join(" ") });
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">
        {t(`offense.coverageList.${mode}.heading`)}
      </h2>
      <p className="flex gap1 items-center">
        <IconArrowLeft className="w1 h1" aria-hidden="true" />
        <Link
          to={`/offense/?${offenseParams}`}
          className="underline fg-link br1 focus-outline"
        >
          {t("coverage.back")}
        </Link>
      </p>
      {types.length > 0 && (
        <>
          <p>{t(`offense.coverageList.${mode}.description`)}</p>
          <div className="flex flex-wrap gap2">
            {types.map((t) => (
              <MonsterType key={t} type={t} />
            ))}
          </div>
        </>
      )}
      <hr className="subtle-hr mt4" />
      <Paginator
        urlForPage={(number) => {
          const path = `/offense/coverage/${mode}/`;
          const params = new URLSearchParams({ types: types.join(" ") });
          if (number > 0) {
            params.set("page", String(number + 1));
          }
          return `${path}?${params}`;
        }}
        currentPage={page}
        pageSize={20}
        emptyState={
          <p className="fg4 f4 b tc mv4">{t("offense.coverageList.empty")}</p>
        }
        items={items}
        renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
        renderPage={(items) => {
          return (
            <ul className="list pa0 border3 bt">
              {items.map(({ number, name, types }, i) => {
                return (
                  <li
                    key={i}
                    className="pv2 bb border3 flex justify-between gap2"
                  >
                    <div className="flex-ns gap2">
                      <div className="fg3">
                        {formatMonsterNumber(Number(number))}
                      </div>
                      <div className="b flex-auto">{name}</div>
                    </div>
                    <div className="flex gap1 items-center">
                      {types.map((t) => (
                        <MonsterType key={t} type={t} />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }}
      />
      <hr className="subtle-hr mb4" />
      {items.length > 0 && (
        <p className="flex gap1 items-center">
          <IconArrowLeft className="w1 h1" aria-hidden="true" />
          <Link
            to={`/offense/?${offenseParams}`}
            className="underline fg-link br1 focus-outline"
          >
            {t("coverage.back")}
          </Link>
        </p>
      )}
    </main>
  );
}
