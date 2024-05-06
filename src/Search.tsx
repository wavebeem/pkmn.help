import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "./components/Icon";
import styles from "./Search.module.css";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export function Search({ updateSearch, search }: SearchProps) {
  const { t } = useTranslation();
  const iconSize = 30;
  const inputHeight = 42;
  return (
    <div className="relative mv3">
      <Icon name="search" size={iconSize} className={styles.iconSearch} />
      <input
        aria-label={t("pokedex.search.description")}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classNames(
          "f5 w-100 border-box",
          "focus-simple",
          "inset-shadow",
          "br-pill ba",
          "bg1",
          "fg1",
          "border1"
        )}
        style={{
          paddingLeft: `calc(1px * ${iconSize} + 1rem)`,
          paddingRight: `calc(1px * ${iconSize} + 1rem)`,
          height: inputHeight,
        }}
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
