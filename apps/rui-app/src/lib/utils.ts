/* eslint-disable @typescript-eslint/no-empty-function */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractField<V = unknown>(
  data: unknown,
  path?: string
): { get: () => V; set: (value: V) => void } {
  if (!path || !data) return { get: () => data as V, set: () => {} };
  if (typeof data !== 'object') return { get: () => data as V, set: () => {} };

  const segments = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let object: any = data;
  for (const segment of segments.slice(0, -1)) {
    const keys = Object.keys(object);
    if (keys.includes(segment)) {
      object = object[segment as keyof typeof object];
    }
  }
  const field = segments[segments.length - 1];

  return {
    get: () => object[field as keyof typeof object] as V,
    set: (value: V) => (object[field as keyof typeof object] = value),
  };
}
