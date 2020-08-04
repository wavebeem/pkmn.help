import * as React from "react";
import { Type } from "./data";

export interface ProgressBarProps {
  value: number;
  max: number;
  type: Type;
}

export function ProgressBar(props: ProgressBarProps) {
  const { value, max, type } = props;
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
          width: (value / max) * 100 + "%",
          background: "var(--type-color-2)",
        }}
        className={`ba b--black-20 type-${type}`}
      ></div>
    </div>
  );
}
