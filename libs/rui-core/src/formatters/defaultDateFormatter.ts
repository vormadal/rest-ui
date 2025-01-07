import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js'

export function defaultDateFormatter(value: Date, { locale, options }: DateTimeFormattingOptions) {
  return value?.toLocaleDateString(locale, options)
}
