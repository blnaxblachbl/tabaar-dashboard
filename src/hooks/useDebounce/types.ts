export type AnyFunction = (...args: never) => unknown;

export type UseDebounceResult<T extends AnyFunction> = [
  T,
  { loading: boolean; cancel: () => void },
];
