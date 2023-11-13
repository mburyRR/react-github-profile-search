export const getLocalStorageItem = <T>(key: string): T | null => {
  const stored = localStorage.getItem(key);

  return stored != null ? JSON.parse(stored) : null;
};

export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
