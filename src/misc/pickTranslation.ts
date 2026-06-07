export function pickTranslation(
  obj: Record<string, string>,
  language: string,
): string {
  const l = language.toLowerCase();
  for (const key in Object.keys(obj)) {
    if (l === key.toLowerCase()) {
      return obj[key];
    }
  }
  return obj.en;
}
