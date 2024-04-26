import type { DuiActionOptions } from './DuiActionOptions'
import type { DuiActionOptionsValues } from './DuiActionOptionValues'

export interface DuiCompositeActionOptions extends DuiActionOptions {
  type: 'composite'
  actions: DuiActionOptionsValues[]
}
