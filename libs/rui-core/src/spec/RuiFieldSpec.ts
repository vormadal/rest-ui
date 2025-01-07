import { RuiApiActionSpec } from './actions/RuiApiActionSpec.js'
import { RuiRedirectActionSpec } from './actions/RuiRedirectActionSpec.js'
import { DataType } from '../DataType.js'
import { RuiParameterSpec } from './RuiParameterSpec.js'

/**
 * This is the general field options for a field in a page
 */
export interface RuiFieldSpec {
  hidden?: boolean
  type: DataType
  name: string
  displayName: string

  /**
   * The name of the formatter to be used to format the value of this field
   */
  formatter?: string
  /**
   * Options to be passed to the formatter
   */
  formatterOptions?: unknown

  /**
   * name of component which should be used to render this field
   */
  componentName?: string
}

export interface RuiArrayFieldSpec extends RuiFieldSpec {
  type: DataType.ARRAY
  fieldKey: string
}

export interface RuiObjectFieldSpec extends RuiFieldSpec {
  type: DataType.OBJECT
  fieldKey: string
  fields: RuiAnyFieldSpec[]
  primaryField: RuiAnyFieldSpec
}

export interface RuiLookupFieldSpec extends RuiFieldSpec {
  type: DataType.LOOKUP
  dataSource: RuiApiActionSpec
  keyField: string
  labelField: string
  redirectAction?: RuiRedirectActionSpec
}

export interface RuiButtonFieldSpec extends RuiFieldSpec {
  type: DataType.BUTTON
  linkTo: string
  parameters: RuiParameterSpec[]
}

export type RuiAnyFieldSpec =
  | RuiFieldSpec
  | RuiArrayFieldSpec
  | RuiObjectFieldSpec
  | RuiLookupFieldSpec
  | RuiButtonFieldSpec
