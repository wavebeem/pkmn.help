import { clsx } from "clsx";
import { ReactNode } from "react";
import { customProperties } from "../misc/customProperties";
import { IconClear, IconSearch } from "./Icon";
import styles from "./Search.module.css";

interface SearchProps {
  label: string;
  helpText?: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export function Search({
  label,
  helpText,
  value,
  onChange,
}: SearchProps): ReactNode {
  const iconSize = 24;
  return (
    <div
      className={styles.root}
      style={customProperties({
        "--icon-size": `${iconSize}px`,
      })}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrapper}>
        <IconSearch className={styles.iconSearch} />
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          inputMode="search"
          autoCapitalize="none"
          className={clsx(styles.input, "focus-simple")}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <IconClear
          size={iconSize}
          className={clsx(styles.iconClear, value === "" && styles.hidden)}
          // Doesn't need to be accessible since this functionality isn't
          // required to use the search field, and native clear buttons aren't
          // accessible either.
          onClick={() => {
            onChange("");
          }}
        />
      </div>
      {helpText && <p className={styles.help}>{helpText}</p>}
    </div>
  );
}
