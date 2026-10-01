import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

// Writes a UTF-8 text file, creating its parent directory first.
export async function writeTextFile(
  path: string,
  content: string,
): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf-8");
}
