import * as React from "react";
import { typeColor } from "./colors";
import { Type } from "./data-types";

export interface StatBarProps {
  value: number;
  max: number;
  type: Type;
}

export function StatBar({ value, max, type }: StatBarProps) {
  return (
    <div className="flex h1 w-100 Bar-Container">
      <div
        style={{
          width: (value / max) * 100 + "%",
          background: "var(--type-color)",
          ["--type-color" as any]: typeColor(type),
        }}
        className="Bar-Fill"
      ></div>
    </div>
  );
}
