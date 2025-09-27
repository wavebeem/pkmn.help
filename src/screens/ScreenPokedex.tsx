import { matchSorter } from "match-sorter";
import { ReactNode, useDeferredValue, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { Divider } from "../components/Divider";
import { EmptyState } from "../components/EmptyState";
import { Flex } from "../components/Flex";
import { Monster } from "../components/Monster";
import { Padding } from "../components/Padding";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { Select } from "../components/Select";
import { Spinner } from "../components/Spinner";
import { useAppContext } from "../hooks/useAppContext";
import { useSearch } from "../hooks/useSearch";
import { compare } from "../misc/compare";
import { Type, typesFromUserInput } from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { pickTranslation } from "../misc/pickTranslation";
import styles from "./ScreenPokedex.module.css";
import { FancyLink } from "../components/FancyLink";

export function ScreenPokedex(): ReactNode {
  const { allPokemon, isLoading } = useAppContext();
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const search = useSearch();
  const [query, setQuery] = useSessionStorage("pokedex.query", "");
  const [sortOrder, setSortOrder] = useSessionStorage("pokedex.sortOrder", "");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const [page, setPage] = useSessionStorage<number>("pokedex.page", 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.has("q")) {
      setQuery(search.get("q") || "");
    }
    if (search.has("page")) {
      setPage(Number(search.get("page") || 1) - 1);
    }
    navigate({ search: "" }, { replace: true });
  }, [search]);

  const searchablePkmn = useMemo(() => {
    return allPokemon.map((p) => {
      return {
        ...p,
        speciesName: pickTranslation(p.speciesNames, language),
        formName: pickTranslation(p.formNames, language),
        total: p.hp + p.attack + p.defense + p.spAttack + p.spDefense + p.speed,
      };
    });
  }, [allPokemon, language]);

  const pkmn = useMemo(() => {
    const s = deferredQuery.trim().toLocaleLowerCase();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return searchablePkmn.filter((p) => p.number === number);
    }
    // The return value of `t` depends on the current value of `language`, but
    // the rules of hooks can't realize these. Pretend to use `language` here to
    // make it happy.
    const types = typesFromUserInput({ types: s, t, strict: true });
    let items = searchablePkmn.slice();
    if (types.length > 0) {
      items = searchablePkmn.filter((p) => {
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
    } else if (s) {
      items = matchSorter(searchablePkmn, s, {
        keys: ["speciesName", "formName", "number"],
      });
    }
    switch (sortOrder) {
      case "hp":
      case "attack":
      case "defense":
      case "spAttack":
      case "spDefense":
      case "speed":
      case "total": {
        items = items.slice().sort((a, b) => {
          return -compare(a[sortOrder], b[sortOrder]);
        });
        break;
      }
    }
    return items;
  }, [deferredQuery, searchablePkmn, language, t, sortOrder]);

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

  const updateSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(0);
  };

  return (
    <main className="center content-wide">
      <Flex direction="column" gap="large" padding="large">
        <Padding size="small" />
        <div className={styles.searchArea}>
          <Flex direction="column" gap="medium">
            <Search
              label={t("pokedex.search.description")}
              value={query}
              onChange={updateSearch}
            />
          </Flex>
          <Select
            label={t("pokedex.sorting.sortBy")}
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
            }}
          >
            <option value="">Auto</option>
            <hr />
            <option value="hp">{t("pokedex.stats.hp")}</option>
            <option value="attack">{t("pokedex.stats.attack")}</option>
            <option value="defense">{t("pokedex.stats.defense")}</option>
            <option value="spAttack">{t("pokedex.stats.specialAttack")}</option>
            <option value="spDefense">
              {t("pokedex.stats.specialDefense")}
            </option>
            <option value="speed">{t("pokedex.stats.speed")}</option>
            <option value="total">{t("pokedex.stats.total")}</option>
          </Select>
        </div>
        <Divider />
        {isLoading ? (
          <Spinner />
        ) : (
          <Paginator
            currentPage={Number(page)}
            setPage={setPage}
            pageSize={8 * 3}
            emptyState={
              <EmptyState borderless>{t("pokedex.search.notFound")}</EmptyState>
            }
            items={pkmn}
            renderID={(pkmn) => formatMonsterNumber(Number(pkmn.number))}
            renderPage={(page) => (
              <div className={styles.monsterGrid} data-stale={isStale}>
                {page.map((pokemon) => (
                  <Monster
                    key={pokemon.id}
                    pokemon={pokemon}
                    setQuery={updateSearch}
                  />
                ))}
              </div>
            )}
          />
        )}
        <Divider />
        <Flex align="center">
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
          <Flex flex="auto" />
          <FancyLink
            to="/pokedex/help/"
            aria-label={t("pokedex.search.helpLong")}
          >
            {t("pokedex.search.help")}
          </FancyLink>
        </Flex>
      </Flex>
    </main>
  );
}
