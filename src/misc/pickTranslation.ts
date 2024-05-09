export function pickTranslation(
  obj: Record<string, string>,
  language: string
): string {
  if (language in obj) {
    return obj[language];
  }
  return obj.en;
}
