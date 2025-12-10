import { clsx } from "clsx";
import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";
import { IconMinus, IconPlus } from "./icons";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: ReactNode;
  children: ReactNode;
  size?: "medium" | "small";
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
  size = "medium",
}: CollapsibleSectionProps): ReactNode {
  return (
    <details className={styles.details} open={initiallyOpen} data-size={size}>
      <summary
        className={clsx(
          styles.summary,
          "active-darken-background",
          "no-select",
        )}
      >
        {heading}
        <IconPlus className={styles.icon} data-icon-name="plus" />
        <IconMinus className={styles.icon} data-icon-name="minus" />
      </summary>
      {children}
    </details>
  );
}
