import type { DuiParameterOptions } from '../DuiParamaterOptions'
import type { DuiActionOptions } from './DuiActionOptions'

export interface DuiApiActionOptions extends DuiActionOptions {
  type: 'api'
  routeTemplate: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  paramaters?: DuiParameterOptions[]
  /**
   * The field of the response which contains the actual data.
   * This is useful if the root object also contains metadata and the actual data is in a nested field
   */
  dataField?: string

  pagination?: {
    pageNumberField: string
    pageSizeField: string
    totalItemCountField: string
  }
}
