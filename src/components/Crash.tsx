import { ReactNode } from "react";

export function Crash(): ReactNode {
  throw new Error("Oops!");
}
