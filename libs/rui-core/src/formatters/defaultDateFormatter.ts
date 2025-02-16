import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js';

export function defaultDateFormatter(
  _value: unknown,
  _options: unknown
): string {
  const { locale, options, defaultValue } = (_options ||
    {}) as DateTimeFormattingOptions;
  const value = _value as string;
  if (value === null || value === undefined) return defaultValue || '';
  if (typeof value === 'object') {
    return (value as Date).toLocaleDateString(locale, options);
  }
  try {
    return new Date(Date.parse(value)).toLocaleDateString(locale, options);
  } catch {
    return value;
  }
}
