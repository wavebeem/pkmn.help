import { clsx } from "clsx";
import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";
import { IconCaret } from "./icons";

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
        <IconCaret className={styles.icon} />
      </summary>
      {children}
    </details>
  );
}
