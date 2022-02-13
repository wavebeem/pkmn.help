export function updateArrayAt<T>(array: T[], index: number, value: T): T[] {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
}
