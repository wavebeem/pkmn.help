export function formatMonsterNumber(number: number) {
  if (!number) {
    return "#???";
  }
  return "#" + String(number).padStart(3, "0");
}
