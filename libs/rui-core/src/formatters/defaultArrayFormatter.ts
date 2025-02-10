import { ArrayFormattingOptions } from './options/ArrayFormattingOptions.js';

export function defaultArrayFormatter(
  value: unknown[],
  { formatter, defaultValue, field }: ArrayFormattingOptions
) {
  if (!(value instanceof Array)) {
    return defaultValue || '';
  }

  //TODO extract field from value and use field formatter to format the actual value
  return value.join(', ');
}
