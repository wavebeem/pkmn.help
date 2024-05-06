import classNames from "classnames";
import * as React from "react";
import styles from "./FancyText.module.css";

export interface FancyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: "span" | "div" | "h1" | "h2" | "h3";
  fontWeight?: "inherit" | "normal" | "medium" | "bold";
  fontSize?: "inherit" | "small" | "medium" | "large";
  margin?: "none";
  tabularNums?: boolean;
}

export function FancyText({
  tag: Tag,
  className,
  fontWeight = "inherit",
  tabularNums = false,
  fontSize = "inherit",
  margin = "none",
  ...props
}: FancyTextProps): React.ReactNode {
  return (
    <Tag
      className={classNames(styles.root, className)}
      data-font-size={fontSize}
      data-margin={margin}
      data-tabular-nums={tabularNums}
      {...props}
    />
  );
}
