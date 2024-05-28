import { DuiField } from './DuiField'
import type { DuiFieldOptions, DuiObjectFieldOptions } from './DuiFieldOptions'
import type { DuiActionContext } from './actions/DuiActionContext'
import { DuiRedirectAction } from './actions/DuiRedirectAction'
import type { IDuiConfig } from './config/DuiConfig'

export class DuiArrayField<Config extends IDuiConfig> extends DuiField {
  redirectAction?: DuiRedirectAction

  fields: DuiField[]

  constructor(options: DuiFieldOptions<Config>, config: Config) {
    super(options, config)
    const { fieldKey, fields } = options as DuiObjectFieldOptions
    this.fields = config.fieldFactory(fields, config)
  }

  format = (data: any) => {
    return ''
  }

  getInputValue = (data: any) => {
    const test =  extractField(data, this.name)
    console.log('test', test)
    return test
  }

  getComponentProperties = (context: DuiActionContext, handleChange?: (field: DuiField, value: any) => void) => {
    const myContext = {...context, data: extractField(context.data, this.name)}
    return { field: this, context: myContext, data: myContext.data, handleChange, children: this.displayName }
  }
}
