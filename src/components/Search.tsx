import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Icon } from "./Icon";
import styles from "./Search.module.css";
import { customProperties } from "../misc/customProperties";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export function Search({ updateSearch, search }: SearchProps) {
  const { t } = useTranslation();
  const iconSize = 30;
  return (
    <div className={styles.root}>
      <Icon name="search" size={iconSize} className={styles.iconSearch} />
      <input
        aria-label={t("pokedex.search.description")}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classNames(styles.search, "focus-simple")}
        style={customProperties({
          "--icon-size": `${iconSize}px`,
        })}
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
