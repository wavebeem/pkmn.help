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
