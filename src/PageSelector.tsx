import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import styles from "./PageSelector.module.css";
import { Flex } from "./components/Flex";
import { FancyText } from "./components/FancyText";

export interface PageSelectorProps<T> {
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

export function PageSelector<T>({
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

  const iconClasses = "mv1";

  function updatePage(page: number) {
    if (location === "bottom" && anchorElementRef.current) {
      anchorElementRef.current.scrollIntoView();
    }
    setPage(page);
  }

  const currentPageDisplay = String(currentPage + 1).padStart(
    String(numPages).length,
    "0"
  );

  return (
    <Flex gap="large" direction="column">
      {first && last && (
        <FancyText tag="div" tabularNums fontSize="large">
          <Flex gap="large">
            <Flex flex="auto">
              {renderID(first)} &ndash; {renderID(last)}
            </Flex>

            <div>
              ({currentPageDisplay} / {numPages})
            </div>
          </Flex>
        </FancyText>
      )}

      <div
        className={classNames(
          "items-stretch gap2",
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
          <Icon name="arrowLeftDouble" className={iconClasses} />
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
          <Icon name="arrowLeft" className={iconClasses} />
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
          <Icon name="arrowRight" className={iconClasses} />
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
          <Icon name="arrowRightDouble" className={iconClasses} />
        </Button>
      </div>
    </Flex>
  );
}
