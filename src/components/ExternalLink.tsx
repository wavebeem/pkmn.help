import classNames from "classnames";
import * as React from "react";
import styles from "./FancyLink.module.css";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: "always" | "never";
}

export function ExternalLink({
  underline,
  className,
  ...props
}: ExternalLinkProps): React.ReactNode {
  return (
    <a
      className={classNames(
        "focus-outline",
        styles.link,
        underline === "never" && styles.noUnderline,
        className
      )}
      {...props}
    />
  );
}
