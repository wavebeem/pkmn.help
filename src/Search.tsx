import React from "react";
import classnames from "classnames";

import imageClearURL from "../svg/clear.svg";
import imageSearchURL from "../svg/search.svg";

interface SearchProps {
  updateSearch(search: string): any;
  search: string;
}

function Search(props: SearchProps) {
  const { updateSearch, search } = props;
  return (
    <div className="relative mv4">
      <img
        src={imageSearchURL}
        width={40}
        height={40}
        className="o-50 absolute"
        style={{ left: 12, top: 10 }}
      />
      <input
        aria-label="Search"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        inputMode="verbatim"
        autoCapitalize="none"
        className={classnames(
          "f2 w-100 border-box",
          "pv2",
          "chunky-focus",
          "inset-shadow",
          "br-pill ba",
          "bg-white",
          "hover-bg-washed-blue",
          "b--black-30",
          "search-placeholder-light"
        )}
        style={{ paddingLeft: 65, paddingRight: 65, height: 55 }}
        value={search}
        onChange={event => {
          updateSearch(event.target.value);
        }}
      />
      <img
        src={imageClearURL}
        width={40}
        height={40}
        role="presentation"
        onClick={() => {
          updateSearch("");
        }}
        className={classnames("o-50 absolute pointer", { dn: search === "" })}
        style={{ right: 8, top: 8 }}
      />
    </div>
  );
}

Search.displayName = "Search";

export default Search;
