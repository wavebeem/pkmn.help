export function randomInteger(limit: number): number {
  return Math.floor(Math.random() * limit);
}

export function randomItem<T>(array: T[]): T {
  return array[randomInteger(array.length - 1)];
}
