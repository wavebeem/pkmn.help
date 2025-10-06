import { clsx } from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./Flex.module.css";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
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
  hidden = false,
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
}: FlexProps): ReactNode {
  return (
    <Tag
      hidden={hidden}
      className={clsx(className, styles.Flex)}
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
