import * as React from "react";
import { useLocation } from "react-router-dom";

export function useScrollToFragment() {
  const fragment = useLocation().hash.slice(1);

  React.useLayoutEffect(() => {
    if (!fragment) {
      return;
    }
    const element = document.getElementById(fragment);
    if (element instanceof HTMLElement) {
      element.scrollIntoView();
    }
  }, [fragment]);
}
