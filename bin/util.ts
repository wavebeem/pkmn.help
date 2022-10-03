import path from "path";
import fs from "fs";

export function saveJSON(
  filename: string,
  data: any,
  { indent = 0 }: { indent?: number } = {}
): void {
  fs.writeFileSync(
    path.resolve(__dirname, filename),
    JSON.stringify(data, null, indent),
    "utf-8"
  );
}

export function readJSON(filename: string): any {
  try {
    const json = fs.readFileSync(path.resolve(__dirname, filename), "utf-8");
    return JSON.parse(json);
  } catch (err) {
    return undefined;
  }
}
