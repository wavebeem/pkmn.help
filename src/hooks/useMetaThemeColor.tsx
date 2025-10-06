import { useEffect } from "react";

export function useMetaThemeColor({
  dataTheme,
  themeColor,
}: {
  dataTheme: string | undefined;
  themeColor: string | undefined;
}): void {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      "meta[name=theme-color]",
    );
    if (meta && themeColor) {
      meta.content = themeColor;
    }
  }, [themeColor]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = dataTheme;
    root.dataset.themeColor = themeColor;
  }, [dataTheme, themeColor]);
}
