function setStorage(storage: Storage, object: Record<string, any>): void {
  storage.clear();
  for (const [key, val] of Object.entries(object)) {
    storage.setItem(key, JSON.stringify(val));
  }
}

export const Debug = {
  setLocalStorage(object: Record<string, any>): void {
    setStorage(localStorage, object);
  },

  setSessionStorage(object: Record<string, any>): void {
    setStorage(sessionStorage, object);
  },
};

Object.assign(globalThis, { Debug });
