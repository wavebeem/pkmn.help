import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteChangeFixes(): void {
  const location = useLocation();

  useLayoutEffect(() => {
    // Ugly hacks---should share this with context and use functions... or maybe
    // emit events and listen to them.
    const content = document.querySelector("#content");
    const root = document.documentElement;
    if (content && location.hash.length < 2) {
      content.scrollTo(0, 0);
      root.scrollTo(0, 0);
    }

    const menuDialog = document.querySelector("#menu-dialog");
    if (menuDialog instanceof HTMLDialogElement) {
      menuDialog.close();
    }
  }, [location.pathname, location.hash]);
}
