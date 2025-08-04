import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T) => void] {
  const isTypeString = typeof initialValue === 'string';
  const [value, setValue] = useState(() => {
    const data = window.localStorage.getItem(key);
    return data ? (!isTypeString ? JSON.parse(data) : data) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(
      key,
      isTypeString ? value : JSON.stringify(value)
    );
  }, [key, value]);

  return [value, setValue];
}
