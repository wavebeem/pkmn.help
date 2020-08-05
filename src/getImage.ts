const req = (() => {
  if (process.env.NODE_ENV !== "test") {
    return (require as any).context("../img", false, /\.png$/);
  }
  return (x: any) => ({ default: x });
})();

export function getImage(id: string): string | undefined {
  const file = `./${id || "not-found"}.png`;
  try {
    return req(file).default;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
