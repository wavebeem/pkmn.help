import classNames from "classnames";
import * as React from "react";

interface PlainBadgeProps {
  children: React.ReactNode;
}

export function PlainBadge({ children }: PlainBadgeProps) {
  return (
    <div
      className={classNames(
        "ba",
        "border2",
        "br2",
        "bg3",
        "f5",
        "tc",
        "grid-span-all"
      )}
      style={{ padding: 2 }}
    >
      <div
        className={classNames("br1 ba bg1 b--transparent truncate")}
        style={{
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
}
