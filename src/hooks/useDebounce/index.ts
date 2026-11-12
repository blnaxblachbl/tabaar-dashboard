import { useRef, useState } from "react";

import type { AnyFunction, UseDebounceResult } from "./types";

export function useDebounce<T extends AnyFunction>(
  func: T,
  delay: number = 200,
): UseDebounceResult<T> {
  const timer = useRef<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  function debounce(...args: never): void {
    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await func(...args);
      setLoading(false);
      timer.current = undefined;
    }, delay);
  }

  function cancel() {
    clearTimeout(timer.current);
    setLoading(false);
    timer.current = undefined;
  }

  return [debounce as T, { loading, cancel }];
}
