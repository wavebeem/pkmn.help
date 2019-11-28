import React from "react";
import classnames from "classnames";

import { RoundButton } from "./RoundButton";

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

interface PageSelectorProps {
  numPages: number;
  pageItems: any[];
  location: Location;
  currentPage: number;
  updatePagePrev(): void;
  updatePageNext(): void;
  hasPrev: boolean;
  hasNext: boolean;
}

function PageSelector(props: PageSelectorProps) {
  return (
    <div
      className={classnames(
        "items-center",
        props.pageItems.length === 0 ? "dn" : "flex"
      )}
    >
      <div>
        <RoundButton
          onClick={() => {
            if (props.location === Location.BOTTOM) {
              scrollToTop();
            }
            props.updatePagePrev();
          }}
          disabled={!props.hasPrev}
          aria-label="Previous"
        >
          &lsaquo;
        </RoundButton>
      </div>
      <div className="flex-auto tc b f4">
        page {props.currentPage + 1} of {props.numPages}
      </div>
      <div>
        <RoundButton
          onClick={() => {
            if (props.location === Location.BOTTOM) {
              scrollToTop();
            }
            props.updatePageNext();
          }}
          disabled={!props.hasNext}
          aria-label="Next"
        >
          &rsaquo;
        </RoundButton>
      </div>
    </div>
  );
}

interface PaginatorProps<T> {
  updatePagePrev: () => void;
  updatePageNext: () => void;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: T[];
  render: (item: T, index: number, array: T[]) => any;
}

function Paginator<T>(props: PaginatorProps<T>) {
  const {
    currentPage,
    pageSize,
    items,
    emptyState,
    render,
    updatePagePrev,
    updatePageNext
  } = props;
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  return (
    <div>
      <PageSelector
        location={Location.TOP}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        updatePagePrev={updatePagePrev}
        updatePageNext={updatePageNext}
      />
      {pageItems.length === 0 ? (
        emptyState
      ) : (
        <div key={`page-${currentPage}`}>{pageItems.map(render)}</div>
      )}
      <PageSelector
        location={Location.BOTTOM}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        updatePagePrev={updatePagePrev}
        updatePageNext={updatePageNext}
      />
    </div>
  );
}

Paginator.displayName = "Paginator";

export default Paginator;
