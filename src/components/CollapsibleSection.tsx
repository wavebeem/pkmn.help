import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";
import classNames from "classnames";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: ReactNode;
  children: ReactNode;
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
}: CollapsibleSectionProps): JSX.Element {
  return (
    <details className={styles.details} open={initiallyOpen}>
      <summary
        className={classNames(styles.summary, "active-darken", "no-select")}
      >
        {heading}
      </summary>
      {children}
    </details>
  );
}
