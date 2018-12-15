import * as React from "react";
import * as classnames from "classnames";

import Button from "./Button";

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

enum Location {
  TOP = "top",
  BOTTOM = "bottom"
}

function prevButton(
  loc: Location,
  { updatePagePrev }: PaginatorProps,
  show: boolean
) {
  const onClick = () => {
    if (loc === Location.BOTTOM) {
      scrollToTop();
    }
    updatePagePrev();
  };
  const disabled = !show;
  return (
    <Button onClick={onClick} disabled={disabled}>
      <span className="sr-only">Previous</span>&laquo;
    </Button>
  );
}

function nextButton(
  loc: Location,
  { updatePageNext }: PaginatorProps,
  show: boolean
) {
  const onClick = () => {
    if (loc === Location.BOTTOM) {
      scrollToTop();
    }
    updatePageNext();
  };
  const disabled = !show;
  return (
    <Button onClick={onClick} disabled={disabled}>
      <span className="sr-only">Next</span>&raquo;
    </Button>
  );
}

function createPaginationButtons({
  numPages,
  pageItems,
  loc,
  props,
  hasPrev,
  hasNext
}: {
  numPages: number;
  pageItems: any[];
  loc: Location;
  props: PaginatorProps;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div
      className={classnames(
        "items-center",
        pageItems.length === 0 ? "dn" : "flex"
      )}
    >
      <div>{prevButton(loc, props, hasPrev)}</div>
      <div className="flex-auto tc b f3">
        page {props.currentPage + 1} of {numPages}
      </div>
      <div>{nextButton(loc, props, hasNext)}</div>
    </div>
  );
}

interface PaginatorProps {
  updatePagePrev: () => void;
  updatePageNext: () => void;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: any[];
  render: (item: any, index: number) => any;
}

function Paginator(props: PaginatorProps) {
  const { currentPage, pageSize, items, emptyState, render } = props;
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  const inner =
    pageItems.length === 0 ? (
      emptyState
    ) : (
      <div key={`page-${currentPage}`}>{pageItems.map(render)}</div>
    );
  const { TOP, BOTTOM } = Location;
  const top = createPaginationButtons({
    loc: TOP,
    numPages,
    pageItems,
    props,
    hasPrev,
    hasNext
  });
  const bottom = createPaginationButtons({
    loc: BOTTOM,
    numPages,
    pageItems,
    props,
    hasPrev,
    hasNext
  });
  return (
    <div>
      {top}
      {inner}
      {bottom}
    </div>
  );
}

export default Paginator;
