import * as React from "react";
import styles from "./Select.module.css";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label: string;
  helpText?: React.ReactNode;
}

export function Select({
  label,
  "aria-label": ariaLabel = label,
  helpText,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.select}>
        <select
          aria-label={ariaLabel}
          className="active-darken focus-simple truncate"
          {...props}
        />
      </div>
      {helpText && <p className={styles.help}>{helpText}</p>}
    </div>
  );
}
