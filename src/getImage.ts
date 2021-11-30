import { PUBLIC_PATH } from "./settings";

export function getImage(id: string): string {
  return new URL(`img/${id}.png`, PUBLIC_PATH).href;
}
