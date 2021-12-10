import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

export function useTheme(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [theme, setTheme] = useLocalStorage("theme", "auto");
  return [theme, setTheme];
}
