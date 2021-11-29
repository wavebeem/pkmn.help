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
          <button
            role="checkbox"
            aria-checked={isChecked ? "true" : "false"}
            key={`type-${type}`}
            className={classNames(
              style,
              "db w-100",
              "ba br1",
              "pv1 ph2",
              "f5 b",
              "ttc",
              "SimpleFocus",
              "active-squish",
              cssType(type)
            )}
            onClick={() => {
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
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classNames(
                  `type-${type} ba br1`,
                  isChecked
                    ? "b--black type-bg-light"
                    : "border-vibrant type-bg-dark"
                )}
                style={{
                  width: "1rem",
                  height: "1rem",
                }}
              />

              <span
                className="tl pl2 pr1 flex-auto truncate"
                style={{ lineHeight: buttonInnerHeight }}
              >
                {type}
              </span>
              {isChecked ? <span aria-label=""> &#10003;</span> : <span />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
