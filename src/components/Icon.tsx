import { SVGProps, SVGAttributes, ReactNode } from "react";

const strokeWidth = 1.25;
const strokeGap = 3;
const size = 16;
const paddingH = 5;
const paddingV = 3;

function flipXY(x: number, y: number, flip: boolean): [number, number] {
  if (flip) {
    return [size - x, y];
  }
  return [x, y];
}

function arrowPath({
  offsetX,
  flipH,
}: {
  offsetX: number;
  flipH: boolean;
}): string {
  const p1 = flipXY(size - paddingH + offsetX, paddingV, flipH);
  const p2 = flipXY(paddingH + offsetX, size / 2, flipH);
  const p3 = flipXY(size - paddingH + offsetX, size - paddingV, flipH);
  return ["M", p1, "L", p2, "L", p3].join(" ");
}

const paths = {
  Left: arrowPath({ offsetX: 0, flipH: false }),
  Right: arrowPath({ offsetX: 0, flipH: true }),
  LeftDouble: [
    arrowPath({ offsetX: -strokeGap, flipH: false }),
    arrowPath({ offsetX: strokeGap, flipH: false }),
  ].join("\n"),
  RightDouble: [
    arrowPath({ offsetX: -strokeGap, flipH: true }),
    arrowPath({ offsetX: strokeGap, flipH: true }),
  ].join("\n"),
} as const;

function createComponent(
  name: keyof typeof paths,
): (props: SVGProps<SVGSVGElement>) => ReactNode {
  const path = paths[name];
  function IconArrow(props: SVGProps<SVGSVGElement>): ReactNode {
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
        <path d={path} />
      </svg>
    );
  }
  IconArrow.displayName = `IconArrow${name}`;
  return IconArrow;
}

const IconArrowLeft = createComponent("Left");
const IconArrowRight = createComponent("Right");
const IconArrowLeftDouble = createComponent("LeftDouble");
const IconArrowRightDouble = createComponent("RightDouble");

// https://icons.getbootstrap.com/icons/x-circle-fill/
function IconClear(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
    </svg>
  );
}

// https://icons.getbootstrap.com/icons/music-note-beamed/
function IconMusic(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="currentColor"
      {...props}
    >
      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
      <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
    </svg>
  );
}

// https://icons.getbootstrap.com/icons/dash-circle/
function IconMinus(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
  );
}

// https://icons.getbootstrap.com/icons/dash-circle/
function IconPlus(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    </svg>
  );
}

export function IconSearch(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

function IconSparkles(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="currentColor"
      {...props}
    >
      <path d="M5.5,0.052l1.101,3.307c0.084,0.251 0.225,0.48 0.413,0.668c0.188,0.187 0.418,0.328 0.67,0.412l3.316,1.098l-3.316,1.098c-0.252,0.083 -0.482,0.224 -0.67,0.412c-0.188,0.187 -0.329,0.416 -0.413,0.668l-1.101,3.307l-1.101,-3.307c-0.084,-0.252 -0.225,-0.481 -0.413,-0.668c-0.188,-0.188 -0.418,-0.329 -0.67,-0.412l-3.316,-1.098l3.316,-1.098c0.252,-0.084 0.482,-0.225 0.67,-0.412c0.188,-0.188 0.329,-0.417 0.413,-0.668l1.101,-3.307Z" />
      <path d="M12.5,9.019l0.7,2.104c0.054,0.161 0.144,0.306 0.264,0.426c0.119,0.119 0.265,0.209 0.426,0.262l2.11,0.699l-2.11,0.698c-0.161,0.053 -0.307,0.143 -0.426,0.262c-0.12,0.12 -0.21,0.265 -0.264,0.426l-0.7,2.104l-0.7,-2.104c-0.054,-0.161 -0.144,-0.306 -0.264,-0.426c-0.119,-0.119 -0.265,-0.209 -0.426,-0.262l-2.11,-0.698l2.11,-0.699c0.161,-0.053 0.307,-0.143 0.426,-0.262c0.12,-0.12 0.21,-0.265 0.264,-0.426l0.7,-2.104Z" />
    </svg>
  );
}

// https://icons.getbootstrap.com/icons/list/
function IconMenuHamburger(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  );
}

const icons = {
  minus: IconMinus,
  plus: IconPlus,
  clear: IconClear,
  music: IconMusic,
  search: IconSearch,
  sparkles: IconSparkles,
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  arrowLeftDouble: IconArrowLeftDouble,
  arrowRightDouble: IconArrowRightDouble,
  menuHamburger: IconMenuHamburger,
} as const;

export interface IconProps {
  name: keyof typeof icons;
  size?: number;
  className?: string;
  onClick?: SVGAttributes<SVGElement>["onClick"];
}

export function Icon({
  name,
  className,
  onClick,
  size = 16,
}: IconProps): ReactNode {
  const Component = icons[name];
  return (
    <Component
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      onClick={onClick}
      data-icon-name={name}
    />
  );
}
