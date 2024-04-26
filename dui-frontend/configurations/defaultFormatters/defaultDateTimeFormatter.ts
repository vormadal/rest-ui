export function defaultDateTimeFormatter(value: Date, { locale, options }: DateTimeValueOptions) {
  if (typeof value === 'string') {
    try {
      value = new Date(value)
    } catch (e) {}
  }
  return value?.toLocaleString(locale, options)
}
