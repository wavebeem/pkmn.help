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
  return (
    <div
      className={classNames(
        "MultiTypeSelector-Container",
        "button-shadow",
        "bg1 fg1",
        "border2 ba",
        "br2 pa2"
      )}
    >
      {types.map((type) => {
        const isChecked = value.includes(type);
        return (
          <label
            key={type}
            className={classNames(
              isChecked ? "border-vibrant2 type-bg" : "b--transparent",
              "db w-100",
              "ba br1",
              "f5 b",
              "ttc",
              "OutlineFGFocus",
              "active-squish",
              "select-none",
              cssType(type)
            )}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classNames(
                  cssType(type),
                  isChecked ? "b--transparent" : "border-vibrant2",
                  "ba",
                  "br1",
                  "pa2",
                  "type-bg"
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  className={classNames(
                    "db radiocheck-type",
                    "NoFocus",
                    cssType(type)
                  )}
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
