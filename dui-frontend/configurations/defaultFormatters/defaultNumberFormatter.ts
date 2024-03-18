
export function defaultNumberFormatter(value: number, config: NumberValueOptions) {
  return new Intl.NumberFormat(config.locale, config.options).format(value)
}
