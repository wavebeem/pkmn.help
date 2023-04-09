import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
} from "./IconArrows";
import { LinkButton } from "./LinkButton";

interface PageSelectorProps<T> {
  numPages: number;
  pageItems: T[];
  currentPage: number;
  urlForPage: (page: number) => string;
  hasPrev: boolean;
  hasNext: boolean;
  renderID: (item: T) => any;
}

function PageSelector<T>({
  numPages,
  pageItems,
  currentPage,
  urlForPage,
  hasPrev,
  hasNext,
  renderID,
}: PageSelectorProps<T>) {
  const { t } = useTranslation();

  const hasRoomForMediumButtons = useMediaQuery("(min-width: 45ch)");
  const hasRoomForLargeButtons = useMediaQuery("(min-width: 60ch");

  const buttonSize = hasRoomForLargeButtons
    ? "large"
    : hasRoomForMediumButtons
    ? "medium"
    : "small";

  const first = pageItems[0] || undefined;
  const last = pageItems[pageItems.length - 1] || undefined;

  return (
    <>
      {first && last && (
        <div className="flex mt3 tabular-nums f5 b">
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
        <LinkButton
          disabled={!hasPrev}
          to={urlForPage(0)}
          title={t("pokedex.pagination.firstLong")}
          aria-label={t("pokedex.pagination.firstLong")}
          className="flex items-center"
        >
          <IconArrowLeftDouble className="w1 h1" aria-hidden="true" />
        </LinkButton>
        <LinkButton
          disabled={!hasPrev}
          to={urlForPage(currentPage - 1)}
          title={t("pokedex.pagination.previousLong")}
          aria-label={t("pokedex.pagination.previousLong")}
          className="flex items-center gap1 ph3 ph1-ns"
        >
          <IconArrowLeft className="w1 h1" aria-hidden="true" />
          {buttonSize === "medium" && t("pokedex.pagination.previous")}
          {buttonSize === "large" && t("pokedex.pagination.previousLong")}
        </LinkButton>
        <div aria-hidden="true" className="flex-auto" />
        <LinkButton
          disabled={!hasNext}
          to={urlForPage(currentPage + 1)}
          title={t("pokedex.pagination.nextLong")}
          aria-label={t("pokedex.pagination.nextLong")}
          className="flex items-center gap1 ph3 ph1-ns"
        >
          {buttonSize === "medium" && t("pokedex.pagination.next")}
          {buttonSize === "large" && t("pokedex.pagination.nextLong")}
          <IconArrowRight className="w1 h1" aria-hidden="true" />
        </LinkButton>
        <LinkButton
          disabled={!hasNext}
          to={urlForPage(numPages - 1)}
          title={t("pokedex.pagination.lastLong")}
          aria-label={t("pokedex.pagination.lastLong")}
          className="flex items-center"
        >
          <IconArrowRightDouble className="w1 h1" aria-hidden="true" />
        </LinkButton>
      </div>
    </>
  );
}

interface PaginatorProps<T> {
  urlForPage: (page: number) => string;
  currentPage: number;
  pageSize: number;
  emptyState: any;
  items: T[];
  renderPage: (items: T[]) => any;
  renderID: (item: T) => any;
}

export function Paginator<T>({
  urlForPage,
  currentPage,
  pageSize,
  emptyState,
  items,
  renderPage,
  renderID,
}: PaginatorProps<T>) {
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  return (
    <div>
      <PageSelector
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        urlForPage={urlForPage}
        renderID={renderID}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        urlForPage={urlForPage}
        renderID={renderID}
      />
    </div>
  );
}
