import classnames from "classnames";
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
        className={classnames(
          className,
          baseClasses,
          "border4 fg4 bg-transparent no-pointer"
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
      className={classnames(
        className,
        baseClasses,
        "border2 button-shadow button-bg button-bg-hover color-inherit active-squish"
      )}
    />
  );
}

const baseClasses = classnames(
  "no-underline",
  "db",
  "ba br2 pv1 ph2",
  "b f5",
  "SimpleFocus"
);
