type Falsey = null | undefined | false | 0 | "";

export function compact<T>(items: (T | Falsey)[]): T[] {
  return items.filter((x): x is T => Boolean(x));
}
