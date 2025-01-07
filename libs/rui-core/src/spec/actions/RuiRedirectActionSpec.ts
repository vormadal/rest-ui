import { RuiParameterSpec } from '../RuiParameterSpec.js'
import { RuiActionSpec } from './RuiActionSpec.js'

export interface RuiRedirectActionSpec extends RuiActionSpec {
  type: 'redirect'
  urlTemplate: string
  paramaters?: RuiParameterSpec[]
}
