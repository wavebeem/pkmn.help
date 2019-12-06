import React from "react";
import classnames from "classnames";

import * as Data from "./data";
import { Type } from "./data";

const labelClasses = ["tl", "pl2 pr1", "flex-auto", "truncate"];

const BUTTON_INNER_HEIGHT = "1.5rem";

function makeCircle(type: Type, isFocused: boolean) {
  const size = BUTTON_INNER_HEIGHT;
  const className = classnames(
    `type-${type} b--black br-pill ba`,
    isFocused ? "b--black-70 type-bg-light" : "b--black-30 type-bg-dark"
  );
  const style = {
    flexShrink: 0,
    width: size,
    height: size
  };
  return <span className={className} style={style} />;
}

const buttonClasses = [
  "db w-100",
  "ba br-pill",
  "pa1",
  "f5 b",
  "ttc",
  "SimpleFocus",
  "active-squish"
];

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes: Type[];
}

function TypeSelector(props: TypeSelectorProps) {
  const types = props.includeNone ? Data.typesOrNone : Data.types;
  const styles = {
    disabled: "b--black-10 bg-near-white o-60",
    selected: "b--black-30 type-bg-dark no-box-shadow button-shadow",
    normal:
      "b--black-30 bg-white black bg-white hover-bg-washed-blue button-shadow"
  };
  return (
    <div className="TypeSelector-Container">
      {types.map(type => {
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
            className={classnames(style, buttonClasses, `type-${type}`)}
            onClick={() => props.onChange(type)}
          >
            <span className="flex flex-row items-center justify-center">
              {makeCircle(type, type === props.value)}
              <span
                className={classnames(labelClasses)}
                style={{
                  lineHeight: BUTTON_INNER_HEIGHT
                }}
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

export default TypeSelector;
