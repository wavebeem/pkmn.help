const css = String.raw;

function injectCSS() {
  const style = document.createElement("style");
  style.dataset.source = import.meta.url;
  style.textContent = createCSS();
  document.head.append(style);
}

function createCSS() {
  return css`
    .type-stellar {
      background: ${createStellarGradient()};
      border-color: hsl(0 0% 40%);
    }

    :is(:root[data-theme="dark"], :root[data-theme="auto"][data-theme-auto="dark"])
      .type-stellar {
      border-color: hsl(220 20% 55%);
    }

    .type-stellar-label {
      background: hsl(0 0% 30% / 70%);
    }
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

function createStellarGradient() {
  const count = 16;
  const steps: string[] = [];
  const fudge = "1px";
  for (const i of range(1, count)) {
    const j = i - 1;
    const p1 = j === 0 ? "0" : `calc(${j * (100 / count)}% - ${fudge})`;
    const p2 = `calc(${i * (100 / count)}% + ${fudge})`;
    const hue = j * (360 / count);
    const color = hsl(hue, 100, 50);
    steps.push([color, p1, p2].join(" "));
  }
  return `linear-gradient(-225deg, ${steps.join(", ")})`;
}

injectCSS();
