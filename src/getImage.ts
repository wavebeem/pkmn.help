import { PUBLIC_PATH } from "./settings";

export function getImage(id: string): string {
  return `${PUBLIC_PATH}img/${id}.png`;
}
