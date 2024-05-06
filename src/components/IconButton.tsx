import classNames from "classnames";
import * as React from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({ className, ...props }: IconButtonProps) {
  return <button className={classNames(className, styles.root)} {...props} />;
}
