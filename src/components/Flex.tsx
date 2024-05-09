import classNames from "classnames";
import { HTMLAttributes } from "react";
import styles from "./Flex.module.css";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  tag?: "div" | "span";
  flex?: "auto";
  direction?: "row" | "column";
  wrap?: boolean;
  gap?: "none" | "small" | "medium" | "large";
  justify?: "stretch" | "center" | "flex-start" | "flex-end";
  align?: "stretch" | "center" | "flex-start" | "flex-end";
}

export function Flex({
  className,
  tag: Tag = "div",
  flex,
  direction = "row",
  wrap = false,
  gap = "none",
  justify,
  align,
  ...props
}: FlexProps) {
  return (
    <Tag
      className={classNames(className, styles.Flex)}
      data-direction={direction}
      data-wrap={wrap}
      data-gap={gap}
      data-justify={justify}
      data-align={align}
      data-flex={flex}
      {...props}
    />
  );
}
