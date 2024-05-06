import { matchSorter } from "match-sorter";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Pokemon, Type, typesFromUserInput } from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { Paginator } from "../components/Paginator";
import { pickTranslation } from "../misc/pickTranslation";
import { Search } from "../Search";
import { useSearch } from "../hooks/useSearch";
import Spinner from "../components/Spinner";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { Monster } from "../components/Monster";
import { EmptyState } from "../components/EmptyState";

interface ScreenPokedexProps {
  allPokemon: Pokemon[];
  isLoading: boolean;
}

export function ScreenPokedex({ allPokemon, isLoading }: ScreenPokedexProps) {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const search = useSearch();
  const [query, setQuery] = useSessionStorage("pokedex.query", "");
  const [page, setPage] = useSessionStorage<number>("pokedex.page", 0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (search.has("q")) {
      setQuery(search.get("q") || "");
    }
    if (search.has("page")) {
      setPage(Number(search.get("page") || 1) - 1);
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  const searchablePkmn = React.useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames, language),
        formName: pickTranslation(p.formNames, language),
      };
    });
  }, [allPokemon, language]);

  const pkmn = React.useMemo(() => {
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

  const permalink = new URL(window.location.href);
  {
    const newQuery = query.trim();
    if (newQuery) {
      permalink.searchParams.set("q", newQuery);
    }
    if (Number(page) > 0) {
      permalink.searchParams.set("page", String(page + 1));
    }
  }

  return (
    <main className="ph3 mt3 center content-narrow">
      <div className="pt2" />
      <Search
        search={query}
        updateSearch={(newQuery) => {
          setQuery(newQuery);
          setPage(0);
        }}
      />
      <div className="flex justify-between ph2 nt2 pb3 bb mb3 border3 f6">
        <span className="fg3" aria-hidden="true">
          {t("pokedex.search.description")}
        </span>
        <Link
          to="/pokedex/help/"
          className="br1 underline fg-link focus-outline ml3 flex-none"
          aria-label={t("pokedex.search.helpLong")}
        >
          {t("pokedex.search.help")}
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Paginator
          currentPage={Number(page)}
          setPage={setPage}
          pageSize={20}
          emptyState={<EmptyState>{t("pokedex.search.notFound")}</EmptyState>}
          items={pkmn}
          renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
          renderPage={(page) =>
            page.map((pokemon) => (
              <Monster
                key={pokemon.id}
                pokemon={pokemon}
                setQuery={(query) => {
                  setQuery(query);
                  setPage(0);
                }}
              />
            ))
          }
        />
      )}
      <div className="pt2 pb4">
        <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
      </div>
    </main>
  );
}
