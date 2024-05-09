export function formatPokemonName({
  speciesName,
  formName,
}: {
  speciesName: string;
  formName: string;
}): string {
  return [speciesName, parenthesize(formName)].filter((s) => s).join(" ");
}

function parenthesize(string?: string): string {
  if (string) {
    return `(${string})`;
  }
  return "";
}
