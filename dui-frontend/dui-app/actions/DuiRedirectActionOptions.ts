import type { DuiParameterOptions } from '../DuiParamaterOptions'
import type { DuiConfig } from '../config/DuiConfig'

export interface DuiRedirectActionOptions<Config extends DuiConfig = DuiConfig> {
  type: 'redirect'
  urlTemplate: string
  paramaters?: DuiParameterOptions[]
}
