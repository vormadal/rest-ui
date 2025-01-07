import { RuiObjectFieldSpec } from 'rui-core'
import { RuiAppOptions } from '../RuiApp'
import { RuiRedirectAction } from '../actions/RuiRedirectAction'
import { RuiField } from './RuiField'

export class RuiObjectField<PC, FC> extends RuiField<PC, FC> {
  redirectAction?: RuiRedirectAction<PC, FC>

  fields: RuiField<PC, FC>[]

  primaryField: RuiField<PC, FC>

  constructor(objectSpec: RuiObjectFieldSpec, options: RuiAppOptions<PC, FC>) {
    super(objectSpec, options)
    this.fields = objectSpec.fields.map((x) => options.getField(x, options))
    this.primaryField = objectSpec.primaryField
      ? options.getField(objectSpec.primaryField, options)
      : this.fields.find((x) => !x.hidden) || this.fields[0]
  }

  protected formatValue(value: unknown): string {
    return this.primaryField.getFormattedValue(value)
  }
}
