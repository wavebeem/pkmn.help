import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteChangeFixes(): void {
  const location = useLocation();

  useLayoutEffect(() => {
    // Ugly hacks---should share this with context and use functions... or maybe
    // emit events and listen to them.
    const content = document.querySelector("#content");
    if (content) {
      content.scrollTo(0, 0);
    }

    const menuButton = document.querySelector("#menu-button");
    if (menuButton instanceof HTMLButtonElement) {
      menuButton.setAttribute("aria-pressed", "false");
    }
  }, [location.pathname]);
}
