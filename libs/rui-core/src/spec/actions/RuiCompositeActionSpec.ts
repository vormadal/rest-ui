import { RuiActionSpec } from './RuiActionSpec.js'
import { RuiAnyActionSpec } from './RuiAnyActionSpec.js'

export interface RuiCompositeActionSpec extends RuiActionSpec {
  type: 'composite'
  actions: RuiAnyActionSpec[]
}
