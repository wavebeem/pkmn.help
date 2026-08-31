import { clsx } from "clsx";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./FancyLink.module.css";

export interface FancyLinkProps extends LinkProps {
  underline?: "always" | "never";
  outlined?: true;
  iconOnly?: boolean;
  external?: boolean;
}

// Anything that resolves to a different origin than the current page (other
// sites, mailto:, tel:, etc.) counts as external.
function isExternalTo(to: LinkProps["to"]): boolean {
  if (typeof to !== "string") {
    return false;
  }
  try {
    return new URL(to, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
}

export function FancyLink({
  className,
  underline,
  outlined,
  iconOnly = false,
  external,
  download,
  reloadDocument,
  to,
  ...props
}: FancyLinkProps): ReactNode {
  const isExternal = external ?? isExternalTo(to);
  return (
    <Link
      to={to}
      className={clsx(
        outlined ? "focus-simple" : "focus-outline",
        "active-darken-background",
        styles.link,
        iconOnly && styles.iconOnly,
        (outlined || underline === "never") && styles.noUnderline,
        outlined && styles.outlined,
        className,
      )}
      download={download}
      reloadDocument={reloadDocument || isExternal || Boolean(download)}
      {...props}
    />
  );
}
