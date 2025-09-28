import { SVGProps, SVGAttributes, ReactNode } from "react";

const strokeWidth = 3;
const strokeGap = 4;
const size = 24;
const paddingH = 8;
const paddingV = 4;

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
function IconOpen(props: SVGProps<SVGSVGElement>): ReactNode {
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
function IconClosed(props: SVGProps<SVGSVGElement>): ReactNode {
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
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-stars"
      viewBox="0 0 16 16"
    >
      <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
    </svg>
  );
}

const icons = {
  open: IconOpen,
  closed: IconClosed,
  clear: IconClear,
  music: IconMusic,
  search: IconSearch,
  sparkles: IconSparkles,
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  arrowLeftDouble: IconArrowLeftDouble,
  arrowRightDouble: IconArrowRightDouble,
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
