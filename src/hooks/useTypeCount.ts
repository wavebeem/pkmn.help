import { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useTypeCount(): [string, Dispatch<SetStateAction<string>>] {
  const [typeCount, setTypeCount] = useLocalStorage("type_count", "2");
  return [typeCount, setTypeCount];
}
