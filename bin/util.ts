import fs from "fs";

export function saveJSON(
  filename: string,
  data: any,
  { indent = 0 }: { indent?: number } = {}
): void {
  fs.writeFileSync(filename, JSON.stringify(data, null, indent), "utf-8");
}

export function readJSON(filename: string): any {
  try {
    const json = fs.readFileSync(filename, "utf-8");
    return JSON.parse(json);
  } catch (err) {
    return undefined;
  }
}
