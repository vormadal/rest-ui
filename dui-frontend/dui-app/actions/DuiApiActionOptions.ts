import type { DuiParameterOptions } from '../DuiParamaterOptions'
import type { DuiConfig } from '../config/DuiConfig'

export interface DuiApiActionOptions<Config extends DuiConfig = DuiConfig> {
  type?: 'api'
  routeTemplate: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  paramaters?: DuiParameterOptions[]
  /**
   * The field of the response which contains the actual data.
   * This is useful if the root object also contains metadata and the actual data is in a nested field
   */
  dataField?: string
}
