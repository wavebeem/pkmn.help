import { ReactNode, useState } from "react";
import { sleep } from "../misc/sleep";
import { Button } from "./Button";
import styles from "./CopyButton.module.css";
import { IconCheck, IconCopy } from "./icons";

export interface CopyButtonProps {
  text: string;
  children: ReactNode;
}

type State = "default" | "copied";

export function CopyButton({ text, children }: CopyButtonProps): ReactNode {
  const [state, setState] = useState<State>("default");
  const disabled = state === "copied";
  return (
    <Button
      type="button"
      size="small"
      variant="outlined"
      className={styles.root}
      aria-disabled={disabled}
      onClick={async (event) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
          await sleep(1000);
        } finally {
          setState("default");
        }
      }}
    >
      {state === "copied" ? <IconCheck size={16} /> : <IconCopy size={16} />}
      {children}
    </Button>
  );
}
