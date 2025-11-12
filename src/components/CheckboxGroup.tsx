import { ReactNode } from "react";
import styles from "./CheckboxGroup.module.css";
import { clsx } from "clsx";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";

export type CheckboxGroupOption<S extends string> = {
  id: S;
  name: string;
};

export type CheckboxGroupProps<S extends string> = {
  options: CheckboxGroupOption<S>[];
  value: S[];
  onChange: (newValue: S[]) => void;
};

export function CheckboxGroup<S extends string>({
  options,
  value,
  onChange,
}: CheckboxGroupProps<S>): ReactNode {
  return (
    <div className={styles.root}>
      {options.map((option) => {
        const isChecked = value.includes(option.id);
        return (
          <button
            onClick={() => {
              const set = new Set(value);
              if (isChecked) {
                set.delete(option.id);
              } else {
                set.add(option.id);
              }
              onChange([...set]);
            }}
            aria-pressed={isChecked}
            key={option.id}
            data-id={option.id}
            className={clsx(styles.button, "select-none")}
            style={customProperties({
              "--type-color-bg": "var(--color-fg2)",
              "--type-color": "var(--color-fg1)",
            })}
          >
            <Flex tag="span" gap="medium" justify="flex-start" align="center">
              <span className={styles.checkbox} />
              {option.name}
            </Flex>
          </button>
        );
      })}
    </div>
  );
}
