export function formatMonsterNumber(number: number): string {
  if (!number) {
    return "#???";
  }
  return "#" + String(number).padStart(4, "0");
}
