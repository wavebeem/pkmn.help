class AssertNeverError extends Error {
  constructor(readonly value: any) {
    super();
  }

  get message() {
    return `Unexpected value: ${this.value}`;
  }

  get name() {
    return "AssertNeverError";
  }
}

export function assertNever(value: never): never {
  throw new AssertNeverError(value);
}
