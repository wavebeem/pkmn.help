import * as React from "react";
import { Type } from "./data";

export interface StatBarProps {
  value: number;
  max: number;
  type: Type;
}

export default function StatBar({ value, max, type }: StatBarProps) {
  return (
    <div className="flex h1 w-100 Bar-Container">
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--type-color-2)",
        }}
        className={`type-${type} Bar-Fill`}
      ></div>
    </div>
  );
}

StatBar.displayName = "StatBar";
