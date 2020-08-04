import * as React from "react";
import classnames from "classnames";

import { RoundButton } from "./RoundButton";

enum Location {
  TOP = "top",
  BOTTOM = "bottom",
}

interface PageSelectorProps {
  numPages: number;
  pageItems: any[];
  location: Location;
  currentPage: number;
  updatePage(page: number): void;
  updatePagePrev(): void;
  updatePageNext(): void;
  hasPrev: boolean;
  hasNext: boolean;
}

function PageSelector(props: PageSelectorProps) {
  // Attempt to stay anchored to the top or bottom of the page when using
  // pagination buttons to avoid the screen jumping around and stuff
  const [scrollTo, setScrollTo] = React.useState<Location | undefined>(
    undefined
  );
  React.useLayoutEffect(() => {
    if (scrollTo === Location.TOP) {
      window.scrollTo(0, 0);
    } else if (scrollTo === Location.BOTTOM) {
      window.scrollTo(0, document.body.scrollHeight);
    }
    setScrollTo(undefined);
  }, [scrollTo]);
  return (
    <div
      className={classnames(
        "items-center mv3",
        props.pageItems.length === 0 ? "dn" : "flex"
      )}
    >
      <RoundButton
        onClick={() => {
          props.updatePage(0);
          setScrollTo(props.location);
        }}
        disabled={!props.hasPrev}
        aria-label="First"
      >
        &laquo;
      </RoundButton>
      <div className="pr1" />
      <RoundButton
        onClick={() => {
          props.updatePagePrev();
          setScrollTo(props.location);
        }}
        disabled={!props.hasPrev}
        aria-label="Previous"
      >
        <span role="presentation">&lsaquo; </span>Prev
      </RoundButton>
      <div className="flex-auto tc b f5">
        {(props.currentPage + 1)
          .toString()
          .padStart(props.numPages.toString().length, "0")}
        {" / "}
        {props.numPages}
      </div>
      <RoundButton
        onClick={() => {
          props.updatePageNext();
          setScrollTo(props.location);
        }}
        disabled={!props.hasNext}
        aria-label="Next"
      >
        Next<span role="presentation"> &rsaquo;</span>
      </RoundButton>
      <div className="pr1" />
      <RoundButton
        onClick={() => {
          props.updatePage(props.numPages - 1);
          setScrollTo(props.location);
        }}
        disabled={!props.hasNext}
        aria-label="Last"
      >
        &raquo;
      </RoundButton>
    </div>
  );
}

interface PaginatorProps<T> {
  updatePage: (page: number) => void;
  updatePagePrev: () => void;
  updatePageNext: () => void;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: T[];
  renderPage: (items: T[]) => any;
}

export function Paginator<T>(props: PaginatorProps<T>) {
  const {
    currentPage,
    pageSize,
    items,
    emptyState,
    renderPage,
    updatePage,
    updatePagePrev,
    updatePageNext,
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
        updatePage={updatePage}
        updatePagePrev={updatePagePrev}
        updatePageNext={updatePageNext}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        location={Location.BOTTOM}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        updatePage={updatePage}
        updatePagePrev={updatePagePrev}
        updatePageNext={updatePageNext}
      />
    </div>
  );
}

Paginator.displayName = "Paginator";
