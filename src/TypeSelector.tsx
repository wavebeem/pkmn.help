import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "./colors";
import { Generation } from "./data-generations";
import { Type, typesForGeneration } from "./data-types";
import styles from "./TypeSelector.module.css";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  generation: Generation;
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
  name: string;
}

export function TypeSelector({
  generation,
  onChange,
  value,
  includeNone,
  disabledTypes,
  name,
}: TypeSelectorProps) {
  const { t } = useTranslation();
  const baseTypes = typesForGeneration(generation);
  const theTypes = includeNone ? [...baseTypes, Type.none] : baseTypes;
  const stylesObj = {
    disabled: "border3 fg4 bg2 o-60 focus-simple pointer-none",
    selected: "border-vibrant2 type-bg focus-selected",
    normal: "border1 bg1 fg1 button-bg button-shadow focus-simple",
  };
  return (
    <div className="grid gap2 columns-type-selector">
      {theTypes.map((type) => {
        const isDisabled = disabledTypes.includes(type);
        const isSelected = type === value;
        const styleKey = isDisabled
          ? "disabled"
          : isSelected
          ? "selected"
          : "normal";
        return (
          <label
            key={type}
            className={classNames(
              stylesObj[styleKey],
              "db",
              "ba br-pill",
              "pv1 ph2",
              "f5",
              "ttc",
              "select-none",
              "focus-simple",
              "active-squish"
            )}
            style={{
              ["--type-color" as any]: typeColorBG(type),
            }}
          >
            <span className="flex flex-row items-center justify-center">
              <input
                type="radio"
                name={name}
                checked={isSelected}
                disabled={isDisabled}
                className={classNames(
                  "db",
                  styles.radio,
                  {
                    disabled: "border1 o-50",
                    selected: "b--black type-bg",
                    normal: "border-vibrant type-bg",
                  }[styleKey],
                  "ba br1",
                  "focus-none"
                )}
                style={{
                  ["--type-color" as any]: typeColor(type),
                }}
                onChange={() => {
                  onChange(type);
                }}
              />

              <span
                className="tl pl2 pr1 flex-auto truncate"
                style={{ lineHeight: buttonInnerHeight }}
              >
                {t(`types.${type}`)}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
