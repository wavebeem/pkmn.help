import * as React from "react";

export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useLayoutEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mq.matches);
    mq.onchange = (event) => {
      setIsDarkMode(event.matches);
    };
    return () => {
      mq.onchange = null;
    };
  }, []);

  return isDarkMode;
}
