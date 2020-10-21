import classnames from "classnames";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export function LinkButton(props: LinkProps) {
  return (
    <Link
      {...props}
      tabIndex={props["aria-disabled"] === "true" ? -1 : 0}
      onClick={props["aria-disabled"] === "true" ? undefined : props.onClick}
      className={classnames(
        "no-underline",
        "db",
        "ba br2 pv1 ph2",
        "b f5",
        "SimpleFocus",
        "active-squish",
        props["aria-disabled"] === "true"
          ? "b--black-10 black-20 bg-transparent no-pointer"
          : "b--black-30 button-shadow bg-white hover-bg-washed-blue color-inherit",
        props.className
      )}
    />
  );
}
