import { ReactNode, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Flex } from "./Flex";
import { FancyText } from "./FancyText";

export interface PageSelectorProps<T> {
  anchorElementRef: RefObject<HTMLDivElement>;
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
}: PageSelectorProps<T>): ReactNode {
  const { t } = useTranslation();

  const hasRoomForMediumButtons = useMediaQuery("(min-width: 420px)");
  const hasRoomForLargeButtons = useMediaQuery("(min-width: 640px");

  const buttonSize = hasRoomForLargeButtons
    ? "large"
    : hasRoomForMediumButtons
    ? "medium"
    : "small";

  if (pageItems.length === 0) {
    return undefined;
  }

  const first = pageItems[0];
  const last = pageItems[pageItems.length - 1];

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
      <FancyText tag="div" tabularNums fontSize="large">
        <Flex gap="large">
          <Flex flex="auto">
            <FancyText tag="span" fontWeight="medium">
              {renderID(first)} &ndash; {renderID(last)}
            </FancyText>
          </Flex>

          <FancyText tag="span" fontWeight="medium">
            ({currentPageDisplay} / {numPages})
          </FancyText>
        </Flex>
      </FancyText>

      <Flex align="stretch" gap="medium">
        <Button
          disabled={!hasPrev}
          onClick={() => {
            updatePage(0);
          }}
          title={t("pokedex.pagination.firstLong")}
          aria-label={t("pokedex.pagination.firstLong")}
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
        >
          <Icon name="arrowLeft" className={iconClasses} />
          {buttonSize === "medium" && t("pokedex.pagination.previous")}
          {buttonSize === "large" && t("pokedex.pagination.previousLong")}
        </Button>
        <Flex flex="auto" />
        <Button
          disabled={!hasNext}
          onClick={() => {
            updatePage(currentPage + 1);
          }}
          title={t("pokedex.pagination.nextLong")}
          aria-label={t("pokedex.pagination.nextLong")}
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
        >
          <Icon name="arrowRightDouble" className={iconClasses} />
        </Button>
      </Flex>
    </Flex>
  );
}
