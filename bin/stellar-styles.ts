const css = String.raw;

function createCSS() {
  return css`
    --stellar-background-linear: ${createStellarGradientLinear()};
    --stellar-background-conic: ${createStellarGradientConic()};
    --stellar-background-dark: ${createStellarGradientDark()};
  `;
}

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

function createStellarGradientLinear() {
  const count = 16;
  const steps: string[] = [];
  for (const i of range(0, count)) {
    const hue = i * (360 / count);
    const color = hsl(hue, 100, 55);
    steps.push(color);
  }
  return `linear-gradient(-225deg, ${steps.join(", ")})`;
}

function createStellarGradientDark() {
  const count = 16;
  const steps: string[] = [];
  for (const i of range(0, count)) {
    const hue = i * (360 / count);
    const color = hsl(hue, 80, 20);
    steps.push(color);
  }
  return `linear-gradient(-225deg, ${steps.join(", ")})`;
}

function createStellarGradientConic() {
  const count = 16;
  const steps: string[] = [];
  for (const i of range(0, count)) {
    const hue = i * (360 / count);
    const color = hsl(hue, 90, 50);
    steps.push(color);
  }
  return `conic-gradient(${steps.join(", ")})`;
}

console.log(createCSS());
