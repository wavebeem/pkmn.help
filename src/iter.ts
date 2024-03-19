export function* iterCycle<T>(list: readonly T[]): Generator<T> {
  while (true) {
    for (const item of list) {
      yield item;
    }
  }
}

export function* range(length: number): Generator<number> {
  for (let i = 0; i < length; i++) {
    yield i;
  }
}

export function* iterStutter<T>(
  iterable: Iterable<T>,
  count: number
): Generator<T> {
  for (const value of iterable) {
    for (const _ of range(count)) {
      yield value;
    }
  }
}

export function iterNext<T>(iter: Iterator<T>): T {
  const { value, done } = iter.next();
  if (done) {
    throw new Error("iterNext: Iterator is done");
  }
  return value;
}
