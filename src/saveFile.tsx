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
  open(url, "_blank");
  URL.revokeObjectURL(url);
}
