import { clsx } from "clsx";
import { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./FancyLink.module.css";

export interface ExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: "always" | "never";
  outlined?: true;
}

export function ExternalLink({
  underline,
  className,
  outlined,
  ...props
}: ExternalLinkProps): ReactNode {
  return (
    <a
      className={clsx(
        "focus-outline",
        styles.link,
        (outlined || underline === "never") && styles.noUnderline,
        outlined && styles.outlined,
        className,
      )}
      {...props}
    />
  );
}
