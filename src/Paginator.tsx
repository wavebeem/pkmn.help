import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
} from "./components/IconArrows";
import { Button } from "./components/Button";
import styles from "./Paginator.module.css";

interface PageSelectorProps<T> {
  anchorElementRef: React.RefObject<HTMLDivElement>;
  location: "top" | "bottom";
  numPages: number;
  pageItems: T[];
  currentPage: number;
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  renderID: (item: T) => any;
}

function PageSelector<T>({
  anchorElementRef,
  location,
  numPages,
  pageItems,
  currentPage,
  setPage,
  hasPrev,
  hasNext,
  renderID,
}: PageSelectorProps<T>) {
  const { t } = useTranslation();

  const hasRoomForMediumButtons = useMediaQuery("(min-width: 420px)");
  const hasRoomForLargeButtons = useMediaQuery("(min-width: 520px");

  const buttonSize = hasRoomForLargeButtons
    ? "large"
    : hasRoomForMediumButtons
    ? "medium"
    : "small";

  const first = pageItems[0] || undefined;
  const last = pageItems[pageItems.length - 1] || undefined;

  const iconClasses = "w1 h1 mv1";

  function updatePage(page: number) {
    if (location === "bottom" && anchorElementRef.current) {
      anchorElementRef.current.scrollIntoView();
    }
    setPage(page);
  }

  return (
    <>
      {first && last && (
        <div className="flex mt3 tabular-nums f4 weight-medium">
          <div className="flex-auto">
            {renderID(first)} &ndash; {renderID(last)}
          </div>

          <div>
            (
            {(currentPage + 1)
              .toString()
              .padStart(numPages.toString().length, "0")}
            {" / "}
            {numPages})
          </div>
        </div>
      )}

      <div
        className={classNames(
          "items-stretch mv3 gap2",
          pageItems.length === 0 ? "dn" : "flex"
        )}
      >
        <Button
          disabled={!hasPrev}
          onClick={() => {
            updatePage(0);
          }}
          title={t("pokedex.pagination.firstLong")}
          aria-label={t("pokedex.pagination.firstLong")}
          className="flex items-center"
        >
          <IconArrowLeftDouble className={iconClasses} aria-hidden="true" />
        </Button>
        <Button
          disabled={!hasPrev}
          onClick={() => {
            updatePage(currentPage - 1);
          }}
          title={t("pokedex.pagination.previousLong")}
          aria-label={t("pokedex.pagination.previousLong")}
          className="flex items-center gap1"
        >
          <IconArrowLeft className={iconClasses} aria-hidden="true" />
          {buttonSize === "medium" && t("pokedex.pagination.previous")}
          {buttonSize === "large" && t("pokedex.pagination.previousLong")}
        </Button>
        <div aria-hidden="true" className="flex-auto" />
        <Button
          disabled={!hasNext}
          onClick={() => {
            updatePage(currentPage + 1);
          }}
          title={t("pokedex.pagination.nextLong")}
          aria-label={t("pokedex.pagination.nextLong")}
          className="flex items-center gap1"
        >
          {buttonSize === "medium" && t("pokedex.pagination.next")}
          {buttonSize === "large" && t("pokedex.pagination.nextLong")}
          <IconArrowRight className={iconClasses} aria-hidden="true" />
        </Button>
        <Button
          disabled={!hasNext}
          onClick={() => {
            updatePage(numPages - 1);
          }}
          title={t("pokedex.pagination.lastLong")}
          aria-label={t("pokedex.pagination.lastLong")}
          className="flex items-center"
        >
          <IconArrowRightDouble className={iconClasses} aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

interface PaginatorProps<T> {
  setPage: (page: number) => void;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: T[];
  renderPage: (items: T[]) => any;
  renderID: (item: T) => any;
}

export function Paginator<T>({
  setPage,
  currentPage,
  pageSize,
  emptyState,
  items,
  renderPage,
  renderID,
}: PaginatorProps<T>) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  return (
    <div ref={rootRef} className={styles.root}>
      <PageSelector
        anchorElementRef={rootRef}
        location="top"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        anchorElementRef={rootRef}
        location="bottom"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
    </div>
  );
}
