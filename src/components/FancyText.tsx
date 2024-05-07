import classNames from "classnames";
import * as React from "react";
import styles from "./FancyText.module.css";

export interface FancyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: "span" | "div" | "h1" | "h2" | "h3";
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "medium" | "bold";
  fontSize?: "small" | "medium" | "large";
  tabularNums?: boolean;
}

export function FancyText({
  tag: Tag,
  className,
  textAlign,
  fontWeight,
  fontSize,
  tabularNums,
  ...props
}: FancyTextProps): React.ReactNode {
  return (
    <Tag
      className={classNames(styles.FancyText, className)}
      data-text-align={textAlign}
      data-font-size={fontSize}
      data-font-weight={fontWeight}
      data-tabular-nums={tabularNums}
      {...props}
    />
  );
}
