import classNames from "classnames";
import { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./FancyLink.module.css";

export interface ExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: "always" | "never";
}

export function ExternalLink({
  underline,
  className,
  ...props
}: ExternalLinkProps): ReactNode {
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
