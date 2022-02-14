export function parenthesize(string?: string): string {
  if (string) {
    return `(${string})`;
  }
  return "";
}
