export function defaultDateTimeFormatter(value: Date, { locale, options }: DateTimeValueOptions) {
  return value?.toLocaleString(locale, options)
}

