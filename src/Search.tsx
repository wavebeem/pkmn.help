import classnames from "classnames";
import * as React from "react";
import imageClearURL from "../svg/clear.svg";
import imageSearchURL from "../svg/search.svg";

interface SearchProps {
  updateSearch: (search: string) => void;
  search: string;
}

export default function Search(props: SearchProps) {
  const { updateSearch, search } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const iconSize = 24;
  const inputHeight = 36;
  return (
    <div className="relative mv3">
      <img
        src={imageSearchURL}
        width={iconSize}
        height={iconSize}
        role="presentation"
        className="o-50 absolute"
        style={{ left: 10, top: 8 }}
      />
      <input
        aria-label="Search"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="search"
        autoCapitalize="none"
        className={classnames(
          "f5 w-100 border-box",
          "pv2",
          "SimpleFocus",
          "inset-shadow",
          "br-pill ba",
          "bg-white",
          "hover-bg-washed-blue",
          "b--black-30",
          "search-placeholder-light"
        )}
        style={{ paddingLeft: 40, paddingRight: 40, height: inputHeight }}
        value={search}
        onChange={(event) => {
          updateSearch(event.target.value);
        }}
        ref={ref}
      />
      <img
        src={imageClearURL}
        width={iconSize}
        height={iconSize}
        role="presentation"
        onClick={() => {
          updateSearch("");
          if (ref.current) {
            ref.current.focus();
          }
        }}
        className={classnames("o-50 absolute", { dn: search === "" })}
        style={{ right: 6, top: 6 }}
      />
    </div>
  );
}

Search.displayName = "Search";
