import classNames from "classnames";
import * as React from "react";
import styles from "./CopyButton.module.css";
import { sleep } from "../sleep";

export interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
}

type State = "default" | "copied";

export function CopyButton({ text, children }: CopyButtonProps) {
  const [state, setState] = React.useState<State>("default");
  const disabled = state === "copied";
  return (
    <button
      type="button"
      data-state={state}
      aria-disabled={disabled}
      className={classNames(
        "active-darken",
        "focus-outline",
        styles.CopyButton
      )}
      onClick={async (event) => {
        try {
          event.preventDefault();
          if (disabled) {
            return;
          }
          await navigator.clipboard.writeText(text);
          setState("copied");
          await sleep(250);
        } finally {
          setState("default");
        }
      }}
    >
      {children}
    </button>
  );
}
