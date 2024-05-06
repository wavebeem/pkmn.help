import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

export function useTypeCount(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [typeCount, setTypeCount] = useLocalStorage("type_count", "2");
  return [typeCount, setTypeCount];
}
