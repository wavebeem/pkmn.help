import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "../misc/colors";
import { Generation } from "../misc/data-generations";
import { Type, typesForGeneration } from "../misc/data-types";
import styles from "./MultiTypeSelector.module.css";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";

type MultiTypeSelectorProps = {
  generation: Generation;
  onChange(types: Type[]): void;
  value: Type[];
};

export function MultiTypeSelector({
  generation,
  onChange,
  value,
}: MultiTypeSelectorProps) {
  const { t } = useTranslation();
  const types = typesForGeneration(generation);
  return (
    <div className="columns-type-selector">
      {types.map((type) => {
        const isChecked = value.includes(type);
        return (
          <label
            key={type}
            data-type={type}
            className={classNames(
              styles.label,
              "select-none",
              isChecked && "focus-tab",
              !isChecked && "focus-simple"
            )}
            style={customProperties({
              "--type-color-bg": typeColorBG(type),
              "--type-color": typeColor(type),
            })}
          >
            <Flex tag="span" gap="medium" justify="flex-start" align="center">
              <input
                name={type}
                type="checkbox"
                checked={isChecked}
                className={classNames(styles.checkbox, "focus-none")}
                onChange={() => {
                  const types = new Set(value);
                  if (isChecked) {
                    types.delete(type);
                  } else {
                    types.add(type);
                  }
                  // Should we sort based on the type order on the page rather
                  // than alphabetical? I'll just stick with alphabetical for
                  // now.
                  onChange([...types].sort());
                }}
              />
              {t(`types.${type}`)}
            </Flex>
          </label>
        );
      })}
    </div>
  );
}
