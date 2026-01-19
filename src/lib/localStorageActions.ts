export const getLocalStorageNumber = (
  key: string,
  defaultValue: number,
): number => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    const parsed = parseInt(stored ?? '', 10);

    return !isNaN(parsed) && parsed > 0 ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setLocalStorageNumber = (key: string, value: number): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(key, value.toString());
  } catch (error) {
    console.error('로컬 스토리지 저장 실패: key=${key}', error);
  }
};
