import * as React from "react";
import * as classnames from "classnames";

import ImageClear from "../svg/clear.svg";
import ImageSearch from "../svg/search.svg";

interface SearchProps {
  updateSearch(search: string): any;
  search: string;
}

function Search(props: SearchProps) {
  const { updateSearch, search } = props;
  const clearSearch = () => {
    updateSearch("");
  };
  const onChange = (event: any) => {
    updateSearch(event.target.value);
  };
  const input = (
    <input
      aria-label="search"
      type="search"
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
      style={{
        paddingLeft: 65,
        paddingRight: 65,
        height: 55
      }}
      placeholder="Search"
      value={search}
      onChange={onChange}
    />
  );
  const iconColor = "#888";
  const icon = (
    <div
      className="absolute"
      style={{
        fill: iconColor,
        width: 40,
        height: 40,
        left: 12,
        top: 10
      }}
    >
      <ImageSearch />
    </div>
  );
  const clear = (
    <div
      role="presentation"
      onClick={clearSearch}
      className={classnames("absolute pointer", { dn: search === "" })}
      style={{
        fill: iconColor,
        width: 40,
        height: 40,
        right: 8,
        top: 8
      }}
    >
      <ImageClear />
    </div>
  );
  return (
    <div className="relative mv4">
      {icon}
      {input}
      {clear}
    </div>
  );
}

export default Search;
