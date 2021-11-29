import classNames from "classnames";
import * as React from "react";
import { IconSearch } from "./IconSearch";
import { IconClear } from "./IconClear";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export default function Search({ updateSearch, search }: SearchProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const iconSize = 24;
  const inputHeight = 36;
  return (
    <div className="relative mv3">
      <IconSearch
        width={iconSize}
        height={iconSize}
        role="presentation"
        className="absolute fg3 fill-currentColor"
        style={{ left: 10, top: 8 }}
      />
      <input
        aria-label="Search by name, number, or types"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classNames(
          "f5 w-100 border-box",
          "pv2",
          "SimpleFocus",
          "inset-shadow",
          "br-pill ba",
          "bg1",
          "fg1",
          "border1"
        )}
        style={{ paddingLeft: 40, paddingRight: 40, height: inputHeight }}
        value={search}
        onChange={(event) => {
          updateSearch(event.target.value);
        }}
        ref={ref}
      />
      <IconClear
        width={iconSize}
        height={iconSize}
        role="presentation"
        onClick={() => {
          updateSearch("");
          if (ref.current) {
            ref.current.focus();
          }
        }}
        className={classNames("absolute fg3 fill-currentColor", {
          dn: search === "",
        })}
        style={{ right: 6, top: 6 }}
      />
    </div>
  );
}
