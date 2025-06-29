import { NumberFormattingOptions } from './options/NumberFormattingOptions.js';

export function defaultNumberFormatter(_value: unknown, _config: unknown) {
  const { locale, options, defaultValue } = (_config ||
    {}) as NumberFormattingOptions;
  const value = _value as number;
  if (value === null || value === undefined) return defaultValue || '';
  if (typeof value === 'number') {
    return new Intl.NumberFormat(locale, options).format(value);
  }
  return value;
}
