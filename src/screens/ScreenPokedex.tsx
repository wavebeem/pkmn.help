import { ReactNode, useDeferredValue, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { CopyButton } from "../components/CopyButton";
import { Divider } from "../components/Divider";
import { FancyLink } from "../components/FancyLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { Padding } from "../components/Padding";
import { Paginator } from "../components/Paginator";
import { Search } from "../components/Search";
import { Spinner } from "../components/Spinner";
import { useAppContext } from "../hooks/useAppContext";
import { useSearch } from "../hooks/useSearch";
import styles from "./ScreenPokedex.module.css";

export function ScreenPokedex(): ReactNode {
  const { isLoading } = useAppContext();
  const { t } = useTranslation();
  const search = useSearch();
  const [query, setQuery] = useSessionStorage("pokedex.query", "");
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
            pageSize={14 * 3}
            query={deferredQuery}
            updateQuery={updateSearch}
            isStale={isStale}
          />
        )}
        <Flex>
          <CopyButton text={permalink.href}>{t("general.copyLink")}</CopyButton>
        </Flex>
      </Flex>
    </main>
  );
}
