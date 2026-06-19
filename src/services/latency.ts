/** Simulated network latency so the UI exercises real async/loading paths. */
export function delay<T>(value: T, ms = 140): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Deep clone helper so callers never mutate the underlying mock fixtures. */
export function clone<T>(value: T): T {
  return structuredClone(value);
}
