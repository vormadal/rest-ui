import { useDate } from 'vuetify'
import { DataType } from '../configurations/DataType'
import { merge } from '../configurations/utilities'
import type { DuiFieldOptions } from './DuiFieldOptions'
import type { DuiConfig, IDuiConfig, IDuiConfigValueFormatter } from './config/DuiConfig'

export class DuiField<Config extends IDuiConfig = DuiConfig> {
  displayName: string
  name: string
  type: DataType
  options: ValueConfigOptions
  hidden: boolean
  formatter: IDuiConfigValueFormatter

  component?: any

  constructor({ displayName, name, type, formatter, hidden, options }: DuiFieldOptions<Config>, config: Config) {
    console.log('creating field', name, type)
    this.displayName = displayName
    this.name = name
    this.type = type
    this.hidden = hidden === true
    this.formatter = config.valueFormatters[formatter ?? type] ?? config.defaultValueFormatter
    this.options = merge(this.formatter.defaultOptions() ?? {}, options || {})

    //TODO handle override and variants
    this.component = config.components.fields[this.type]?.default

    console.log('using component', this.component)
  }

  format = (data: any) => {
    const value = data[this.name]
    return this.formatter.format(value, this.options)
  }

  getInputValue = (data: any) => {
    if(!data) return null

    return data[this.name]
  }
}
