import classNames from "classnames";
import * as React from "react";
import { Type, types, typesOrNone } from "./data";
import { cssType } from "./cssType";

const buttonInnerHeight = "1.5rem";

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
  name: string;
}

export default function TypeSelector({
  onChange,
  value,
  includeNone,
  disabledTypes,
  name,
}: TypeSelectorProps) {
  const theTypes = includeNone ? typesOrNone : types;
  const styles = {
    disabled: "border3 fg4 bg2 o-60 SimpleFocus",
    selected: "border-vibrant2 type-bg SelectedFocus",
    normal: "border1 bg1 fg1 button-bg button-shadow SimpleFocus",
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
          <label
            key={type}
            className={classNames(
              style,
              "db w-100",
              "ba br-pill",
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
                  "br-pill br--left",
                  "pa2",
                  "type-bg"
                )}
              >
                <input
                  type="radio"
                  name={name}
                  checked={isSelected}
                  className={classNames("db radiocheck-type", cssType(type))}
                  onChange={() => {
                    onChange(type);
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
        return (
          <button
            key={`type-${type}`}
            disabled={isDisabled}
            className={classNames(
              style,
              "db w-100",
              "ba br-pill",
              "pv1 ph2",
              "f5 b",
              "ttc",
              "active-squish",
              cssType(type)
            )}
            onClick={() => onChange(type)}
          >
            <span className="flex flex-row items-center justify-center">
              <span
                className={classNames(
                  cssType(type),
                  `b--black br-pill ba`,
                  type === value
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
