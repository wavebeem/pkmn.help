import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CoverageType, matchupFor, typesFromString } from "./data";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { MonsterType } from "./MonsterType";
import Paginator from "./Paginator";
import { useSearch } from "./useSearch";

interface WeaknessListProps {
  coverageTypes: CoverageType[];
  offenseParams: string;
}

export default function ScreenWeaknessList({
  coverageTypes,
  offenseParams,
}: WeaknessListProps) {
  const { t } = useTranslation();
  const search = useSearch();
  const page = Number(search.get("page") || 1) - 1;
  const types = typesFromString(
    new URLSearchParams(offenseParams).get("types") || ""
  );
  const weak = coverageTypes.filter((ct) => {
    const matchups = types.map((t) => matchupFor(ct.types, t));
    return matchups.some((effectiveness) => {
      return effectiveness > 1;
    });
  });
  return (
    <main className="pa3 center content-narrow lh-copy">
      <h2 className="lh-title f5">{t("coverageList.heading")}</h2>
      <p>
        <b aria-hidden="true">&larr;</b>{" "}
        <Link
          to={`/offense/${offenseParams}`}
          className="underline fg-link br1 OutlineFocus"
        >
          {t("coverage.back")}
        </Link>
      </p>
      {types.length > 0 && (
        <>
          <p>{t("coverageList.description")}</p>
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
          const path = "/offense/weakness-list";
          if (number === 0) {
            return path;
          }
          const params = new URLSearchParams();
          params.set("page", String(number + 1));
          return `${path}?${params}`;
        }}
        currentPage={page}
        pageSize={20}
        emptyState={
          <p className="fg4 f4 b tc m0">{t("offense.weaknessNotFound")}</p>
        }
        items={weak}
        renderPage={(items) => {
          return (
            <ul className="list pa0 border3 bt">
              {items.map(({ number, name, types }, i) => {
                return (
                  <li
                    key={i}
                    className="pv2 bb border3 flex flex-wrap justify-between gap2"
                  >
                    <span className="fg3">
                      {formatMonsterNumber(Number(number))}
                    </span>
                    <span className="b flex-auto">{name}</span>
                    <div className="flex flex-auto gap1 justify-end">
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
      {weak.length > 0 && (
        <p>
          <b aria-hidden="true">&larr;</b>{" "}
          <Link
            to={`/offense/${offenseParams}`}
            className="underline fg-link br1 OutlineFocus"
          >
            {t("coverage.back")}
          </Link>
        </p>
      )}
    </main>
  );
}
