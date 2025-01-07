import { DataType, NumberFormattingOptions, RuiFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiField } from './RuiField'

export class RuiNumberField<PC, FC> extends RuiField<PC, FC> {
  readonly formatter?: ((value: number, options: NumberFormattingOptions) => string) | undefined
  readonly formatterOptions?: NumberFormattingOptions
  constructor(spec: RuiFieldSpec, options: RuiAppOptions<PC, FC>) {
    super(spec, options)
    this.formatter = options.getFormatter(DataType.NUMBER)
  }

  protected formatValue(value: unknown): string {
    if (value === null || value === undefined) return ''
    if (this.formatter && typeof value === 'number') {
      return this.formatter(value, this.spec.formatterOptions as NumberFormattingOptions)
    }
    return value.toString()
  }
}
