import * as React from "react";
import classnames from "classnames";

import { Type, types } from "./data";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(types: Type[]): void;
  value: Type[];
}

export default function MultiTypeSelector(props: TypeSelectorProps) {
  const styles = {
    selected: "b--black-30 type-bg-dark no-box-shadow button-shadow",
    normal:
      "b--black-30 bg-white black bg-white hover-bg-washed-blue button-shadow",
  };
  return (
    <div className="MultiTypeSelector-Container">
      {types.map((type) => {
        const isChecked = props.value.includes(type);
        const style = isChecked ? styles.selected : styles.normal;
        return (
          <button
            role="checkbox"
            aria-checked={isChecked ? "true" : "false"}
            key={`type-${type}`}
            className={classnames(
              style,
              "db w-100",
              "ba br1",
              "pv1 ph2",
              "f5 b",
              "ttc",
              "SimpleFocus",
              "active-squish",
              `type-${type}`
            )}
            onClick={() => {
              const types = new Set(props.value);
              if (isChecked) {
                types.delete(type);
              } else {
                types.add(type);
              }
              // Should we sort based on the type order on the page rather than
              // alphabetical? I'll just stick with alphabetical for now.
              props.onChange([...types].sort());
            }}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classnames(
                  `type-${type} b--black ba br1`,
                  isChecked
                    ? "b--black-70 type-bg-light"
                    : "b--black-30 type-bg-dark"
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
              {isChecked ? <span aria-label=""> ✓</span> : <span />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

MultiTypeSelector.displayName = "MultiTypeSelector";
