import { RuiParameterSpec } from '../RuiParameterSpec.js'
import { RuiActionSpec } from './RuiActionSpec.js'

export interface RuiApiActionSpec extends RuiActionSpec {
  type: 'api'
  routeTemplate: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  paramaters?: RuiParameterSpec[]
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
