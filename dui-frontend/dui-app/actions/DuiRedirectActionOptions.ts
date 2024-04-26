import type { DuiParameterOptions } from '../DuiParamaterOptions'
import type { DuiActionOptions } from './DuiActionOptions'

export interface DuiRedirectActionOptions extends DuiActionOptions {
  type: 'redirect'
  urlTemplate: string
  paramaters?: DuiParameterOptions[]
}
