import classNames from "classnames";
import * as React from "react";
import { IconSearch } from "./components/IconSearch";
import { IconClear } from "./components/IconClear";
import { useTranslation } from "react-i18next";

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
      <IconSearch
        width={iconSize}
        height={iconSize}
        role="presentation"
        className="absolute fg3 fill-currentcolor"
        style={{ left: 10, top: 8 }}
      />
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
      <IconClear
        width={iconSize}
        height={iconSize}
        role="presentation"
        onClick={() => {
          updateSearch("");
        }}
        className={classNames("absolute fg1 fill-currentcolor", {
          dn: search === "",
        })}
        style={{ right: 6, top: 6 }}
      />
    </div>
  );
}
