
export function defaultTimeFormatter(value: Date, { locale, options }: ValueConfig<DateTimeValueOptions>) {
  return value?.toLocaleTimeString(locale, options)
}
