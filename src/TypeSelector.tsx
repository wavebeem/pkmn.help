import * as React from "react";
import classnames from "classnames";

import { Type, types, typesOrNone } from "./data";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
}

export default function TypeSelector(props: TypeSelectorProps) {
  const theTypes = props.includeNone ? typesOrNone : types;
  const styles = {
    disabled: "b--black-10 bg-near-white o-60",
    selected: "b--black-30 type-bg-dark no-box-shadow button-shadow",
    normal:
      "b--black-30 bg-white black bg-white hover-bg-washed-blue button-shadow",
  };
  return (
    <div className="TypeSelector-Container">
      {theTypes.map((type) => {
        const isDisabled = props.disabledTypes.includes(type);
        const style = isDisabled
          ? styles.disabled
          : type === props.value
          ? styles.selected
          : styles.normal;
        return (
          <button
            key={`type-${type}`}
            disabled={isDisabled}
            className={classnames(
              style,
              "db w-100",
              "ba br-pill",
              "pv1 ph2",
              "f5 b",
              "ttc",
              "SimpleFocus",
              "active-squish",
              `type-${type}`
            )}
            onClick={() => props.onChange(type)}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classnames(
                  `type-${type} b--black br-pill ba`,
                  type === props.value
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
            </span>
          </button>
        );
      })}
    </div>
  );
}

TypeSelector.displayName = "TypeSelector";
