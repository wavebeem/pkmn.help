import fs from "fs";

export function saveJSON(
  filename: string,
  data: unknown,
  { indent = 0 }: { indent?: number } = {}
): void {
  fs.writeFileSync(
    filename,
    JSON.stringify(data, null, indent) + "\n",
    "utf-8"
  );
}

export function readJSON(filename: string): any {
  try {
    const json = fs.readFileSync(filename, "utf-8");
    return JSON.parse(json);
  } catch (_err) {
    return undefined;
  }
}
