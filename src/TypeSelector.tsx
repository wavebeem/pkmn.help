import React from "react";
import classnames from "classnames";

import * as Data from "./data";
import { Type } from "./data";

const labelClasses = ["tl", "pl2 pr1", "flex-auto", "truncate"];

const BUTTON_INNER_HEIGHT = "20px";

function makeCircle(type: Type, isFocused: boolean) {
  const size = BUTTON_INNER_HEIGHT;
  const className = classnames(
    `type-${type} b--black br-pill ba`,
    isFocused ? "b--black-70 type-bg-light" : "b--black-30 type-bg"
  );
  const style = {
    flexShrink: 0,
    width: size,
    height: size
  };
  return <span className={className} style={style} />;
}

function makeLabel(type: Type) {
  const className = classnames(labelClasses);
  const style = {
    lineHeight: BUTTON_INNER_HEIGHT
  };
  return (
    <span className={className} style={style}>
      {type}
    </span>
  );
}

const buttonClasses = [
  "db w-100",
  "ba br-pill",
  "pa2",
  "b f6",
  "ttc",
  "chunky-focus",
  "active-squish"
];

interface TypeSelectorProps {
  onChange(type: Type): void;
  value: Type;
  includeNone: boolean;
  disabledTypes?: Type[];
}

function TypeSelector(props: TypeSelectorProps) {
  const { disabledTypes = [], onChange, value, includeNone } = props;
  const types = includeNone ? Data.typesOrNone : Data.types;
  const styles = {
    disabled: "b--black-10 bg-near-white o-60",
    selected: "b--black-30 type-bg-dark no-box-shadow",
    normal: "b--black-30 bg-white black bg-white hover-bg-washed-blue"
  };
  const makeButton = (isDisabled: boolean, value: Type, type: Type) => {
    const style = isDisabled
      ? styles.disabled
      : type === value
      ? styles.selected
      : styles.normal;
    return (
      <button
        key={`type-${type}`}
        disabled={isDisabled}
        className={classnames(
          style,
          buttonClasses,
          `type-${type}`,
          isDisabled ? null : "button-shadow"
        )}
        onClick={() => onChange(type)}
      >
        <span className="flex flex-row items-center justify-center">
          {makeCircle(type, type === value)}
          {makeLabel(type)}
        </span>
      </button>
    );
  };
  const makeWrapper = (type: Type) => {
    const isDisabled = disabledTypes.indexOf(type) >= 0;
    return makeButton(isDisabled, value, type);
  };
  return <div className="TypeSelector-Container">{types.map(makeWrapper)}</div>;
}

TypeSelector.displayName = "TypeSelector";

export default TypeSelector;
