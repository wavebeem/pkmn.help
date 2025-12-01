import { ReactNode, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./Button";
import { FancyText } from "./FancyText";
import { Flex } from "./Flex";
import { IconFirst, IconLast, IconNext, IconPrevious } from "./Icon";

export interface PageSelectorProps<T> {
  anchorElementRef: RefObject<HTMLDivElement | null>;
  location: "top" | "bottom";
  numPages: number;
  pageItems: T[];
  currentPage: number;
  setPage: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  renderID: (item: T) => ReactNode;
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

  const hasRoomForMediumButtons = useMediaQuery("(width >= 26rem)");
  const hasRoomForLargeButtons = useMediaQuery("(width >= 40rem");

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

  function updatePage(page: number) {
    if (location === "bottom" && anchorElementRef.current) {
      anchorElementRef.current.scrollIntoView();
    }
    setPage(page);
  }

  const currentPageDisplay = String(currentPage + 1);
  // const currentPageDisplay = String(currentPage + 1).padStart(
  //   String(numPages).length,
  //   "0",
  // );

  return (
    <Flex gap="large" direction="column">
      <FancyText tag="div" tabularNums fontSize="large">
        <Flex gap="large">
          <Flex flex="auto">
            <FancyText tag="span" fontWeight="normal">
              {renderID(first)} &ndash; {renderID(last)}
            </FancyText>
          </Flex>

          <FancyText tag="span" fontWeight="normal">
            {currentPageDisplay} / {numPages}
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
          <IconFirst size={16} />
        </Button>
        <Button
          disabled={!hasPrev}
          onClick={() => {
            updatePage(currentPage - 1);
          }}
          title={t("pokedex.pagination.previousLong")}
          aria-label={t("pokedex.pagination.previousLong")}
        >
          <IconPrevious size={16} />
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
          <IconNext size={16} />
        </Button>
        <Button
          disabled={!hasNext}
          onClick={() => {
            updatePage(numPages - 1);
          }}
          title={t("pokedex.pagination.lastLong")}
          aria-label={t("pokedex.pagination.lastLong")}
        >
          <IconLast size={16} />
        </Button>
      </Flex>
    </Flex>
  );
}
