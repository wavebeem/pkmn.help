import { ReactNode } from "react";
import styles from "./CollapsibleSection.module.css";
import { clsx } from "clsx";
import { Icon } from "./Icon";

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
  const iconSize = 32;
  // const iconSize = size === "medium" ? 32 : 16;
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
        <Icon className={styles.icon} size={iconSize} name="open" />
        <Icon className={styles.icon} size={iconSize} name="closed" />
      </summary>
      {children}
    </details>
  );
}
