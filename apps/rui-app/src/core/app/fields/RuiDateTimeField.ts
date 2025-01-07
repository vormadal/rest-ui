import { DataType, DateTimeFormattingOptions, RuiFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiField } from './RuiField'

export class RuiDateTimeField<PC, FC> extends RuiField<PC, FC> {
  readonly formatter?: ((value: Date, options: DateTimeFormattingOptions) => string) | undefined
  readonly formatterOptions?: DateTimeFormattingOptions
  constructor(
    spec: RuiFieldSpec,
    type: DataType.DATE | DataType.DATE_TIME | DataType.TIME,
    options: RuiAppOptions<PC, FC>
  ) {
    super(spec, options)
    this.formatter = options.getFormatter(type)
  }

  protected formatValue(value: unknown): string {
    if (value === null || value === undefined) return ''
    if (this.formatter && typeof value === 'object') {
      return this.formatter(value as Date, this.spec.formatterOptions as DateTimeFormattingOptions)
    }
    return value.toString()
  }
}
