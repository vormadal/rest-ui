import type { DuiConfig, IDuiConfig } from './config/DuiConfig'

export interface DuiFieldOptions<Config extends IDuiConfig = DuiConfig> {
  hidden?: boolean
  formatter?: keyof Config['valueFormatters']
  type: DataType
  options?: ValueConfigOptions
  name: string
  displayName: string
}
