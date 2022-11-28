import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "./colors";
import { Generation } from "./data-generations";
import { Type, typesForGeneration } from "./data-types";

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
  const theTypes = includeNone ? [...baseTypes, Type.NONE] : baseTypes;
  const styles = {
    disabled: "border3 fg4 bg2 o-60 SimpleFocus pointer-none",
    selected: "border-vibrant2 type-bg SelectedFocus b",
    normal: "border1 bg1 fg1 button-bg button-shadow SimpleFocus",
  };
  return (
    <div className="grid gap2 MultiTypeSelector-Container">
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
              styles[styleKey],
              "db",
              "ba br-pill",
              "pv1 ph2",
              "f5",
              "ttc",
              "select-none",
              "SimpleFocus",
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
                  "db RadioCheckType",
                  {
                    disabled: "border1 o-50",
                    selected: "b--black type-bg",
                    normal: "border-vibrant type-bg",
                  }[styleKey],
                  "ba br1",
                  "NoFocus"
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
                {isSelected && <span aria-hidden="true">&nbsp;&bull;</span>}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
