import classnames from "classnames";
import * as React from "react";
import { Type, types, typesOrNone } from "./data";
import { cssType } from "./main";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
}

export default function TypeSelector({
  onChange,
  value,
  includeNone,
  disabledTypes,
}: TypeSelectorProps) {
  const theTypes = includeNone ? typesOrNone : types;
  const styles = {
    disabled: "border4 fg4 bg2 o-60",
    selected: "border2 type-bg-dark no-box-shadow button-shadow",
    normal: "border2 bg1 fg1 button-bg button-shadow",
  };
  return (
    <div className="TypeSelector-Container">
      {theTypes.map((type) => {
        const isDisabled = disabledTypes.includes(type);
        const isSelected = type === value;
        const style = isDisabled
          ? styles.disabled
          : isSelected
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
              cssType(type)
            )}
            onClick={() => onChange(type)}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classnames(
                  cssType(type),
                  `b--black br-pill ba`,
                  type === value
                    ? "border1 type-bg-light"
                    : "border2 type-bg-dark"
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
              {isSelected ? (
                <small aria-label=""> &#9679;&nbsp;</small>
              ) : (
                <small />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

TypeSelector.displayName = "TypeSelector";
