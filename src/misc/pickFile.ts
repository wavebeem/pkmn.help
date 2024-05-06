export async function pickFile({
  accept,
}: {
  accept: string;
}): Promise<File | undefined> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => {
      resolve(input.files?.[0]);
    };
    input.click();
  });
}
