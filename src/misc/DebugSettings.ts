const data = {
  appUpdate: false,
};

function getKey(key: string): string {
  return `DebugSettings_${key}`;
}

export const DebugSettings = new Proxy(data, {
  set(target, property, newValue, receiver) {
    if (typeof property === "string") {
      localStorage.setItem(getKey(property), JSON.stringify(newValue));
    }
    return Reflect.set(target, property, newValue, receiver);
  },
});

export function loadDebugSettings(): void {
  Object.assign(globalThis, { DebugSettings });

  for (const key of Object.keys(data)) {
    const json = localStorage.getItem(getKey(key));
    if (json && Object.hasOwn(data, key)) {
      DebugSettings[key as keyof typeof data] = JSON.parse(json);
    }
  }
}
