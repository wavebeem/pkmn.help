import * as React from "react";

interface CollapsibleSectionProps {
  initiallyOpen?: boolean;
  heading: React.ReactNode;
  children: React.ReactNode;
}

export function CollapsibleSection({
  initiallyOpen = false,
  heading,
  children,
}: CollapsibleSectionProps): JSX.Element {
  return (
    <details className="DetailsFocus" open={initiallyOpen}>
      <summary className="pointer no-select">{heading}</summary>
      {children}
    </details>
  );
}
