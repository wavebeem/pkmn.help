import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { typeIcon } from "../misc/icons";
import { typeColor, typeColorBG } from "../misc/colors";
import { Generation } from "../misc/data-generations";
import { Type, typesForGeneration } from "../misc/data-types";
import styles from "./MultiTypeSelector.module.css";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";
import { ReactNode } from "react";

type MultiTypeSelectorProps = {
  generation: Generation;
  onChange(types: Type[]): void;
  value: Type[];
  limit?: number;
};

export function MultiTypeSelector({
  generation,
  onChange,
  value,
  limit,
}: MultiTypeSelectorProps): ReactNode {
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
              !isChecked && "focus-simple",
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
                  let newValue = [...types];
                  if (limit) {
                    newValue = newValue.slice(-limit);
                  }
                  onChange(newValue);
                }}
              />
              <img
                src={typeIcon(type.charAt(0).toUpperCase() + type.slice(1))}
                alt={type}
                className="type-icon"
                style={{ width: "24px", height: "24px" }}
              />
              {t(`types.${type}`)}
            </Flex>
          </label>
        );
      })}
    </div>
  );
}
