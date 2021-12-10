import classNames from "classnames";
import * as React from "react";
import { LinkButton } from "./LinkButton";

enum Location {
  TOP = "top",
  BOTTOM = "bottom",
}

interface PageSelectorProps {
  numPages: number;
  pageItems: any[];
  location: Location;
  currentPage: number;
  urlForPage: (page: number) => string;
  hasPrev: boolean;
  hasNext: boolean;
}

function PageSelector({
  numPages,
  pageItems,
  location,
  currentPage,
  urlForPage,
  hasPrev,
  hasNext,
}: PageSelectorProps) {
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
      className={classNames(
        "items-center mv3",
        pageItems.length === 0 ? "dn" : "flex"
      )}
    >
      <LinkButton
        onClick={() => {
          setScrollTo(location);
        }}
        disabled={!hasPrev}
        to={urlForPage(0)}
        aria-label="First"
      >
        &laquo;
      </LinkButton>
      <div className="pr1" />
      <LinkButton
        onClick={() => {
          setScrollTo(location);
        }}
        disabled={!hasPrev}
        to={urlForPage(currentPage - 1)}
        aria-label="Previous"
      >
        <span role="presentation">&lsaquo; </span>Prev
      </LinkButton>
      <div className="flex-auto tc b f5 tabular-nums">
        {(currentPage + 1).toString().padStart(numPages.toString().length, "0")}
        {" / "}
        {numPages}
      </div>
      <LinkButton
        onClick={() => {
          setScrollTo(location);
        }}
        disabled={!hasNext}
        to={urlForPage(currentPage + 1)}
        aria-label="Next"
      >
        Next<span role="presentation"> &rsaquo;</span>
      </LinkButton>
      <div className="pr1" />
      <LinkButton
        onClick={() => {
          setScrollTo(location);
        }}
        disabled={!hasNext}
        to={urlForPage(numPages - 1)}
        aria-label="Last"
      >
        &raquo;
      </LinkButton>
    </div>
  );
}

interface PaginatorProps<T> {
  urlForPage: (page: number) => string;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: T[];
  renderPage: (items: T[]) => any;
}

export default function Paginator<T>({
  urlForPage,
  currentPage,
  pageSize,
  emptyState,
  items,
  renderPage,
}: PaginatorProps<T>) {
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
        urlForPage={urlForPage}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        location={Location.BOTTOM}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        urlForPage={urlForPage}
      />
    </div>
  );
}
