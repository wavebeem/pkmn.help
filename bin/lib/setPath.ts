/**
 * Set a deeply nested property on an object
 *
 * @example
 * setPath(object, ["key1", "key2", 3, "key4"], "value");
 */
export function setPath(
  object: Record<string, any>,
  keys: string[],
  value: any
): void {
  switch (keys.length) {
    case 0:
      throw new Error("what??");
    case 1: {
      const [key] = keys;
      object[key] = value;
      break;
    }
    default: {
      const [key, ...keys_] = keys;
      if (!object[key]) {
        object[key] = {};
      }
      return setPath(object[key], keys_, value);
    }
  }
}
