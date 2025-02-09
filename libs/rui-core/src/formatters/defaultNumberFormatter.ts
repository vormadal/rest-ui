import { NumberFormattingOptions } from './options/NumberFormattingOptions.js';

export function defaultNumberFormatter(
  value: number,
  config: NumberFormattingOptions
) {
  if (value === null || value === undefined) return config.defaultValue || '';
  if (typeof value === 'number') {
    return new Intl.NumberFormat(config?.locale, config?.options).format(value);
  }
  return value;
}
