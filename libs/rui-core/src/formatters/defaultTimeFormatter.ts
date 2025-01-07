import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js'

export function defaultTimeFormatter(value: Date, { locale, options }: DateTimeFormattingOptions) {
  return value?.toLocaleTimeString(locale, options)
}
