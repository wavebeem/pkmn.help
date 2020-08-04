import * as React from "react";

export interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

export function ProgressBar(props: ProgressBarProps) {
  const { value, max, color } = props;
  return (
    <div
      style={{
        height: 24,
        width: max,
        color: color,
      }}
      className="flex ba bg-white b--black-10"
    >
      <div
        style={{
          width: value,
          background: color,
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.5)",
        }}
        className="ba b--white"
      ></div>
    </div>
  );
}
