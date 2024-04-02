import type { DataType } from '../configurations/DataType'
import type { ValueConfigOptions } from '../configurations/ValueConfigOptions'
import type { DuiConfig, IDuiConfig } from './config/DuiConfig'
import type { DuiParameterOptions } from './DuiParamaterOptions'

export type DuiButtonFieldOptions<Config extends IDuiConfig = DuiConfig> = {
  type: DataType.BUTTON
  linkTo: string
  parameters: DuiParameterOptions[]
}

export type DuiFieldOptions<Config extends IDuiConfig = DuiConfig> = {
  hidden?: boolean
  formatter?: keyof Config['valueFormatters']
  type: DataType
  options?: ValueConfigOptions
  name: string
  displayName: string
  //TODO probably not the right way to do it
} & (DuiButtonFieldOptions | { type: any })
