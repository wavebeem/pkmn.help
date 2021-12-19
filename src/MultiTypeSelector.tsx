import classNames from "classnames";
import * as React from "react";
import { Type, types } from "./data";
import { cssType } from "./cssType";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(types: Type[]): void;
  value: Type[];
}

export default function MultiTypeSelector({
  onChange,
  value,
}: TypeSelectorProps) {
  const styles = {
    selected:
      "border-vibrant2 type-bg-dark no-box-shadow button-shadow SelectedFocus",
    normal: "border1 bg1 fg1 button-bg button-shadow SimpleFocus",
  };
  return (
    <div className="MultiTypeSelector-Container">
      {types.map((type) => {
        const isChecked = value.includes(type);
        const style = isChecked ? styles.selected : styles.normal;
        return (
          <label
            key={type}
            className={classNames(
              style,
              "input-reset",
              "db w-100",
              "ba br1",
              "f5 b",
              "ttc",
              "SimpleFocus",
              "active-squish",
              "overflow-hidden",
              "select-none",
              cssType(type)
            )}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classNames(
                  cssType(type),
                  "ba",
                  "b--transparent",
                  "bg-clip-padding",
                  "br1",
                  "pa2",
                  isChecked ? "type-bg-light" : "type-bg-dark"
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  className={classNames("db radiocheck-type", cssType(type))}
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
              </span>

              <span
                className="tl pl2 pr1 flex-auto truncate"
                style={{ lineHeight: buttonInnerHeight }}
              >
                {type}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
