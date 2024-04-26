import { DataType } from '../configurations/DataType'
import type { ValueConfigOptions } from '../configurations/ValueConfigOptions'
import { merge } from '../configurations/utilities'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiActionContext } from './actions/DuiActionContext'
import type { IDuiConfig, IDuiConfigValueFormatter } from './config/DuiConfig'

export class DuiField<Config extends IDuiConfig> {
  displayName: string
  name: string
  type: DataType
  options: ValueConfigOptions
  hidden: boolean
  formatter: IDuiConfigValueFormatter

  component?: any

  constructor({ displayName, name, type, formatter, hidden, options }: DuiFieldOptions<Config>, config: Config) {
    this.displayName = displayName
    this.name = name
    this.type = type
    this.hidden = hidden === true
    this.formatter = config.valueFormatters[formatter ?? type] ?? config.defaultValueFormatter
    this.options = merge(this.formatter.defaultOptions() ?? {}, options || {})

    //TODO handle override and variants
    this.component = config.components.fields[this.type]?.default
  }

  format = (data: any) => {
    const value = data[this.name]
    return this.formatter.format(value, this.options)
  }

  getInputValue = (data: any) => {
    if (!data) return null

    //TODO this is kinda a hack - should have a better solution such as parsing the json string and converting date strings directly to dates
    if ([DataType.DATE_TIME, DataType.DATE, DataType.TIME].includes(this.type)) {
      return new Date(data[this.name])
    }

    return data[this.name]
  }

  getComponentProperties = (
    context: DuiActionContext,
    handleChange?: (field: DuiField<Config>, value: any) => void
  ): any => {
    return { field: this, value: this.getInputValue(context.data), handleChange }
  }
}
