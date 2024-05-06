import classNames from "classnames";
import * as React from "react";
import styles from "./FancyText.module.css";

export interface FancyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: "span" | "div" | "h1" | "h2" | "h3";
  fontSize?: "inherit" | "small" | "medium" | "large";
  margin?: "none";
}

export function FancyText({
  tag: Tag,
  className,
  fontSize = "inherit",
  margin = "none",
  ...props
}: FancyTextProps): React.ReactNode {
  return (
    <Tag
      className={classNames(styles.root, className)}
      data-font-size={fontSize}
      data-margin={margin}
      {...props}
    />
  );
}
