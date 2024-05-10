import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./FancyText.module.css";

export interface FancyTextProps extends HTMLAttributes<HTMLElement> {
  tag: "span" | "div" | "h1" | "h2" | "h3" | "p" | "ul" | "ol";
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "medium";
  fontSize?: "small" | "medium" | "large" | "xlarge";
  inline?: boolean;
  tabularNums?: boolean;
}

export function FancyText({
  tag: Tag,
  className,
  textAlign,
  fontWeight,
  fontSize,
  tabularNums,
  inline,
  ...props
}: FancyTextProps): ReactNode {
  return (
    <Tag
      className={classNames(styles.FancyText, className)}
      data-text-align={textAlign}
      data-font-size={fontSize}
      data-font-weight={fontWeight}
      data-tabular-nums={tabularNums}
      data-inline={inline}
      {...props}
    />
  );
}
