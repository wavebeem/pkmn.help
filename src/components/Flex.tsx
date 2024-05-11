import classNames from "classnames";
import { HTMLAttributes } from "react";
import styles from "./Flex.module.css";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  tag?: "div" | "span";
  flex?: "auto";
  direction?: "row" | "column";
  wrap?: boolean;
  gap?: "none" | "small" | "medium" | "large" | "xlarge";
  justify?: "stretch" | "center" | "flex-start" | "flex-end";
  align?: "stretch" | "center" | "flex-start" | "flex-end";
  padding?: "small" | "medium" | "large";
  paddingX?: "small" | "medium" | "large";
  paddingY?: "small" | "medium" | "large";
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
  padding,
  paddingX,
  paddingY,
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
      data-padding={padding}
      data-padding-x={paddingX}
      data-padding-y={paddingY}
      {...props}
    />
  );
}
