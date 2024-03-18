import { isEmpty } from '../../configurations/utilities'
import type { DuiApp } from '../../dui-app/DuiApp'
import type { DuiField } from '../../dui-app/DuiField'
import type { DuiConfig } from '../../dui-app/config/DuiConfig'

interface ValueWrapperProps {
  data: any
  field: DuiField
  app: DuiApp
  config: DuiConfig
}
export function ValueWrapper({ data, field, app, config }: ValueWrapperProps) {
  let value = data ? data[field.name] : undefined
  //TODO strongly typed

  const formatter = (config.valueFormatters as any)[field.formatter || field.type]
  const options = field.options || formatter.defaultOptions()

  if (isEmpty(value)) {
    if (options.skipFormattingWhenEmpty) {
      return options.emptyValue
    }
    value = options.emptyValue
  }

  if (isEmpty(value)) {
    return 'empty :('
  }

  return formatter.format(value, options)
}
