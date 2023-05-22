export type ValueOf<T> = T[keyof T];

export function sortBy<T>(list: T[], fn: (item: T) => any): T[] {
  const map = new Map<number, any>();
  for (const [index, item] of list.entries()) {
    map.set(index, fn(item));
  }
  return [...list.entries()]
    .sort(([a], [b]) => {
      const keyA = map.get(a);
      const keyB = map.get(b);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    })
    .map(([, x]) => x);
}
