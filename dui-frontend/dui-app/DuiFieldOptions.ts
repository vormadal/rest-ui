import type { DataType } from '../configurations/DataType'
import type { ValueConfigOptions } from '../configurations/ValueConfigOptions'
import type { DuiActionOptionsValues } from './actions/DuiActionOptionValues'
import type { DuiApiActionOptions } from './actions/DuiApiActionOptions'
import type { DuiRedirectActionOptions } from './actions/DuiRedirectActionOptions'
import type { IDuiConfig } from './config/DuiConfig'
import type { DuiParameterOptions } from './DuiParamaterOptions'

export type DuiButtonFieldOptions = {
  type: DataType.BUTTON
  linkTo: string
  parameters: DuiParameterOptions[]
}

export type DuiLookupFieldOptions = {
  type: DataType.LOOKUP
  dataSource: DuiApiActionOptions
  keyField: string
  labelField: string
  redirectAction?: DuiRedirectActionOptions
}

export type DuiFieldOptions<Config extends IDuiConfig> = {
  hidden?: boolean
  formatter?: keyof Config['valueFormatters']
  type: DataType
  options?: ValueConfigOptions
  name: string
  displayName: string

  component?: string
  //TODO probably not the right way to do it
} & (DuiButtonFieldOptions | DuiLookupFieldOptions | { type: any })
