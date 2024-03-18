import type { DuiParameter } from '../configurations/ButtonOptions'
import type { DuiConfig } from './config/DuiConfig'

export interface DuiRestEndpointOptions<Config extends DuiConfig = DuiConfig> {
  path: string
  method: string // GET POST PUT
  dataField?: string

  paramaters?: DuiParameter[]
}
