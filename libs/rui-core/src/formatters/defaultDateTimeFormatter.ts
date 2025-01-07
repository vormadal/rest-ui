import { DateTimeFormattingOptions } from './options/DateTimeFormattingOptions.js'

export function defaultDateTimeFormatter(value: Date, { locale, options }: DateTimeFormattingOptions) {
  if (typeof value === 'string') {
    try {
      value = new Date(value)
    } catch {}
  }
  return value?.toLocaleString(locale, options)
}
