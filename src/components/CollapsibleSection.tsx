import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";
import classNames from "classnames";
import { Icon } from "./Icon";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: ReactNode;
  children: ReactNode;
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
}: CollapsibleSectionProps): ReactNode {
  return (
    <details className={styles.details} open={initiallyOpen}>
      <summary
        className={classNames(
          styles.summary,
          "active-darken-background",
          "no-select",
        )}
      >
        {heading}
        <Icon className={styles.icon} size={32} name="open" />
        <Icon className={styles.icon} size={32} name="closed" />
      </summary>
      {children}
    </details>
  );
}
