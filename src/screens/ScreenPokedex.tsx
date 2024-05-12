import { matchSorter } from "match-sorter";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { Divider } from "../components/Divider";
import { EmptyState } from "../components/EmptyState";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Monster } from "../components/Monster";
import { Padding } from "../components/Padding";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { Spinner } from "../components/Spinner";
import { useSearch } from "../hooks/useSearch";
import { Pokemon, Type, typesFromUserInput } from "../misc/data-types";
import { formatMonsterNumber } from "../misc/formatMonsterNumber";
import { pickTranslation } from "../misc/pickTranslation";
import styles from "./ScreenPokedex.module.css";

export type ScreenPokedexProps = {
  allPokemon: Pokemon[];
  isLoading: boolean;
};

export function ScreenPokedex({ allPokemon, isLoading }: ScreenPokedexProps) {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const search = useSearch();
  const [query, setQuery] = useSessionStorage("pokedex.query", "");
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
    <main className="center content-narrow">
      <Flex direction="column" gap="large" padding="large">
        <Padding size="small" />
        <Flex direction="column" gap="medium">
          <Search search={query} updateSearch={updateSearch} />
          <div className={styles.small}>
            <Flex>
              <FancyText tag="span" aria-hidden="true">
                {t("pokedex.search.description")}
              </FancyText>
              <Flex flex="auto" />
              <FancyLink
                to="/pokedex/help/"
                aria-label={t("pokedex.search.helpLong")}
              >
                {t("pokedex.search.help")}
              </FancyLink>
            </Flex>
          </div>
        </Flex>
        <Divider />
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
                  setQuery={updateSearch}
                />
              ))
            }
          />
        )}
        <Flex>
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
        </Flex>
      </Flex>
    </main>
  );
}
