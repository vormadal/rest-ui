export function defaultDateFormatter(value: Date, { locale, options }: DateTimeValueOptions) {
  return value?.toLocaleDateString(locale, options)
}
