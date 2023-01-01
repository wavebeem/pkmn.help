import { publicPath } from "./settings";

export function getImage(id: string): string {
  return new URL(`img/${id}.png`, publicPath).href;
}
