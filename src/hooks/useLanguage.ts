import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useLanguage(): [string, Dispatch<SetStateAction<string>>] {
  const [language, setLanguage] = useLocalStorage("language", "");
  return [language, setLanguage];
}
