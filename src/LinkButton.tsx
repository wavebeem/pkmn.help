import classNames from "classnames";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

interface LinkButtonProps extends LinkProps {
  disabled?: boolean;
}

export function LinkButton({
  disabled = false,
  to,
  className,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    // React Router <Link> requires the `to` prop, but rendering an <a> without
    // an `href` works better for "disabling" a link
    return (
      <a
        {...props}
        className={classNames(
          className,
          baseClasses,
          "border3 fg4 bg-transparent no-pointer"
        )}
      />
    );
  }
  return (
    <Link
      {...props}
      to={to}
      tabIndex={0}
      onClick={props.onClick}
      className={classNames(
        className,
        baseClasses,
        "border1 button-shadow button-bg button-bg-hover color-inherit active-squish"
      )}
    />
  );
}

const baseClasses = classNames(
  "no-underline",
  "db",
  "pv3 ph2 pv2-ns ph3-ns",
  "ba br2",
  "f5",
  "focus-simple"
);
