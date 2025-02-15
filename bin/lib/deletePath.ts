export function deletePath(object: any, path: readonly string[]): void {
  if (!object) {
    return;
  }
  switch (path.length) {
    case 0: {
      throw new Error(`no such path`);
    }
    case 1: {
      const [last] = path;
      delete object[last];
      break;
    }
    default: {
      const [first, ...rest] = path;
      deletePath(object[first], rest);
      break;
    }
  }
}
