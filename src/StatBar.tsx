import * as React from "react";
import { Type } from "./data";

export interface StatBarProps {
  value: number;
  max: number;
  type: Type;
}

export default function StatBar(props: StatBarProps) {
  const { value, max, type } = props;
  return (
    <div
      style={{
        height: 24,
        width: "100%",
        maxWidth: "255px",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
      }}
      className="flex"
    >
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--type-color-2)",
          boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.2)",
        }}
        className={`type-${type}`}
      ></div>
    </div>
  );
}
