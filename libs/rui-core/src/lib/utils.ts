export function FirstUppercase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function FirstLowerCase(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function stripPathParams(path: string): string {
  return path.replace(/\/\{.+?\}/g, '');
}

export function prettifyFieldName(value: string) {
  return sanitizeString(value);
}

export function sanitizeString(value: string) {
  let sanitized = value
    .trim()
    .replaceAll('/', '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ');

  sanitized = addSpaceBeforeUppercase(FirstUppercase(sanitized));
  if (sanitized.toLowerCase().endsWith(' id')) {
    return sanitized.substring(0, sanitized.length - 3);
  }
  if (sanitized.toLowerCase().endsWith(' guid')) {
    return sanitized.substring(0, sanitized.length - 5);
  }

  return sanitized;
}

export function addSpaceBeforeUppercase(value: string) {
  const matches = value.matchAll(/[A-Z]/g);
  let lastIndex = 0;
  let match: undefined | IteratorResult<RegExpExecArray, undefined> = undefined;
  let result = '';
  do {
    match = matches.next();
    const index = match.done ? value.length : match.value.index;
    if (index === 0) continue;
    result += value.substring(lastIndex, index);
    if (!match.done) result += ' ';
    lastIndex = index;
  } while (!match.done);

  return result;
}

export function extractField<V = unknown>(
  data: unknown,
  path?: string
): { get: () => V; set: (value: V) => void } {
  if (!path || !data) return { get: () => data as V, set: () => {} };
  if (typeof data !== 'object')
    return { get: () => undefined as V, set: () => {} };

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
