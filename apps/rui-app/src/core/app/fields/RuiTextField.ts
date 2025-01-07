import { DataType, BaseFormattingOptions, RuiFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiField } from './RuiField'

export class RuiTextField<PC, FC> extends RuiField<PC, FC> {
  readonly formatter?: ((value: string, options: BaseFormattingOptions) => string) | undefined
  readonly formatterOptions?: BaseFormattingOptions
  constructor(spec: RuiFieldSpec, options: RuiAppOptions<PC, FC>) {
    super(spec, options)
    this.formatter = options.getFormatter(DataType.STRING)
  }

  protected formatValue(value: unknown): string {
    if (value === null || value === undefined) return ''
    if (this.formatter && typeof value === 'string') {
      return this.formatter(value, this.spec.formatterOptions as BaseFormattingOptions)
    }
    return value.toString()
  }
}
