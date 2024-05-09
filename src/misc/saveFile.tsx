export function saveFile({
  filename,
  type,
  data,
}: {
  filename: string;
  type: string;
  data: string;
}): void {
  const file = new File([data], filename, { type });
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}
