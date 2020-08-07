const req: (id: string) => { default: string } = (() => {
  if (process.env.NODE_ENV !== "test") {
    return require.context("../img", false, /\.png$/);
  }
  return (x: any) => ({ default: x });
})();

export function getImage(id: string): string | undefined {
  const file = `./${id}.png`;
  try {
    return req(file).default;
  } catch (err) {
    return req("./not-found.png").default;
  }
}
