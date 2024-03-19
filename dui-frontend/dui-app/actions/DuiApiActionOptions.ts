import type { DuiParameterOptions } from '../DuiParamaterOptions'
import type { DuiConfig } from '../config/DuiConfig'

export interface DuiApiActionOptions<Config extends DuiConfig = DuiConfig> {
  type: 'api'
  routeTemplate: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  paramaters?: DuiParameterOptions[]
}
