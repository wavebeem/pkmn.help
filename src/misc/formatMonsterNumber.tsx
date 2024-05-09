export function formatMonsterNumber(number: number) {
  if (!number) {
    return "#???";
  }
  return "#" + String(number).padStart(4, "0");
}
