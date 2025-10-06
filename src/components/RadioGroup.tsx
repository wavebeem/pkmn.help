import { Fragment, ReactNode, useId } from "react";
import { FancyText } from "./FancyText";
import styles from "./RadioGroup.module.css";
import classNames from "classnames";

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
};

export function RadioGroup<S extends string>({
  label,
  value,
  helpText,
  options,
  onChange,
}: RadioGroupProps<S>): ReactNode {
  const name = useId();

  return (
    <div className={styles.root}>
      <div>
        <div>{label}</div>
        {helpText && (
          <FancyText tag="div" fontSize="small" color="3">
            {helpText}
          </FancyText>
        )}
      </div>
      <div className={styles.itemsContainer}>
        {options.map((option, i) => (
          <Fragment key={i}>
            {i > 0 && <div className={styles.itemDivider} />}
            <label
              key={option.value}
              className={classNames(styles.item, "active-darken-background")}
            >
              <input
                className={classNames(styles.radio, "focus-outline")}
                type="radio"
                name={name}
                checked={value === option.value}
                value={option.value}
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
          </Fragment>
        ))}
      </div>
    </div>
  );
}
