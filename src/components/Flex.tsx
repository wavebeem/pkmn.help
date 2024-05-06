import classNames from "classnames";
import * as React from "react";
import styles from "./Flex.module.css";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  wrap?: boolean;
  gap?: "none" | "small" | "medium" | "large";
  justify?: "stretch" | "center" | "flex-start" | "flex-end";
  align?: "stretch" | "center" | "flex-start" | "flex-end";
}

export function Flex({
  className,
  direction = "row",
  wrap = false,
  gap = "none",
  justify,
  align,
  ...props
}: FlexProps) {
  return (
    <div
      className={classNames(className, styles.root)}
      data-direction={direction}
      data-wrap={wrap}
      data-gap={gap}
      data-justify={justify}
      data-align={align}
      {...props}
    />
  );
}
