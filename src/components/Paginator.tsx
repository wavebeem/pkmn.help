import { ReactNode, memo, useCallback, useMemo, useRef } from "react";
import styles from "./Paginator.module.css";
import { PageSelector } from "./PageSelector";
import { useAppContext } from "../hooks/useAppContext";
import { useTranslation } from "react-i18next";
import { pickTranslation } from "../misc/pickTranslation";
import {
  TranslatedPokemon,
  Type,
  typesFromUserInput,
} from "../misc/data-types";
import { matchSorter } from "match-sorter";
import { EmptyState } from "./EmptyState";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { Monster } from "./Monster";

interface PaginatorProps {
  setPage: (page: number) => void;
  currentPage: number;
  pageSize: number;
  isStale: boolean;
  query: string;
  updateQuery: (query: string) => void;
}

export const Paginator = memo(function ({
  setPage,
  currentPage,
  pageSize,
  query,
  updateQuery,
  isStale,
}: PaginatorProps): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const { allPokemon } = useAppContext();
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const searchablePkmn = useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames, language),
        formName: pickTranslation(p.formNames, language),
      };
    });
  }, [allPokemon, language]);

  const pkmn = useMemo(() => {
    const s = query.trim().toLocaleLowerCase();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return searchablePkmn.filter((p) => p.number === number);
    }
    // The return value of `t` depends on the current value of `language`, but
    // the rules of hooks can't realize these. Pretend to use `language` here to
    // make it happy.
    language;
    const types = typesFromUserInput({ types: s, t, strict: true });
    if (types.length > 0) {
      return searchablePkmn.filter((p) => {
        if (types.length === 1) {
          return p.types[0] === types[0] || p.types[1] === types[0];
        }
        if (types.length === 2 && types[1] === Type.none) {
          return p.types.length === 1 && p.types[0] === types[0];
        }
        return (
          p.types.slice().sort().join(" ") === types.slice().sort().join(" ")
        );
      });
    }
    if (!s) {
      return searchablePkmn;
    }
    return matchSorter(searchablePkmn, s, {
      keys: ["speciesName", "formName", "number"],
    });
  }, [query, searchablePkmn, language, t]);

  const numPages = Math.ceil(pkmn.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = pkmn.slice(i, i + pageSize);

  const renderID = useCallback(
    (pkmn: TranslatedPokemon) => {
      return formatMonsterNumber(Number(pkmn.number));
    },
    [formatMonsterNumber]
  );

  return (
    <div ref={rootRef} className={styles.root}>
      <PageSelector
        anchorElementRef={rootRef}
        location="top"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
      {pageItems.length === 0 ? (
        <div className={styles.stale} data-stale={isStale}>
          <EmptyState>{t("pokedex.search.notFound")}</EmptyState>
        </div>
      ) : (
        <div className={styles.stale} data-stale={isStale}>
          <div className={styles.monsterGrid}>
            {pageItems.map((pokemon) => (
              <Monster
                key={pokemon.id}
                pokemon={pokemon}
                setQuery={updateQuery}
              />
            ))}
          </div>
        </div>
      )}
      <PageSelector
        anchorElementRef={rootRef}
        location="bottom"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
    </div>
  );
});
