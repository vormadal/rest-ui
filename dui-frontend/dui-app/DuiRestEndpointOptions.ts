import type { DuiParameterOptions } from './DuiParamaterOptions'
import type { DuiConfig } from './config/DuiConfig'

export interface DuiRestEndpointOptions<Config extends DuiConfig = DuiConfig> {
  path: string
  method: string // GET POST PUT
  dataField?: string

  paramaters?: DuiParameterOptions[]
}
