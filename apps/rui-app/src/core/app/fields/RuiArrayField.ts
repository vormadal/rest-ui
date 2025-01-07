import { RuiObjectFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiField } from './RuiField'
import { RuiRedirectAction } from '../actions/RuiRedirectAction'

export class RuiArrayField<PC, FC> extends RuiField<PC, FC> {
  redirectAction?: RuiRedirectAction<PC, FC>

  fields: RuiField<PC, FC>[]

  primaryField: RuiField<PC, FC>

  constructor(
    spec: RuiObjectFieldSpec /* does this makes sense that it shares spec with object */,
    options: RuiAppOptions<PC, FC>
  ) {
    super(spec, options)
    this.fields = spec.fields.map((x) => options.getField(x, options))
    this.primaryField = spec.primaryField
      ? options.getField(spec.primaryField, options)
      : this.fields.find((x) => !x.hidden) || this.fields[0]
  }

  protected formatValue(value: unknown): string {
    if (!(value instanceof Array)) {
      return '' // probably empty value or invalid data
    }

    return value.map((x) => this.primaryField.getFormattedValue(x)).join(', ')
  }
  /** TODO should we override the way we get raw and formatted value for arrays? */
}
