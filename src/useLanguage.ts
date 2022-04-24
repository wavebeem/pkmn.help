import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

export function useLanguage(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [language, setLanguage] = useLocalStorage("language", "");
  return [language, setLanguage];
}
