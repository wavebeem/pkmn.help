import classNames from "classnames";
import { ReactNode, useId } from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "../misc/colors";
import { Generation } from "../misc/data-generations";
import { Type, typesForGeneration } from "../misc/data-types";
import styles from "./TypeSelector.module.css";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";

interface TypeSelectorProps {
  generation: Generation;
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
}

export function TypeSelector({
  generation,
  onChange,
  value,
  includeNone,
  disabledTypes,
}: TypeSelectorProps): ReactNode {
  const name = useId();
  const { t } = useTranslation();
  const baseTypes = typesForGeneration(generation).filter(
    (t) => t !== Type.stellar
  );
  const theTypes = includeNone ? [...baseTypes, Type.none] : baseTypes;
  return (
    <div className="columns-type-selector">
      {theTypes.map((type) => {
        const isDisabled = disabledTypes.includes(type);
        const isSelected = type === value;
        return (
          <label
            key={type}
            className={classNames(
              styles.label,
              "select-none",
              isSelected && "focus-selected",
              !isSelected && "focus-simple"
            )}
            style={customProperties({
              "--type-color-bg": typeColorBG(type),
              "--type-color": typeColor(type),
            })}
          >
            <Flex tag="span" gap="medium" justify="flex-start" align="center">
              <input
                type="radio"
                name={name}
                checked={isSelected}
                disabled={isDisabled}
                className={classNames(styles.radio, "focus-none")}
                onChange={() => {
                  onChange(type);
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
