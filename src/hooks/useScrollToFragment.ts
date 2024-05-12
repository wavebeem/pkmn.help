import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToFragment(): void {
  const fragment = useLocation().hash.slice(1);

  useLayoutEffect(() => {
    if (!fragment) {
      return;
    }
    const element = document.getElementById(fragment);
    if (element instanceof HTMLElement) {
      element.scrollIntoView();
    }
  }, [fragment]);
}
