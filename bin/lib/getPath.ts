/**
 * Get a deeply nested property on an object
 *
 * @example
 * getPath(object, ["key1", "key2", 3, "key4"]);
 */
export function getPath(object: Record<string, any>, keys: string[]): void {
  switch (keys.length) {
    case 0:
      throw new Error("what??");
    case 1: {
      const [key] = keys;
      return object[key];
    }
    default: {
      const [key, ...keys_] = keys;
      return getPath(object[key], keys_);
    }
  }
}
