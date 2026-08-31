import { ReactNode, useId } from "react";
import { FancyText } from "./FancyText";
import styles from "./RadioGroup.module.css";
import { clsx } from "clsx";

export type RadioGroupOption<S extends string> = {
  value: S;
  label: string;
};

export type RadioGroupProps<S extends string> = {
  label: ReactNode;
  value: S;
  helpText?: ReactNode;
  options: readonly RadioGroupOption<S>[];
  onChange: (option: RadioGroupOption<S>) => void;
  disabled?: boolean;
};

export function RadioGroup<S extends string>({
  label,
  value,
  helpText,
  options,
  onChange,
  disabled = false,
}: RadioGroupProps<S>): ReactNode {
  const name = useId();

  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      <div className={styles.itemsContainer}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(styles.item, "active-darken-background")}
          >
            <input
              className={styles.radio}
              type="radio"
              name={name}
              checked={value === option.value}
              value={option.value}
              disabled={disabled}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  onChange(option);
                }
              }}
            />
            <div className={styles.preview}>
              <div className={styles.name}>{option.label}</div>
            </div>
          </label>
        ))}
      </div>
      {helpText && (
        <FancyText tag="p" className={styles.help} color="secondary">
          {helpText}
        </FancyText>
      )}
    </div>
  );
}
