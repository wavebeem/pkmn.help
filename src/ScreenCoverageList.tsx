import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { partitionMatchups } from "./data-matchups";
import { Generation } from "./data-generations";
import { CoverageType, typesFromString } from "./data-types";
import { formatMonsterNumber } from "./formatMonsterNumber";
import { IconArrowLeft } from "./IconArrows";
import { Paginator } from "./Paginator";
import { useSearch } from "./useSearch";
import { Badge } from "./Badge";

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
  const [page, setPage] = React.useState(0);
  const types = typesFromString(search.get("types") || "");
  const partitionedMatchups = partitionMatchups({
    coverageTypes,
    types,
    generation,
  });
  const items = partitionedMatchups[mode];
  return (
    <main className="pa3 center content-narrow">
      <h2 className="lh-title f4 mv3 weight-medium">
        {t(`offense.coverageList.${mode}.heading`)}
      </h2>
      <p className="flex gap1 items-center">
        <IconArrowLeft className="w1 h1" aria-hidden="true" />
        <Link to="/offense/" className="underline fg-link br1 focus-outline">
          {t("coverage.back")}
        </Link>
      </p>
      {types.length > 0 && (
        <>
          <p>{t(`offense.coverageList.${mode}.description`)}</p>
          <div className="flex flex-wrap gap2">
            {types.map((t) => (
              <Badge key={t} type={t} />
            ))}
          </div>
        </>
      )}
      <hr className="subtle-hr mt4" />
      <Paginator
        setPage={setPage}
        currentPage={page}
        pageSize={20}
        emptyState={
          <p className="fg4 f4 tc mv4">{t("offense.coverageList.empty")}</p>
        }
        items={items}
        renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
        renderPage={(items) => {
          return (
            <ul className="list pa0 border3 bt">
              {items.map(({ number, name, types }, i) => {
                const dexParams = new URLSearchParams({ q: number, page: "1" });
                const dexLink = `/pokedex/?${dexParams}`;
                return (
                  <li
                    key={i}
                    className="pv2 bb border3 flex flex-column flex-row-ns justify-between gap2"
                  >
                    <div className="flex flex-column align-center f4">
                      <div className="fg3">
                        {formatMonsterNumber(Number(number))}
                      </div>
                      <Link
                        className="weight-medium flex-auto br1 no-underline fg-link focus-outline fit-content"
                        to={dexLink}
                      >
                        {name}
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap2 justify-start items-center">
                      {types.map((t) => (
                        <Badge key={t} type={t} />
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
          <Link to="/offense/" className="underline fg-link br1 focus-outline">
            {t("coverage.back")}
          </Link>
        </p>
      )}
    </main>
  );
}
