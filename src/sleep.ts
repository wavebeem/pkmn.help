export async function sleep(duration: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
