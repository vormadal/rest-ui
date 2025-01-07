import { NumberFormattingOptions } from './options/NumberFormattingOptions.js'

export function defaultNumberFormatter(value: number, config: NumberFormattingOptions) {
  return new Intl.NumberFormat(config?.locale, config?.options).format(value)
}
