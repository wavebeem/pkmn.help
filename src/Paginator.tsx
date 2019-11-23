import React from "react";
import classnames from "classnames";

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

function prevButton<T>(
  loc: Location,
  { updatePagePrev }: PaginatorProps<T>,
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
    <Button onClick={onClick} disabled={disabled} aria-label="Previous">
      &laquo;
    </Button>
  );
}

function nextButton<T>(
  loc: Location,
  { updatePageNext }: PaginatorProps<T>,
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
    <Button onClick={onClick} disabled={disabled} aria-label="Next">
      &raquo;
    </Button>
  );
}

function createPaginationButtons<T>({
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
  props: PaginatorProps<T>;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div
      className={classnames(
        "items-center ph2",
        pageItems.length === 0 ? "dn" : "flex"
      )}
    >
      <div>{prevButton(loc, props, hasPrev)}</div>
      <div className="flex-auto tc b f4">
        page {props.currentPage + 1} of {numPages}
      </div>
      <div>{nextButton(loc, props, hasNext)}</div>
    </div>
  );
}

interface PaginatorProps<T> {
  updatePagePrev: () => void;
  updatePageNext: () => void;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: any[];
  render: (item: T, index: number, array: T[]) => any;
}

function Paginator<T>(props: PaginatorProps<T>) {
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

Paginator.displayName = "Paginator";

export default Paginator;
