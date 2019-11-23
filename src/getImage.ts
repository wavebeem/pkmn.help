const req = (() => {
  if (process.env.NODE_ENV !== "test") {
    return (require as any).context("../img", false, /\.png$/);
  }
  return (x: any) => x;
})();

export default function getImage(id: string): string | undefined {
  const file = `./${id}.png`;
  try {
    return req(file);
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
