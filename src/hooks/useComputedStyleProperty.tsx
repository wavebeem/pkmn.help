import { useLayoutEffect, useState } from "react";

export function useComputedStyleProperty<Key extends keyof CSSStyleDeclaration>(
  element: HTMLElement | null | undefined,
  property: Key
): CSSStyleDeclaration[Key] | undefined {
  const [value, setValue] = useState<CSSStyleDeclaration[Key]>();

  useLayoutEffect(() => {
    setTimeout(() => {
      if (element) {
        setValue(getComputedStyle(element)[property]);
      }
    }, 0);
  });

  return value;
}
