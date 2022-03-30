import * as React from "react";

const strokeWidth = 2;
const size = 24;

function arc({
  rx,
  ry,
  angle,
  x1,
  y1,
  x2,
  y2,
  clockwise = false,
}: {
  rx: number;
  ry: number;
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  clockwise?: boolean;
}): string {
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
  const move = ["M", x1, y1];
  const arc = ["A", rx, ry, angle, 0, Number(clockwise), x2, y2];
  return [...move, ...arc].join(" ");
}

const arcLeft = arc({
  rx: size / 2,
  ry: size / 2,
  angle: 180,
  x1: size / 2,
  y1: strokeWidth,
  x2: size / 2,
  y2: size - strokeWidth,
});

const arcRight = arc({
  rx: size / 2,
  ry: size / 2,
  angle: 180,
  x1: size / 2,
  y1: size - strokeWidth,
  x2: size / 2,
  y2: strokeWidth,
});

// TODO: Should use trigonemtry to solve the x/y positions here
const arcTop = arc({
  rx: size / 2,
  ry: size / 2,
  angle: 180,
  x1: size * 0.2,
  y1: strokeWidth + 4,
  x2: size - size * 0.2,
  y2: strokeWidth + 4,
});

const arcBottom = arc({
  rx: size / 2,
  ry: size / 2,
  angle: 180,
  x1: size * 0.2,
  y1: size - strokeWidth - 4,
  x2: size - size * 0.2,
  y2: size - strokeWidth - 4,
  clockwise: true,
});

export function IconGlobe(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      {...props}
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2 - strokeWidth} />
      <path d={arcLeft} />
      <path d={arcRight} />
      <path d={arcTop} />
      <path d={arcBottom} />
      <line
        x1={size / 2}
        y1={strokeWidth}
        x2={size / 2}
        y2={size - strokeWidth}
      />
      <line
        x1={strokeWidth}
        y1={size / 2}
        x2={size - strokeWidth}
        y2={size / 2}
      />
    </svg>
  );
}
