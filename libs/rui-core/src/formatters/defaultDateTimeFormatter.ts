import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js';

export function defaultDateTimeFormatter(
  _value: unknown,
  _options: unknown
): string {
  const { locale, options, defaultValue } = (_options ||
    {}) as DateTimeFormattingOptions;
  const value = _value as string;
  let date: Date | null = null;
  if (typeof value === 'string') {
    try {
      date = new Date(Date.parse(value));
    } catch {
      return value;
    }
  }
  return date?.toLocaleString(locale, options) || defaultValue || '';
}
