import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "./misc/colors";
import { Generation } from "./misc/data-generations";
import { Type, typesForGeneration } from "./misc/data-types";
import styles from "./MultiTypeSelector.module.css";
import { customProperties } from "./misc/customProperties";

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
    <div className="grid gap2 columns-type-selector">
      {types.map((type) => {
        const styleMap = {
          selected:
            "no-box-shadow button-shadow focus-selected border-vibrant2",
          normal: "border1 bg1 fg1 button-bg button-shadow focus-simple",
        };
        const isChecked = value.includes(type);
        const styleKey = isChecked ? "selected" : "normal";
        return (
          <label
            key={type}
            data-type={type}
            data-checked={isChecked}
            className={classNames(
              styleMap[styleKey],
              styles.label,
              "db",
              "ba br1",
              "pv2 ph3",
              "f5",
              "ttc",
              "select-none",
              "focus-simple"
            )}
            style={customProperties({
              "--type-color": typeColorBG(type),
            })}
          >
            <span className="flex flex-row items-center justify-center">
              <input
                name={type}
                type="checkbox"
                checked={isChecked}
                data-type={type}
                className={classNames(
                  "db",
                  styles.checkbox,
                  {
                    selected: "b--black type-bg",
                    normal: "border-vibrant type-bg",
                  }[styleKey],
                  "ba br1",
                  "focus-none"
                )}
                style={customProperties({
                  "--type-color": typeColor(type),
                })}
                onChange={() => {
                  const types = new Set(value);
                  if (isChecked) {
                    types.delete(type);
                  } else {
                    types.add(type);
                  }
                  // Should we sort based on the type order on the page rather than
                  // alphabetical? I'll just stick with alphabetical for now.
                  onChange([...types].sort());
                }}
              />
              <span className="tl pl2 pr1 flex-auto truncate">
                {t(`types.${type}`)}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
