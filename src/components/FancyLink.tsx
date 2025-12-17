import { clsx } from "clsx";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./FancyLink.module.css";

export interface FancyLinkProps extends LinkProps {
  underline?: "always" | "never";
  outlined?: true;
}

export function FancyLink({
  className,
  underline,
  outlined,
  ...props
}: FancyLinkProps): ReactNode {
  if ("to" in props) {
    return (
      <Link
        className={clsx(
          outlined ? "focus-simple" : "focus-outline",
          "active-darken-background",
          styles.link,
          (outlined || underline === "never") && styles.noUnderline,
          outlined && styles.outlined,
          className,
        )}
        {...props}
      />
    );
  }
  throw new Error("invalid FancyLink");
}
