import { clsx } from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./FancyText.module.css";

export interface FancyTextProps extends HTMLAttributes<HTMLElement> {
  tag: "span" | "div" | "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "pre";
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "medium";
  fontSize?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
  fontWidth?: "normal" | "condensed";
  color?: "primary" | "secondary" | "disabled";
  inline?: boolean;
  tabularNums?: boolean;
  allCaps?: boolean;
}

export function FancyText({
  tag: Tag = "span",
  className,
  textAlign,
  fontWeight,
  fontSize,
  fontWidth,
  tabularNums,
  inline,
  allCaps,
  color,
  ...props
}: FancyTextProps): ReactNode {
  return (
    <Tag
      className={clsx(styles.FancyText, className)}
      data-text-align={textAlign}
      data-font-size={fontSize}
      data-font-weight={fontWeight}
      data-font-width={fontWidth}
      data-tabular-nums={tabularNums}
      data-inline={inline}
      data-all-caps={allCaps}
      data-color={color}
      {...props}
    />
  );
}
