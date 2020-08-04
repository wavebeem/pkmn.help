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
        width: "100%",
        maxWidth: "255px",
        padding: 1,
      }}
      className="flex ba b--black-10"
    >
      <div
        style={{
          width: Math.floor((value / max) * 100) + "%",
          background: color,
        }}
        className="ba b--black-50"
      ></div>
    </div>
  );
}
