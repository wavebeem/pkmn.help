import classNames from "classnames";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "./colors";
import { Type, types } from "./data";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(types: Type[]): void;
  value: Type[];
}

export default function MultiTypeSelector({
  onChange,
  value,
}: TypeSelectorProps) {
  const { t } = useTranslation();
  const styles = {
    selected:
      "border-vibrant2 type-bg no-box-shadow button-shadow SelectedFocus",
    normal: "border1 bg1 fg1 button-bg button-shadow SimpleFocus",
  };
  return (
    <div className="MultiTypeSelector-Container">
      {types.map((type) => {
        const isChecked = value.includes(type);
        const styleKey = isChecked ? "selected" : "normal";
        return (
          <label
            key={type}
            className={classNames(
              styles[styleKey],
              "db",
              "ba br1",
              "pv1 ph2",
              "f5 b",
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
                type="checkbox"
                checked={isChecked}
                className={classNames(
                  "db RadioCheckType",
                  {
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

              <span
                className="tl pl2 pr1 flex-auto truncate"
                style={{ lineHeight: buttonInnerHeight }}
              >
                {t(`types.${type}`)}
                {isChecked && <span aria-hidden="true">&nbsp;&bull;</span>}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
