import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./Search.module.css";
import { customProperties } from "../misc/customProperties";
import { ReactNode } from "react";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export function Search({ updateSearch, search }: SearchProps): ReactNode {
  const { t } = useTranslation();
  const iconSize = 30;
  return (
    <div
      className={styles.root}
      style={customProperties({
        "--icon-size": `${iconSize}px`,
      })}
    >
      <Icon name="search" size={iconSize} className={styles.iconSearch} />
      <input
        aria-label={t("pokedex.search.description")}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classNames(styles.search, "focus-simple")}
        value={search}
        onChange={(event) => {
          updateSearch(event.target.value);
        }}
      />
      <Icon
        name="clear"
        size={iconSize}
        className={classNames(styles.iconClear, search === "" && styles.hidden)}
        onClick={() => {
          updateSearch("");
        }}
      />
    </div>
  );
}
