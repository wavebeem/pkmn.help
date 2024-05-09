import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useTheme(): [string, Dispatch<SetStateAction<string>>] {
  const [theme, setTheme] = useLocalStorage("theme", "auto");
  return [theme, setTheme];
}
