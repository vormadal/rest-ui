import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js';

export function defaultDateFormatter(
  value: Date,
  { locale, options, defaultValue }: DateTimeFormattingOptions
): string {
  if (value === null || value === undefined) return defaultValue || '';
  if (typeof value === 'object') {
    return (value as Date).toLocaleDateString(locale, options);
  }
  return value;
}
