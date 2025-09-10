import classNames from "classnames";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./FancyLink.module.css";

export interface FancyLinkProps extends LinkProps {
  underline?: "always" | "never";
}

export function FancyLink({ className, ...props }: FancyLinkProps): ReactNode {
  if ("to" in props) {
    return (
      <Link
        className={classNames(
          "focus-outline",
          styles.link,
          props.underline === "never" && styles.noUnderline,
          className
        )}
        {...props}
      />
    );
  }
  throw new Error("invalid FancyLink");
}
