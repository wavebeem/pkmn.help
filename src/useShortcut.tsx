/* eslint-disable react-hooks/exhaustive-deps */
import React, { DependencyList } from "react";

export const cmdCtrlKey = navigator.platform.includes("Mac")
  ? "metaKey"
  : "ctrlKey";

export default function useShortcut(
  listener: (event: KeyboardEvent) => void,
  deps: DependencyList
) {
  React.useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [listener, ...deps]);
}
