import { clsx } from "clsx";
import { ReactNode, useState } from "react";
import styles from "./CopyButton.module.css";
import { sleep } from "../misc/sleep";
import { IconCopy } from "./icons";

export interface CopyButtonProps {
  text: string;
  children: ReactNode;
}

type State = "default" | "copied";

export function CopyButton({ text, children }: CopyButtonProps): ReactNode {
  const [state, setState] = useState<State>("default");
  const disabled = state === "copied";
  return (
    <button
      type="button"
      data-state={state}
      aria-disabled={disabled}
      className={clsx("active-darken", "focus-tab", styles.CopyButton)}
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
      <IconCopy size={16} />
      {children}
    </button>
  );
}
